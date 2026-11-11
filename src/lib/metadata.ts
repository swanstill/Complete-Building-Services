import type { Metadata } from "next";
import { siteConfig } from "@/config/SiteConfig";

export function pageMetadata(
  title: string,
  description: string,
  path = "/",
  image = siteConfig.seo.ogImage,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.companyName,
      locale: "en_GB",
      type: "website",
      images: [{ url: image, alt: siteConfig.companyName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
