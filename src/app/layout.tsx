import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import QuoteModal from "@/components/quote-modal/QuoteModal";
import CartPanel from "@/components/cart-panel/CartPanel";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "gtreiD - Printare 3D Premium și Modelare Personalizată",
    template: "%s | gtreiD",
  },
  description: "Transformăm ideile în obiecte reale prin printare 3D de înaltă precizie. Realizăm brelocuri, ornamente, pușculițe, logo-uri 3D, figurine și proiecte speciale personalizate.",
  metadataBase: new URL("https://gtreid.ro"),
  openGraph: {
    title: "gtreiD - Printare 3D Premium și Modelare Personalizată",
    description: "Transformăm ideile în obiecte reale prin printare 3D de înaltă precizie. Realizăm brelocuri, ornamente, pușculițe, logo-uri 3D, figurine și proiecte speciale personalizate.",
    url: "https://gtreid.ro",
    siteName: "gtreiD",
    locale: "ro_RO",
    type: "website",
    images: [{ url: "/logo.png", alt: "gtreiD" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#F6F6F6] text-[#111111] dark:bg-[#111111] dark:text-[#FFFFFF]">
        <AppProvider>
          <LoadingScreen />
          <Header />
          <main className="flex-grow flex flex-col w-full relative">{children}</main>
          <Footer />
          <QuoteModal />
          <CartPanel />
        </AppProvider>
      </body>
    </html>
  );
}
