"use client";

import Link from "next/link";
import {Container} from "@/components/design-system";

export type ProcedureItem = {
  title: string;
  description: string;
  href: string;
};

export type ProcedureCarouselProps = {
  title?: string;
  eyebrow?: string;
  items?: ProcedureItem[];
  currentSlug?: string;
  relatedTreatments?: {title: string; href: string; description?: string}[];
  className?: string;
  id?: string;
};

export const defaultStrategicProcedures: ProcedureItem[] = [
  {
    title: "Facetas e Coroas de Porcelana",
    description:
      "As facetas e coroas de porcelana são indicadas para reabilitar dentes com alterações estéticas ou estruturais. Oferecem alta resistência, durabilidade e excelente estética, proporcionando um sorriso natural e funcional.",
    href: "/lentes-de-contato-dental",
  },
  {
    title: "Clareamento Dental",
    description:
      "O clareamento dental é um tratamento estético indicado para devolver luminosidade ao sorriso. Realizado de forma segura e supervisionada, promove a redução do escurecimento dental sem comprometer a estrutura dos dentes.",
    href: "/clareamento-dental",
  },
  {
    title: "Invisalign",
    description:
      "O Invisalign é um sistema de alinhadores transparentes que corrige o posicionamento dos dentes de maneira discreta e confortável. O tratamento é planejado digitalmente, permitindo previsibilidade e acompanhamento de cada etapa.",
    href: "/invisalign",
  },
  {
    title: "Implantes Dentários",
    description:
      "Planejamento cirúrgico e protético guiado para reabilitação funcional e estética com reposição segura de dentes e preservação da estrutura óssea.",
    href: "/implantes-dentarios",
  },
  {
    title: "Harmonização Facial",
    description:
      "Avaliação global das proporções e contornos faciais, buscando equilíbrio e naturalidade através de planejamento anatômico sob medida.",
    href: "/harmonizacao-facial",
  },
  {
    title: "Facetas de Resina",
    description:
      "Abordagem conservadora e personalizada para redefinir forma, proporção e luminosidade dental com intervenção minimamente invasiva.",
    href: "/facetas-de-resina",
  },
  {
    title: "Prótese Protocolo",
    description:
      "Reabilitação fixa sobre implantes indicada para restabelecer a estabilidade mastigatória completa e a estética do sorriso.",
    href: "/protese-protocolo",
  },
];

function getStrategicProcedures(
  currentSlug?: string,
  explicitRelated?: {title: string; href: string; description?: string}[]
): ProcedureItem[] {
  const combined: ProcedureItem[] = [];
  const addedHrefs = new Set<string>();

  if (currentSlug) {
    addedHrefs.add("/" + currentSlug.replace(/^\//, ""));
  }

  if (explicitRelated && explicitRelated.length > 0) {
    for (const item of explicitRelated) {
      if (!addedHrefs.has(item.href)) {
        combined.push({
          title: item.title,
          description:
            item.description ??
            "Entenda como esta área se conecta ao planejamento odontológico e estético individual.",
          href: item.href,
        });
        addedHrefs.add(item.href);
      }
    }
  }

  for (const item of defaultStrategicProcedures) {
    if (!addedHrefs.has(item.href)) {
      combined.push(item);
      addedHrefs.add(item.href);
    }
  }

  return combined;
}

export function ProcedureCarousel({
  title = "CONHEÇA OUTROS PROCEDIMENTOS",
  eyebrow,
  items,
  currentSlug,
  relatedTreatments,
  className = "",
  id,
}: ProcedureCarouselProps) {
  const baseItems =
    items && items.length > 0
      ? items
      : getStrategicProcedures(currentSlug, relatedTreatments);

  if (!baseItems || baseItems.length === 0) return null;

  // Ensure an even sequence so dark/white rhythm is seamless across the infinite loop
  const normalizedItems =
    baseItems.length % 2 === 0 ? baseItems : [...baseItems, ...baseItems];

  // Duplicate for continuous seamless marquee (0% -> -50%)
  const displayItems = [...normalizedItems, ...normalizedItems];

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden bg-[var(--color-primary)] py-5 text-white sm:py-6 lg:py-7 ${className}`}
    >
      {/* Centered Header */}
      <Container className="text-center">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
            {eyebrow}
          </p>
        )}
        <h2 className="font-title text-xl tracking-[0.14em] text-white sm:text-2xl lg:text-3xl">
          {title}
        </h2>
      </Container>

      {/* Full-width Marquee Track with Alpha Fade Mask */}
      <div className="carousel-fade-mask relative mt-4 w-full overflow-hidden sm:mt-5">
        <div
          tabIndex={0}
          aria-label="Carrossel contínuo de procedimentos"
          className="animate-marquee-continuous flex gap-4 py-2.5 sm:gap-5"
        >
          {displayItems.map((item, index) => {
            // Alternating rhythm: even index = dark plum card, odd index = white card
            const isWhiteCard = index % 2 === 1;

            return (
              <article
                key={item.href + index}
                className={`group relative flex w-[280px] shrink-0 flex-col justify-between rounded-3xl p-5 transition-all duration-300 sm:w-[320px] md:w-[340px] sm:p-6 ${
                  isWhiteCard
                    ? "bg-white text-[var(--color-ink)] shadow-[0_16px_38px_rgba(0,0,0,0.25)] hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(0,0,0,0.32)]"
                    : "border border-white/15 bg-[#523348]/90 text-white shadow-[0_14px_32px_rgba(33,23,30,0.3)] backdrop-blur-xs hover:-translate-y-1.5 hover:border-white/35 hover:bg-[#5b3850]"
                }`}
              >
                {/* Card Title & Content */}
                <div>
                  <h3
                    className={`font-title text-center text-lg leading-snug sm:text-xl ${
                      isWhiteCard ? "text-[var(--color-primary)]" : "text-white"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-3 text-center text-xs sm:text-sm leading-relaxed ${
                      isWhiteCard ? "text-[var(--color-muted)]" : "text-white/80"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Card CTA Link */}
                <div className="mt-4 flex justify-center border-t border-current/10 pt-3.5">
                  <Link
                    href={item.href}
                    className={`group/link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                      isWhiteCard
                        ? "text-[var(--color-primary)] hover:text-[var(--color-mauve)]"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/link:translate-x-1"
                    >
                      →
                    </span>
                    <span>SAIBA MAIS</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
