import type { Metadata } from "next";
import { products } from "@/data/data";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

// Prerender every product page at build time.
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Pick<ProductLayoutProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return { title: "Produs negăsit", robots: { index: false } };
  }

  // Some products use an illustrated mockup id instead of a photo; fall back to the logo.
  const photo = product.images.find((image) => /\.(jpe?g|png|webp)$/i.test(image));
  const imageUrl = photo ? (photo.startsWith("/") ? photo : `/${photo}`) : "/logo.png";
  const url = `/produse/${product.slug}`;
  const description = product.shortDescription || product.description.slice(0, 160);

  return {
    // Absolute: the /produse layout's own title stops the root "%s | gtreiD" template from reaching here.
    title: { absolute: `${product.name} | gtreiD` },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} | gtreiD`,
      description,
      url,
      siteName: "gtreiD",
      locale: "ro_RO",
      type: "website",
      images: [{ url: imageUrl, alt: product.name }],
    },
  };
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return children;
}
