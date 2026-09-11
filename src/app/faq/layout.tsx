import type { Metadata } from "next";

// The page is a client component, so its metadata lives in this layout.
export const metadata: Metadata = {
  title: "Întrebări frecvente",
  description: "Răspunsuri la cele mai comune întrebări despre comenzi, livrare și printare 3D la gtreiD.",
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
