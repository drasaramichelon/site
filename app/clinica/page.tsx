import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {Breadcrumbs, ButtonLink, Container, CTASection, Eyebrow, Heading, ImageFrame, Section} from "@/components/design-system";
import {VirtualTour} from "@/components/virtual-tour";
import {getContentEntry} from "@/lib/sanity/repository";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContentEntry("clinica");
  if (!page || page.contentType !== "page") return {};
  return {title: page.seo.title, description: page.seo.description, alternates: {canonical: page.seo.canonical ?? "/clinica"}};
}

function WazeMiniLogo({ className = "h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Waze">
      <path d="M13.314 1.59c-.225.003-.45.013-.675.03-2.165.155-4.295.924-6.069 2.327-2.194 1.732-3.296 4.325-3.496 7.05h.002c-.093 1.22-.23 2.15-.469 2.63-.238.479-.42.638-1.24.639C.27 14.259-.4 15.612.266 16.482c1.248 1.657 2.902 2.705 4.72 3.364a2.198 2.198 0 00-.033.367 2.198 2.198 0 002.2 2.197 2.198 2.198 0 002.128-1.668c1.307.12 2.607.14 3.824.1.364-.012.73-.045 1.094-.092a2.198 2.198 0 002.127 1.66 2.198 2.198 0 002.2-2.197 2.198 2.198 0 00-.151-.797 12.155 12.155 0 002.303-1.549c2.094-1.807 3.511-4.399 3.302-7.404-.112-1.723-.761-3.298-1.748-4.608-2.143-2.86-5.53-4.309-8.918-4.265zm.366 1.54c.312.008.623.027.933.063 2.48.288 4.842 1.496 6.4 3.577v.001c.829 1.1 1.355 2.386 1.446 3.792v.003c.173 2.477-.965 4.583-2.777 6.147a10.66 10.66 0 01-2.375 1.535 2.198 2.198 0 00-.98-.234 2.198 2.198 0 00-1.934 1.158 9.894 9.894 0 01-1.338.146 27.323 27.323 0 01-3.971-.148 2.198 2.198 0 00-1.932-1.156 2.198 2.198 0 00-1.347.463c-1.626-.553-3.078-1.422-4.155-2.762 1.052-.096 1.916-.6 2.319-1.408.443-.889.53-1.947.625-3.198v-.002c.175-2.391 1.11-4.536 2.92-5.964h.002c1.77-1.402 3.978-2.061 6.164-2.012zm-3.157 4.638c-.688 0-1.252.579-1.252 1.298 0 .72.564 1.297 1.252 1.297.689 0 1.252-.577 1.252-1.297 0-.711-.563-1.298-1.252-1.298zm5.514 0c-.688 0-1.25.579-1.25 1.298-.008.72.554 1.297 1.25 1.297.688 0 1.252-.577 1.252-1.297 0-.711-.564-1.298-1.252-1.298zM9.641 11.78a.72.72 0 00-.588.32.692.692 0 00-.11.54c.345 1.783 2.175 3.129 4.264 3.129h.125c1.056-.032 2.026-.343 2.816-.922.767-.556 1.29-1.316 1.477-2.137a.746.746 0 00-.094-.547.69.69 0 00-.445-.32.714.714 0 00-.867.539c-.22.93-1.299 1.9-2.934 1.94-1.572.046-2.738-.986-2.926-1.956a.72.72 0 00-.718-.586Z" />
    </svg>
  );
}

function UberMiniLogo({ className = "h-3.5 w-auto shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Uber">
      <path d="M0 7.97v4.958c0 1.867 1.302 3.101 3 3.101.826 0 1.562-.316 2.094-.87v.736H6.27V7.97H5.082v4.888c0 1.257-.85 2.106-1.947 2.106-1.11 0-1.946-.827-1.946-2.106V7.971H0zm7.44 0v7.925h1.13v-.725c.521.532 1.257.86 2.06.86a3.006 3.006 0 0 0 3.034-3.01 3.01 3.01 0 0 0-3.033-3.024 2.86 2.86 0 0 0-2.049.861V7.971H7.439zm9.869 2.038c-1.687 0-2.965 1.37-2.965 3 0 1.72 1.334 3.01 3.066 3.01 1.053 0 1.913-.463 2.49-1.233l-.826-.611c-.43.577-.996.847-1.664.847-.973 0-1.753-.7-1.912-1.64h4.697v-.373c0-1.72-1.222-3-2.886-3zm6.295.068c-.634 0-1.098.294-1.381.758v-.713h-1.131v5.774h1.142V12.61c0-.894.544-1.47 1.291-1.47H24v-1.065h-.396zm-6.319.928c.85 0 1.564.588 1.756 1.47H15.52c.203-.882.916-1.47 1.765-1.47zm-6.732.012c1.086 0 1.98.883 1.98 2.004a1.993 1.993 0 0 1-1.98 2.001A1.989 1.989 0 0 1 8.56 13.02a1.99 1.99 0 0 1 1.992-2.004z" />
    </svg>
  );
}

function GoogleMapsMiniLogo({ className = "h-4 w-auto shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 367" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Google Maps">
      <path fill="#34A853" d="M70.585 271.865a371 371 0 0 1 28.911 42.642c7.374 13.982 10.448 23.463 15.837 40.31c3.305 9.308 6.292 12.086 12.714 12.086c6.998 0 10.173-4.726 12.626-12.035c5.094-15.91 9.091-28.052 15.397-39.525c12.374-22.15 27.75-41.833 42.858-60.75c4.09-5.354 30.534-36.545 42.439-61.156c0 0 14.632-27.035 14.632-64.792c0-35.318-14.43-59.813-14.43-59.813l-41.545 11.126l-25.23 66.451l-6.242 9.163l-1.248 1.66l-1.66 2.078l-2.914 3.319l-4.164 4.163l-22.467 18.304l-56.17 32.432z" />
      <path fill="#FBBC04" d="M12.612 188.892c13.709 31.313 40.145 58.839 58.031 82.995l95.001-112.534s-13.384 17.504-37.662 17.504c-27.043 0-48.89-21.595-48.89-48.825c0-18.673 11.234-31.501 11.234-31.501l-64.489 17.28z" />
      <path fill="#4285F4" d="M166.705 5.787c31.552 10.173 58.558 31.53 74.893 63.023l-75.925 90.478s11.234-13.06 11.234-31.617c0-27.864-23.463-48.68-48.81-48.68c-23.969 0-37.735 17.475-37.735 17.475v-57z" />
      <path fill="#1A73E8" d="M30.015 45.765C48.86 23.218 82.02 0 127.736 0c22.18 0 38.89 5.823 38.89 5.823L90.29 96.516H36.205z" />
      <path fill="#EA4335" d="M12.612 188.892S0 164.194 0 128.414c0-33.817 13.146-63.377 30.015-82.649l60.318 50.759z" />
    </svg>
  );
}

export default async function ClinicaPage() {
  const page = await getContentEntry("clinica");

  if (!page || page.contentType !== "page") notFound();

  const officialAddress = "Centro de Odontologia Estética Drª Sara Michelon, SC-403, 6201 - 218 - Ingleses Norte, Florianópolis - SC, 88058-001";
  const encodedAddress = encodeURIComponent(officialAddress);
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;
  const uberUrl = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[nickname]=${encodeURIComponent("Centro de Odontologia Estética Drª Sara Michelon")}&dropoff[formatted_address]=${encodeURIComponent("SC-403, 6201 - 218 - Ingleses Norte, Florianópolis - SC, 88058-001")}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <>
      {/* 1. Hero Institucional com Art Direction */}
      <section className="relative overflow-hidden bg-[var(--color-pink)]">
        <picture className="absolute inset-0 block h-full w-full pointer-events-none">
          <source
            media="(max-width: 767px)"
            srcSet="/images/real/clinica/hero-clinica-mobile.webp"
            width={941}
            height={1672}
          />
          <img
            src="/images/real/clinica/hero-clinica-desktop.webp"
            alt="Dra. Sara Michelon no consultório da clínica odontológica nos Ingleses"
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
          <div className="flex flex-col justify-end min-h-[460px] pt-[48vw] pb-6 sm:min-h-[480px] sm:pt-[38vw] sm:pb-7 md:min-h-[420px] md:pt-8 md:pb-8 lg:min-h-[480px] lg:justify-center lg:py-10">
            <div className="max-w-xl md:max-w-lg lg:max-w-[54%]">
              <Breadcrumbs
                hideCurrentOnMobile
                className="mb-2.5 sm:mb-4"
                items={[
                  {label: "Início", href: "/"},
                  {label: "A clínica"},
                ]}
              />
              <p className="mb-2 sm:mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-mauve)]">
                {page.eyebrow}
              </p>
              <h1 className="font-title text-balance text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] tracking-[-0.02em] text-[var(--color-primary)]">
                {page.title}
              </h1>
              <p className="mt-2.5 sm:mt-3.5 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-[var(--color-muted)]">
                {page.description}
              </p>
              <div className="mt-5 sm:mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#tour-virtual" variant="primary">
                  Conhecer a clínica ↓
                </ButtonLink>
                <ButtonLink href="/contato" variant="secondary">
                  Agendar uma avaliação
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Destaque de Estrutura */}
      <Section className="py-4 sm:py-6">
        <Container className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2">
          <ImageFrame
            src="/images/real/clinica/clinic-consultorio-1-novo.webp"
            alt="Consultório 1 da clínica Dra. Sara Michelon com nova cadeira odontológica ergonômica"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="min-h-[340px] lg:min-h-[380px]"
            imageClassName="object-top"
          />
          <div className="lg:px-8">
            <Eyebrow>O espaço</Eyebrow>
            <Heading>Ambientes pensados para o cuidado clínico</Heading>
            <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-[var(--color-muted)]">
              A experiência começa no acolhimento e segue por todas as etapas do atendimento. As imagens desta página pertencem ao acervo real da clínica, nos Ingleses.
            </p>
            <p className="mt-3 leading-6 sm:leading-7 text-[var(--color-muted)]">
              Cada recurso disponível participa do planejamento conforme a necessidade do caso, integrando ergonomia, biossegurança rigorosa e diagnóstico digital.
            </p>
            <div className="mt-6 flex flex-wrap gap-3.5">
              <ButtonLink href="#tour-virtual" variant="primary">
                Fazer Tour Virtual pela Clínica ↓
              </ButtonLink>
              <ButtonLink href="/contato" variant="secondary">
                Agendar uma avaliação
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. O TOUR VIRTUAL GUIADO POR AMBIENTES (Interativo, Mobile-First com Hotspots) */}
      <VirtualTour />

      {/* 4. PILARES CLÍNICOS DA MATRIZ: ESTRUTURA, TECNOLOGIA & BIOSSEGURANÇA */}
      <Section className="bg-[var(--color-primary)] py-6 text-white sm:py-8">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow light>Pilares de Atendimento</Eyebrow>
            <Heading as="h2" className="text-white">
              Estrutura, Tecnologia e Biossegurança a Serviço do Seu Cuidado
            </Heading>
            <p className="mt-4 text-base leading-7 text-white/75 sm:text-lg">
              Nosso espaço foi desenhado para unir rigor técnico e tranquilidade. Cada detalhe da sala 218 reflete o compromisso com a sua saúde e bem-estar.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Pilar 1: Estrutura */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-xl">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                </div>
                <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Pilar 01</span>
                <h3 className="mt-2 font-title text-2xl text-white">Estrutura & Conforto</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Ambientes privativos, climatizados e com acústica planejada na Torre Comercial do Ingleses Saúde & Office. Acessibilidade total com elevadores e estacionamento rotativo.
                </p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <span className="text-xs font-medium text-white/60">Privacidade, ergonomia e acolhimento</span>
              </div>
            </div>

            {/* Pilar 2: Tecnologia */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-xl">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Pilar 02</span>
                <h3 className="mt-2 font-title text-2xl text-white">Tecnologia & Precisão</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Integração de diagnóstico digital, escaneamento intraoral e tomografia computadorizada. Planejamento 3D para intervenções minimamente invasivas e resultados previsíveis.
                </p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <span className="text-xs font-medium text-white/60">Diagnóstico digital e conservador</span>
              </div>
            </div>

            {/* Pilar 3: Biossegurança */}
            <div className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-xl">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Pilar 03</span>
                <h3 className="mt-2 font-title text-2xl text-white">Biossegurança Rigorosa</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Processos hospitalares de assepsia e esterilização monitorada em autoclave. Barreiras de proteção individuais, materiais descartáveis e rastreabilidade sanitária total.
                </p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <span className="text-xs font-medium text-white/60">Controle sanitário em nível hospitalar</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>


      {/* 5. LOCALIZAÇÃO, MAPA & HUB DE MOBILIDADE NA PÁGINA DA CLÍNICA */}
      <Section className="border-t border-[var(--color-border)] bg-[var(--color-surface-strong)] py-8 sm:py-10">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Localização & Acesso</Eyebrow>
              <Heading as="h2">Como Chegar ao Nosso Espaço</Heading>
              <p className="mt-5 text-base leading-7 text-[var(--color-muted)] sm:text-lg">
                Situada no complexo empresarial <strong>Ingleses Saúde & Office</strong>, na Rodovia Armando Calil Bulos, 6201 (SC-403). Fácil acesso para quem está nos Ingleses, Canasvieiras, Jurerê e demais regiões do Norte da Ilha.
              </p>

              {/* Informações Práticas de Chegada */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-primary)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold text-[var(--color-ink)]">Centro de Odontologia Estética Drª Sara Michelon</p>
                    <p className="text-[var(--color-muted)]">SC-403, 6201 - 218 - Ingleses Norte, Florianópolis — SC, 88058-001</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-primary)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V14.25m11.25-6.75h4.125" />
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold text-[var(--color-ink)]">Estacionamento & Acessibilidade</p>
                    <p className="text-[var(--color-muted)]">Vagas rotativas convenientes no complexo e elevadores para cadeirantes.</p>
                  </div>
                </div>
              </div>

              {/* Botões de Mobilidade em 1 Clique */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                  Iniciar Rota com 1 Toque:
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-event="directions_click"
                    data-track-location="clinica_waze"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#33ccff]/40 bg-white px-4 py-2.5 text-xs font-bold text-[#0088b8] shadow-sm transition-all hover:bg-[#33ccff]/10 hover:shadow"
                  >
                    <WazeMiniLogo className="h-4 w-4 shrink-0" />
                    <span>Waze</span>
                  </a>
                  <a
                    href={uberUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-event="directions_click"
                    data-track-location="clinica_uber"
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow"
                  >
                    <UberMiniLogo className="h-3.5 w-auto shrink-0" />
                    <span>Uber (Destino Pronto)</span>
                  </a>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-event="directions_click"
                    data-track-location="clinica_google_maps"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-white px-4 py-2.5 text-xs font-bold text-emerald-800 shadow-sm transition-all hover:bg-emerald-50 hover:shadow"
                  >
                    <GoogleMapsMiniLogo className="h-4 w-auto shrink-0" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Mapa Interativo Integrado */}
            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 text-xs font-semibold text-[var(--color-ink)]">
                <span>Centro de Odontologia Estética Drª Sara Michelon — Sala 218</span>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--color-primary)] hover:underline hover:text-[var(--color-primary-dark)]"
                >
                  <span>Abrir no Maps</span>
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] min-h-[320px]">
                <iframe
                  title="Localização do Centro de Odontologia Estética Drª Sara Michelon"
                  src={`https://maps.google.com/maps?q=${encodedAddress}&hl=pt-BR&z=16&output=embed`}
                  width="100%"
                  height="100%"
                  style={{border: 0}}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection heading="Conheça a clínica em uma avaliação" />
    </>
  );
}

