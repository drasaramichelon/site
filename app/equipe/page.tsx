import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {Breadcrumbs, ButtonLink, Container, CTASection, Eyebrow, Heading, ImageFrame, ProfessionalCard, Section} from "@/components/design-system";
import {getContentEntry, getProfessionals, getSupportStaff} from "@/lib/sanity/repository";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContentEntry("equipe");
  if (!page || page.contentType !== "page") return {};
  return {title: page.seo.title, description: page.seo.description, alternates: {canonical: page.seo.canonical ?? "/equipe"}};
}

export default async function EquipePage() {
  const [page, professionals, supportStaff] = await Promise.all([
    getContentEntry("equipe"),
    getProfessionals(),
    getSupportStaff(),
  ]);
  if (!page || page.contentType !== "page") notFound();

  return (
    <>
      {/* 1. Hero Institucional com Art Direction */}
      <section className="relative overflow-hidden bg-[var(--color-pink)]">
        <picture className="absolute inset-0 block h-full w-full pointer-events-none">
          <source
            media="(max-width: 767px)"
            srcSet="/images/real/equipe/hero-equipe-mobile.webp"
            width={941}
            height={1672}
          />
          <img
            src="/images/real/equipe/hero-equipe-desktop.webp"
            alt="Equipe odontológica da clínica da Dra. Sara Michelon em atendimento e escaneamento digital"
            width={1672}
            height={941}
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
                  {label: "Equipe"},
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
              <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#profissionais" variant="primary">
                  Conhecer os especialistas ↓
                </ButtonLink>
                <ButtonLink href="/contato" variant="secondary">
                  Agendar uma avaliação
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Foto Oficial da Equipe */}
      <Section className="py-8 sm:py-10">
        <Container>
          <div className="mx-auto flex w-full max-w-5xl justify-center">
            <ImageFrame
              src={page.image ?? "/images/real/equipe/team-main.webp"}
              alt={page.imageAlt ?? "Equipe da clínica da Dra. Sara Michelon"}
              fill
              sizes="100vw"
              className="w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/10] max-h-[640px] rounded-2xl border border-[var(--color-border)] shadow-sm"
              imageClassName="object-top"
            />
          </div>
        </Container>
      </Section>

      {/* 3. Grade de Especialistas */}
      <Section id="profissionais" className="bg-[var(--color-surface)]">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Profissionais</Eyebrow>
            <Heading as="h2">Uma equipe, diferentes áreas de cuidado</Heading>
            <p className="mt-4 leading-7 text-[var(--color-muted)]">
              A integração entre as áreas ajuda a organizar prioridades e responsabilidades dentro do planejamento clínico.
            </p>
          </div>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {professionals.map((professional) => (
              <ProfessionalCard key={professional.name} {...professional} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Equipe de Atendimento e Suporte Clínico */}
      {supportStaff.length > 0 && (
        <Section className="border-t border-[var(--color-border)]">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Suporte Clínico & Recepção</Eyebrow>
              <Heading as="h2">Cuidado, acolhimento e biossegurança</Heading>
              <p className="mt-4 leading-7 text-[var(--color-muted)]">
                A atenção com o paciente começa no primeiro contato e se estende a cada etapa do atendimento na clínica.
              </p>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 max-w-4xl">
              {supportStaff.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col sm:flex-row items-start gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-gold)]"
                >
                  {member.image ? (
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-[var(--color-border)]">
                      <img
                        src={member.image}
                        alt={`Foto de ${member.name}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-strong)] font-serif text-3xl text-[var(--color-muted)]">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-title text-xl text-[var(--color-primary)]">{member.name}</h3>
                    <p className="mt-1 text-sm font-medium text-[var(--color-mauve)]">{member.role}</p>
                    {member.registrations && member.registrations.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {member.registrations.map((reg) => (
                          <p key={reg} className="font-mono text-xs text-[var(--color-muted)]">
                            {reg}
                          </p>
                        ))}
                      </div>
                    )}
                    {member.description && (
                      <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                        {member.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTASection heading="Vamos avaliar o seu caso como um conjunto" />
    </>
  );
}

