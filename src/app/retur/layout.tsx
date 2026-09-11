import type { Metadata } from "next";

// The page is a client component, so its metadata lives in this layout.
export const metadata: Metadata = {
  title: "Politica și formularul de retur",
  description: "Returnează produsele gtreiD în 14 zile de la primire. Completează formularul online de retur.",
  alternates: { canonical: "/retur" },
};

export default function ReturLayout({ children }: { children: React.ReactNode }) {
  return children;
}
