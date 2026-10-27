import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/SiteConfig";
import { services } from "@/config/website";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...services.map((s) => `/${s.slug}/`), "/contact/"].map(
    (path) => ({ url: siteConfig.seo.baseUrl + path }),
  );
}
