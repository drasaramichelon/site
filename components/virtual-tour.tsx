"use client";

import {useState, useEffect, useRef, useCallback} from "react";
import Image from "next/image";
import Link from "next/link";
import {Container, Heading, Section} from "@/components/design-system";

export interface JourneyImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface JourneyStep {
  id: string;
  stepNumber: string;
  timelineLabel: string;
  phaseBadge: string;
  roomName: string;
  subtitle: string;
  narrative: string;
  pillTag: string;
  images: JourneyImage[];
  features: {
    label: string;
    detail: string;
  }[];
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "chegada",
    stepNumber: "01",
    timelineLabel: "01 · Chegada & Recepção",
    phaseBadge: "PASSO 01 DE 05 · ACESSO & RECEPÇÃO",
    roomName: "Acesso Reservado & Recepção Exclusiva",
    subtitle: "Complexo Ingleses Saúde & Office · 2º Andar, Sala 218",
    narrative:
      "Sua experiência começa com discrição, segurança e comodidade. Localizada no Norte da Ilha com estacionamento rotativo no complexo e elevadores diretos ao segundo andar, a recepção da clínica foi planejada para receber cada paciente com pontualidade e tranquilidade, sem salas de espera superlotadas.",
    pillTag: "Acesso & Pontualidade",
    images: [
      {
        src: "/images/real/clinica/clinic-recepcao-nova.webp",
        alt: "Recepção moderna e ampla da clínica Dra. Sara Michelon na Sala 218",
        caption: "Recepção principal espaçosa e acolhedora no 2º andar da torre comercial",
      },
      {
        src: "/images/real/clinica/clinic-counter.webp",
        alt: "Balcão de acolhimento e suporte administrativo com equipe dedicada",
        caption: "Balcão de atendimento e orientação ao paciente",
      },
      {
        src: "/images/real/clinica/clinic-recepcao-lado-nova.webp",
        alt: "Ambiente de recepção amplo, moderno e organizado em ângulo lateral",
        caption: "Ambiente reservado com atendimento por hora marcada",
      },
      {
        src: "/images/real/clinica/clinica-entrada-nova.webp",
        alt: "Acesso privativo à sala 218 da clínica Dra. Sara Michelon",
        caption: "Acesso privativo e confortável no Ingleses Saúde & Office",
      },
    ],
    features: [
      {label: "Torre Comercial", detail: "2º Andar, sala privativa 218 com acessibilidade total"},
      {label: "Acesso Controlado", detail: "Ambiente reservado com isolamento acústico e privacidade"},
      {label: "Hora Marcada", detail: "Atendimento pontual com agenda organizada sem espera prolongada"},
    ],
  },
  {
    id: "acolhimento",
    stepNumber: "02",
    timelineLabel: "02 · Lounge & Boas-Vindas",
    phaseBadge: "PASSO 02 DE 05 · LOUNGE & DESACELERAÇÃO",
    roomName: "Lounge Sereno & Cantinho do Café",
    subtitle: "Um espaço pensado para desacelerar antes da consulta",
    narrative:
      "A odontologia contemporânea começa pelo bem-estar emocional. Antes de iniciar qualquer conversa clínica, o paciente é recebido em um ambiente com iluminação indireta, climatização agradável e poltronas confortáveis, acompanhado de café gourmet, chás selecionados e água fresca.",
    pillTag: "Conforto & Acolhimento",
    images: [
      {
        src: "/images/real/clinica/clinic-coffee-lounge.webp",
        alt: "Cantinho do café e lounge acolhedor da clínica da Dra. Sara Michelon",
        caption: "Lounge de espera humanizado com café especial, chás e climatização suave",
      },
    ],
    features: [
      {label: "Cantinho do Café", detail: "Café especial, chás selecionados e água fresca à disposição"},
      {label: "Conforto Térmico & Acústico", detail: "Ambiente suave para desacelerar com tranquilidade"},
      {label: "Acolhimento Humanizado", detail: "Equipe preparada para orientar com atenção e cuidado"},
    ],
  },
  {
    id: "consultorios",
    stepNumber: "03",
    timelineLabel: "03 · Consultórios Clínicos",
    phaseBadge: "PASSO 03 DE 05 · CUIDADO & ATENDIMENTO",
    roomName: "Consultórios Integrados de Alta Performance",
    subtitle: "Ergonomia internacional, precisão técnica e conforto anatômico",
    narrative:
      "O espaço onde a saúde, a estética e a função mastigatória são conduzidas com excelência. Os consultórios contam com novas cadeiras odontológicas anatômicas com múltiplos ajustes, iluminação cirúrgica LED precisa sem sombras e estrutura completa para procedimentos estéticos, restauradores e cirúrgicos com máximo relaxamento.",
    pillTag: "Ergonomia & Alta Tecnologia",
    images: [
      {
        src: "/images/real/clinica/clinic-consultorio-1-novo.webp",
        alt: "Consultório odontológico 1 com nova cadeira ergonômica anatômica e mesa integrada",
        caption: "Consultório 1: Cadeira odontológica de última geração com foco cirúrgico LED",
      },
      {
        src: "/images/real/clinica/clinic-consultorio-1-angulo.webp",
        alt: "Consultório 1 em ângulo clínico com estrutura ergonômica completa",
        caption: "Consultório 1: Ambiente preparado para máxima biossegurança e precisão",
      },
      {
        src: "/images/real/clinica/clinic-consultorio-1-b.webp",
        alt: "Consultório odontológico com visão integrada do atendimento",
        caption: "Consultório 1: Ergonomia pensada para o conforto total durante o atendimento",
      },
      {
        src: "/images/real/clinica/clinic-consultorio-2.webp",
        alt: "Consultório odontológico 2 com cadeira moderna e estrutura clínica",
        caption: "Consultório 2: Espaço privativo complementar para especialidades integradas",
      },
      {
        src: "/images/real/clinica/clinic-transicao-alas.webp",
        alt: "Corredor e transição entre as alas e consultórios da clínica",
        caption: "Transição interna entre as salas de consulta e áreas clínicas",
      },
    ],
    features: [
      {label: "Novas Cadeiras Ergonômicas", detail: "Estofamento anatômico para relaxamento contínuo durante o procedimento"},
      {label: "Iluminação Cirúrgica LED", detail: "Foco sem calor e de alta fidelidade cromática para máxima precisão"},
      {label: "Salas Climatizadas", detail: "Consultórios privativos com isolamento acústico e filtragem de ar contínua"},
    ],
  },
  {
    id: "planejamento",
    stepNumber: "04",
    timelineLabel: "04 · Diagnóstico & 3D",
    phaseBadge: "PASSO 04 DE 05 · DIAGNÓSTICO DIGITAL & 3D",
    roomName: "Diagnóstico Digital & Estúdio de Planejamento",
    subtitle: "Previsibilidade visual e decisão compartilhada antes de qualquer intervenção",
    narrative:
      "Aqui o diagnóstico e a estética se unem com rigor científico. Fotografias de alta resolução, escaneamento intraoral tridimensional e tomografias computadorizadas são analisados pela Dra. Sara Michelon em telas dedicadas, permitindo ao paciente visualizar seu caso, compreender os caminhos terapêuticos e participar ativamente das decisões.",
    pillTag: "Previsibilidade & Transparência",
    images: [
      {
        src: "/images/real/tecnologia/planning-digital-scan.webp",
        alt: "Dra. Sara Michelon durante planejamento odontológico e escaneamento digital 3D",
        caption: "Planejamento digital do sorriso conduzido pela Dra. Sara Michelon",
      },
      {
        src: "/images/real/clinica/clinic-office.webp",
        alt: "Escritório clínico para apresentação de casos, diagnóstico e alinhamento",
        caption: "Escritório clínico privativo para alinhamento detalhado do plano de tratamento",
      },
    ],
    features: [
      {label: "Escaneamento Intraoral 3D", detail: "Captura anatômica digital de altíssima fidelidade sem moldagens desconfortáveis"},
      {label: "Planejamento Visual Transparente", detail: "O paciente compreende cada etapa antes de qualquer procedimento definitivo"},
      {label: "Olhar Multidisciplinar", detail: "Mais de 20 anos de experiência clínica integrando estética e reabilitação oral"},
    ],
  },
  {
    id: "biosseguranca",
    stepNumber: "05",
    timelineLabel: "05 · Biossegurança",
    phaseBadge: "PASSO 05 DE 05 · BIOSSEGURANÇA HOSPITALAR",
    roomName: "Central de Esterilização & Assepsia Rigorosa",
    subtitle: "Protocolos sanitários e de desinfecção em nível hospitalar",
    narrative:
      "A segurança biológica do paciente e da equipe é prioritária e inegociável. Nossa central dedicada de esterilização adota ciclos contínuos de autoclave com monitoramento químico e biológico, barreiras físicas de proteção, materiais descartáveis e rastreabilidade sanitária completa de todo o instrumental cirúrgico.",
    pillTag: "Rastreabilidade & Proteção",
    images: [
      {
        src: "/images/real/clinica/clinic-sterilization.webp",
        alt: "Central de esterilização com autoclave monitorada e fluxo sanitário controlado",
        caption: "Central dedicada de esterilização com fluxo sanitário unidirecional e autoclave",
      },
      {
        src: "/images/real/clinica/clinic-biosecurity.webp",
        alt: "Protocolos rigorosos de assepsia, desinfecção e barreiras de proteção individual",
        caption: "Protocolos rigorosos de assepsia hospitalar e materiais rastreados",
      },
    ],
    features: [
      {label: "Autoclave Monitorada", detail: "Testes biológicos e químicos garantem a esterilização perfeita a cada ciclo"},
      {label: "Instrumentais Lacrados", detail: "Embalagens cirúrgicas estéreis abertas exclusivamente na presença do paciente"},
      {label: "Desinfecção de Superfícies", detail: "Higienização hospitalar rigorosa e troca de barreiras descartáveis a cada atendimento"},
    ],
  },
];

function EnvironmentCarousel({
  images,
  title,
}: {
  images: JourneyImage[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const total = images.length;

  const scrollToSlide = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const targetIndex = (index + total) % total;
    const targetElement = container.children[targetIndex] as HTMLElement;
    if (targetElement) {
      container.scrollTo({
        left: targetElement.offsetLeft,
        behavior: "smooth",
      });
      setActiveIndex(targetIndex);
    }
  }, [total]);

  // Autoplay suave com pausa em interação/hover
  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const interval = setInterval(() => {
      scrollToSlide(activeIndex + 1);
    }, 5500);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, scrollToSlide, total]);

  // Sincronização do slide ativo com scroll manual / touch swipe
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const slideWidth = container.clientWidth;
    if (slideWidth > 0) {
      const newIndex = Math.round(scrollLeft / slideWidth);
      if (newIndex >= 0 && newIndex < total && newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  }, [activeIndex, total]);

  if (total === 1) {
    const img = images[0];
    return (
      <figure className="group">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1120px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          />
          {img.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 sm:p-5">
              <p className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/95 drop-shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--color-gold-light)] shrink-0" />
                <span>{img.caption}</span>
              </p>
            </div>
          )}
        </div>
      </figure>
    );
  }

  return (
    <div
      className="group relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      role="region"
      aria-label={`Galeria de fotos do ambiente: ${title}`}
    >
      {/* Container de Rolagem Suave com CSS Scroll Snap */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, idx) => (
          <div
            key={img.src}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full shrink-0 snap-center snap-always overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 1120px"
              className="object-cover transition-transform duration-500"
            />
            {/* Scrim com Legenda Integrada */}
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 sm:p-6">
                <p className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/95 drop-shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-gold-light)] shrink-0" />
                  <span>{img.caption}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contador Discreto no Topo Direito */}
      <div className="absolute top-3.5 right-3.5 z-10 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-white backdrop-blur-md shadow-sm">
        {activeIndex + 1} / {total}
      </div>

      {/* Botões de Navegação Anterior / Próximo */}
      <button
        type="button"
        onClick={() => scrollToSlide(activeIndex - 1)}
        aria-label="Foto anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-105 active:scale-95 shadow-md focus-visible:outline-2 focus-visible:outline-white opacity-80 group-hover:opacity-100"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => scrollToSlide(activeIndex + 1)}
        aria-label="Próxima foto"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-105 active:scale-95 shadow-md focus-visible:outline-2 focus-visible:outline-white opacity-80 group-hover:opacity-100"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Indicadores de Paginação / Dots */}
      <div className="mt-3.5 flex items-center justify-center gap-1.5 sm:gap-2">
        {images.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => scrollToSlide(dotIdx)}
            aria-label={`Ir para a foto ${dotIdx + 1} de ${total}`}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              dotIdx === activeIndex
                ? "w-7 bg-[var(--color-primary)]"
                : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-muted)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function VirtualTour() {
  const [activeStepId, setActiveStepId] = useState<string>("chegada");

  // Observer para destacar a aba correspondente durante a rolagem natural da página
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = JOURNEY_STEPS.length - 1; i >= 0; i--) {
        const step = JOURNEY_STEPS[i];
        const element = document.getElementById(step.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveStepId(step.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStep = (id: string) => {
    setActiveStepId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // compensação do cabeçalho sticky
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: "smooth"});
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Olá! Conheci os ambientes da clínica pelo site e gostaria de agendar uma avaliação com a Dra. Sara Michelon."
  );

  return (
    <section className="bg-[var(--color-surface)] py-10 sm:py-14" id="tour-virtual">
      <Container>
        {/* 1. Header Editorial da Jornada */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-primary)] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-gold)]" />
            </span>
            A Experiência do Paciente
          </div>
          <Heading as="h2" className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            A Sua Jornada Dentro da Clínica
          </Heading>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted)] sm:text-lg">
            Acompanhe o caminho de uma visita real pela Sala 218: desde o desembarque privativo no 2º andar até os consultórios, estúdio 3D e central de esterilização.
          </p>
        </div>

        {/* 2. ABAS FLUTUANTES (STICKY SUBNAV / ÂNCORAS RÁPIDAS) */}
        <div className="sticky top-0 z-20 mt-8 -mx-5 px-5 sm:mx-0 sm:px-0 bg-[var(--color-surface)]/95 backdrop-blur-md py-3 border-y border-[var(--color-border)] shadow-sm">
          <nav
            aria-label="Navegação pelos ambientes da clínica"
            className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 sm:justify-center [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {JOURNEY_STEPS.map((step) => {
              const isActive = activeStepId === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => scrollToStep(step.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white shadow-md scale-[1.02]"
                      : "bg-white text-[var(--color-muted)] hover:bg-white/90 hover:text-[var(--color-primary)] border border-[var(--color-border)]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive ? "bg-[var(--color-gold-light)]" : "bg-neutral-300"
                    }`}
                  />
                  <span>{step.timelineLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 3. TIMELINE VERTICAL CONTÍNUA COM FOTOS LIMPAS EM LARGURA GENEROSA */}
        <div className="mt-8 space-y-16 sm:space-y-20">
          {JOURNEY_STEPS.map((step, stepIndex) => (
            <article
              key={step.id}
              id={step.id}
              className="scroll-mt-28 rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm transition-all sm:p-8 lg:p-10"
            >
              {/* Header do Passo */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--color-border)] pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] font-title text-base font-bold text-white shadow-sm">
                    {step.stepNumber}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-mauve)]">
                      {step.phaseBadge}
                    </span>
                    <h3 className="font-title text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">
                      {step.roomName}
                    </h3>
                  </div>
                </div>

                <span className="self-start rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-muted)] sm:self-center">
                  {step.pillTag}
                </span>
              </div>

              {/* Subtítulo & Narrativa */}
              <div className="mt-5 max-w-3xl">
                <p className="text-sm font-semibold text-[var(--color-mauve)] sm:text-base">
                  {step.subtitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)] sm:text-base sm:leading-7">
                  {step.narrative}
                </p>
              </div>

              {/* Grid de Diferenciais Clínicos */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {step.features.map((feat) => (
                  <div
                    key={feat.label}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-emerald-700">
                      <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs font-bold text-[var(--color-ink)]">{feat.label}</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{feat.detail}</p>
                  </div>
                ))}
              </div>

              {/* CARROSSEL SUAVE DE AMBIENTES (SLIDER CONTÍNUO COM NAVEGAÇÃO E TOUCH SWIPE) */}
              <div className="mt-8">
                <EnvironmentCarousel images={step.images} title={step.roomName} />
              </div>

              {/* Botão de Próximo Passo na base de cada card */}
              {stepIndex < JOURNEY_STEPS.length - 1 && (
                <div className="mt-8 flex justify-end border-t border-[var(--color-border)] pt-4">
                  <button
                    type="button"
                    onClick={() => scrollToStep(JOURNEY_STEPS[stepIndex + 1].id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline hover:text-[var(--color-primary-hover)]"
                  >
                    <span>Avançar para {JOURNEY_STEPS[stepIndex + 1].timelineLabel}</span>
                    <span>↓</span>
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* 4. BLOCO DE CONVERSÃO FINAL DA JORNADA */}
        <div className="mt-14 rounded-3xl border border-[var(--color-gold)]/40 bg-[var(--color-primary)] p-8 text-center text-white shadow-xl sm:p-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
            Atendimento Exclusivo nos Ingleses
          </span>
          <h3 className="mt-3 font-title text-2xl sm:text-3xl lg:text-4xl text-white">
            Gostaria de conhecer o nosso espaço pessoalmente?
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
            A clínica está pronta para receber você com privacidade, ergonomia e pontualidade na Sala 218 do Ingleses Saúde & Office. Agende uma avaliação individual com a Dra. Sara Michelon.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3.5 sm:flex-row">
            <a
              href={`https://wa.me/5548985063001?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#20ba5a] active:scale-95"
            >
              <span>Agendar Avaliação via WhatsApp</span>
              <span>→</span>
            </a>
            <Link
              href="/contato"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Ver rotas, mapa e estacionamento
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
