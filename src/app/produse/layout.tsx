import type { Metadata } from "next";

// The page is a client component, so its metadata lives in this layout.
export const metadata: Metadata = {
  title: "Catalog produse printate 3D",
  description: "Brelocuri, jucării, ornamente, pușculițe, veioze și proiecte speciale printate 3D. Alege culoarea și materialul și comandă online.",
  alternates: { canonical: "/produse" },
};

export default function ProduseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
