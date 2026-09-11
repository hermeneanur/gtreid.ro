import type { Metadata } from "next";

// The page is a client component, so its metadata lives in this layout.
export const metadata: Metadata = {
  title: "Servicii de printare și proiectare 3D",
  description: "Consultanță tehnică, modelare CAD, printare 3D FDM/SLA și finisare manuală pentru orice idee sau piesă specială.",
  alternates: { canonical: "/servicii" },
};

export default function ServiciiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
