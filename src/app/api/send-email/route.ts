import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// nodemailer needs Node.js APIs (net/tls), not the Edge runtime.
export const runtime = "nodejs";

type MessageType = "contact" | "quote" | "cart" | "return";
const MESSAGE_TYPES: readonly MessageType[] = ["contact", "quote", "cart", "return"];

// Vercel rejects request bodies over 4.5 MB before they reach this route, and
// base64 inflates files by 4/3, so 3 MiB is the largest file that fits safely.
// Keep in sync with MAX_ATTACHMENT_BYTES in QuoteModal.tsx.
const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;
const ALLOWED_ATTACHMENT_EXTENSIONS = [".stl", ".obj", ".3mf", ".step", ".stp", ".iges", ".igs"];
const MAX_SUBJECT_LENGTH = 200;
const MAX_TEXT_LENGTH = 20_000;
const MAX_FILENAME_LENGTH = 120;

// Best-effort limit: memory is per serverless instance, so this slows down
// simple spam loops but is not a hard guarantee.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const recentRequests = new Map<string, number[]>();

const SEND_FAILED_MESSAGE =
  "Mesajul nu a putut fi trimis. Te rugăm să încerci din nou sau să ne scrii pe WhatsApp la +40 771 397 634.";

interface ValidAttachment {
  filename: string;
  content: string; // base64
  size: number;
}

interface ValidMessage {
  type: MessageType;
  subject: string;
  replyTo: string;
  text: string;
  attachment?: ValidAttachment;
}

class ValidationError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentRequests.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    recentRequests.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentRequests.set(ip, recent);

  // Keep the map from growing without bound on long-lived instances.
  if (recentRequests.size > 1000) {
    for (const [key, times] of recentRequests) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentRequests.delete(key);
    }
  }
  return false;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@<>"(),;:]+@[^\s@<>"(),;:]+\.[^\s@<>"(),;:]{2,}$/.test(value);
}

function validateAttachment(raw: unknown): ValidAttachment {
  if (typeof raw !== "object" || raw === null) {
    throw new ValidationError("Fișierul atașat este invalid.");
  }
  const { filename, content } = raw as Record<string, unknown>;
  if (typeof filename !== "string" || typeof content !== "string" || content.length === 0) {
    throw new ValidationError("Fișierul atașat este invalid.");
  }

  // Keep only the base name and strip anything that could confuse mail clients.
  const baseName = filename.split(/[\\/]/).pop() ?? "";
  const safeName = baseName.replace(/[^\p{L}\p{N}._ -]/gu, "_").slice(-MAX_FILENAME_LENGTH);
  const extension = safeName.includes(".") ? safeName.slice(safeName.lastIndexOf(".")).toLowerCase() : "";
  if (!ALLOWED_ATTACHMENT_EXTENSIONS.includes(extension)) {
    throw new ValidationError("Tip de fișier neacceptat. Trimite un fișier .STL, .OBJ, .3MF, .STEP sau .IGES.");
  }

  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(content) || content.length % 4 !== 0) {
    throw new ValidationError("Fișierul atașat este corupt. Te rugăm să îl încarci din nou.");
  }
  const padding = content.endsWith("==") ? 2 : content.endsWith("=") ? 1 : 0;
  const size = (content.length / 4) * 3 - padding;
  if (size > MAX_ATTACHMENT_BYTES) {
    throw new ValidationError("Fișierul depășește limita de 3 MB.", 413);
  }

  return { filename: safeName, content, size };
}

function validateBody(body: unknown): ValidMessage {
  if (typeof body !== "object" || body === null) {
    throw new ValidationError("Cerere invalidă.");
  }
  const { type, subject, replyTo, text, attachments } = body as Record<string, unknown>;

  if (typeof type !== "string" || !MESSAGE_TYPES.includes(type as MessageType)) {
    throw new ValidationError("Tip de mesaj invalid.");
  }
  if (typeof replyTo !== "string" || !isValidEmail(replyTo.trim())) {
    throw new ValidationError("Adresa de email nu este validă.");
  }
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new ValidationError("Mesajul este gol.");
  }
  if (text.length > MAX_TEXT_LENGTH) {
    throw new ValidationError("Mesajul este prea lung.");
  }

  const cleanSubject =
    typeof subject === "string" && subject.trim()
      ? subject.replace(/[\r\n]+/g, " ").trim().slice(0, MAX_SUBJECT_LENGTH)
      : `Mesaj nou gtreiD (${type})`;

  let attachment: ValidAttachment | undefined;
  if (Array.isArray(attachments) && attachments.length > 0) {
    if (type !== "quote" || attachments.length > 1) {
      throw new ValidationError("Atașamentele sunt acceptate doar pentru cererile de ofertă (un singur fișier).");
    }
    attachment = validateAttachment(attachments[0]);
  }

  return { type: type as MessageType, subject: cleanSubject, replyTo: replyTo.trim(), text, attachment };
}

async function sendWithSmtp(message: ValidMessage, to: string): Promise<void> {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER || "hermeneanur@gmail.com";
  const pass = process.env.SMTP_PASS?.trim();
  if (!pass) throw new Error("SMTP_PASS not set");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    // Fail fast instead of hanging until the function times out.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  await transporter.sendMail({
    from: `"gtreiD Web" <${user}>`,
    to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    attachments: message.attachment
      ? [
          {
            filename: message.attachment.filename,
            content: Buffer.from(message.attachment.content, "base64"),
            contentType: "application/octet-stream",
          },
        ]
      : undefined,
  });
}

async function sendWithResend(message: ValidMessage, to: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set");
  // onboarding@resend.dev only delivers to the Resend account owner's address.
  // Set RESEND_FROM to an address on a domain verified in Resend (e.g. comenzi@gtreid.ro).
  const from = process.env.RESEND_FROM || "gtreiD <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
      attachments: message.attachment
        ? [{ filename: message.attachment.filename, content: message.attachment.content }]
        : undefined,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { success: false, error: "Prea multe mesaje într-un timp scurt. Te rugăm să încerci din nou în câteva minute." },
      { status: 429 },
    );
  }

  let message: ValidMessage;
  try {
    message = validateBody(await request.json());
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, error: err.message }, { status: err.status });
    }
    return NextResponse.json({ success: false, error: "Cerere invalidă." }, { status: 400 });
  }

  const to = process.env.NOTIFICATION_EMAIL || "hermeneanur@gmail.com";
  const providers: { name: string; configured: boolean; send: () => Promise<void> }[] = [
    { name: "smtp", configured: Boolean(process.env.SMTP_PASS?.trim()), send: () => sendWithSmtp(message, to) },
    { name: "resend", configured: Boolean(process.env.RESEND_API_KEY), send: () => sendWithResend(message, to) },
  ];

  const configured = providers.filter((p) => p.configured);
  if (configured.length === 0) {
    // Deliberately a server error: previously this returned success and messages were silently lost.
    console.error("[send-email] No email provider configured. Set SMTP_PASS (Gmail App Password) or RESEND_API_KEY.");
    return NextResponse.json({ success: false, error: SEND_FAILED_MESSAGE }, { status: 503 });
  }

  for (const provider of configured) {
    try {
      await provider.send();
      // Log metadata only: message bodies contain addresses, phone numbers and IBANs.
      console.info(`[send-email] sent type=${message.type} via=${provider.name} attachment=${Boolean(message.attachment)}`);
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error(`[send-email] ${provider.name} failed for type=${message.type}:`, err instanceof Error ? err.message : err);
    }
  }

  return NextResponse.json({ success: false, error: SEND_FAILED_MESSAGE }, { status: 502 });
}
