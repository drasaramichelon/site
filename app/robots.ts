import type {MetadataRoute} from "next";
import {getSiteSettings} from "@/lib/sanity/repository";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const isProduction = (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV) || process.env.VERCEL_ENV === "production";
  if (!isProduction) {
    return {rules: {userAgent: "*", disallow: "/"}};
  }
  return {
    rules: [
      {userAgent: "*", allow: "/", disallow: ["/studio", "/api/"]},
      {userAgent: ["AdsBot-Google", "AdsBot-Google-Mobile"], allow: "/"},
    ],
    sitemap: `${settings.siteUrl}/sitemap.xml`,
  };
}
