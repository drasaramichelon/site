import {createClient} from "next-sanity";
import {fallbackArticles, fallbackLandingPages, fallbackPages, fallbackProfessionals, fallbackSiteSettings, fallbackSitemapPaths, fallbackSupportStaff, fallbackTreatments} from "@/lib/content/fallback";
import type {Article, InstitutionalPage, LandingPage, Professional, SiteSettings, SupportStaff, Treatment} from "@/lib/content/types";
import {articlesQuery, entryQuery, professionalQuery, professionalsQuery, settingsQuery, sitemapHomeQuery, sitemapQuery} from "@/lib/sanity/queries";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-01";

export const hasSanityConfig = Boolean(projectId && projectId !== "missing-project-id");

export const sanityClient = hasSanityConfig
  ? createClient({projectId: projectId!, dataset, apiVersion, useCdn: true, token: process.env.SANITY_API_READ_TOKEN})
  : null;

export type ContentEntry = Treatment | InstitutionalPage | LandingPage | Article;

function fallbackEntry(slug: string): ContentEntry | null {
  return fallbackTreatments[slug] ?? fallbackPages[slug] ?? fallbackLandingPages[slug] ?? fallbackArticles[slug] ?? null;
}

export async function getContentEntry(slug: string): Promise<ContentEntry | null> {
  const fallback = fallbackEntry(slug);
  if (!sanityClient) return fallback;
  try {
    const entry = await sanityClient.fetch<ContentEntry | null>(entryQuery, {slug}, {next: {revalidate: 3600, tags: [`content:${slug}`]}});
    return entry ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getProfessionals(): Promise<Professional[]> {
  if (!sanityClient) return fallbackProfessionals;
  try {
    const remote = await sanityClient.fetch<Professional[]>(professionalsQuery, {}, {next: {revalidate: 3600, tags: ["professionals"]}});
    return remote && remote.length > 0 ? remote : fallbackProfessionals;
  } catch {
    return fallbackProfessionals;
  }
}

export async function getSupportStaff(): Promise<SupportStaff[]> {
  return fallbackSupportStaff;
}

export async function getProfessional(slug: string): Promise<Professional | null> {
  const fallback = fallbackProfessionals.find((professional) => professional.slug === slug) ?? null;
  if (!sanityClient) return fallback;
  try {
    const remote = await sanityClient.fetch<Professional | null>(professionalQuery, {slug}, {next: {revalidate: 3600, tags: [`professional:${slug}`]}});
    return remote ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  const fallback = fallbackArticles[slug] ?? null;
  if (!sanityClient) return fallback;
  try {
    const entry = await sanityClient.fetch<ContentEntry | null>(entryQuery, {slug}, {next: {revalidate: 3600, tags: [`content:${slug}`]}});
    return entry?.contentType === "article" ? entry : fallback;
  } catch {
    return fallback;
  }
}

export async function getArticles(): Promise<Article[]> {
  if (!sanityClient) return Object.values(fallbackArticles);
  try {
    const remote = await sanityClient.fetch<Article[]>(articlesQuery, {}, {next: {revalidate: 3600, tags: ["articles"]}});
    return remote && remote.length > 0 ? remote : Object.values(fallbackArticles);
  } catch {
    return Object.values(fallbackArticles);
  }
}

function sanitizeSiteUrl(url?: string | null): string {
  const trimmed = url?.trim();
  if (!trimmed) {
    if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim().length > 0) {
      const envUrl = process.env.NEXT_PUBLIC_SITE_URL.trim();
      const formatted = envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
      return formatted.replace(/\/+$/, "");
    }
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/+$/, "");
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, "");
    }
    return "https://odontoestetica.net";
  }
  const formatted = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  return formatted.replace(/\/+$/, "");
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityClient) {
    return {...fallbackSiteSettings, siteUrl: sanitizeSiteUrl(fallbackSiteSettings.siteUrl)};
  }
  try {
    const remote = await sanityClient.fetch<Partial<SiteSettings> | null>(settingsQuery, {}, {next: {revalidate: 3600, tags: ["site-settings"]}});
    const merged = {...fallbackSiteSettings, ...remote, trackingIds: {...fallbackSiteSettings.trackingIds, ...remote?.trackingIds}};
    return {...merged, siteUrl: sanitizeSiteUrl(merged.siteUrl)};
  } catch {
    return {...fallbackSiteSettings, siteUrl: sanitizeSiteUrl(fallbackSiteSettings.siteUrl)};
  }
}

export type SitemapEntry = {
  path: string;
  lastModified?: string | Date;
};

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const getFallbackEntries = (): SitemapEntry[] => {
    const articleDates = new Map<string, string | Date>();
    for (const article of Object.values(fallbackArticles)) {
      const rawDate = article.updatedAt || article.publishedAt;
      if (rawDate) {
        articleDates.set(article.path, rawDate);
      }
    }
    return fallbackSitemapPaths.map((path) => ({
      path,
      lastModified: articleDates.get(path),
    }));
  };

  if (!sanityClient) return getFallbackEntries();

  try {
    const [remote, homeDate] = await Promise.all([
      sanityClient.fetch<{path: string; lastModified?: string}[]>(sitemapQuery, {}, {next: {revalidate: 3600, tags: ["sitemap"]}}),
      sanityClient.fetch<string | null>(sitemapHomeQuery, {}, {next: {revalidate: 3600, tags: ["site-settings"]}}),
    ]);

    if (!remote || remote.length === 0) return getFallbackEntries();

    const entryMap = new Map<string, string | undefined>();
    entryMap.set("", homeDate ?? undefined);
    entryMap.set("/clinica", undefined);
    entryMap.set("/equipe", undefined);
    entryMap.set("/contato", undefined);

    for (const item of remote) {
      if (item.path && item.path !== "/home") {
        entryMap.set(item.path, item.lastModified);
      }
    }

    return Array.from(entryMap.entries()).map(([path, lastModified]) => ({
      path,
      lastModified,
    }));
  } catch {
    return getFallbackEntries();
  }
}

export async function getSitemapPaths(): Promise<string[]> {
  const entries = await getSitemapEntries();
  return entries.map((entry) => entry.path);
}

export function getStaticSlugs() {
  const rootArticles = Object.values(fallbackArticles).filter((article) => article.path === `/${article.slug}`).map((article) => article.slug);
  return [...Object.keys(fallbackTreatments), ...Object.keys(fallbackPages).filter((slug) => slug !== "home"), ...Object.keys(fallbackLandingPages), ...rootArticles];
}

export function getArticleStaticSlugs() {
  return Object.values(fallbackArticles).filter((article) => article.path.startsWith("/conteudos/")).map((article) => article.slug);
}

export function getProfessionalStaticSlugs() {
  return fallbackProfessionals.filter((professional) => professional.profileHref?.startsWith("/equipe/")).map((professional) => professional.slug);
}
