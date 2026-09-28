import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {ContactView} from "@/components/contact-view";
import {ContentSectionRenderer} from "@/components/content-section-renderer";
import {ArticleCard, Breadcrumbs, ButtonLink, Container, CTASection, Eyebrow, FAQ, Heading, ImageFrame, ProcedureCarousel, ProfessionalBlock, SEOJsonLd, Section, TreatmentCard, TreatmentOverviewCard} from "@/components/design-system";
import type {Article, InstitutionalPage, LandingPage, Treatment} from "@/lib/content/types";
import {getArticles, getContentEntry, getSiteSettings, getStaticSlugs} from "@/lib/sanity/repository";

import {TreatmentHeroMedia} from "@/components/treatment-hero-media";
import {getTreatmentBanner} from "@/lib/treatment-banners";

type PageProps = {params: Promise<{slug: string}>};

export function generateStaticParams() {
  return getStaticSlugs().map((slug) => ({slug}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params;
  const entry = await getContentEntry(slug);
  if (!entry) return {};
  const images = entry.seo.ogImage ? [entry.seo.ogImage] : [];
  return {
    title: entry.seo.title,
    description: entry.seo.description,
    alternates: {canonical: entry.seo.canonical ?? `/${slug}`},
    robots: entry.seo.index === false ? {index: false, follow: true} : {index: true, follow: true},
    openGraph: {type: entry.contentType === "article" ? "article" : "website", title: entry.seo.title, description: entry.seo.description, images},
    twitter: {title: entry.seo.title, description: entry.seo.description, images},
  };
}

function breadcrumbJsonLd(siteUrl: string, items: {name: string; path: string}[]) {
  return {"@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({"@type": "ListItem", position: index + 1, name: item.name, item: `${siteUrl}${item.path}`}))};
}

async function TreatmentPage({treatment}: {treatment: Treatment}) {
  const settings = await getSiteSettings();
  const isFacialCare = treatment.specialty === "Estética Orofacial";
  const hubHref = isFacialCare ? "/estetica-orofacial" : "/odontologia";
  const hubLabel = isFacialCare ? "Estética Orofacial" : "Odontologia";
  const banner = getTreatmentBanner(treatment.slug);
  const hasCuratedBanner = Boolean(banner);
  const showCustomImage = Boolean(treatment.heroImage);
  const darkHero = treatment.variant === "hub";
  const breadcrumbData = breadcrumbJsonLd(settings.siteUrl, [{name: "Início", path: "/"}, {name: hubLabel, path: hubHref}, {name: treatment.title, path: `/${treatment.slug}`}]);
  const webpageData = {"@context": "https://schema.org", "@type": "WebPage", name: treatment.title, description: treatment.shortDescription, url: `${settings.siteUrl}/${treatment.slug}`, isPartOf: {"@type": "WebSite", name: settings.clinicName, url: settings.siteUrl}};
  const faqData = treatment.faq.length ? {"@context": "https://schema.org", "@type": "FAQPage", mainEntity: treatment.faq.map((item) => ({"@type": "Question", name: item.question, acceptedAnswer: {"@type": "Answer", text: item.answer}}))} : null;

  return (
    <>
      <SEOJsonLd data={faqData ? [breadcrumbData, webpageData, faqData] : [breadcrumbData, webpageData]} />
      <div data-page-event="treatment_view" data-treatment={treatment.slug} data-specialty={treatment.specialty} data-content-type="treatment" />
      {hasCuratedBanner && !showCustomImage ? (
        <section className="relative overflow-hidden bg-[#241421]">
          {/* Responsive Art Direction Hero Media */}
          <TreatmentHeroMedia
            slug={treatment.slug}
            alt={treatment.heroImageAlt ?? banner?.alt}
            priority
            className="absolute inset-0 block h-full w-full pointer-events-none"
            imgClassName="h-full w-full object-cover object-top md:object-[right_top] lg:object-[right_top]"
          />

          {/* Scrim overlay for contrast while preserving clean photography */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#241421] via-[#241421]/75 via-50% to-transparent to-80% md:hidden"
          />
          <div
            aria-hidden="true"
            className="hidden md:block absolute inset-0 pointer-events-none bg-gradient-to-r from-[#241421]/80 via-[#241421]/35 to-transparent lg:from-[#241421]/70 lg:via-[#241421]/20 lg:w-[65%]"
          />

          <Container className="relative z-10">
            <div className="flex flex-col justify-end min-h-[460px] pt-[48vw] pb-6 sm:min-h-[480px] sm:pt-[36vw] sm:pb-7 md:min-h-[420px] md:pt-8 md:pb-8 lg:min-h-[480px] lg:justify-center lg:py-10">
              <div className="max-w-xl md:max-w-lg lg:max-w-[54%]">
                <Breadcrumbs
                  light
                  hideCurrentOnMobile
                  className="mb-2.5 sm:mb-4"
                  items={[
                    {label: "Início", href: "/"},
                    {label: hubLabel, href: hubHref},
                    {label: treatment.title},
                  ]}
                />
                <p className="mb-2 sm:mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                  {treatment.eyebrow}
                </p>
                <h1 className="font-title text-balance text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.1] tracking-[-0.02em] text-white">
                  {treatment.title}
                </h1>
                <p className="mt-2.5 sm:mt-3.5 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-white/85">
                  {treatment.shortDescription}
                </p>
                <div className="mt-5 sm:mt-6 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/contato" variant="light" location="treatment_hero">
                    Agendar uma avaliação
                  </ButtonLink>
                  <ButtonLink
                    href="#conteudo"
                    variant="secondary"
                    className="border-white/40 text-white hover:bg-white/10"
                    event="treatment_view"
                    location="treatment_hero"
                  >
                    Entender o tratamento
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <section className={`overflow-hidden ${darkHero ? "bg-[var(--color-primary)] text-white" : treatment.variant === "symptom-led" ? "bg-[var(--color-surface-strong)]" : "bg-[var(--color-pink)]"}`}>
          <Container className="py-4 sm:py-6">
            <Breadcrumbs light={darkHero} items={[{label: "Início", href: "/"}, {label: hubLabel, href: hubHref}, {label: treatment.title}]} />
            <div className={`grid items-center gap-8 sm:gap-10 ${showCustomImage ? "lg:grid-cols-[1.08fr_0.92fr]" : "lg:grid-cols-[0.72fr_0.28fr]"}`}>
              <div className="py-3">
                <Eyebrow light={darkHero}>{treatment.eyebrow}</Eyebrow>
                <Heading as="h1" className={darkHero ? "text-white" : undefined}>{treatment.title}</Heading>
                <p className={`mt-4 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 ${darkHero ? "text-white/75" : "text-[var(--color-muted)]"}`}>{treatment.shortDescription}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row"><ButtonLink href="/contato" variant={darkHero ? "light" : "primary"} location="treatment_hero">Agendar uma avaliação</ButtonLink><ButtonLink href="#conteudo" variant={darkHero ? "light" : "secondary"} event="treatment_view" location="treatment_hero">Entender o tratamento</ButtonLink></div>
              </div>
              {showCustomImage ? <ImageFrame src={treatment.heroImage!} alt={treatment.heroImageAlt ?? treatment.title} fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="aspect-[4/5] min-h-[360px] max-h-[440px]" /> : <div className="hidden border-l border-[var(--color-border)] pl-8 lg:block"><span className="font-title text-8xl text-[var(--color-mauve)]/30">01</span><p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">Sintomas precisam ser relacionados ao histórico e ao exame clínico.</p></div>}
            </div>
          </Container>
        </section>
      )}
      <div id="conteudo"><ContentSectionRenderer sections={treatment.sections} /></div>
      {treatment.aftercare && <Section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]"><Container className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"><div><Eyebrow>Continuidade do cuidado</Eyebrow><Heading>Acompanhamento e manutenção</Heading></div><div>{treatment.aftercare.body.map((paragraph) => <p key={paragraph} className="mb-3 max-w-2xl leading-7 text-[var(--color-muted)]">{paragraph}</p>)}{treatment.aftercare.href && treatment.aftercare.label && <ButtonLink href={treatment.aftercare.href} variant="secondary" event="treatment_view" location="aftercare">{treatment.aftercare.label}</ButtonLink>}</div></Container></Section>}
      {treatment.clinicalLead && <ProfessionalBlock professional={treatment.clinicalLead} />}
      {treatment.faq.length > 0 && <Section className="bg-[var(--color-pink)]"><Container className="grid gap-8 sm:gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><Eyebrow>Perguntas frequentes</Eyebrow><Heading>O que costuma gerar dúvida</Heading></div><FAQ items={treatment.faq} /></Container></Section>}
      <ProcedureCarousel
        title="CONHEÇA OUTROS PROCEDIMENTOS"
        eyebrow="Tratamentos Prioritários"
        currentSlug={treatment.slug}
      />
      <CTASection heading="A melhor indicação começa por compreender o seu caso" />
    </>
  );
}

interface InstitutionalHeroBanner {
  desktop: string;
  mobile: string;
  alt: string;
  desktopWidth?: number;
  desktopHeight?: number;
  mobileWidth?: number;
  mobileHeight?: number;
  ctaPrimary?: {label: string; href: string};
  ctaSecondary?: {label: string; href: string};
}

const institutionalHeroBanners: Record<string, InstitutionalHeroBanner> = {
  "conteudos": {
    desktop: "/images/real/conteudos/hero-conteudos-desktop.webp",
    mobile: "/images/real/conteudos/hero-conteudos-mobile.webp",
    alt: "Dra. Sara Michelon na recepção da clínica compartilhando orientações e artigos sobre odontologia e estética",
    desktopWidth: 1672,
    desktopHeight: 941,
    mobileWidth: 941,
    mobileHeight: 1672,
    ctaPrimary: {label: "Ver publicações ↓", href: "#publicacoes"},
    ctaSecondary: {label: "Agendar uma avaliação", href: "/contato"},
  },
  "estetica-orofacial": {
    desktop: "/images/real/estetica/hero-estetica-desktop.webp",
    mobile: "/images/real/estetica/hero-estetica-mobile.webp",
    alt: "Dra. Sara Michelon em atendimento e planejamento individual de estética orofacial",
    desktopWidth: 2048,
    desktopHeight: 768,
    mobileWidth: 941,
    mobileHeight: 1672,
    ctaPrimary: {label: "Ver procedimentos ↓", href: "#tratamentos"},
    ctaSecondary: {label: "Agendar uma avaliação", href: "/contato"},
  },
  "odontologia": {
    desktop: "/images/real/odontologia/hero-odontologia-desktop.webp",
    mobile: "/images/real/odontologia/hero-odontologia-mobile.webp",
    alt: "Dra. Sara Michelon no consultório apresentando planejamento odontológico com modelo e alinhador",
    desktopWidth: 1672,
    desktopHeight: 941,
    mobileWidth: 941,
    mobileHeight: 1672,
    ctaPrimary: {label: "Ver tratamentos ↓", href: "#tratamentos"},
    ctaSecondary: {label: "Agendar uma avaliação", href: "/contato"},
  },
};

async function InstitutionalPageView({page}: {page: InstitutionalPage}) {
  const settings = await getSiteSettings();
  const isContact = page.slug === "contato";

  if (isContact) {
    const contactBusinessData = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      name: settings.legalName,
      url: `${settings.siteUrl}/contato`,
      telephone: settings.phone,
      email: settings.email ?? "odontoestetica.net@gmail.com",
      sameAs: [
        "https://www.instagram.com/drasaramichelon",
        "https://www.facebook.com/odontoesteticadrasara",
      ],
      image: `${settings.siteUrl}/images/real/clinica/clinica-entrada-nova.webp`,
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.streetAddress ?? "SC-403, 6201 - 218 - Ingleses Norte, Florianópolis - SC, 88058-001",
        addressLocality: "Florianópolis",
        addressRegion: "SC",
        postalCode: "88058-001",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: settings.geo?.latitude ?? -27.4373,
        longitude: settings.geo?.longitude ?? -48.3998,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "12:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "14:00",
          closes: "19:00",
        },
      ],
      hasMap: `https://maps.google.com/maps?q=${encodeURIComponent("Centro de Odontologia Estética Drª Sara Michelon, SC-403, 6201 - 218 - Ingleses Norte, Florianópolis - SC, 88058-001")}`,
    };

    return (
      <>
        <SEOJsonLd
          data={[
            breadcrumbJsonLd(settings.siteUrl, [
              {name: "Início", path: "/"},
              {name: page.title, path: `/${page.slug}`},
            ]),
            contactBusinessData,
          ]}
        />
        <ContactView settings={settings} page={page} />
      </>
    );
  }

  const articles = page.slug === "conteudos" ? await getArticles() : [];
  const isLegacy = page.slug.startsWith("odontopediatria");
  const heroBanner = institutionalHeroBanners[page.slug];

  return (
    <>
      <SEOJsonLd data={breadcrumbJsonLd(settings.siteUrl, [{name: "Início", path: "/"}, {name: page.title, path: `/${page.slug}`}])} />
      {heroBanner ? (
        <section className="relative overflow-hidden bg-[var(--color-pink)]">
          <picture className="absolute inset-0 block h-full w-full pointer-events-none">
            <source
              media="(max-width: 767px)"
              srcSet={heroBanner.mobile}
              width={heroBanner.mobileWidth ?? 941}
              height={heroBanner.mobileHeight ?? 1672}
            />
            <img
              src={heroBanner.desktop}
              alt={heroBanner.alt}
              width={heroBanner.desktopWidth ?? 1672}
              height={heroBanner.desktopHeight ?? 941}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-top md:object-[right_top] lg:object-[right_top]"
            />
          </picture>

          {/* Scrim overlay suave para contraste e legibilidade impecáveis */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--color-pink)] via-[var(--color-pink)]/80 via-50% to-transparent to-85% md:hidden"
          />
          <div
            aria-hidden="true"
            className="hidden md:block absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--color-pink)]/90 via-[var(--color-pink)]/50 to-transparent lg:from-[var(--color-pink)]/85 lg:via-[var(--color-pink)]/30 lg:w-[62%]"
          />

          <Container className="relative z-10">
            <div className="flex flex-col justify-end min-h-[560px] pt-[72vw] pb-8 sm:min-h-[600px] sm:pt-[54vw] sm:pb-10 md:min-h-[500px] md:pt-14 md:pb-12 lg:min-h-[580px] lg:justify-center lg:py-16">
              <div className="max-w-xl md:max-w-lg lg:max-w-[54%]">
                <Breadcrumbs
                  hideCurrentOnMobile
                  className="mb-3 sm:mb-6"
                  items={[
                    {label: "Início", href: "/"},
                    {label: page.eyebrow},
                  ]}
                />
                <p className="mb-2 sm:mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-mauve)]">
                  {page.eyebrow}
                </p>
                <h1 className="font-title text-balance text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] tracking-[-0.02em] text-[var(--color-primary)]">
                  {page.title}
                </h1>
                <p className="mt-3 sm:mt-5 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-[var(--color-muted)]">
                  {page.description}
                </p>
                {(heroBanner.ctaPrimary || heroBanner.ctaSecondary) && (
                  <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row">
                    {heroBanner.ctaPrimary && (
                      <ButtonLink href={heroBanner.ctaPrimary.href} variant="primary">
                        {heroBanner.ctaPrimary.label}
                      </ButtonLink>
                    )}
                    {heroBanner.ctaSecondary && (
                      <ButtonLink href={heroBanner.ctaSecondary.href} variant="secondary">
                        {heroBanner.ctaSecondary.label}
                      </ButtonLink>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <Section className="bg-[var(--color-pink)]">
          <Container>
            <Breadcrumbs items={[{label: "Início", href: "/"}, {label: page.eyebrow}]} />
            <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.75fr]">
              <div>
                <Eyebrow>{page.eyebrow}</Eyebrow>
                <Heading as="h1">{page.title}</Heading>
              </div>
              <p className="text-lg leading-8 text-[var(--color-muted)]">{page.description}</p>
            </div>
          </Container>
        </Section>
      )}
      {page.image && page.slug !== "conteudos" && (
        <Section className="py-8 sm:py-10">
          <Container className="grid items-center gap-12 lg:grid-cols-2">
            <ImageFrame
              src={page.image}
              alt={page.imageAlt ?? page.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="min-h-[520px]"
              imageClassName="object-top"
            />
            <div className="lg:px-10">
              <Eyebrow>Planejamento individual</Eyebrow>
              <Heading as="h2">Avaliação, diagnóstico e indicação</Heading>
              <p className="mt-7 text-lg leading-8 text-[var(--color-muted)]">
                A avaliação organiza necessidades, esclarece alternativas e ajuda a definir uma sequência de cuidado individual.
              </p>
              <div className="mt-9">
                <ButtonLink href="/contato">Agendar uma avaliação</ButtonLink>
              </div>
            </div>
          </Container>
        </Section>
      )}
      {page.linkGroups?.map((group, groupIndex) => (
        <Section
          key={group.title}
          id={groupIndex === 0 ? "tratamentos" : undefined}
          className="border-t border-[var(--color-border)]"
        >
          <Container>
            <Heading as="h2">{group.title}</Heading>
            <div className="mt-10 sm:mt-12 grid gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item, index) => (
                <TreatmentOverviewCard
                  key={item.href}
                  index={String(index + 1).padStart(2, "0")}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  priority={groupIndex === 0 && index < 3}
                />
              ))}
            </div>
          </Container>
        </Section>
      ))}
      {page.sections && <ContentSectionRenderer sections={page.sections} />}
      {articles.length > 0 && (
        <Section id="publicacoes">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <Eyebrow>Publicações</Eyebrow>
                <Heading as="h2">Orientações disponíveis</Heading>
              </div>
              <div>
                {articles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    category={article.categories[0] ?? "Conteúdo"}
                    title={article.title}
                    description={article.excerpt}
                    href={article.path}
                    meta={`Por ${article.author.name}`}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}
      {!isLegacy && !isContact && <CTASection />}
    </>
  );
}

async function ArticlePage({article}: {article: Article}) {
  const settings = await getSiteSettings();
  const articleData = {"@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, url: `${settings.siteUrl}${article.path}`, datePublished: article.publishedAt, dateModified: article.updatedAt ?? article.publishedAt, author: {"@type": "Person", name: article.author.name}, publisher: {"@type": "Organization", name: settings.clinicName}};
  return (
    <>
      <SEOJsonLd data={[breadcrumbJsonLd(settings.siteUrl, [{name: "Início", path: "/"}, {name: "Conteúdos", path: "/conteudos"}, {name: article.title, path: article.path}]), articleData]} />
      <article>
        <Section className="bg-[var(--color-surface)]"><Container className="max-w-[960px]"><Breadcrumbs items={[{label: "Início", href: "/"}, {label: "Conteúdos", href: "/conteudos"}, {label: article.title}]} /><Eyebrow>{article.categories.join(" · ")}</Eyebrow><Heading as="h1">{article.title}</Heading><p className="mt-7 max-w-3xl text-xl leading-9 text-[var(--color-muted)]">{article.excerpt}</p><div className="mt-9 flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-muted)]"><span>Autoria: <strong className="text-[var(--color-primary)]">{article.author.name}</strong></span>{article.reviewer && <span>Revisão clínica: <strong className="text-[var(--color-primary)]">{article.reviewer.name}</strong></span>}</div></Container></Section>
        <div className="article-content"><ContentSectionRenderer sections={article.sections} /></div>
      </article>
      {article.relatedTreatments.length > 0 && <Section className="bg-[var(--color-pink)]"><Container><Eyebrow>Relacionados</Eyebrow><Heading>Continue por temas conectados</Heading><div className="mt-10 grid gap-x-10 sm:grid-cols-2">{article.relatedTreatments.map((item, index) => <TreatmentCard key={item.href} index={`0${index + 1}`} title={item.title} description={item.description ?? "Conheça esta área clínica."} href={item.href} />)}</div></Container></Section>}
      <CTASection heading="Orientação individual começa pela avaliação" />
    </>
  );
}

function LandingPageView({page}: {page: LandingPage}) {
  return (
    <div data-landing-layout>
      <section className="overflow-hidden bg-[var(--color-primary)] text-white"><Container className="grid items-center gap-10 py-8 sm:py-10 lg:grid-cols-[1fr_0.82fr]"><div><Eyebrow light>{page.eyebrow}</Eyebrow><Heading as="h1" className="text-white">{page.title}</Heading><p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">{page.description}</p><div className="mt-9"><ButtonLink href="/contato" variant="light" location="landing_hero">{page.ctaLabel}</ButtonLink></div><p className="mt-8 max-w-xl text-sm leading-6 text-white/55">A indicação depende de avaliação individual e pode incluir a decisão de não realizar um procedimento.</p></div>{page.image && <ImageFrame src={page.image} alt={page.imageAlt ?? page.title} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="aspect-[4/5] min-h-[520px]" />}</Container></section>
      <ContentSectionRenderer sections={page.sections} />
      <Section className="bg-[var(--color-pink)]"><Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]"><div><Eyebrow>Dúvidas</Eyebrow><Heading>Antes de agendar</Heading></div><FAQ items={page.faq} /></Container></Section>
      <CTASection heading="Planejamento estético começa por uma avaliação completa" />
    </div>
  );
}

export default async function DynamicPage({params}: PageProps) {
  const {slug} = await params;
  const entry = await getContentEntry(slug);
  if (!entry) notFound();
  if (entry.contentType === "treatment") return <TreatmentPage treatment={entry} />;
  if (entry.contentType === "article") {
    if (entry.path !== `/${slug}`) notFound();
    return <ArticlePage article={entry} />;
  }
  if (entry.contentType === "landingPage") return <LandingPageView page={entry} />;
  return <InstitutionalPageView page={entry} />;
}
