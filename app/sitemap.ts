import type {MetadataRoute} from "next";
import {getSiteSettings, getSitemapPaths} from "@/lib/sanity/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, paths] = await Promise.all([getSiteSettings(), getSitemapPaths()]);
  const now = new Date();
  return paths.map((path) => ({url: `${settings.siteUrl}${path}`, lastModified: now, changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : path === "/facetas-de-resina" ? 0.9 : 0.7}));
}
