import type { Metadata } from "next";

// The page is a client component, so its metadata lives in this layout.
export const metadata: Metadata = {
  title: "Contact",
  description: "Scrie-ne pentru o comandă sau o ofertă de printare 3D: formular, telefon, WhatsApp sau email. Showroom în Zărnești.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
