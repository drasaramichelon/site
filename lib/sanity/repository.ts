import {createClient} from "next-sanity";
import {fallbackArticles, fallbackLandingPages, fallbackPages, fallbackProfessionals, fallbackSiteSettings, fallbackSitemapPaths, fallbackSupportStaff, fallbackTreatments} from "@/lib/content/fallback";
import type {Article, InstitutionalPage, LandingPage, Professional, SiteSettings, SupportStaff, Treatment} from "@/lib/content/types";
import {articlesQuery, entryQuery, professionalQuery, professionalsQuery, settingsQuery, sitemapQuery} from "@/lib/sanity/queries";

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
  if (!sanityClient) return fallbackEntry(slug);
  try {
    return await sanityClient.fetch<ContentEntry | null>(entryQuery, {slug}, {next: {revalidate: 3600, tags: [`content:${slug}`]}});
  } catch {
    return null;
  }
}

export async function getProfessionals(): Promise<Professional[]> {
  if (!sanityClient) return fallbackProfessionals;
  try {
    return await sanityClient.fetch<Professional[]>(professionalsQuery, {}, {next: {revalidate: 3600, tags: ["professionals"]}});
  } catch {
    return [];
  }
}

export async function getSupportStaff(): Promise<SupportStaff[]> {
  return fallbackSupportStaff;
}

export async function getProfessional(slug: string): Promise<Professional | null> {
  if (!sanityClient) return fallbackProfessionals.find((professional) => professional.slug === slug) ?? null;
  try {
    return await sanityClient.fetch<Professional | null>(professionalQuery, {slug}, {next: {revalidate: 3600, tags: [`professional:${slug}`]}});
  } catch {
    return null;
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!sanityClient) return fallbackArticles[slug] ?? null;
  try {
    const entry = await sanityClient.fetch<ContentEntry | null>(entryQuery, {slug}, {next: {revalidate: 3600, tags: [`content:${slug}`]}});
    return entry?.contentType === "article" ? entry : null;
  } catch {
    return null;
  }
}

export async function getArticles(): Promise<Article[]> {
  if (!sanityClient) return Object.values(fallbackArticles);
  try {
    return await sanityClient.fetch<Article[]>(articlesQuery, {}, {next: {revalidate: 3600, tags: ["articles"]}});
  } catch {
    return [];
  }
}

function sanitizeSiteUrl(url?: string | null): string {
  const trimmed = url?.trim();
  if (!trimmed) {
    if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim().length > 0) {
      const envUrl = process.env.NEXT_PUBLIC_SITE_URL.trim();
      return envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
    }
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return "https://odontoestetica.net";
  }
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
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

export async function getSitemapPaths(): Promise<string[]> {
  if (!sanityClient) return fallbackSitemapPaths;
  try {
    const remote = await sanityClient.fetch<{path: string}[]>(sitemapQuery, {}, {next: {revalidate: 3600, tags: ["sitemap"]}});
    return ["", "/clinica", "/equipe", "/contato", ...remote.map((item) => item.path)].filter((path, index, paths) => paths.indexOf(path) === index);
  } catch {
    return fallbackSitemapPaths;
  }
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
