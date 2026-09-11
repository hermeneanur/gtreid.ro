import type { Metadata } from "next";

// The page is a client component, so its metadata lives in this layout.
export const metadata: Metadata = {
  title: "Termeni și condiții",
  description: "Termenii și condițiile de utilizare a site-ului gtreid.ro și de comandă a produselor gtreiD.",
  alternates: { canonical: "/termeni" },
};

export default function TermeniLayout({ children }: { children: React.ReactNode }) {
  return children;
}
