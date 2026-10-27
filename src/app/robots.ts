import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/SiteConfig";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you/"] },
    sitemap: siteConfig.seo.baseUrl + "/sitemap.xml",
  };
}
