type Address = {
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode: string;
  addressCountry: string;
};

type OpeningHours = {
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
};

export function localBusinessSchema(input: {
  type?: "LocalBusiness" | "TaxiService" | "Restaurant";
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  image?: string | string[];
  priceRange?: string;
  address: Address;
  geo?: { latitude: number; longitude: number };
  openingHours?: OpeningHours[];
  sameAs?: string[];
  aggregateRating?: { ratingValue: number; reviewCount: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "LocalBusiness",
    name: input.name,
    description: input.description,
    url: input.url,
    telephone: input.telephone,
    email: input.email,
    image: input.image,
    priceRange: input.priceRange,
    address: { "@type": "PostalAddress", ...input.address },
    geo: input.geo ? { "@type": "GeoCoordinates", ...input.geo } : undefined,
    openingHoursSpecification: input.openingHours?.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: input.sameAs,
    aggregateRating: input.aggregateRating
      ? { "@type": "AggregateRating", ratingValue: input.aggregateRating.ratingValue, reviewCount: input.aggregateRating.reviewCount, bestRating: 5, worstRating: 1 }
      : undefined,
  };
}

export function restaurantSchema(input: Parameters<typeof localBusinessSchema>[0] & {
  servesCuisine?: string | string[];
  acceptsReservations?: boolean;
  menu?: string;
}) {
  return {
    ...localBusinessSchema({ ...input, type: "Restaurant" }),
    servesCuisine: input.servesCuisine,
    acceptsReservations: input.acceptsReservations,
    menu: input.menu,
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  image: string | string[];
  sku?: string;
  brand?: string;
  url: string;
  price: number;
  priceCurrency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  aggregateRating?: { ratingValue: number; reviewCount: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: input.image,
    sku: input.sku,
    brand: input.brand ? { "@type": "Brand", name: input.brand } : undefined,
    offers: {
      "@type": "Offer",
      url: input.url,
      priceCurrency: input.priceCurrency ?? "USD",
      price: input.price.toFixed(2),
      availability: `https://schema.org/${input.availability ?? "InStock"}`,
    },
    aggregateRating: input.aggregateRating
      ? { "@type": "AggregateRating", ratingValue: input.aggregateRating.ratingValue, reviewCount: input.aggregateRating.reviewCount, bestRating: 5, worstRating: 1 }
      : undefined,
  };
}

export function personSchema(input: {
  name: string;
  jobTitle: string;
  url: string;
  image?: string;
  email?: string;
  sameAs?: string[];
  worksFor?: string;
  description?: string;
  knowsAbout?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    url: input.url,
    image: input.image,
    email: input.email,
    description: input.description,
    knowsAbout: input.knowsAbout,
    sameAs: input.sameAs,
    worksFor: input.worksFor ? { "@type": "Organization", name: input.worksFor } : undefined,
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function websiteSchema(input: { name: string; url: string; description?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: input.name,
    url: input.url,
    description: input.description,
  };
}
