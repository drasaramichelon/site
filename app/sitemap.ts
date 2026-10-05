import type {MetadataRoute} from "next";
import {getSitemapEntries, getSiteSettings} from "@/lib/sanity/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, entries] = await Promise.all([
    getSiteSettings(),
    getSitemapEntries(),
  ]);

  return entries.map((entry) => {
    const isRoot = entry.path === "";
    const item: MetadataRoute.Sitemap[number] = {
      url: `${settings.siteUrl}${entry.path}`,
      changeFrequency: isRoot ? "weekly" : "monthly",
      priority: isRoot ? 1 : entry.path === "/facetas-de-resina" ? 0.9 : 0.7,
    };

    if (entry.lastModified) {
      item.lastModified = new Date(entry.lastModified);
    }

    return item;
  });
}

