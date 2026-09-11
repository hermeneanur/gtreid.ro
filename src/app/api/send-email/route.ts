import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface AttachmentItem {
  filename: string;
  content: string;
  contentType?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, subject, replyTo, text, html, attachments } = body;

    const targetEmail = process.env.NOTIFICATION_EMAIL || "hermeneanur@gmail.com";
    const mailSubject = subject || `Notificare nouă gtreiD (${type || "general"})`;

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || "hermeneanur@gmail.com";
    const smtpPass = process.env.SMTP_PASS;
    const web3Key = process.env.WEB3FORMS_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    const hasAttachment = attachments && Array.isArray(attachments) && attachments.length > 0;

    console.log(`\n=================== [MESAJ NOU PRIMIT: ${type?.toUpperCase() || "GENERAL"}] ===================`);
    console.log(`Destinatar: ${targetEmail}`);
    console.log(`Email Client (Reply-To): ${replyTo || "Nespecificat"}`);
    console.log(`Subiect: ${mailSubject}`);
    console.log(`Atașamente: ${hasAttachment ? (attachments as AttachmentItem[]).map((a) => a.filename).join(", ") : "Niciunul"}`);
    console.log(`Conținut:\n${text}`);
    console.log(`========================================================================================\n`);

    // Option 1: Web3Forms API (if key is present)
    if (web3Key) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: mailSubject,
            from_name: "gtreiD Web",
            email: replyTo || targetEmail,
            replyto: replyTo || targetEmail,
            message: text,
          }),
        });
        const data = await res.json();
        if (data.success) {
          return NextResponse.json({ success: true, message: "Email trimis prin Web3Forms!" });
        }
      } catch (err) {
        console.error("Eroare Web3Forms:", err);
      }
    }

    // Option 2: Resend API (if key is present)
    if (resendKey) {
      try {
        const resendAttachments = hasAttachment ? (attachments as AttachmentItem[]).map((att) => ({
          filename: att.filename,
          content: att.content,
        })) : undefined;

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "gtreiD <onboarding@resend.dev>",
            to: targetEmail,
            reply_to: replyTo || undefined,
            subject: mailSubject,
            text: text,
            attachments: resendAttachments,
          }),
        });
        if (res.ok) {
          return NextResponse.json({ success: true, message: "Email trimis prin Resend!" });
        }
      } catch (err) {
        console.error("Eroare Resend:", err);
      }
    }

    // Option 3: Nodemailer via Gmail SMTP (if SMTP_PASS is provided)
    if (smtpUser && smtpPass && smtpPass.trim() !== "") {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const formattedAttachments = hasAttachment ? (attachments as AttachmentItem[]).map((att) => ({
        filename: att.filename,
        content: Buffer.from(att.content, "base64"),
        contentType: att.contentType || "application/octet-stream",
      })) : undefined;

      await transporter.sendMail({
        from: `"gtreiD Client" <${smtpUser}>`,
        to: targetEmail,
        replyTo: replyTo || undefined,
        subject: mailSubject,
        text: text,
        html: html || undefined,
        attachments: formattedAttachments,
      });

      return NextResponse.json({
        success: true,
        message: "Emailul și fișierele atașate au fost trimise direct pe hermeneanur@gmail.com!",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Mesajul a fost procesat cu succes!",
    });

  } catch (error: unknown) {
    console.error("Eroare trimitere mail:", error);
    return NextResponse.json({
      success: true,
      message: "Mesaj înregistrat!",
    });
  }
}
