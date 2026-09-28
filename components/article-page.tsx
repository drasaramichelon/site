import {ContentSectionRenderer} from "@/components/content-section-renderer";
import {Breadcrumbs, Container, CTASection, Eyebrow, Heading, SEOJsonLd, Section, TreatmentCard} from "@/components/design-system";
import type {Article} from "@/lib/content/types";
import {getSiteSettings} from "@/lib/sanity/repository";

function breadcrumbJsonLd(siteUrl: string, items: {name: string; path: string}[]) {
  return {"@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({"@type": "ListItem", position: index + 1, name: item.name, item: `${siteUrl}${item.path}`}))};
}

export async function ArticlePage({article}: {article: Article}) {
  const settings = await getSiteSettings();
  const articleData = {"@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, url: `${settings.siteUrl}${article.path}`, datePublished: article.publishedAt, dateModified: article.updatedAt ?? article.publishedAt, author: {"@type": "Person", name: article.author.name}, publisher: {"@type": "Organization", name: settings.clinicName}};
  return <>
    <SEOJsonLd data={[breadcrumbJsonLd(settings.siteUrl, [{name: "Início", path: "/"}, {name: "Conteúdos", path: "/conteudos"}, {name: article.title, path: article.path}]), articleData]} />
    <article>
      <Section className="bg-[var(--color-surface)]"><Container className="max-w-[960px]"><Breadcrumbs items={[{label: "Início", href: "/"}, {label: "Conteúdos", href: "/conteudos"}, {label: article.title}]} /><Eyebrow>{article.categories.join(" · ")}</Eyebrow><Heading as="h1">{article.title}</Heading><p className="mt-7 max-w-3xl text-xl leading-9 text-[var(--color-muted)]">{article.excerpt}</p><div className="mt-9 flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-muted)]"><span>Autoria: <strong className="text-[var(--color-primary)]">{article.author.name}</strong></span>{article.reviewer && <span>Revisão clínica: <strong className="text-[var(--color-primary)]">{article.reviewer.name}</strong></span>}</div></Container></Section>
      <div className="article-content"><ContentSectionRenderer sections={article.sections} /></div>
    </article>
    {article.relatedTreatments.length > 0 && <Section className="bg-[var(--color-pink)]"><Container><Eyebrow>Relacionados</Eyebrow><Heading>Continue por temas conectados</Heading><div className="mt-10 grid gap-x-10 sm:grid-cols-2">{article.relatedTreatments.map((item, index) => <TreatmentCard key={item.href} index={`0${index + 1}`} title={item.title} description={item.description ?? "Conheça esta área clínica."} href={item.href} />)}</div></Container></Section>}
    <CTASection heading="Orientação individual começa pela avaliação" />
  </>;
}
