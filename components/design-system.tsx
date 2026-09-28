import Image, {type ImageProps} from "next/image";
import Link from "next/link";
import type {ReactNode} from "react";
import type {Professional} from "@/lib/content/types";
import {getTreatmentBanner, getTreatmentThumbnailPosition} from "@/lib/treatment-banners";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Container({children, className}: {children: ReactNode; className?: string}) {
  return <div className={classes("mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

export function Section({children, className, id}: {children: ReactNode; className?: string; id?: string}) {
  const hasCustomPadding = className && (className.includes("py-") || className.includes("pt-") || className.includes("pb-"));
  return <section id={id} className={classes(!hasCustomPadding && "py-4 sm:py-5 lg:py-7", className)}>{children}</section>;
}

export function Eyebrow({children, light = false}: {children: ReactNode; light?: boolean}) {
  return <p className={classes("mb-2.5 sm:mb-3 text-xs font-semibold uppercase tracking-[0.24em]", light ? "text-white/70" : "text-[var(--color-mauve)]")}>{children}</p>;
}

export function Heading({as: Tag = "h2", children, className}: {as?: "h1" | "h2" | "h3"; children: ReactNode; className?: string}) {
  return <Tag className={classes("font-title text-balance leading-[1.08] tracking-[-0.02em] text-[var(--color-primary)]", Tag === "h1" ? "text-4xl sm:text-5xl lg:text-[4.5rem]" : Tag === "h2" ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl", className)}>{children}</Tag>;
}

export function ButtonLink({href, children, variant = "primary", event = "appointment_cta_click", location, className}: {href: string; children: ReactNode; variant?: "primary" | "secondary" | "light"; event?: string; location?: string; className?: string}) {
  return (
    <Link
      href={href}
      data-track-event={event}
      data-track-location={location}
      className={classes(
        "group inline-flex min-h-12 items-center justify-center border px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]",
        variant === "primary" && "border-[var(--color-primary)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
        variant === "secondary" && "border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-surface)]",
        variant === "light" && "border-white bg-white text-[var(--color-primary)] hover:bg-[var(--color-pink)]",
        className,
      )}
    >
      <span>{children}</span>
      <svg className="ml-2.5 h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </Link>
  );
}

export function ImageFrame({className, imageClassName, alt, ...props}: ImageProps & {className?: string; imageClassName?: string}) {
  return (
    <div className={classes("relative overflow-hidden bg-[var(--color-surface)]", className)}>
      <Image {...props} alt={alt} className={classes("object-cover", imageClassName)} />
    </div>
  );
}

export function Breadcrumbs({items, light = false, className, hideCurrentOnMobile = false}: {items: {label: string; href?: string}[]; light?: boolean; className?: string; hideCurrentOnMobile?: boolean}) {
  return (
    <nav aria-label="Navegação estrutural" className={classes("text-xs sm:text-sm", light ? "text-white/70" : "text-[var(--color-muted)]", className ?? "mb-4 sm:mb-5")}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isCurrent = !item.href;
          return (
            <li
              key={item.label}
              className={classes(
                "flex items-center gap-2",
                isCurrent && hideCurrentOnMobile && "hidden sm:flex",
              )}
            >
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className={classes(
                    light ? "text-white/35" : "text-[var(--color-border)]",
                    isCurrent && hideCurrentOnMobile && "hidden sm:inline",
                  )}
                >
                  /
                </span>
              )}
              {item.href ? (
                <Link className={classes("transition-colors", light ? "hover:text-white" : "hover:text-[var(--color-primary)]")} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className={classes("font-medium", light ? "text-white" : "text-[var(--color-primary)]")}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function TreatmentCard({index, title, description, href}: {index: string; title: string; description: string; href?: string}) {
  const content = (
    <>
      <span className="text-xs tracking-[0.2em] text-[var(--color-mauve)]">{index}</span>
      <h3 className="mt-10 font-title text-2xl text-[var(--color-primary)]">{title}</h3>
      <p className="mt-4 leading-7 text-[var(--color-muted)]">{description}</p>
      {href && <span className="mt-8 inline-block text-sm font-semibold text-[var(--color-primary)]">Conhecer tratamento <span aria-hidden="true">→</span></span>}
    </>
  );

  const className = "group block border-t border-[var(--color-border)] py-8 transition-colors hover:border-[var(--color-primary)]";
  return href ? <Link href={href} className={className}>{content}</Link> : <article className={className}>{content}</article>;
}

export interface TreatmentOverviewCardProps {
  index: string;
  title: string;
  description: string;
  href: string;
  slug?: string;
  priority?: boolean;
}

export function TreatmentOverviewCard({
  index,
  title,
  description,
  href,
  slug: explicitSlug,
  priority = false,
}: TreatmentOverviewCardProps) {
  const slug = explicitSlug ?? href.replace(/^\//, "");
  const banner = getTreatmentBanner(slug);
  const position = getTreatmentThumbnailPosition(slug);

  return (
    <article className="group relative flex flex-col border-t border-[var(--color-border)] pt-6 pb-8 transition-colors hover:border-[var(--color-primary)]/40">
      {/* 1. Thumbnail com Aspect Ratio 4:3 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-pink)]">
        {banner ? (
          <Image
            src={banner.desktop}
            alt={banner.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
            style={{objectPosition: position}}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--color-surface-strong)]" aria-hidden="true">
            <span className="font-title text-3xl text-[var(--color-mauve)]/30">{index}</span>
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[var(--color-primary)]/0 transition-colors duration-300 group-hover:bg-[var(--color-primary)]/[0.03]"
        />
      </div>

      {/* 2. Conteúdo Editorial */}
      <div className="mt-5 flex flex-1 flex-col">
        <span className="text-xs font-semibold tracking-[0.2em] text-[var(--color-mauve)]">
          {index}
        </span>

        <h3 className="mt-3 font-title text-xl sm:text-2xl text-[var(--color-primary)]">
          <Link
            href={href}
            className="before:absolute before:inset-0 before:z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
          >
            {title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm sm:text-base leading-6 sm:leading-7 text-[var(--color-muted)]">
          {description}
        </p>

        <div className="mt-6 pt-2">
          <span
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)]"
            aria-hidden="true"
          >
            <span>Conhecer tratamento</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

export function ProfessionalCard({
  name,
  role,
  image,
  profileHref,
  cro,
  graduation,
}: {
  name: string;
  role: string;
  image?: string;
  profileHref?: string;
  cro?: string;
  graduation?: string;
}) {
  const content = (
    <>
      {image ? (
        <ImageFrame
          src={image}
          alt={`Retrato profissional de ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="aspect-[4/5] w-full"
          imageClassName="object-top"
        />
      ) : (
        <div className="aspect-[4/5] w-full bg-[var(--color-surface-strong)] flex items-center justify-center text-[var(--color-muted)] font-serif text-3xl" aria-hidden="true">
          {name.charAt(0)}
        </div>
      )}
      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="font-title text-2xl leading-tight text-[var(--color-primary)] min-h-[3.6rem] flex items-start">
          {name}
        </h3>
        <p className="mt-1 text-sm font-medium leading-5 text-[var(--color-mauve)] min-h-[2.5rem] flex items-start">
          {role}
        </p>
        {(cro || graduation) && (
          <div className="mt-2 space-y-0.5 text-xs text-[var(--color-muted)] min-h-[2.5rem]">
            {cro && <p className="font-mono tracking-wide">{cro}</p>}
            {graduation && <p>{graduation}</p>}
          </div>
        )}
        {profileHref && (
          <div className="mt-auto pt-4">
            <span className="inline-flex items-center text-sm font-semibold text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-primary-hover)]">
              <span>Conhecer perfil</span>
              <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </span>
          </div>
        )}
      </div>
    </>
  );
  return profileHref ? (
    <Link href={profileHref} className="group flex flex-col h-full">
      {content}
    </Link>
  ) : (
    <article className="group flex flex-col h-full">{content}</article>
  );
}

export function ArticleCard({category, title, description, href, meta}: {category: string; title: string; description: string; href?: string; meta?: string}) {
  const content = (
    <>
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-mauve)]">{category}</span>
      <h3 className="mt-4 font-title text-2xl text-[var(--color-primary)]">{title}</h3>
      <p className="mt-3 leading-7 text-[var(--color-muted)]">{description}</p>
      {meta && <p className="mt-5 text-xs text-[var(--color-muted)]">{meta}</p>}
      {href && <span className="mt-6 inline-block text-sm font-semibold text-[var(--color-primary)]">Ler conteúdo <span aria-hidden="true">→</span></span>}
    </>
  );
  const className = "block border-t border-[var(--color-border)] py-7 transition-colors hover:border-[var(--color-primary)]";
  return href ? <Link href={href} className={className}>{content}</Link> : <article className={className}>{content}</article>;
}

export function ProfessionalBlock({professional}: {professional: Professional}) {
  return (
    <Section className="bg-[var(--color-surface)]">
      <Container className="grid items-center gap-8 lg:grid-cols-[0.42fr_0.58fr]">
        {professional.image ? <ImageFrame src={professional.image} alt={`Retrato profissional de ${professional.name}`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="aspect-[4/5] max-h-[440px]" imageClassName="object-top" /> : <div className="min-h-60 bg-[var(--color-surface-strong)]" aria-hidden="true" />}
        <div className="lg:px-8">
          <Eyebrow>Direção Clínica e Responsabilidade Técnica</Eyebrow>
          <Heading>{professional.name}</Heading>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-mauve)]">{professional.role}</p>
          {(professional.cro || professional.graduation) && (
            <p className="mt-1.5 text-xs text-[var(--color-muted)]">
              {[professional.cro, professional.graduation].filter(Boolean).join(" • ")}
            </p>
          )}
          {professional.summary && <p className="mt-4 max-w-xl text-base leading-7 text-[var(--color-muted)]">{professional.summary}</p>}
          {professional.profileHref && <div className="mt-5"><ButtonLink href={professional.profileHref} variant="secondary" event="professional_profile_click" location="treatment_professional">Conhecer perfil</ButtonLink></div>}
        </div>
      </Container>
    </Section>
  );
}

export function FAQ({items}: {items: {question: string; answer: string}[]}) {
  return (
    <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
      {items.map((item) => (
        <details key={item.question} className="group py-3.5 sm:py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-title text-xl text-[var(--color-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]">
            {item.question}
            <span aria-hidden="true" className="text-2xl font-light transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-3xl pt-2.5 text-sm sm:text-base leading-relaxed text-[var(--color-muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CTASection({
  heading = "Seu tratamento começa por uma avaliação completa",
  text = "Converse com a equipe para organizar o diagnóstico, a indicação e os próximos passos.",
  eyebrow = "Planejamento individual",
}: {
  heading?: string;
  text?: string;
  eyebrow?: string;
}) {
  const whatsappUrl = `https://wa.me/5548985063001?text=${encodeURIComponent(
    "Olá! Gostaria de agendar uma avaliação com a Dra. Sara Michelon nos Ingleses."
  )}`;

  return (
    <Section className="bg-[var(--color-primary)] py-5 text-white sm:py-6 lg:py-7">
      <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Coluna Esquerda: Contexto, Autoridade e Pilares Clínicos (7 cols) */}
        <div className="lg:col-span-7">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <Heading className="text-white">{heading}</Heading>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80 sm:leading-7">
            {text}
          </p>

          {/* Pilares Clínicos de Confiança com Ícones SVG */}
          <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-white/90">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Hora Marcada</h4>
                <p className="mt-0.5 text-xs leading-5 text-white/70">Atendimento pontual com tempo reservado e sem filas.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-white/90">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693l-1.57-.393m15.6 0l1.196 4.786A2.25 2.25 0 0118.81 22.5H5.19a2.25 2.25 0 01-2.186-2.821l1.196-4.786" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Planejamento</h4>
                <p className="mt-0.5 text-xs leading-5 text-white/70">Tecnologia digital de imagem e plano preventivo.</p>
              </div>
            </div>

            <Link
              href="/contato"
              data-track-event="directions_click"
              data-track-location="cta_section_pillar_map"
              className="group -m-1 flex items-start gap-3 rounded-lg p-1 transition-colors hover:bg-white/[0.04]"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-white/90 transition-colors group-hover:bg-white/[0.15]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <h4 className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white">
                  <span>Norte da Ilha</span>
                  <svg className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </h4>
                <p className="mt-0.5 text-xs leading-5 text-white/70 transition-colors group-hover:text-white/90">Sala 218 no Ingleses Office com estacionamento.</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Coluna Direita: Card de Conversão Direto (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-white/10 bg-black/15 p-5 sm:p-6 shadow-xl">
            <h3 className="font-title text-xl sm:text-2xl font-normal text-white">
              Inicie seu Atendimento
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/75 sm:text-sm">
              Converse diretamente com nossa equipe pelo WhatsApp para verificar disponibilidades e agendar sua avaliação individual:
            </p>

            {/* Ações de Conversão */}
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track-event="whatsapp_click"
                data-track-location="cta_section_whatsapp"
                className="group flex min-h-11 w-full items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[var(--color-primary)] shadow-md transition-all hover:bg-neutral-100 hover:shadow-lg"
              >
                <svg className="h-4 w-4 shrink-0 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Conversar pelo WhatsApp</span>
              </a>

              {/* Ação Secundária Discreta: Localização, Rotas e Mapa */}
              <Link
                href="/contato"
                data-track-event="directions_click"
                data-track-location="cta_section_map"
                className="group flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white/80 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <svg className="h-3.5 w-3.5 shrink-0 text-white/60 transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Ver localização, rotas e mapa</span>
                <svg className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>

            {/* Micro Informações no Rodapé do Card */}
            <div className="mt-3.5 border-t border-white/10 pt-3 text-center">
              <p className="text-xs text-white/70">
                Segunda a Sexta · 09h às 12h e 14h às 19h · (48) 98506-3001
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function LocalClinicBlock({heading = "Clínica nos Ingleses, Norte da Ilha"}: {heading?: string}) {
  return (
    <div className="grid overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] shadow-sm lg:grid-cols-2">
      <ImageFrame
        src="/images/real/clinica/clinic-recepcao-nova.webp"
        alt="Recepção moderna e acolhedora da clínica Dra. Sara Michelon nos Ingleses"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]"
        imageClassName="object-cover object-center"
      />
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <Eyebrow>Localização</Eyebrow>
        <Heading as="h3">{heading}</Heading>
        <p className="mt-4 max-w-lg text-sm sm:text-base leading-6 sm:leading-7 text-[var(--color-muted)]">
          Atendimento odontológico nos Ingleses, Norte da Ilha de Florianópolis, no complexo empresarial Ingleses Saúde &amp; Office, sala 218, com avaliação, planejamento e acompanhamento individual.
        </p>
        <div className="mt-6">
          <ButtonLink href="/contato" variant="secondary" event="directions_click" location="local_block">
            Ver contato e localização
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export function Gallery({images}: {images: {src: string; alt: string}[]}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <ImageFrame key={image.src} src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className={classes("aspect-[4/5]", index === 0 && "sm:col-span-2 sm:aspect-[8/5]")} />
      ))}
    </div>
  );
}

export function SEOJsonLd({data}: {data: Record<string, unknown> | Record<string, unknown>[]}) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: json}} />;
}

export function SocialChannelsSection({className}: {className?: string}) {
  return (
    <Section className={classes("border-t border-[var(--color-border)] bg-[var(--color-surface)] py-10 sm:py-14", className)}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Conexão & Conteúdo</Eyebrow>
          <Heading as="h2">Acompanhe Nosso Trabalho nas Redes</Heading>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--color-muted)]">
            Siga nossos canais oficiais para acompanhar casos clínicos, orientações de cuidados preventivos e o dia a dia da clínica nos Ingleses.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {/* Card Instagram */}
          <a
            href="https://www.instagram.com/drasaramichelon"
            target="_blank"
            rel="noopener noreferrer"
            data-track-event="social_click"
            data-track-location="global_instagram_card"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E1306C]/50 hover:shadow-xl"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-tr from-[#FFDC80]/20 via-[#E1306C]/15 to-[#833AB4]/20 blur-xl transition-all group-hover:scale-125" />
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FD1D1D]/10 via-[#E1306C]/10 to-[#833AB4]/10 text-[#E1306C] transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="rounded-full bg-[#E1306C]/10 px-3 py-1 text-xs font-semibold text-[#E1306C]">
                  Instagram
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-[var(--color-ink)]">@drasaramichelon</h3>
              <p className="mt-2 text-xs sm:text-sm leading-6 text-[var(--color-muted)]">
                Publicações e vídeos sobre tratamentos estéticos, procedimentos faciais e bastidores clínicos.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#E1306C] transition-colors group-hover:text-[#c1275d]">
              <span>Seguir no Instagram</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
          </a>

          {/* Card Facebook */}
          <a
            href="https://www.facebook.com/odontoesteticadrasara"
            target="_blank"
            rel="noopener noreferrer"
            data-track-event="social_click"
            data-track-location="global_facebook_card"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1877F2]/50 hover:shadow-xl"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#1877F2]/10 blur-xl transition-all group-hover:bg-[#1877F2]/20" />
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1877F2]/10 text-[#1877F2] transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="rounded-full bg-[#1877F2]/10 px-3 py-1 text-xs font-semibold text-[#1877F2]">
                  Facebook
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-[var(--color-ink)]">Centro de Odontologia Estética Dra Sara Michelon</h3>
              <p className="mt-2 text-xs sm:text-sm leading-6 text-[var(--color-muted)]">
                Página institucional com novidades, comunicados e artigos sobre saúde bucal e estética.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#1877F2] transition-colors group-hover:text-[#125ec0]">
              <span>Acessar Página no Facebook</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
          </a>
        </div>
      </Container>
    </Section>
  );
}

export {ProcedureCarousel} from "@/components/procedure-carousel";
export type {ProcedureItem, ProcedureCarouselProps} from "@/components/procedure-carousel";


