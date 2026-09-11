import type { MetadataRoute } from "next";
import { products } from "@/data/data";

const BASE_URL = "https://gtreid.ro";
const STATIC_ROUTES = ["", "/produse", "/servicii", "/galerie", "/faq", "/contact", "/retur", "/termeni"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const productEntries = products.map((product) => ({
    url: `${BASE_URL}/produse/${product.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
