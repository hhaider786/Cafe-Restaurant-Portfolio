import type { Metadata } from "next";

type Input = {
  title: string;
  description: string;
  siteName: string;
  url?: string;
  ogImage?: string;
  twitterHandle?: string;
  themeColor?: string;
  keywords?: string[];
  titleTemplate?: string;
  noIndex?: boolean;
};

export function buildMetadata(input: Input): Metadata {
  const {
    title,
    description,
    siteName,
    url,
    ogImage,
    twitterHandle,
    themeColor = "#0a0a0a",
    keywords,
    titleTemplate,
    noIndex,
  } = input;

  return {
    metadataBase: url ? new URL(url) : undefined,
    title: titleTemplate ? { default: title, template: titleTemplate } : title,
    description,
    keywords,
    applicationName: siteName,
    authors: [{ name: siteName }],
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      type: "website",
      title,
      description,
      siteName,
      url,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      creator: twitterHandle,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: url ? { canonical: url } : undefined,
    other: { "theme-color": themeColor },
  };
}
