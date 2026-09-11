import type { Metadata } from "next";

// The page is a client component, so its metadata lives in this layout.
export const metadata: Metadata = {
  title: "Galerie proiecte 3D",
  description: "Galeria de printuri 3D gtreiD și portofoliul de proiecte reale de modelare și reconstrucție.",
  alternates: { canonical: "/galerie" },
};

export default function GalerieLayout({ children }: { children: React.ReactNode }) {
  return children;
}
