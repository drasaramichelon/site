import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {ArticleCard, ButtonLink, Container, CTASection, Eyebrow, Heading, ImageFrame, LocalClinicBlock, ProcedureCarousel, ProfessionalCard, SEOJsonLd, Section} from "@/components/design-system";
import {getArticles, getContentEntry, getProfessionals, getSiteSettings} from "@/lib/sanity/repository";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContentEntry("home");
  if (!page || page.contentType !== "page") return {};
  return {title: page.seo.title, description: page.seo.description, alternates: {canonical: page.seo.canonical ?? "/"}};
}

export default async function HomePage() {
  const [home, professionals, settings, articles] = await Promise.all([getContentEntry("home"), getProfessionals(), getSiteSettings(), getArticles()]);
  if (!home || home.contentType !== "page") notFound();
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: settings.legalName,
    url: settings.siteUrl,
    telephone: settings.phone,
    email: settings.email ?? "odontoestetica.net@gmail.com",
    sameAs: [
      "https://www.instagram.com/drasaramichelon",
      "https://www.facebook.com/odontoesteticadrasara",
    ],
    image: `${settings.siteUrl}/images/real/sara/sara-home-hero-17.webp`,
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
      latitude: -27.4373,
      longitude: -48.3998,
    },
    priceRange: "$$",
    areaServed: ["Ingleses", "Norte da Ilha", "Florianópolis"],
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
  };

  return (
    <>
      <SEOJsonLd data={[localBusiness]} />
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-pink)]">
        {/* Banner de Background Responsivo da Hero */}
        <picture className="absolute inset-0 block h-full w-full pointer-events-none">
          <source
            media="(max-width: 767px)"
            srcSet="/images/home/hero-mobile.webp"
            type="image/webp"
            width={941}
            height={1672}
          />
          <img
            src="/images/home/hero-desktop.webp"
            alt="Dra. Sara Michelon - Odontologia Estética em Florianópolis"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover object-top md:object-right"
          />
        </picture>

        <Container className="relative z-10">
          <div className="flex flex-col justify-end pt-[40vw] pb-4 sm:pt-[30vw] sm:pb-5 md:justify-center md:py-6 lg:py-7">
            <div className="max-w-xl md:max-w-lg lg:max-w-[52%]">
              <Eyebrow>{home.eyebrow}</Eyebrow>
              <Heading as="h1">{home.title}</Heading>
              <p className="mt-3.5 text-base sm:text-lg leading-7 sm:leading-8 text-[var(--color-ink)]/85">{home.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-3.5">
                <ButtonLink href="/contato" event="appointment_cta_click" location="home_hero">Agende uma avaliação</ButtonLink>
                <ButtonLink href="#tratamentos" variant="secondary" event="treatment_view" location="home_hero">Conheça os tratamentos</ButtonLink>
              </div>
              <div className="mt-5 flex items-center gap-4 border-t border-[var(--color-border)] pt-2.5 text-sm text-[var(--color-ink)]/70 sm:mt-6 sm:gap-5 sm:pt-3">
                <span className="font-title text-2xl text-[var(--color-primary)]">01</span>
                <span>Ingleses · Norte da Ilha · Florianópolis</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div><Eyebrow>Duas áreas, um só planejamento</Eyebrow><Heading>O cuidado começa por entender o caso</Heading></div>
            <div className="grid gap-px bg-[var(--color-border)] sm:grid-cols-2">
              <article className="bg-white p-5 sm:p-7"><span className="text-xs tracking-[0.2em] text-[var(--color-mauve)]">01</span><h3 className="mt-5 sm:mt-6 font-title text-2xl sm:text-3xl text-[var(--color-primary)]">Odontologia</h3><p className="mt-3 leading-6 sm:leading-7 text-[var(--color-muted)]">Prevenção, estética do sorriso, reabilitação, cirurgia e ortodontia organizadas conforme cada necessidade.</p><div className="mt-4"><ButtonLink href="/odontologia" variant="secondary" event="treatment_view" location="home_areas">Conhecer odontologia</ButtonLink></div></article>
              <article className="bg-[var(--color-primary)] p-5 text-white sm:p-7"><span className="text-xs tracking-[0.2em] text-white/55">02</span><h3 className="mt-5 sm:mt-6 font-title text-2xl sm:text-3xl">Estética Orofacial</h3><p className="mt-3 leading-6 sm:leading-7 text-white/70">Avaliação facial e indicação individual com naturalidade e atenção ao conjunto da face.</p><div className="mt-4"><ButtonLink href="/estetica-orofacial" variant="light" event="treatment_view" location="home_areas">Conhecer estética</ButtonLink></div></article>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--color-surface)]">
        <Container>
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
            <ImageFrame
              src="/images/real/tecnologia/planning-digital-scan.webp"
              alt="Dra. Sara Michelon durante planejamento odontológico digital"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] w-full rounded-2xl border border-[var(--color-border)] shadow-md"
              imageClassName="object-[center_60%]"
            />
            <div className="lg:px-8">
              <Eyebrow>Método de planejamento</Eyebrow>
              <Heading>Planejamento antes da escolha do procedimento</Heading>
              <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-[var(--color-muted)]">
                A clínica trabalha em uma sequência clara: avaliação, diagnóstico, indicação, tratamento e acompanhamento. O diagnóstico estabelece prioridades, limites e a sequência do tratamento. A indicação é construída a partir das necessidades de cada paciente, e não de uma lista pré-definida de procedimentos.
              </p>
              {/* Linha do Tempo Contínua (Timeline Unificada) */}
              <ol className="relative mt-7 grid grid-cols-2 gap-y-6 sm:grid-cols-5 sm:gap-0">
                {[
                  {step: "01", title: "Avaliação"},
                  {step: "02", title: "Diagnóstico"},
                  {step: "03", title: "Indicação"},
                  {step: "04", title: "Tratamento"},
                  {step: "05", title: "Acompanhamento"},
                ].map((item, index) => {
                  const isLast = index === 4;
                  return (
                    <li
                      key={item.title}
                      className={`group relative flex flex-col pr-3 ${
                        isLast ? "col-span-2 sm:col-span-1" : ""
                      }`}
                    >
                      {/* Linha contínua conectando até o próximo nó (apenas desktop) */}
                      {!isLast && (
                        <div
                          className="hidden sm:block absolute left-[6px] right-0 top-[6px] h-[1.5px] bg-[var(--color-border)] transition-colors group-hover:bg-[var(--color-mauve)]/40"
                          aria-hidden="true"
                        />
                      )}

                      {/* Nó da etapa */}
                      <div className="relative flex items-center">
                        <span
                          className={`relative z-10 h-3 w-3 rounded-full ring-4 ring-[var(--color-surface)] transition-all duration-200 group-hover:scale-125 ${
                            isLast
                              ? "bg-[var(--color-mauve)]"
                              : "border-2 border-[var(--color-mauve)] bg-[var(--color-surface)]"
                          }`}
                        />
                      </div>

                      {/* Conteúdo textual */}
                      <div className="mt-3">
                        <span className="font-title text-xs font-semibold tracking-wider text-[var(--color-mauve)]">
                          {item.step}
                        </span>
                        <span className="mt-0.5 block text-sm font-bold tracking-tight text-[var(--color-primary)]">
                          {item.title}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <ProcedureCarousel
        id="tratamentos"
        title="CONHEÇA OUTROS PROCEDIMENTOS"
        eyebrow="Tratamentos Prioritários"
      />

      <Section>
        <Container className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <ImageFrame
            src="/images/real/sara/sara-autoridade-2025.webp"
            alt="Dra. Sara Michelon em retrato profissional de autoridade"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] min-h-[500px] sm:min-h-[560px] lg:min-h-[640px] w-full rounded-2xl border border-[var(--color-border)] shadow-md"
            imageClassName="object-[center_20%]"
          />
          <div className="lg:px-8">
            <Eyebrow>Dra. Sara Michelon</Eyebrow>
            <Heading>Uma visão integrada da Odontologia e da Estética Facial</Heading>
            <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-[var(--color-muted)]">
              A experiência em diferentes áreas da Odontologia permite avaliar cada caso de forma mais ampla, considerando saúde, função, sorriso e face antes de definir qualquer tratamento.
            </p>
            <div className="mt-6">
              <ButtonLink href="/dra-sara-michelon" variant="secondary" event="appointment_cta_click" location="home_authority">Conheça a Dra. Sara</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--color-pink)]">
        <Container><div className="max-w-2xl"><Eyebrow>Equipe</Eyebrow><Heading>Profissionais conectados ao mesmo planejamento</Heading></div><div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{professionals.map((professional) => <ProfessionalCard key={professional.name} {...professional} />)}</div><div className="mt-6"><ButtonLink href="/equipe" variant="secondary">Conheça a equipe</ButtonLink></div></Container>
      </Section>

      <Section>
        <Container><div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr]"><div><Eyebrow>A clínica</Eyebrow><Heading>Estrutura real para avaliar, planejar e acompanhar</Heading><p className="mt-4 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-[var(--color-muted)]">Ambientes fotografados na própria clínica apoiam uma experiência humana e organizada, nos Ingleses.</p><div className="mt-6"><ButtonLink href="/clinica" variant="secondary">Conheça a clínica</ButtonLink></div></div><ImageFrame src="/images/real/clinica/clinic-consultorio-1-novo.webp" alt="Consultório odontológico moderno com nova cadeira anatômica da clínica Dra. Sara Michelon" fill sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] min-h-[380px] lg:min-h-[440px] w-full rounded-2xl border border-[var(--color-border)] shadow-md" imageClassName="object-center" /></div></Container>
      </Section>

      <Section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <Container><div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><Eyebrow>Conteúdos</Eyebrow><Heading>Informação clínica para decisões mais conscientes</Heading><div className="mt-5"><ButtonLink href="/conteudos" variant="secondary">Ver conteúdos</ButtonLink></div></div><div>{articles.map((article) => <ArticleCard key={article.slug} category={article.categories[0] ?? "Conteúdo"} title={article.title} description={article.excerpt} href={article.path} meta={`Por ${article.author.name}`} />)}</div></div></Container>
      </Section>

      <Section><Container><LocalClinicBlock /></Container></Section>
      <CTASection />
    </>
  );
}
