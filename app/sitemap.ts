import type {MetadataRoute} from "next";
import {getArticles, getSiteSettings, getSitemapPaths} from "@/lib/sanity/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, paths, articles] = await Promise.all([
    getSiteSettings(),
    getSitemapPaths(),
    getArticles(),
  ]);

  const articleDates = new Map<string, Date>();
  for (const article of articles) {
    const rawDate = article.updatedAt || article.publishedAt;
    if (rawDate) {
      const parsed = new Date(rawDate);
      if (!isNaN(parsed.getTime())) {
        articleDates.set(article.path, parsed);
      }
    }
  }

  const now = new Date();
  return paths.map((path) => {
    const isRoot = path === "";
    const lastModified = articleDates.get(path) ?? now;
    return {
      url: `${settings.siteUrl}${path}`,
      lastModified,
      changeFrequency: isRoot ? "weekly" : "monthly",
      priority: isRoot ? 1 : path === "/facetas-de-resina" ? 0.9 : 0.7,
    };
  });
}
