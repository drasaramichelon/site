import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {ArticlePage} from "@/components/article-page";
import {getArticle, getArticleStaticSlugs} from "@/lib/sanity/repository";

type PageProps = {params: Promise<{slug: string}>};

export function generateStaticParams() {
  return getArticleStaticSlugs().map((slug) => ({slug}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article || !article.path.startsWith("/conteudos/")) return {};
  const images = article.seo.ogImage ? [article.seo.ogImage] : [];
  return {
    title: article.seo.title,
    description: article.seo.description,
    alternates: {canonical: article.seo.canonical ?? article.path},
    robots: article.seo.index === false ? {index: false, follow: true} : {index: true, follow: true},
    openGraph: {type: "article", title: article.seo.title, description: article.seo.description, images},
    twitter: {title: article.seo.title, description: article.seo.description, images},
  };
}

export default async function NestedArticlePage({params}: PageProps) {
  const article = await getArticle((await params).slug);
  if (!article || article.path !== `/conteudos/${article.slug}`) notFound();
  return <ArticlePage article={article} />;
}
