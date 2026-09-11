export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  category: string;
  categories?: string[];
  rating: number;
  reviewCount: number;
  images: string[];
  specifications: Record<string, string>;
  materials: string[];
  colors: { name: string; hex: string; imageIndex?: number }[];
  productionTime: string;
  dimensions: string;
  popular: boolean;
  recommended: boolean;
  stock?: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  process: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Tehnic" | "Comenzi" | "Livrare";
}

export const CATEGORIES = [
  "Ornamente",
  "Brelocuri",
  "Pușculițe",
  "Jucării",
  "Auto",
  "Cadouri personalizate",
  "Proiecte speciale"
];

export const STANDARD_COLORS: { name: string; hex: string; imageIndex?: number }[] = [
  { name: "Verde", hex: "#00FF7F" },
  { name: "Alb", hex: "#FFFFFF" },
  { name: "Galben", hex: "#FFD700" },
  { name: "Maro / maro deschis", hex: "#8B4513" },
  { name: "Mov / lila", hex: "#9932CC" },
  { name: "Roz", hex: "#FF69B4" },
  { name: "Gri închis / antracit", hex: "#333333" },
  { name: "Portocaliu", hex: "#FF8C2A" },
  { name: "Albastru / cyan", hex: "#00BFFF" },
  { name: "Auriu / galben-închis", hex: "#D4AF37" },
  { name: "Negru", hex: "#111111" },
  { name: "Roșu", hex: "#FF0000" },
  { name: "Bej / crem", hex: "#F5F5DC" },
  { name: "Gri / argintiu", hex: "#C0C0C0" }
];

const rawProducts: Product[] = [
  // Ornamente
  {
    id: "p1",
    name: "Glob de Crăciun Personalizat cu Nume",
    slug: "glob-craciun-personalizat-nume",
    description: "Glob decorativ premium pentru bradul de Crăciun, realizat prin printare 3D cu textură fină și finisaje sclipitoare. Mascota 3D îți recomandă să adaugi numele celor dragi pentru un cadou de neuitat.",
    shortDescription: "Glob premium 3D personalizat cu numele tău pentru sărbători magice.",
    price: 35,
    category: "Ornamente",
    rating: 4.9,
    reviewCount: 142,
    images: ["ornament_glob_1", "ornament_glob_2"],
    specifications: {
      "Rezoluție strat": "0.12 mm",
      "Material": "PLA Premium (Biodegradabil)",
      "Diametru": "85 mm",
      "Greutate": "25g"
    },
    materials: ["PLA Premium", "PLA Silk (Mătăsos)"],
    colors: [
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" },
      { name: "Alb Sclipitor", hex: "#FFFFFF" },
      { name: "Aur Roșu", hex: "#B87333" },
      { name: "Argintiu Cosmic", hex: "#C0C0C0" }
    ],
    productionTime: "1-2 zile",
    dimensions: "85 x 85 x 90 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p2",
    name: "Iepuraș de Paște Geometric Modern",
    slug: "iepuras-paste-geometric-modern",
    description: "Decorațiune minimalistă sub formă de iepuraș cu fațete poligonale. Perfect pentru decorul modern de primăvară sau masa de Paște. O piesă elegantă ce atrage priviri.",
    shortDescription: "Iepuraș decorativ cu design poligonal minimalist.",
    price: 45,
    category: "Ornamente",
    rating: 4.8,
    reviewCount: 38,
    images: ["ornament_iepuras_1"],
    specifications: {
      "Design": "Low-Poly",
      "Material": "PLA Premium",
      "Înălțime": "150 mm",
      "Timp printare": "6 ore"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Alb Glossy", hex: "#FFFFFF" },
      { name: "Negru Mat", hex: "#111111" },
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" },
      { name: "Verde Pastel", hex: "#77DD77" }
    ],
    productionTime: "1-2 zile",
    dimensions: "100 x 80 x 150 mm",
    popular: false,
    recommended: true
  },
  {
    id: "p3",
    name: "Dovleac de Halloween cu LED Integrat",
    slug: "dovleac-halloween-led",
    description: "Dovleac decorativ înfricoșător sau amuzant cu un spațiu dedicat pentru o lumânare LED (inclusă). Design optimizat pentru umbre spectaculoase pe pereți.",
    shortDescription: "Dovleac printat 3D cu textură organică și LED inclus.",
    price: 55,
    category: "Ornamente",
    rating: 4.7,
    reviewCount: 65,
    images: ["ornament_dovleac_1"],
    specifications: {
      "Iluminare": "Baterie CR2032 (LED galben pâlpâitor)",
      "Material": "PETG Semitransparent",
      "Siguranță": "A se folosi DOAR cu lumânări LED (fără foc)"
    },
    materials: ["PETG Semitransparent", "PLA Premium"],
    colors: [
      { name: "Portocaliu Translucid", hex: "#FF8C2A" },
      { name: "Negru Mat", hex: "#111111" },
      { name: "Verde Neon", hex: "#39FF14" }
    ],
    productionTime: "2 zile",
    dimensions: "120 x 120 x 110 mm",
    popular: true,
    recommended: false
  },
  {
    id: "p4",
    name: "Trandafir Etern 3D în Suport Elegant",
    slug: "trandafir-etern-suport-elegant",
    description: "Cadoul perfect de Valentine's Day. Un trandafir cu geometrie complexă printată 3D, așezat pe un suport minimalist negru cu sigla gtreiD. Nu se ofilește niciodată.",
    shortDescription: "Trandafir decorativ 3D, cadoul simbolic perfect pentru persoana iubită.",
    price: 60,
    category: "Ornamente",
    rating: 4.9,
    reviewCount: 92,
    images: ["ornament_trandafir_1"],
    specifications: {
      "Piese": "Trandafir + Suport geometric",
      "Rezoluție": "0.12 mm (detalii ultra-fine)",
      "Material": "PLA Silk Premium"
    },
    materials: ["PLA Silk (Mătăsos)"],
    colors: [
      { name: "Roșu Translucid", hex: "#E60000" },
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" },
      { name: "Roz Mătăsos", hex: "#FFB6C1" }
    ],
    productionTime: "2 zile",
    dimensions: "90 x 90 x 210 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p1_5",
    name: "Veioză Florală 3D",
    slug: "veioza-florala-3d",
    description: "Veioză decorativă spectaculoasă în formă de floare, realizată prin printare 3D din materiale speciale de difuzie a luminii. Petalele geometrice imbricate creează un joc cald și relaxant de umbre și lumini.",
    shortDescription: "Veioză decorativă 3D cu design floral și lumină ambientală caldă.",
    price: 130,
    category: "Ornamente",
    rating: 4.9,
    reviewCount: 68,
    images: ["veioza_florala_1.jpg"],
    specifications: {
      "Iluminare": "Dulie E14 / LED inclus",
      "Material": "PLA Premium Diffuser",
      "Înălțime": "240 mm",
      "Alimentare": "Cablu cu întrerupător inclus (220V)"
    },
    materials: ["PLA Premium", "PETG Translucid"],
    colors: [
      { name: "Alb Warm-Glow", hex: "#FFF8DC" }
    ],
    productionTime: "2-3 zile",
    dimensions: "180 x 180 x 240 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p1_6",
    name: "Jucăria Spiralată Steluță",
    slug: "jucaria-spiralata-steluta",
    description: "Jucărie antistres hipnotizantă și extrem de satisfăcătoare! Piramida stelară în strat concentric glisează continuu pe axul spiralat central cu o mișcare lină și relaxantă. Ideală pentru birou, concentrare și eliberarea stresului.",
    shortDescription: "Jucărie antistres satisfăcătoare cu piramidă stelară spiralată.",
    price: 15,
    category: "Jucării",
    rating: 5.0,
    reviewCount: 105,
    images: ["jucarie_satisfacatoare_1.jpg", "jucarie_satisfacatoare_2.jpg"],
    specifications: {
      "Tip printare": "FDM Spiral Precision",
      "Material": "PLA Silk Matte",
      "Funcție": "Fidget antistres / Decor birou"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Albastru Cyan", hex: "#00BFFF" }
    ],
    productionTime: "1 zi",
    dimensions: "100 x 100 x 110 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p1_7",
    name: "Veioză de Masă Gri 3D",
    slug: "veioza-de-masa-gri-3d",
    description: "Veioză de masă minimalistă cu trepied gri și difuzor alb texturat cu suprafață sculptată geometric (Voronoi facets). Proiectează o lumină difuză extrem de plăcută, ideală pentru noptieră, birou sau living.",
    shortDescription: "Veioză de masă 3D minimalistă cu trepied gri și difuzor alb geometric.",
    price: 40,
    category: "Ornamente",
    rating: 4.9,
    reviewCount: 52,
    images: ["veioza_masa_gri_1.jpg"],
    specifications: {
      "Iluminare": "Dulie LED E14 / E27",
      "Material": "PLA Premium Matte",
      "Înălțime": "210 mm",
      "Design": "Trepied minimalist cu difuzor voronoi"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Gri & Alb", hex: "#808080" }
    ],
    productionTime: "1-2 zile",
    dimensions: "140 x 140 x 210 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p1_8",
    name: "Jucărie Ou de Dragon Twist 3D",
    slug: "jucarie-ou-de-dragon-twist-3d",
    description: "Ou de dragon mistic și hipnotizant realizat prin printare 3D din filament verde vibrant! Se răsucește și se extinde printr-o mișcare spiralată spectaculoasă, transformându-se dintr-un ou mecanic într-o structură spiralată articulată antistres.",
    shortDescription: "Ou de dragon spiralat 3D antistres cu mișcare de torsiune.",
    price: 25,
    category: "Jucării",
    rating: 5.0,
    reviewCount: 118,
    images: ["ou_dragon_1.jpg", "ou_dragon_2.jpg", "ou_dragon_3.jpg"],
    specifications: {
      "Tip printare": "FDM Spiral Twist Articulat",
      "Material": "PLA Premium",
      "Înălțime extinsă": "160 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Verde Smarald", hex: "#00FF7F" }
    ],
    productionTime: "1 zi",
    dimensions: "70 x 70 x 100 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p1_9",
    name: "Jucărie Pisică de Mare Articulată 3D",
    slug: "jucarie-pisica-de-mare-articulata-3d",
    description: "Jucărie antistres flexibilă în formă de pisică de mare (stingray), printată 3D multicolor din filament galben intens cu ochi mari de desen animat. Corpul și aripioarele sunt complet articulate și se mișcă natural în palme.",
    shortDescription: "Pisică de mare (stingray) articulată și flexibilă printată 3D.",
    price: 25,
    category: "Jucării",
    rating: 4.9,
    reviewCount: 87,
    images: ["pisica_de_mare_1.jpg", "pisica_de_mare_2.jpg"],
    specifications: {
      "Tip printare": "FDM Flexi-Mesh Articulat",
      "Material": "PLA Premium",
      "Lățime": "130 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Galben Solar", hex: "#FFD700" }
    ],
    productionTime: "1 zi",
    dimensions: "130 x 120 x 25 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p1_10",
    name: "Jucărie Spiralată Piramidă 3D",
    slug: "jucarie-spiralata-piramida-3d",
    description: "Jucărie antistres fascinantă în formă de piramidă spiralată! Piesa interioară glisează continuu și fără efort prin baza decupată printr-o mișcare hipnotizantă de torsiune. Disponibilă în combinația bicoloră Roz & Negru sau Alb Imaculat.",
    shortDescription: "Jucărie antistres piramidă spiralată cu mișcare continuă de glisare.",
    price: 15,
    category: "Jucării",
    rating: 5.0,
    reviewCount: 94,
    images: [
      "jucarie_con_roz_negru_1.jpg", 
      "jucarie_con_roz_negru_2.jpg", 
      "jucarie_con_roz_negru_3.jpg",
      "jucarie_con_alb_1.jpg",
      "jucarie_con_alb_2.jpg"
    ],
    specifications: {
      "Tip printare": "FDM Precision Spiral",
      "Material": "PLA Premium",
      "Înălțime": "110 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Roz & Negru", hex: "#FF69B4", imageIndex: 0 },
      { name: "Alb Imaculat", hex: "#FFFFFF", imageIndex: 3 }
    ],
    productionTime: "1 zi",
    dimensions: "70 x 70 x 110 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p1_11",
    name: "Jucărie Spiralată Cilindru 3D",
    slug: "jucarie-spiralata-cilindru-3d",
    description: "Jucărie antistres cilindrică cu mecanism spiralat pasiv! Miezul interior spiralat glisează continuu prin suportul exterior decupat printr-o mișcare fluidă și satisfăcătoare. Disponibilă în variantele Roșu & Negru, Albastru Cyan sau Verde Smarald.",
    shortDescription: "Jucărie antistres cilindru spiralat cu mișcare continuă de glisare.",
    price: 15,
    category: "Jucării",
    rating: 4.9,
    reviewCount: 78,
    images: [
      "jucarie_cilindru_rosu_negru_1.jpg",
      "jucarie_cilindru_rosu_negru_2.jpg",
      "jucarie_cilindru_rosu_negru_3.jpg",
      "jucarie_cilindru_albastru_1.jpg",
      "jucarie_cilindru_albastru_2.jpg",
      "jucarie_cilindru_verde_1.jpg",
      "jucarie_cilindru_verde_2.jpg"
    ],
    specifications: {
      "Tip printare": "FDM Precision Spiral",
      "Material": "PLA Premium",
      "Înălțime": "95 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Roșu & Negru", hex: "#FF0000", imageIndex: 0 },
      { name: "Albastru Cyan", hex: "#00BFFF", imageIndex: 3 },
      { name: "Verde Smarald", hex: "#00FF7F", imageIndex: 5 }
    ],
    productionTime: "1 zi",
    dimensions: "65 x 65 x 95 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p1_12",
    name: "Veioză Wavy 3D",
    slug: "veioza-wavy-3d",
    description: "Veioză decorativă modernă cu abajur ondulat sculptat 3D în valuri fluide și suport stilizat cu 3 picioare (trepied). Proiectează o lumină caldă și ambientală relaxantă, ideală pentru noptieră, birou sau living.",
    shortDescription: "Veioză 3D cu abajur ondulat wavy și trepied elegant.",
    price: 75,
    category: "Ornamente",
    rating: 5.0,
    reviewCount: 34,
    images: ["veioza_wavy_1.jpg"],
    specifications: {
      "Design": "Wavy (Valuri fluide)",
      "Material": "PLA Premium Diffuser",
      "Iluminare": "LED cald inclus",
      "Suport": "Trepied minimalist"
    },
    materials: ["PLA Premium", "PETG Translucid"],
    colors: [
      { name: "Alb Warm-Glow & Negru", hex: "#FFF8DC" }
    ],
    productionTime: "1-2 zile",
    dimensions: "140 x 140 x 220 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p1_13",
    name: "Veioză Ciupercă 3D",
    slug: "veioza-ciuperca-3d",
    description: "Veioză ambientală 3D în formă de ciupercă organică cu bază sferică striată și cupolă sculptată fin. Oferă o strălucire caldă, difuză și primitoare, adăugând o notă modernă și jucăușă spațiului tău.",
    shortDescription: "Veioză decorativă 3D în formă de ciupercă cu lumină caldă.",
    price: 75,
    category: "Ornamente",
    rating: 4.9,
    reviewCount: 41,
    images: ["veioza_ciuperca_1.jpg"],
    specifications: {
      "Design": "Mushroom Organic",
      "Material": "PLA Premium Matte",
      "Iluminare": "LED cald integrat",
      "Bază": "Cilindrică striată"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Bej Warm & Negru", hex: "#F5F5DC" }
    ],
    productionTime: "1-2 zile",
    dimensions: "160 x 160 x 200 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p1_14",
    name: "Veioză Modernă 3D",
    slug: "veioza-moderna-3d",
    description: "Veioză de masă premium cu design arhitectural modern format din module cubice rotunjite suprapuse cu textură fină micro-perforată. Creează o difuzie hipnotizantă a luminii pe 360 de grade, fiind piesa de decor centrală pentru birou sau sufragerie.",
    shortDescription: "Veioză modernă 3D arhitecturală cu straturi suprapuse și textură perforată.",
    price: 100,
    category: "Ornamente",
    rating: 5.0,
    reviewCount: 56,
    images: ["veioza_moderna_1.jpg", "veioza_moderna_2.jpg"],
    specifications: {
      "Design": "Stacked Modular Perforated",
      "Material": "PLA Premium Precision",
      "Iluminare": "Lumină albă / caldă 360°",
      "Bază": "Bază neagră mată"
    },
    materials: ["PLA Premium", "PETG Translucid"],
    colors: [
      { name: "Alb Perforat & Bază Neagră", hex: "#FFFFFF" }
    ],
    productionTime: "2-3 zile",
    dimensions: "150 x 150 x 240 mm",
    popular: true,
    recommended: true
  },

  // Brelocuri
  {
    id: "p5",
    name: "Breloc Anime Katana Mini",
    slug: "breloc-anime-katana-mini",
    description: "Breloc detaliat inspirat din faimoasele săbii Katana din anime-uri. Printat la rezoluție extrem de fină cu rășină industrială și asamblat manual.",
    shortDescription: "Breloc mini Katana ultra-detaliat pentru fanii Anime.",
    price: 15,
    category: "Brelocuri",
    rating: 4.6,
    reviewCount: 110,
    images: ["breloc_katana_1"],
    specifications: {
      "Tip printare": "SLA (Rășină fotopolimerizabilă)",
      "Material": "Rășină Ultra-Detailată",
      "Lungime": "70 mm",
      "Inel chei": "Inclus, oțel inoxidabil"
    },
    materials: ["Rășină Ultra-Detailată"],
    colors: [
      { name: "Negru Mat", hex: "#111111" },
      { name: "Argintiu Metalic", hex: "#C0C0C0" },
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" }
    ],
    productionTime: "1 zi",
    dimensions: "15 x 8 x 70 mm",
    popular: true,
    recommended: false,
    stock: 0
  },
  {
    id: "p6",
    name: "Breloc Personalizat cu Logo-ul Tău",
    slug: "breloc-personalizat-logo-firma",
    description: "Breloc profesional din plastic dur rezistent la uzură cotidiană. Ideal pentru cheile firmei, mașinii sau cadouri corporate pentru clienții tăi.",
    shortDescription: "Breloc rezistent printat dual-color cu sigla sau textul tău.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 280,
    images: ["breloc_logo_1"],
    specifications: {
      "Tip printare": "FDM Dual-Color extrudare",
      "Material": "PETG Durabil (Rezistă la căldură în mașină)",
      "Grosime": "4 mm"
    },
    materials: ["PETG Rezistent", "PLA Premium"],
    colors: [
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" },
      { name: "Negru Mat", hex: "#111111" },
      { name: "Alb Glossy", hex: "#FFFFFF" },
      { name: "Albastru Electric", hex: "#0000FF" }
    ],
    productionTime: "1-2 zile",
    dimensions: "60 x 30 x 4 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_1",
    name: "Breloc Minge Fotbal",
    slug: "breloc-minge-fotbal",
    description: "Breloc premium în formă de minge de fotbal, printat 3D cu texturi detaliate alb-negru. Un cadou ideal pentru iubitorii de sport.",
    shortDescription: "Breloc minge de fotbal alb-negru printat 3D cu precizie.",
    price: 15,
    category: "Brelocuri",
    rating: 4.8,
    reviewCount: 45,
    images: ["breloc_minge_fotbal.jpg"],
    specifications: {
      "Tip": "FDM Multimaterial",
      "Material": "PLA Premium",
      "Diametru": "35 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Alb & Negru", hex: "#FFFFFF" }
    ],
    productionTime: "1 zi",
    dimensions: "35 x 35 x 35 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_2",
    name: "Breloc Cupa Mondială",
    slug: "breloc-cupa-mondiala",
    description: "Miniatură fidelă a faimosului trofeu al Cupei Mondiale FIFA, cu inel de chei integrat. Finisaj auriu sclipitor cu detalii verzi la bază.",
    shortDescription: "Breloc mini-trofeu Cupa Mondială auriu cu inel integrat.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 62,
    images: ["breloc_cupa_mondiala_1.jpg", "breloc_cupa_mondiala_2.jpg"],
    specifications: {
      "Tip": "FDM Dual-Color",
      "Material": "PLA Silk",
      "Înălțime": "65 mm"
    },
    materials: ["PLA Silk (Mătăsos)"],
    colors: [
      { name: "Auriu & Verde", hex: "#FFD700" }
    ],
    productionTime: "1 zi",
    dimensions: "25 x 25 x 65 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_3",
    name: "Breloc Sylvester Looney Tunes",
    slug: "breloc-sylvester-looney-tunes",
    description: "Breloc haios cu faimosul motan Sylvester din desenele animate Looney Tunes. Printat multi-color cu detalii precise și nas roșu accentuat.",
    shortDescription: "Breloc Sylvester din desenele Looney Tunes printat multicolor.",
    price: 15,
    category: "Brelocuri",
    rating: 4.7,
    reviewCount: 34,
    images: ["breloc_sylvester.jpg"],
    specifications: {
      "Tip": "FDM Multicolor",
      "Material": "PLA Premium",
      "Înălțime": "55 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Multicolor", hex: "#000000" }
    ],
    productionTime: "1-2 zile",
    dimensions: "35 x 30 x 55 mm",
    popular: false,
    recommended: true
  },
  {
    id: "p6_4",
    name: "Breloc Cubone",
    slug: "breloc-cubone-pokemon",
    description: "Breloc craniu Pokemon Cubone stilizat. Realizat prin printare 3D de mare precizie, cu textură osoasă realistă.",
    shortDescription: "Breloc craniu Cubone Pokemon cu aspect osos natural.",
    price: 15,
    category: "Brelocuri",
    rating: 4.8,
    reviewCount: 79,
    images: ["breloc_cubone_1.jpg", "breloc_cubone_2.jpg", "breloc_cubone_3.jpg"],
    specifications: {
      "Tip": "FDM Mat",
      "Material": "PLA Premium",
      "Înălțime": "45 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Alb Os", hex: "#F5F5DC" }
    ],
    productionTime: "1 zi",
    dimensions: "35 x 40 x 45 mm",
    popular: true,
    recommended: false
  },
  {
    id: "p6_5",
    name: "Breloc Garfield",
    slug: "breloc-garfield",
    description: "Breloc adorabil înfățișându-l pe leneșul cotoi Garfield. Realizat cu filamente portocaliu și negru premium, ideal pentru chei sau ghiozdan.",
    shortDescription: "Breloc drăguț cu pisica Garfield printată multicolor 3D.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 58,
    images: ["breloc_garfield.jpg"],
    specifications: {
      "Tip": "FDM Multicolor",
      "Material": "PLA Premium",
      "Înălțime": "50 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Portocaliu Garfield", hex: "#FF8C2A" }
    ],
    productionTime: "1-2 zile",
    dimensions: "35 x 35 x 50 mm",
    popular: true,
    recommended: true,
    stock: 3
  },
  {
    id: "p6_6",
    name: "Breloc Delfin",
    slug: "breloc-delfin-articulat",
    description: "Breloc drăguț și flexibil în formă de delfin articulat, printat 3D din filamente albastre și albe de înaltă calitate. Are corp mobil și inel rezistent pentru chei sau ghiozdan.",
    shortDescription: "Breloc delfin articulat și flexibil printat 3D multicolor.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 35,
    images: ["breloc_delfin_1.jpg", "breloc_delfin_2.jpg", "breloc_delfin_3.jpg"],
    specifications: {
      "Tip": "FDM Articulat",
      "Material": "PLA Premium",
      "Lungime": "65 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Albastru & Alb", hex: "#00BFFF" }
    ],
    productionTime: "1 zi",
    dimensions: "65 x 30 x 25 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_7",
    name: "Breloc Greutate Olimpică 25 KG",
    slug: "breloc-greutate-olimpica-25kg",
    description: "Breloc 3D realist în formă de disc / greutate olimpică de 25 KG pentru pasionații de fitness, culturism și sala de forță. Printat dual-color cu mesaje inspiraționale ('DO YOU EVEN LIFT BRO?' pe varianta albastră și 'NO PAIN NO GAIN' pe varianta neagră).",
    shortDescription: "Breloc disc greutate olimpică 25 KG cu text 3D motivant.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 52,
    images: ["breloc_greutati_albastru_1.jpg", "breloc_greutati_albastru_2.jpg", "breloc_greutati_negru_1.jpg", "breloc_greutati_negru_2.jpg"],
    specifications: {
      "Tip": "FDM Dual-Color",
      "Material": "PLA Premium / PETG",
      "Diametru": "45 mm"
    },
    materials: ["PLA Premium", "PETG Rezistent"],
    colors: [
      { name: "Albastru (DO YOU EVEN LIFT BRO?)", hex: "#00BFFF", imageIndex: 0 },
      { name: "Negru (NO PAIN NO GAIN)", hex: "#111111", imageIndex: 2 }
    ],
    productionTime: "1 zi",
    dimensions: "45 x 45 x 6 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_8",
    name: "Breloc Furia Nopții",
    slug: "breloc-furia-noptii",
    description: "Breloc dragon Furia Nopții (Toothless) articulat și complet flexibil, inspirat din How to Train Your Dragon. Printat 3D multicolor cu corp articulat, ochi galbeni expresivi și aripioară roșie caracteristică la coadă.",
    shortDescription: "Breloc dragon Furia Nopții (Toothless) articulat printat 3D.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 84,
    images: [
      "breloc_furia_noptii_1.jpg", 
      "breloc_furia_noptii_2.jpg", 
      "breloc_furia_noptii_3.jpg",
      "breloc_furia_luminilor_1.jpg",
      "breloc_furia_luminilor_2.jpg"
    ],
    specifications: {
      "Tip": "FDM Multicolor Articulat",
      "Material": "PLA Premium",
      "Lungime": "75 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Negru & Roșu (Furia Nopții)", hex: "#111111", imageIndex: 0 },
      { name: "Alb & Albastru (Furia Luminilor)", hex: "#FFFFFF", imageIndex: 3 }
    ],
    productionTime: "1 zi",
    dimensions: "75 x 45 x 25 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_9",
    name: "Breloc Orca",
    slug: "breloc-orca-articulat",
    description: "Breloc balenă Orca articulată și flexibilă, printată 3D dual-color din filamente negru și alb premium. Design anatomic detaliat cu corp din mai multe segmente mobile.",
    shortDescription: "Breloc balenă Orca articulată printată 3D dual-color.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 41,
    images: ["breloc_orca_1.jpg", "breloc_orca_2.jpg"],
    specifications: {
      "Tip": "FDM Dual-Color Articulat",
      "Material": "PLA Premium",
      "Lungime": "70 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Negru & Alb", hex: "#111111" }
    ],
    productionTime: "1 zi",
    dimensions: "70 x 35 x 25 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_10",
    name: "Breloc Poodle Cățeluș",
    slug: "breloc-poodle-catelus",
    description: "Breloc adorabil în formă de cățeluș Poodle printat 3D multicolor din filament alb imaculat cu detalii expresive la ochi, nas și lăpuțe. Un cadou ideal pentru iubitorii de animale de companie.",
    shortDescription: "Breloc drăguț cu cățeluș Poodle printat 3D multicolor.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 37,
    images: ["breloc_poodle_1.jpg"],
    specifications: {
      "Tip": "FDM Multicolor",
      "Material": "PLA Premium",
      "Înălțime": "55 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Alb cu detalii", hex: "#FFFFFF" }
    ],
    productionTime: "1 zi",
    dimensions: "35 x 30 x 55 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_11",
    name: "Breloc Mini Poodle",
    slug: "breloc-mini-poodle",
    description: "Breloc mini în formă de cățeluș Poodle negru, printat 3D multicolor cu lăpuțe roz adorabile, limba scoasă și inel de chei integrat.",
    shortDescription: "Breloc mini cățeluș Poodle negru cu lăpuțe roz.",
    price: 10,
    category: "Brelocuri",
    rating: 4.8,
    reviewCount: 29,
    images: ["breloc_mini_poodle_1.jpg"],
    specifications: {
      "Tip": "FDM Multicolor",
      "Material": "PLA Premium",
      "Înălțime": "40 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Negru & Roz", hex: "#111111" }
    ],
    productionTime: "1 zi",
    dimensions: "25 x 20 x 40 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_12",
    name: "Breloc Rechin",
    slug: "breloc-rechin-articulat",
    description: "Breloc rechin articulat și complet flexibil, printat 3D din filamente gri și alb premium. Corp articulat din mai multe segmente mobile, burta albă și ochi expresivi.",
    shortDescription: "Breloc rechin articulat și flexibil printat 3D.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 46,
    images: ["breloc_rechin_1.jpg", "breloc_rechin_2.jpg", "breloc_rechin_3.jpg"],
    specifications: {
      "Tip": "FDM Dual-Color Articulat",
      "Material": "PLA Premium",
      "Lungime": "70 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Gri & Alb", hex: "#808080" }
    ],
    productionTime: "1 zi",
    dimensions: "70 x 35 x 25 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_13",
    name: "Breloc Rechin Ciocan",
    slug: "breloc-rechin-ciocan",
    description: "Breloc rechin ciocan articulat și complet flexibil, printat 3D din filamente albastru deschis și alb. Are model cu buline albe pe spate, burta albă, corp segmentat mobil și inel rezistent pentru chei.",
    shortDescription: "Breloc rechin ciocan articulat printat 3D cu buline albe.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 33,
    images: ["breloc_rechin_ciocan_1.jpg", "breloc_rechin_ciocan_2.jpg", "breloc_rechin_ciocan_3.jpg"],
    specifications: {
      "Tip": "FDM Multicolor Articulat",
      "Material": "PLA Premium",
      "Lungime": "70 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Albastru & Alb cu buline", hex: "#00BFFF" }
    ],
    productionTime: "1 zi",
    dimensions: "70 x 40 x 25 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_14",
    name: "Breloc Broască Țestoasă",
    slug: "breloc-broasca-testoasa",
    description: "Breloc broască țestoasă de mare articulată și complet flexibilă, printată 3D din filamente verde și alb premium. Design cu carapace dungată albă, înotătoare mobile texturate și ochi expresivi.",
    shortDescription: "Breloc broască țestoasă de mare articulată printată 3D multicolor.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 58,
    images: ["breloc_broasca_testoasa_1.jpg", "breloc_broasca_testoasa_2.jpg", "breloc_broasca_testoasa_3.jpg"],
    specifications: {
      "Tip": "FDM Multicolor Articulat",
      "Material": "PLA Premium",
      "Lungime": "65 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Verde & Alb", hex: "#00FF7F" }
    ],
    productionTime: "1 zi",
    dimensions: "65 x 50 x 20 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_15",
    name: "Breloc Tweety Looney Tunes",
    slug: "breloc-tweety-looney-tunes",
    description: "Breloc simpatic cu faimosul puișor Tweety Bird din desenele animate Looney Tunes. Printat 3D multicolor din filamente galben intens, portocaliu și albastru, cu detalii expresive la ochi și cioc.",
    shortDescription: "Breloc Tweety Bird din Looney Tunes printat 3D multicolor.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 48,
    images: ["breloc_tweety.jpg"],
    specifications: {
      "Tip": "FDM Multicolor",
      "Material": "PLA Premium",
      "Înălțime": "55 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Galben & Portocaliu", hex: "#FFD700" }
    ],
    productionTime: "1 zi",
    dimensions: "35 x 30 x 55 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_16",
    name: "Breloc Văcuță Articulată",
    slug: "breloc-vacuta-articulata",
    description: "Breloc văcuță articulată și complet flexibilă, printată 3D din filamente alb, negru și roz vibrant. Prezintă pete negre caracteristice, botic și cornițe roz drăguțe, corp mobil din segmente articulate și inel metalic pentru chei.",
    shortDescription: "Breloc văcuță articulată și flexibilă printată 3D multicolor.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 54,
    images: ["breloc_vacuta_1.jpg", "breloc_vacuta_2.jpg", "breloc_vacuta_3.jpg"],
    specifications: {
      "Tip": "FDM Multicolor Articulat",
      "Material": "PLA Premium",
      "Lungime": "65 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Alb, Negru & Roz", hex: "#FFFFFF" }
    ],
    productionTime: "1 zi",
    dimensions: "65 x 35 x 25 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_17",
    name: "Breloc Poză Custom (Litofanie 3D)",
    slug: "breloc-poza-custom-litofanie",
    description: "Breloc magic 3D personalizat cu fotografia ta preferată (Litofanie 3D)! La lumină naturală sau artificială, poza celor dragi apare în detalii spectaculoase. Cadou emoționant și unic pentru aniversări, familie sau persoana iubită.",
    shortDescription: "Breloc litofanie 3D personalizat cu poza ta preferată.",
    price: 20,
    category: "Brelocuri",
    rating: 5.0,
    reviewCount: 89,
    images: ["breloc_poza_custom_1.jpg"],
    specifications: {
      "Tehnologie": "Litofanie 3D High-Detail",
      "Material": "PLA Premium (Alb Special Opacitate)",
      "Format recomandat": "Foto portret sau peisaj",
      "Inel chei": "Inclus, oțel inoxidabil"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Alb Litofanie", hex: "#FAF9F6" }
    ],
    productionTime: "1-2 zile",
    dimensions: "35 x 4 x 50 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_18",
    name: "Breloc Elefant Articulat",
    slug: "breloc-elefant-articulat",
    description: "Breloc elefănțel articulat și flexibil, drăgălaș și foarte simpatic! Printat 3D din filament gri mat de înaltă calitate, cu corp din segmente mobile și inel rezistent pentru chei.",
    shortDescription: "Breloc elefănțel articulat și flexibil printat 3D.",
    price: 15,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 64,
    images: ["breloc_elefant_1.jpg", "breloc_elefant_2.jpg", "breloc_elefant_3.jpg"],
    specifications: {
      "Tip printare": "FDM Articulat",
      "Material": "PLA Premium",
      "Lungime": "55 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Gri Mat", hex: "#808080" }
    ],
    productionTime: "1 zi",
    dimensions: "55 x 30 x 25 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_19",
    name: "Breloc Harry Potter 3D",
    slug: "breloc-harry-potter-3d",
    description: "Breloc 3D super simpatic inspirat de Harry Potter! Printat 3D multicolor cu detalii miniaturale impecabile: ochelari rotunzi, cicatricea în formă de fulger, baghetă magică și fularul caracteristic Gryffindor.",
    shortDescription: "Breloc mini Harry Potter 3D multicolor cu baghetă și fular Gryffindor.",
    price: 10,
    category: "Brelocuri",
    rating: 4.9,
    reviewCount: 98,
    images: ["breloc_harry_potter_1.jpg"],
    specifications: {
      "Tip printare": "FDM Multicolor",
      "Material": "PLA Premium",
      "Înălțime": "50 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Multicolor", hex: "#111111" }
    ],
    productionTime: "1 zi",
    dimensions: "35 x 10 x 50 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p6_20",
    name: "Breloc Custom Inimioară cu Nume 3D",
    slug: "breloc-custom-inimioara-cu-nume-3d",
    description: "Breloc dublu romantic și personalizat cu inimioară 3D și etichetă cu nume la alegere (numele tău sau al persoanei iubite)! Printat 3D din filamente cyan și alb, fiind cadoul ideal pentru cupluri, aniversări sau prieteni dragi.",
    shortDescription: "Breloc dublu 3D personalizat cu inimioară și nume gravat.",
    price: 15,
    category: "Brelocuri",
    rating: 5.0,
    reviewCount: 72,
    images: ["breloc_custom_inimioara_1.jpg", "breloc_custom_inimioara_2.jpg"],
    specifications: {
      "Tip printare": "FDM Dual Charm Custom",
      "Material": "PLA Premium",
      "Personalizare": "Text / Nume la alegere"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Cyan & Alb", hex: "#00BFFF" }
    ],
    productionTime: "1 zi",
    dimensions: "45 x 15 x 60 mm",
    popular: true,
    recommended: true
  },

  // Pusculite
  {
    id: "p7",
    name: "Pușculiță Astronaut 3D",
    slug: "pusculita-astronaut-3d",
    description: "Salvează-ți economiile într-un mod cosmic! Această pușculiță în formă de astronaut drăguț are o fantă discretă în spate și un dop filetat securizat la bază pentru golire ușoară.",
    shortDescription: "Pușculiță în formă de astronaut, decorativă și funcțională.",
    price: 85,
    category: "Pușculițe",
    rating: 4.8,
    reviewCount: 47,
    images: ["pusculita_astronaut_1"],
    specifications: {
      "Capacitate": "Aproximativ 250 monede",
      "Sistem deschidere": "Capac filetat la bază",
      "Material": "PLA Premium (Non-toxic)"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Alb Sclipitor", hex: "#FFFFFF" },
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" },
      { name: "Albastru Cosmic", hex: "#1D2C54" }
    ],
    productionTime: "3 zile",
    dimensions: "140 x 130 x 190 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p8",
    name: "Pușculiță Purceluș Poligonal cu Nume",
    slug: "pusculita-purcelus-poligonal-personalizata",
    description: "Versiunea modernă a clasicului purceluș de economii. Design low-poly elegant, personalizat cu numele copilului tău pe lateral prin imprimare dual-color.",
    shortDescription: "Purceluș de economii low-poly, personalizat cu nume.",
    price: 75,
    category: "Pușculițe",
    rating: 4.9,
    reviewCount: 64,
    images: ["pusculita_porc_1"],
    specifications: {
      "Sistem deschidere": "Dop din cauciuc/plastic flexibil",
      "Material": "PLA Tough",
      "Opțiune": "Text 3D pe lateral integrat"
    },
    materials: ["PLA Premium", "PLA Tough"],
    colors: [
      { name: "Roz Pastel", hex: "#FFD1DC" },
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" },
      { name: "Negru Carbon", hex: "#1F1F1F" }
    ],
    productionTime: "2-3 zile",
    dimensions: "160 x 110 x 120 mm",
    popular: false,
    recommended: true
  },

  // Jucării
  {
    id: "p9",
    name: "Figurină Cthulhu Articulată",
    slug: "figurina-cthulhu-articulata",
    description: "O figurină legendară extrem de complexă, cu toate tentaculele și articulațiile complet mobile direct din print! O minune a ingineriei 3D pe care o poți așeza în zeci de ipostaze.",
    shortDescription: "Figurină Cthulhu complet articulată, printată dintr-o singură bucată.",
    price: 90,
    category: "Jucării",
    categories: ["Jucării", "Cadouri personalizate"],
    rating: 4.9,
    reviewCount: 88,
    images: ["figurina_cthulhu_1"],
    specifications: {
      "Articulații": "Active (peste 20 puncte de mișcare)",
      "Suport": "Nu necesită asamblare",
      "Material": "PLA Silk Magic (schimbă culoarea din diferite unghiuri)"
    },
    materials: ["PLA Silk (Mătăsos)", "PLA Premium"],
    colors: [
      { name: "Verde Smarald Silk", hex: "#097969" },
      { name: "Curcubeu Cameleon", hex: "#7F00FF" },
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" },
      { name: "Negru Obsidian", hex: "#0b0c10" }
    ],
    productionTime: "3 zile",
    dimensions: "180 x 150 x 80 mm",
    popular: true,
    recommended: true
  },

  // Logo-uri 3D
  {
    id: "p10",
    name: "Logo de Birou Personalizat (Desk Logo)",
    slug: "logo-birou-personalizat-firma",
    description: "Adu-ți brandul în lumea reală. Logo-ul firmei tale transpus într-un model 3D stabil pentru birou sau recepție. Structură profesională, multi-strat, cu detalii impecabile.",
    shortDescription: "Logo-ul sau numele firmei tale, printat 3D tridimensional pentru birou.",
    price: 120,
    category: "Proiecte speciale",
    rating: 5.0,
    reviewCount: 52,
    images: ["logo_birou_1"],
    specifications: {
      "Tip fișier necesar": "Vectorial (.SVG / .EPS / .AI)",
      "Finisaj": "Satinat / Mat premium",
      "Stabilitate": "Talpă îngreunată integrată"
    },
    materials: ["PLA Tough", "PETG Rezistent"],
    colors: [
      { name: "Negru Mat", hex: "#111111" },
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" },
      { name: "Argintiu Aluminiu", hex: "#A5A9B4" },
      { name: "Alb Titan", hex: "#FAF9F6" }
    ],
    productionTime: "3-4 zile",
    dimensions: "220 x 40 x 100 mm (variabil în funcție de logo)",
    popular: true,
    recommended: true
  },
  {
    id: "p11",
    name: "Logo de Perete cu Iluminare LED Smart",
    slug: "logo-perete-iluminare-led-smart",
    description: "Logo gigant de perete iluminat din spate cu bandă LED RGB controlabilă prin telefon sau telecomandă. Creează o atmosferă futuristă în showroom-ul sau biroul tău. Mascota 3D se mândrește cu acest produs de top!",
    shortDescription: "Logo 3D iluminat din spate cu LED RGB controlabil prin Wi-Fi.",
    price: 450,
    category: "Proiecte speciale",
    rating: 4.9,
    reviewCount: 23,
    images: ["logo_led_1", "logo_led_2"],
    specifications: {
      "Iluminare": "Banda LED RGBW 5V (USB sau Adaptor priză)",
      "Sistem": "Aplicație Smart Home / Telecomandă",
      "Montare": "Agățătoare ascunse incluse"
    },
    materials: ["PETG Semitransparent (difuzie lumină)", "PLA Tough (structură)"],
    colors: [
      { name: "Negru Carbon + Difuzor Alb", hex: "#111111" },
      { name: "Portocaliu + Difuzor Alb", hex: "#FF8C2A" }
    ],
    productionTime: "5-7 zile",
    dimensions: "400 x 400 x 35 mm (personalizabil)",
    popular: true,
    recommended: true
  },

  // Auto
  {
    id: "p12",
    name: "Suport Modular de Birou Premium",
    slug: "suport-modular-birou-premium",
    description: "Organizator minimalist inspirat din designul Apple. Are compartimente magnetice pentru stilouri, carduri, agrafe și un dock special pentru telefon cu canal ascuns pentru cablu.",
    shortDescription: "Organizator de birou premium, modular și magnetic.",
    price: 95,
    category: "Auto",
    rating: 4.8,
    reviewCount: 76,
    images: ["organizator_birou_1"],
    specifications: {
      "Sistem": "Fixare magnetică între module",
      "Module": "4 piese repoziționabile",
      "Material": "PLA carbon-filled sau PLA Tough"
    },
    materials: ["PLA Tough", "Carbon Fiber PETG"],
    colors: [
      { name: "Negru Carbon", hex: "#1C1C1C" },
      { name: "Gri Space", hex: "#5A5D64" },
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" }
    ],
    productionTime: "2-3 zile",
    dimensions: "240 x 120 x 80 mm",
    popular: true,
    recommended: false
  },
  {
    id: "p13",
    name: "Suport Organizare Cabluri Sub Birou",
    slug: "suport-organizare-cabluri-sub-birou",
    description: "Clipsuri rezistente de ghidaj pentru cabluri, cu prindere prin șuruburi sau bandă dublu-adezivă puternică. Scapă de dezordinea de sub birou rapid.",
    shortDescription: "Set de 5 clipsuri rezistente pentru cable management.",
    price: 30,
    category: "Auto",
    rating: 4.7,
    reviewCount: 154,
    images: ["organizator_cabluri_1"],
    specifications: {
      "Pachet": "5 bucăți + bandă adezivă 3M inclusă",
      "Material": "PETG Ultra-Rezistent (flexibilitate mare)",
      "Capacitate": "Până la 4 cabluri groase per clips"
    },
    materials: ["PETG Rezistent"],
    colors: [
      { name: "Negru Mat", hex: "#111111" },
      { name: "Alb Glossy", hex: "#FFFFFF" }
    ],
    productionTime: "1 zi",
    dimensions: "40 x 25 x 15 mm (fiecare)",
    popular: false,
    recommended: true
  },

  // Cadouri Personalizate
  {
    id: "p14",
    name: "Lampa Litofanie Personalizată (Lumină și Amintiri)",
    slug: "lampa-litofanie-personalizata-fotografie",
    description: "O lampă magică ce pare o simplă placă albă texturată, dar când o aprinzi, lumina din spate dezvăluie o fotografie extrem de detaliată a celor dragi. Un cadou de nuntă sau aniversare cu totul deosebit.",
    shortDescription: "Lampă LED personalizată cu fotografia ta transpusă în relief 3D.",
    price: 160,
    category: "Cadouri personalizate",
    categories: ["Ornamente", "Cadouri personalizate"],
    rating: 4.9,
    reviewCount: 104,
    images: ["cadou_lampa_1", "cadou_lampa_2"],
    specifications: {
      "Tehnologie": "Litofanie 3D (grosime strat 0.1 mm)",
      "Iluminare": "Soclu LED 220V cu întrerupător inclus",
      "Format poză": "Recomandat raport 4:3 portret sau peisaj"
    },
    materials: ["PLA Premium (Alb Special Opacitate)"],
    colors: [
      { name: "Bază Lemn / Structură Neagră", hex: "#111111" }
    ],
    productionTime: "3-4 zile",
    dimensions: "150 x 110 x 180 mm",
    popular: true,
    recommended: true
  },

  // Proiecte speciale
  {
    id: "p15",
    name: "Proiect Unicat la Comandă (Serviciu Printare)",
    slug: "proiect-unicat-comanda-printare",
    description: "Ai o idee trăsnită sau un fișier 3D descărcat (.STL, .OBJ, .STEP)? Noi îl transformăm în realitate! Alege acest serviciu pentru a obține o cotație personalizată de la inginerii noștri. Mascota 3D va monitoriza procesul!",
    shortDescription: "Comandă specială cu preț estimativ. Trimite-ne fișierul tău pentru cotație.",
    price: 1, // Base price, custom quote
    category: "Proiecte speciale",
    rating: 5.0,
    reviewCount: 45,
    images: ["proiect_special_1"],
    specifications: {
      "Formate suportate": ".STL, .OBJ, .3MF, .STEP, .IGES",
      "Volume de printare": "Până la 350x350x350 mm per bucată",
      "Materiale": "PLA, PETG, ABS, ASA, TPU (Flexibil), PC, Carbon-PETG"
    },
    materials: ["PLA Premium", "PETG Rezistent", "ABS Industrial", "TPU Flexibil", "Carbon Fiber PETG"],
    colors: [
      { name: "Configurabil la cerere", hex: "#FF8C2A" }
    ],
    productionTime: "Calculat în funcție de proiect",
    dimensions: "La cerere",
    popular: false,
    recommended: true
  },
  // Brelocuri aditionale
  {
    id: "p5_2",
    name: "Breloc Marvel Shield Captain America",
    slug: "breloc-marvel-shield-captain-america",
    description: "Breloc din metal plasticizat, rezistent la zgârieturi, cu designul scutului Captain America printat multicolor.",
    shortDescription: "Breloc scut Captain America printat 3D tridimensional.",
    price: 20,
    category: "Brelocuri",
    rating: 4.8,
    reviewCount: 45,
    images: ["breloc_cap_1"],
    specifications: {
      "Rezoluție": "0.15 mm",
      "Material": "PLA Silk"
    },
    materials: ["PLA Silk (Mătăsos)"],
    colors: [
      { name: "Roșu Translucid", hex: "#E60000" },
      { name: "Albastru Electric", hex: "#0000FF" },
      { name: "Argintiu Cosmic", hex: "#C0C0C0" }
    ],
    productionTime: "1 zi",
    dimensions: "45 x 45 x 5 mm",
    popular: false,
    recommended: false
  },
  // Pusculite aditionale
  {
    id: "p7_2",
    name: "Pușculiță Minecraft Block cu Lacăt",
    slug: "pusculita-minecraft-block-lacat",
    description: "O pușculiță cubică inspirată din faimoasele blocuri din jocul Minecraft. Dispune de o încuietoare 3D funcțională și o cheie printată.",
    shortDescription: "Pușculiță cubică Minecraft block cu cheie și lacăt 3D.",
    price: 80,
    category: "Pușculițe",
    rating: 4.7,
    reviewCount: 39,
    images: ["pusculita_minecraft_1"],
    specifications: {
      "Sistem": "Încuietoare mecanică",
      "Material": "PLA Tough"
    },
    materials: ["PLA Tough"],
    colors: [
      { name: "Verde Neon", hex: "#39FF14" },
      { name: "Negru Mat", hex: "#111111" }
    ],
    productionTime: "2-3 zile",
    dimensions: "120 x 120 x 120 mm",
    popular: false,
    recommended: false
  },
  {
    id: "p9_2",
    name: "Figurină Geralt of Rivia (The Witcher)",
    slug: "figurina-geralt-of-rivia-witcher",
    description: "Figurină de colecție din rășină de înaltă rezoluție, cu detalii excepționale ale armurii și săbiilor. Ideală pentru pasionații de gaming.",
    shortDescription: "Figurină The Witcher Geralt printată SLA la rezoluție înaltă.",
    price: 180,
    category: "Jucării",
    categories: ["Jucării", "Cadouri personalizate"],
    rating: 4.9,
    reviewCount: 57,
    images: ["figurina_witcher_1"],
    specifications: {
      "Material": "Rășină Ultra-Detailată",
      "Înălțime": "180 mm"
    },
    materials: ["Rășină Ultra-Detailată"],
    colors: [
      { name: "Gri Carbon", hex: "#5A5D64" }
    ],
    productionTime: "4 zile",
    dimensions: "90 x 90 x 180 mm",
    popular: true,
    recommended: false
  },
  {
    id: "p9_3",
    name: "Figurină Pikachu Thor 3D",
    slug: "figurina-pikachu-thor-3d",
    description: "Figurină de colecție spectaculoasă printată 3D multicolor înfățișându-l pe Pikachu costumat în Thor, Dumnezeul Tunetului! Detalii excepționale: pelerină roșie, armură, coif și ciocanul legendar Mjolnir.",
    shortDescription: "Figurină de colecție 3D multicoloră Pikachu Thor cu ciocan Mjolnir.",
    price: 120,
    category: "Jucării",
    categories: ["Jucării", "Cadouri personalizate"],
    rating: 4.9,
    reviewCount: 112,
    images: ["figurina_pikachu_1.jpg", "figurina_pikachu_2.jpg", "figurina_pikachu_3.jpg"],
    specifications: {
      "Tip": "FDM Multicolor Premium",
      "Material": "PLA Premium",
      "Înălțime": "150 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Multicolor", hex: "#FFD700" }
    ],
    productionTime: "2-3 zile",
    dimensions: "110 x 90 x 150 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p9_4",
    name: "Figurină KAWS 3D",
    slug: "figurina-kaws-3d",
    description: "Figurină de colecție KAWS iconică, cu înălțimea de 30 cm, realizată prin printare 3D de înaltă precizie. Un obiect de artă urbană și decor contemporan ideal pentru birou, living sau colecționari.",
    shortDescription: "Figurină de colecție KAWS 3D cu înălțimea de 30 cm.",
    price: 100,
    category: "Jucării",
    categories: ["Jucării", "Cadouri personalizate"],
    rating: 5.0,
    reviewCount: 76,
    images: ["figurina_kaws_1.jpg", "figurina_kaws_2.jpg"],
    specifications: {
      "Tip printare": "FDM Precision Mat",
      "Material": "PLA Premium Matte",
      "Înălțime": "30 cm (300 mm)"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Gri Mat", hex: "#808080" }
    ],
    productionTime: "2-3 zile",
    dimensions: "120 x 100 x 300 mm (30 cm)",
    popular: true,
    recommended: true
  },
  {
    id: "p9_5",
    name: "Figurină Six7 Articulată 3D",
    slug: "figurina-six7-articulata-3d",
    description: "Figurină amuzantă și unică 'Six7' (67) cu mâini, picioare și ochi de desen animat, printată 3D în culori vibrante de albastru și alb. Picioarele și mâinile sunt flexibile/articulate, perfectă ca decor de birou sau cadou amuzant.",
    shortDescription: "Figurină amuzantă 67 cu membre articulate și ochi cartoon.",
    price: 35,
    category: "Jucării",
    categories: ["Jucării", "Cadouri personalizate"],
    rating: 4.9,
    reviewCount: 43,
    images: ["figurina_six7_1.jpg"],
    specifications: {
      "Tip printare": "FDM Multicolor Articulat",
      "Material": "PLA Premium",
      "Înălțime": "120 mm"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Albastru & Alb", hex: "#00BFFF" }
    ],
    productionTime: "1-2 zile",
    dimensions: "90 x 50 x 120 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p9_6",
    name: "Sabie Trollhunters 3D (Sword of Daylight)",
    slug: "sabie-trollhunters-3d-sword-of-daylight",
    description: "Machetă / replica 3D spectaculoasă a sabiei Daylight din seria Trollhunters, cu lungimea de 25 cm. Printată 3D în culori mătăsoase de argint, albastru cyan și auriu, fiind piesa ideală de colecție, cosplay sau decor pentru pasionați.",
    shortDescription: "Machetă sabie Trollhunters Daylight 3D de 25 cm.",
    price: 35,
    category: "Jucării",
    categories: ["Jucării", "Cadouri personalizate"],
    rating: 4.9,
    reviewCount: 61,
    images: ["sabie_trollhunters_1.jpg"],
    specifications: {
      "Tip printare": "FDM Silk Multi-Color",
      "Material": "PLA Silk Premium",
      "Lungime": "25 cm (250 mm)"
    },
    materials: ["PLA Silk (Mătăsos)"],
    colors: [
      { name: "Argintiu, Cyan & Auriu", hex: "#C0C0C0" }
    ],
    productionTime: "1-2 zile",
    dimensions: "80 x 25 x 250 mm (25 cm)",
    popular: true,
    recommended: true
  },
  {
    id: "p9_7",
    name: "Amuletă Trollhunters Amulet of Daylight 3D",
    slug: "amuleta-trollhunters-amulet-of-daylight-3d",
    description: "Replica 3D fidelă a faimoasei amulete 'Amulet of Daylight' din seria Trollhunters! Detalii sculptate tridimensionale, mecanisme cu roți dințate, rune gravate în relief pe față și pe spate și nucleu albastru cyan radiant.",
    shortDescription: "Amuletă 3D de colecție Trollhunters Amulet of Daylight cu detalii metalice.",
    price: 60,
    category: "Jucării",
    categories: ["Jucării", "Cadouri personalizate", "Proiecte speciale"],
    rating: 5.0,
    reviewCount: 84,
    images: ["amuleta_trollhunters_1.jpg", "amuleta_trollhunters_2.jpg"],
    specifications: {
      "Tip printare": "FDM Ultra-Detail",
      "Material": "PLA Metallic & Silk",
      "Diametru": "120 mm"
    },
    materials: ["PLA Silk (Mătăsos)", "PLA Premium"],
    colors: [
      { name: "Argintiu Metalic & Cyan", hex: "#C0C0C0" }
    ],
    productionTime: "2 zile",
    dimensions: "120 x 120 x 25 mm",
    popular: true,
    recommended: true
  },

  // Logo-uri 3D aditionale
  {
    id: "p10_2",
    name: "Logo Perete Gaming Room LED",
    slug: "logo-perete-gaming-room-led",
    description: "Logo personalizat de perete cu design controller gaming și bandă LED inclusă, pentru decorul spațiului tău de joc.",
    shortDescription: "Logo 3D controller gaming cu iluminare LED.",
    price: 240,
    category: "Proiecte speciale",
    rating: 4.9,
    reviewCount: 31,
    images: ["logo_gaming_led_1"],
    specifications: {
      "Iluminare": "LED USB 5V",
      "Montare": "Agățătoare integrate"
    },
    materials: ["PLA Premium", "PETG Semitransparent"],
    colors: [
      { name: "Negru Mat", hex: "#111111" },
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" }
    ],
    productionTime: "3-4 zile",
    dimensions: "300 x 200 x 25 mm",
    popular: false,
    recommended: false
  },
  // Auto aditionale
  {
    id: "p12_2",
    name: "Suport Organizator Scule de Perete",
    slug: "suport-organizator-scule-perete",
    description: "Organizator ultra-rezistent pentru clești, șurubelnițe și accesorii de atelier, cu fixare pe panou sau direct pe perete.",
    shortDescription: "Organizator robust de perete pentru scule și unelte.",
    price: 65,
    category: "Auto",
    rating: 4.8,
    reviewCount: 42,
    images: ["organizator_scule_1"],
    specifications: {
      "Material": "PETG Rezistent",
      "Montare": "Șuruburi incluse"
    },
    materials: ["PETG Rezistent"],
    colors: [
      { name: "Negru Carbon", hex: "#1C1C1C" },
      { name: "Portocaliu gtreiD", hex: "#FF8C2A" }
    ],
    productionTime: "2 zile",
    dimensions: "280 x 80 x 60 mm",
    popular: false,
    recommended: false
  },
  // Cadouri personalizate aditionale
  {
    id: "p14_2",
    name: "Hologramă 3D Gravată în Relief",
    slug: "holograma-3d-gravata-relief",
    description: "Tablou 3D gravat pe baza unei imagini 2D, care utilizează efecte optice tridimensionale sub incidența luminii.",
    shortDescription: "Gravură 3D pe placă iluminată cu suport de lemn.",
    price: 140,
    category: "Cadouri personalizate",
    rating: 4.9,
    reviewCount: 28,
    images: ["cadou_holograma_1"],
    specifications: {
      "Tehnologie": "Gravură aditivă relief",
      "Suport": "Lemn masiv cu LED"
    },
    materials: ["PLA Premium", "Rășină Ultra-Detailată"],
    colors: [
      { name: "Alb Sclipitor", hex: "#FFFFFF" }
    ],
    productionTime: "3 zile",
    dimensions: "150 x 150 x 20 mm",
    popular: false,
    recommended: false
  },
  {
    id: "p14_3",
    name: "Lampă Lună 3D Personalizată cu Mesaj",
    slug: "lampa-luna-3d-personalizata-mesaj",
    description: "O reproducere tridimensională exactă a Lunii pe baza datelor NASA, personalizată cu un text sau un desen discret gravat pe suprafață.",
    shortDescription: "Lampă Lună 3D cu text personalizat și telecomandă.",
    price: 190,
    category: "Cadouri personalizate",
    categories: ["Ornamente", "Cadouri personalizate"],
    rating: 5.0,
    reviewCount: 68,
    images: ["cadou_luna_1"],
    specifications: {
      "Sursa": "Baterie reîncărcabilă USB",
      "Diametru": "150 mm",
      "Culori LED": "16 culori controlabile prin telecomandă"
    },
    materials: ["PLA Premium (Alb Special)"],
    colors: [
      { name: "Alb Sclipitor", hex: "#FFFFFF" }
    ],
    productionTime: "3-4 zile",
    dimensions: "150 x 150 x 150 mm",
    popular: true,
    recommended: true
  },
  // Proiecte speciale aditionale
  {
    id: "p15_2",
    name: "Prototip Industrial Piesă Mecanică complexă",
    slug: "prototip-industrial-piesa-mecanica-complexa",
    description: "Proiectare și printare piese de schimb industriale sau angrenaje complexe cu toleranțe stricte și rezistență la solicitări mari.",
    shortDescription: "Prototip structural printat 3D din material industrial.",
    price: 350,
    category: "Proiecte speciale",
    rating: 5.0,
    reviewCount: 19,
    images: ["prototip_mecanic_1"],
    specifications: {
      "Material": "Carbon Fiber PETG / Nylon",
      "Toleranță": "±0.1 mm"
    },
    materials: ["Carbon Fiber PETG", "ABS Industrial"],
    colors: [
      { name: "Negru Carbon", hex: "#1C1C1C" }
    ],
    productionTime: "4-5 zile",
    dimensions: "Variabilă",
    popular: false,
    recommended: false
  },
  {
    id: "p15_3",
    name: "Machetă Relief Topografic (Teren 3D)",
    slug: "macheta-relief-topografic-teren-3d",
    description: "Machetă tridimensională reprezentând o hartă topografică a unui teren real, ideală pentru proiecte de geologie sau imobiliare.",
    shortDescription: "Hartă de relief tridimensională printată 3D.",
    price: 490,
    category: "Proiecte speciale",
    rating: 4.9,
    reviewCount: 12,
    images: ["relief_topografic_1"],
    specifications: {
      "Material": "PLA Premium",
      "Sursa date": "Fișiere GIS / DEM"
    },
    materials: ["PLA Premium"],
    colors: [
      { name: "Gri Space", hex: "#5A5D64" },
      { name: "Verde Pastel", hex: "#77DD77" }
    ],
    productionTime: "5-6 zile",
    dimensions: "300 x 300 x 80 mm",
    popular: false,
    recommended: false
  },
  {
    id: "p10_3",
    name: "Logo Custom Bridge to Unity",
    slug: "logo-custom-bridge-to-unity",
    description: "Trofeu / Logo decorativ 3D unicat 'Bridge to Unity' realizat la comandă. Structură complexă multi-strat printată 3D cu glob terestru, mări și continente în relief, mâini sculptate și arcada superioară cu textul brandului.",
    shortDescription: "Logo 3D custom de birou 'Bridge to Unity' realizat la comandă.",
    price: 1, // Preț la cerere / Solicita oferta
    category: "Proiecte speciale",
    rating: 5.0,
    reviewCount: 27,
    images: ["logo_bridge_to_unity_1.jpg", "logo_bridge_to_unity_2.jpg"],
    specifications: {
      "Tip printare": "FDM Multi-layer Multicolor",
      "Material": "PLA Premium / PETG",
      "Finisaj": "Mat satinat premium",
      "Stabilitate": "Talpă de susținere integrată"
    },
    materials: ["PLA Premium", "PETG Rezistent"],
    colors: [
      { name: "Albastru, Verde, Bej & Negru", hex: "#00BFFF" }
    ],
    productionTime: "3-4 zile",
    dimensions: "200 x 60 x 240 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p10_4",
    name: "Logo Custom Tinion Materiale de Construcții",
    slug: "logo-custom-tinion-materiale-de-constructii",
    description: "Logo de birou / recepție 3D personalizat 'TINION Materiale de Construcții' realizat la comandă. Placă de bază cu profil de acoperiș 3D în relief, text tridimensional cu litere albastre și gri pe fundal deschis.",
    shortDescription: "Logo de birou 3D personalizat 'TINION Materiale de Construcții'.",
    price: 1, // Preț la cerere / Solicita oferta
    category: "Proiecte speciale",
    rating: 5.0,
    reviewCount: 31,
    images: ["logo_tinion_1.jpg", "logo_tinion_2.jpg"],
    specifications: {
      "Tip printare": "FDM Multimaterial Dual-Color",
      "Material": "PLA Tough / PETG Rezistent",
      "Finisaj": "Satinat mat premium",
      "Utilizare": "Birou, recepție, showroom"
    },
    materials: ["PLA Tough", "PETG Rezistent"],
    colors: [
      { name: "Negru, Albastru, Gri & Bej", hex: "#00BFFF" }
    ],
    productionTime: "3-4 zile",
    dimensions: "250 x 30 x 140 mm",
    popular: true,
    recommended: true
  },
  {
    id: "p10_5",
    name: "Set Suporti Număr de Înmatriculare Slim (Față și Spate)",
    slug: "set-suporti-numar-de-inmatriculare-slim",
    description: "Set suporti de număr de înmatriculare ultra-slim fără rame vizibile (pentru plăcuțele din față și spate). Oferă mașinii un aspect curat, modern și sportiv. Realizate prin printare 3D din material rezistent la intemperii, raze UV și spălătorie auto, cu găuri ghidate pentru fixare sigură.",
    shortDescription: "Set suporti număr de înmatriculare Slim fără ramă vizibilă.",
    price: 40,
    category: "Auto",
    rating: 5.0,
    reviewCount: 43,
    images: ["suporti_numar_slim_1.jpg", "suporti_numar_slim_2.jpg", "suporti_numar_slim_3.jpg"],
    specifications: {
      "Tip printare": "FDM Industrial High-Strength",
      "Material": "PETG Rezistent UV & Șocuri",
      "Înălțime": "110 mm",
      "Conținut pachet": "Set 4 clipsuri (față + spate)"
    },
    materials: ["PETG Rezistent"],
    colors: [
      { name: "Alb / Semi-transparent", hex: "#FFFFFF" }
    ],
    productionTime: "1-2 zile",
    dimensions: "110 mm înălțime",
    popular: true,
    recommended: true
  }
];

export const products: Product[] = rawProducts
  .filter(p => 
    p.description && 
    p.description.trim() !== "" && 
    p.images && 
    p.images.length > 0 && 
    /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(p.images[0].trim())
  )
  .map(p => {
    const existingLower = new Set(p.colors.map(c => c.name.toLowerCase()));
    const missingStandard = STANDARD_COLORS.filter(c => !existingLower.has(c.name.toLowerCase()));
    return {
      ...p,
      colors: [...p.colors, ...missingStandard]
    };
  });

export const services: Service[] = [
  {
    id: "s_all",
    name: "Servicii Complete de Printare, Proiectare & Modelare 3D",
    description: "Soluție All-In-One pentru proiectul tău: de la printare FDM/SLA cu materiale industriale rezistente, transformarea fotografiilor 2D în lămpi litofanie 3D, până la piese de schimb unicat, machete arhitecturale și reverse engineering.",
    details: [
      "Printare 3D FDM & SLA: PLA Premium, PETG rezistent, ABS, ASA, TPU flexibil și Rășină ultra-detaliată",
      "Prototipare rapidă, carcase electro-mecanice și piese de schimb indisponibile pe piață",
      "Transformare fotografii 2D în lămpi litofanie 3D personalizate cu iluminat LED integrat",
      "Machete arhitecturale la scară, piese auto istorice și accesorii cosplay/scenografie unicat",
      "Proiectare CAD, reverse engineering, scanare 3D și optimizare fișiere pentru imprimare",
      "Consultanță tehnică gratuită și producție flexibilă de la piese unice la serii mici și medii"
    ],
    iconName: "Sparkles"
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "port1",
    title: "Machetă Arhitecturală Rezidențială",
    category: "Prototipare",
    description: "Am creat macheta tridimensională extrem de detaliată a unui cartier rezidențial, la scara 1:100. Peste 40 de case individuale cu texturi realiste pentru fațade.",
    beforeImage: "port_macheta_before", // Schița 2D CAD
    afterImage: "port_macheta_after",   // Macheta 3D printată și asamblată pe placă
    process: [
      "Primirea fișierelor DWG 2D de la biroul de arhitectură.",
      "Modelarea 3D și separarea pereților, acoperișurilor și geamurilor pentru printare optimizată.",
      "Printarea elementelor de bază cu PLA alb mat și a acoperișurilor cu PLA gri închis.",
      "Asamblarea manuală pe placa de suport cu vegetație simulată și iluminat LED integrat."
    ]
  },
  {
    id: "port2",
    title: "Piesă Auto de Schimb Clasic (Admisie Aer)",
    category: "Proiecte speciale",
    description: "Pentru un automobil istoric a cărui galerie de admisie de aer s-a crăpat și nu mai exista ca piesă de schimb, am scanat 3D fragmentele și am recreat piesa din material rezistent la 120°C.",
    beforeImage: "port_admisie_before", // Piesa crăpată originală
    afterImage: "port_admisie_after",   // Noua piesă printată din Carbon PETG finisată
    process: [
      "Scanarea 3D a piesei deteriorate pentru obținerea norului de puncte.",
      "Modelarea 3D inversă (Reverse Engineering) pentru recrearea geometriei exacte.",
      "Printarea de test în PLA pentru verificarea potrivirii pe motor.",
      "Printarea finală folosind Carbon Fiber PETG (rezistență structurală ridicată și stabilitate termică)."
    ]
  },
  {
    id: "port3",
    title: "Trofee Personalizate pentru Gala IT",
    category: "Proiecte speciale",
    description: "Realizarea a 50 de trofee personalizate dual-color îmbinate cu elemente transparente din plexiglas și gravate cu laser. Design inspirat de circuitele integrate.",
    beforeImage: "port_trofeu_before", // Randarea digitală a conceptului
    afterImage: "port_trofeu_after",   // Trofeul real strălucind în portocaliu și negru mat
    process: [
      "Crearea a 3 propuneri conceptuale în stil minimalist futuristic.",
      "Aprobarea modelului cu piloni înclinați și logoul galei în vârf.",
      "Printarea bazei cu infill mare (pentru greutate premium) și a logo-ului cu PLA Silk Gold.",
      "Finisarea chimică a suprafețelor pentru eliminarea completă a liniilor de strat."
    ]
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Cum să alegi materialul potrivit pentru proiectul tău 3D",
    slug: "alegere-material-potrivit-printare-3d",
    excerpt: "PLA, PETG, ABS sau TPU? Fiecare material are proprietăți unice. Află care este optim pentru rezistență, temperatură sau flexibilitate.",
    content: "Printarea 3D a evoluat enorm, iar astăzi avem acces la zeci de materiale. Cel mai popular rămâne **PLA** (Acid Polilactic), un material biodegradabil obținut din amidon de porumb. Este extrem de ușor de printat și excelent pentru decorațiuni, figurine și prototipuri vizuale. Cu toate acestea, se înmoaie la peste 55-60°C. \n\nDacă ai nevoie de o piesă care va sta în soare sau în mașină, **PETG** este alegerea optimă. Este rezistent la impact, intemperii și temperaturi de până la 80°C. Pentru piese mecanice supuse la solicitări extreme și frecare, **ABS** sau **ASA** (cu rezistență UV remarcabilă) sunt materialele ideale, deși necesită imprimante cu incintă încălzită pentru a preveni deformarea (warping).\n\nPentru aplicații care necesită elasticitate (garnituri, carcase de telefon, amortizoare), **TPU** (Poliuretan Termoplastic) se poate îndoi și întinde fără să se rupă. Echipa gtreiD folosește echipamente industriale pentru a garanta calitatea fiecărui material ales!",
    category: "Printare 3D",
    date: "15 Iunie 2026",
    readTime: "5 min",
    image: "blog_materiale",
    author: "Ing. Andrei Popescu"
  },
  {
    id: "b2",
    title: "Ghidul cadourilor personalizate: De ce obiectele 3D sunt memorabile",
    slug: "ghid-cadouri-personalizate-obiecte-3d",
    excerpt: "Un cadou de masă se uită repede. O lampă litofanie cu poza voastră sau o figurină sculptată special creează o conexiune emoțională unică.",
    content: "Sărbătorile sau aniversările aduc mereu aceeași întrebare: 'Ce cadou să cumpăr?'. Răspunsul stă în personalizare. Când oferi un obiect creat special pentru acea persoană, transmiți că ai investit timp și atenție. \n\nPrintre cele mai spectaculoase cadouri create la gtreiD se numără **lămpile litofanie**. Printate dintr-un material alb special, ele arată ca o sculptură abstractă în relief. Însă în momentul în care becul din interior se aprinde, intensitatea luminii care trece prin straturile de grosimi diferite creează o fotografie alb-negru perfectă. De asemenea, **globurile cu nume texturat** sau **figurinele personalizate** după personajul preferat din jocul video reprezintă cadouri care vor fi păstrate la loc de cinste mulți ani.",
    category: "Idei de cadouri",
    date: "10 Iunie 2026",
    readTime: "4 min",
    image: "blog_cadouri",
    author: "Elena Vasilescu (Designer)"
  },
  {
    id: "b3",
    title: "Cum funcționează modelarea 3D pentru imprimare: Sfaturi pentru începători",
    slug: "sfaturi-modelare-3d-pentru-imprimare",
    excerpt: "Pregătești un fișier pentru printare? Învață regulile esențiale despre unghiuri de înclinare, grosimi de perete și suporturi.",
    content: "Nu orice model 3D frumos pe ecran se poate printa fizic cu ușurință. Gravitația joacă un rol crucial! Când proiectezi un obiect, trebuie să ții cont de regula celor 45 de grade: orice suprafață înclinată la mai mult de 45 de grade față de verticală va avea nevoie de structuri de suport pentru a nu se prăbuși în timpul depunerii plasticului topit.\n\nDe asemenea, grosimea pereților este vitală. Pentru piese rezistente, pereții ar trebui să fie multiplu de diametrul duzei (de regulă 0.4 mm). Un perete de 1.2 mm sau 1.6 mm este mult mai rezistent decât unul de 1.0 mm deoarece imprimanta va depune straturi paralele solide în loc să încerce să completeze spații minuscule cu infill (model de umplere). \n\nÎn acest tutorial, mascota gtreiD din e-ul nostru te încurajează să folosești programe gratuite ca TinkerCAD sau Fusion360 pentru a începe călătoria ta în modelare tridimensională!",
    category: "Tutoriale",
    date: "05 Iunie 2026",
    readTime: "7 min",
    image: "blog_tutoriale",
    author: "Mascota gtreiD"
  }
];

export const faqItems: FaqItem[] = [
  {
    id: "f1",
    question: "Cum pot trimite un fișier propriu pentru printare și ce format trebuie să fie?",
    answer: "Poți încărca fișierul direct prin formularul nostru de pe site (butonul 'Solicită ofertă') sau ni-l poți trimite pe email/WhatsApp. Formatele preferate sunt .STL, .OBJ, .3MF (pentru printare standard) sau .STEP, .IGES (pentru proiectare CAD tehnică).",
    category: "Comenzi"
  },
  {
    id: "f2",
    question: "Cât timp durează realizarea unui produs?",
    answer: "Pentru produsele din catalog (brelocuri, ornamente standard), timpul este de 1-2 zile lucrătoare. Pentru figurine mari sau proiecte personalizate complexe (lămpi, logo-uri de mari dimensiuni), timpul estimat este de 3-5 zile lucrătoare. Detaliile exacte le veți primi în oferta finală.",
    category: "Livrare"
  },
  {
    id: "f3",
    question: "Care este diferența dintre materialele PLA și PETG?",
    answer: "PLA este un plastic biodegradabil obținut din resurse vegetale, fiind excelent pentru detalii de suprafață fine, modele decorative și figurine. Se deformează însă la peste 55°C. PETG este mult mai rezistent mecanic, rezistă la impact și la temperaturi de până la 80°C, fiind ideal pentru piese utilitare sau care stau în exterior.",
    category: "Tehnic"
  },
  {
    id: "f4",
    question: "Se pot printa obiecte colorate sau cu mai multe culori?",
    answer: "Da! Dispunem de sisteme multi-material care pot schimba automat până la 4-8 culori diferite în cadrul aceleiași piese. De asemenea, putem printa componente separate în culori diferite care apoi sunt asamblate manual.",
    category: "Tehnic"
  },
  {
    id: "f5",
    question: "Care sunt costurile de livrare?",
    answer: "Livrăm în toată țara prin curier rapid. Costul standard al transportului este de 19 RON, iar pentru comenzile de peste 200 RON transportul este complet gratuit. De asemenea, există opțiunea de ridicare gratuită din showroom-ul nostru.",
    category: "Livrare"
  },
  {
    id: "f6",
    question: "Ce dimensiune maximă poate avea un obiect printat 3D dintr-o singură bucată?",
    answer: "Volumul maxim de imprimare dintr-o singură bucată pe utilajele noastre este de 350 x 350 x 350 mm. Cu toate acestea, putem realiza obiecte considerabil mai mari prin segmentarea modelului în piese modulare care se îmbină perfect la asamblare.",
    category: "Tehnic"
  },
  {
    id: "f7",
    question: "Pot anula sau modifica o comandă deja plasată?",
    answer: "Pentru produsele standard din catalog, comanda poate fi anulată sau modificată în termen de 2 ore de la plasare. Pentru produsele personalizate sau proiectele unicat, comanda nu mai poate fi anulată după ce procesul fizic de modelare sau printare a fost demarat.",
    category: "Comenzi"
  }
];
