import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {Breadcrumbs, ButtonLink, Container, Eyebrow, Heading, ImageFrame, SEOJsonLd, Section, TreatmentCard} from "@/components/design-system";
import {getProfessional, getProfessionalStaticSlugs, getSiteSettings} from "@/lib/sanity/repository";

type PageProps = {params: Promise<{slug: string}>};

export function generateStaticParams() {
  return getProfessionalStaticSlugs().map((slug) => ({slug}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const professional = await getProfessional((await params).slug);
  if (!professional?.seo) return {};
  return {
    title: professional.seo.title,
    description: professional.seo.description,
    alternates: {canonical: professional.seo.canonical},
    robots: professional.seo.index === false ? {index: false, follow: true} : {index: true, follow: true},
  };
}

export default async function ProfessionalPage({params}: PageProps) {
  const [professional, settings] = await Promise.all([getProfessional((await params).slug), getSiteSettings()]);
  if (!professional || professional.profileHref !== `/equipe/${professional.slug}`) notFound();

  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: professional.name,
    jobTitle: professional.role,
    image: professional.image ? `${settings.siteUrl}${professional.image}` : undefined,
    worksFor: {"@type": "Dentist", name: settings.clinicName, url: settings.siteUrl},
    url: `${settings.siteUrl}${professional.profileHref}`,
  };

  return (
    <>
      <SEOJsonLd data={personData} />
      <Section className="bg-[var(--color-pink)]">
        <Container>
          <Breadcrumbs
            items={[
              {label: "Início", href: "/"},
              {label: "Equipe", href: "/equipe"},
              {label: professional.name},
            ]}
          />
          <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            {professional.image && (
              <ImageFrame
                src={professional.image}
                alt={`Retrato profissional de ${professional.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="aspect-[4/5] max-h-[680px]"
              />
            )}
            <div>
              <Eyebrow>Equipe clínica</Eyebrow>
              <Heading as="h1">{professional.name}</Heading>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-mauve)]">
                {professional.role}
              </p>
              {(professional.cro || professional.graduation) && (
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                  {professional.cro && (
                    <span className="inline-flex items-center rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-mono text-xs tracking-wider text-[var(--color-primary)]">
                      {professional.cro}
                    </span>
                  )}
                  {professional.graduation && (
                    <span className="inline-flex items-center rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                      {professional.graduation}
                    </span>
                  )}
                </div>
              )}
              {professional.summary && (
                <p className="mt-7 text-lg leading-8 text-[var(--color-muted)]">
                  {professional.summary}
                </p>
              )}
              <div className="mt-9">
                <ButtonLink href="/contato" location="professional_profile">
                  Agendar uma avaliação
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {professional.qualifications && professional.qualifications.length > 0 && (
        <Section className="bg-[var(--color-surface)]">
          <Container className="max-w-[900px]">
            <Eyebrow>Qualificações e Especialidades</Eyebrow>
            <Heading as="h2">Formação e Trajetória Clínica</Heading>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {professional.qualifications.map((qual, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
                  <span className="text-sm font-medium leading-6 text-[var(--color-primary)]">{qual}</span>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {professional.bio?.length ? (
        <Section>
          <Container className="max-w-[900px]">
            <Eyebrow>Atuação clínica</Eyebrow>
            <Heading as="h2">Integração com o planejamento da equipe</Heading>
            {professional.bio.map((paragraph) => (
              <p key={paragraph} className="mt-6 leading-8 text-[var(--color-muted)]">
                {paragraph}
              </p>
            ))}
          </Container>
        </Section>
      ) : null}

      {professional.relatedTreatments?.length ? (
        <Section className="bg-[var(--color-surface)]">
          <Container>
            <Eyebrow>Áreas relacionadas</Eyebrow>
            <Heading as="h2">Tratamentos conectados</Heading>
            <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {professional.relatedTreatments.map((item, index) => (
                <TreatmentCard
                  key={item.href}
                  index={String(index + 1).padStart(2, "0")}
                  title={item.title}
                  description={item.description ?? "Conheça esta área clínica."}
                  href={item.href}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
