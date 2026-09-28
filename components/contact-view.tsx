"use client";

import {useState} from "react";
import Image from "next/image";
import type {InstitutionalPage, SiteSettings} from "@/lib/content/types";
import {Breadcrumbs, Container, Eyebrow, Heading, Section} from "@/components/design-system";

interface ContactViewProps {
  settings: SiteSettings;
  page: InstitutionalPage;
}

function WazeLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Waze">
      <path d="M13.314 1.59c-.225.003-.45.013-.675.03-2.165.155-4.295.924-6.069 2.327-2.194 1.732-3.296 4.325-3.496 7.05h.002c-.093 1.22-.23 2.15-.469 2.63-.238.479-.42.638-1.24.639C.27 14.259-.4 15.612.266 16.482c1.248 1.657 2.902 2.705 4.72 3.364a2.198 2.198 0 00-.033.367 2.198 2.198 0 002.2 2.197 2.198 2.198 0 002.128-1.668c1.307.12 2.607.14 3.824.1.364-.012.73-.045 1.094-.092a2.198 2.198 0 002.127 1.66 2.198 2.198 0 002.2-2.197 2.198 2.198 0 00-.151-.797 12.155 12.155 0 002.303-1.549c2.094-1.807 3.511-4.399 3.302-7.404-.112-1.723-.761-3.298-1.748-4.608-2.143-2.86-5.53-4.309-8.918-4.265zm.366 1.54c.312.008.623.027.933.063 2.48.288 4.842 1.496 6.4 3.577v.001c.829 1.1 1.355 2.386 1.446 3.792v.003c.173 2.477-.965 4.583-2.777 6.147a10.66 10.66 0 01-2.375 1.535 2.198 2.198 0 00-.98-.234 2.198 2.198 0 00-1.934 1.158 9.894 9.894 0 01-1.338.146 27.323 27.323 0 01-3.971-.148 2.198 2.198 0 00-1.932-1.156 2.198 2.198 0 00-1.347.463c-1.626-.553-3.078-1.422-4.155-2.762 1.052-.096 1.916-.6 2.319-1.408.443-.889.53-1.947.625-3.198v-.002c.175-2.391 1.11-4.536 2.92-5.964h.002c1.77-1.402 3.978-2.061 6.164-2.012zm-3.157 4.638c-.688 0-1.252.579-1.252 1.298 0 .72.564 1.297 1.252 1.297.689 0 1.252-.577 1.252-1.297 0-.711-.563-1.298-1.252-1.298zm5.514 0c-.688 0-1.25.579-1.25 1.298-.008.72.554 1.297 1.25 1.297.688 0 1.252-.577 1.252-1.297 0-.711-.564-1.298-1.252-1.298zM9.641 11.78a.72.72 0 00-.588.32.692.692 0 00-.11.54c.345 1.783 2.175 3.129 4.264 3.129h.125c1.056-.032 2.026-.343 2.816-.922.767-.556 1.29-1.316 1.477-2.137a.746.746 0 00-.094-.547.69.69 0 00-.445-.32.714.714 0 00-.867.539c-.22.93-1.299 1.9-2.934 1.94-1.572.046-2.738-.986-2.926-1.956a.72.72 0 00-.718-.586Z" />
    </svg>
  );
}

function UberLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Uber">
      <path d="M0 7.97v4.958c0 1.867 1.302 3.101 3 3.101.826 0 1.562-.316 2.094-.87v.736H6.27V7.97H5.082v4.888c0 1.257-.85 2.106-1.947 2.106-1.11 0-1.946-.827-1.946-2.106V7.971H0zm7.44 0v7.925h1.13v-.725c.521.532 1.257.86 2.06.86a3.006 3.006 0 0 0 3.034-3.01 3.01 3.01 0 0 0-3.033-3.024 2.86 2.86 0 0 0-2.049.861V7.971H7.439zm9.869 2.038c-1.687 0-2.965 1.37-2.965 3 0 1.72 1.334 3.01 3.066 3.01 1.053 0 1.913-.463 2.49-1.233l-.826-.611c-.43.577-.996.847-1.664.847-.973 0-1.753-.7-1.912-1.64h4.697v-.373c0-1.72-1.222-3-2.886-3zm6.295.068c-.634 0-1.098.294-1.381.758v-.713h-1.131v5.774h1.142V12.61c0-.894.544-1.47 1.291-1.47H24v-1.065h-.396zm-6.319.928c.85 0 1.564.588 1.756 1.47H15.52c.203-.882.916-1.47 1.765-1.47zm-6.732.012c1.086 0 1.98.883 1.98 2.004a1.993 1.993 0 0 1-1.98 2.001A1.989 1.989 0 0 1 8.56 13.02a1.99 1.99 0 0 1 1.992-2.004z" />
    </svg>
  );
}

function GoogleMapsLogo({ className = "h-7 w-auto" }: { className?: string }) {
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

function AppleMapsLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Apple Maps">
      {/* Base Squircle do App iOS */}
      <rect width="64" height="64" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Área verde de parque */}
      <path d="M28 64c8-14 20-24 36-28v14c-12 4-22 14-26 24h-10z" fill="#86EFAC" />
      {/* Estrada branca e rodovia expressa amarela Apple Maps */}
      <path d="M0 24c16-2 30-10 40-24h10c-8 18-24 30-50 34v-10z" fill="#FFFFFF" />
      <path d="M0 38c18-2 32-12 44-38h8C38 32 20 48 0 50v-12z" fill="#FBBF24" opacity="0.85" />
      {/* Badge circular da localização com seta de navegação Apple */}
      <circle cx="34" cy="24" r="10" fill="#FFFFFF" />
      <circle cx="34" cy="24" r="8" fill="#007AFF" />
      <path d="M34 19l4.5 9-4.5-2.5-4.5 2.5L34 19z" fill="#FFFFFF" />
    </svg>
  );
}

function AppleLogo({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Apple">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.67-.82 1.13-1.96.99-3.11-1 .04-2.22.68-2.92 1.5-.62.72-1.16 1.88-1.01 3 .12.01 2.26.43 2.94-1.39z" />
    </svg>
  );
}

export function ContactView({settings}: ContactViewProps) {
  const [copied, setCopied] = useState(false);

  const addressForClipboard = "Centro de Odontologia Estética Drª Sara Michelon, SC-403, 6201 - 218 - Ingleses Norte, Florianópolis - SC, 88058-001";

  const handleCopyAddress = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(addressForClipboard);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = addressForClipboard;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // silenciosamente mantém o estado
    }
  };

  // Links universais de navegação
  const officialAddress = "Centro de Odontologia Estética Drª Sara Michelon, SC-403, 6201 - 218 - Ingleses Norte, Florianópolis - SC, 88058-001";
  const encodedAddress = encodeURIComponent(officialAddress);
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;
  const uberUrl = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[nickname]=${encodeURIComponent("Centro de Odontologia Estética Drª Sara Michelon")}&dropoff[formatted_address]=${encodeURIComponent("SC-403, 6201 - 218 - Ingleses Norte, Florianópolis - SC, 88058-001")}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${encodedAddress}&dirflg=d`;

  const rawPhone = settings.phone?.replace(/\D/g, "") ?? "48985063001";
  const rawWhatsApp = settings.whatsapp?.replace(/\D/g, "") ?? "48985063001";
  const rawCommercial = settings.commercialPhone?.replace(/\D/g, "") ?? "48991816291";
  const whatsappUrl = `https://wa.me/55${rawWhatsApp}?text=${encodeURIComponent("Olá! Gostaria de agendar uma avaliação com a Dra. Sara Michelon nos Ingleses.")}`;
  const commercialUrl = `https://wa.me/55${rawCommercial}?text=${encodeURIComponent("Olá! Gostaria de falar com o comercial/suporte da clínica Dra. Sara Michelon.")}`;

  return (
    <div className="contact-experience">
      {/* 1. Hero & Introdução */}
      {/* 1. Hero & Introdução com Background Responsivo */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-pink)]">
        {/* Background com Art Direction (Mobile e Desktop) */}
        <picture className="pointer-events-none absolute inset-0 block h-full w-full">
          <source
            media="(max-width: 767px)"
            srcSet="/images/real/contato/hero-contato-mobile.webp"
            type="image/webp"
            width={941}
            height={1672}
          />
          <img
            src="/images/real/contato/hero-contato-desktop.webp"
            alt="Recepção e atendimento da clínica Dra. Sara Michelon nos Ingleses"
            width={1672}
            height={941}
            className="h-full w-full object-cover object-top md:object-[85%_top] lg:object-[85%_top]"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Scrim suave no mobile a partir da metade inferior para garantir leitura impecável sem tocar no balcão superior */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-pink)] via-[var(--color-pink)]/80 via-50% to-transparent to-85% md:hidden"
        />

        {/* Scrim overlay suave no desktop apenas na área de leitura à esquerda */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden md:block absolute inset-0 w-[58%] lg:w-[52%] bg-gradient-to-r from-[var(--color-pink)]/95 via-[var(--color-pink)]/60 to-transparent"
        />

        <Container className="relative z-10">
          <div className="flex flex-col justify-end min-h-[540px] pt-[72vw] pb-8 sm:min-h-[580px] sm:pt-[54vw] sm:pb-10 md:min-h-[480px] md:pt-14 md:pb-12 lg:min-h-[560px] lg:justify-center lg:py-16">
            <div className="max-w-xl md:max-w-[460px] lg:max-w-[500px] xl:max-w-[540px]">
              <Breadcrumbs items={[{label: "Início", href: "/"}, {label: "Contato e Localização"}]} className="mb-2.5 sm:mb-3.5" />
              <div className="inline-flex items-center rounded-full border border-[var(--color-primary)]/15 bg-white/95 px-3 py-1 text-xs font-medium tracking-wide text-[var(--color-primary)] shadow-xs">
                Atendimento com Hora Marcada · Ingleses Saúde & Office
              </div>
              <h1 className="mt-3 font-title text-balance text-2xl sm:text-3xl lg:text-4xl leading-[1.12] tracking-[-0.02em] text-[var(--color-primary)]">
                Contato, Localização & Rotas
              </h1>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-[var(--color-ink)]/85">
                Localizada no Norte da Ilha de Florianópolis, no complexo empresarial <strong className="font-semibold text-[var(--color-primary)]">Ingleses Saúde & Office</strong>. Uma clínica moderna e acolhedora, com estacionamento privativo e acesso descomplicado.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Canais Diretos de Atendimento (Cards em Grid) */}
      <Section className="py-8 sm:py-10">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card WhatsApp */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(63,39,56,0.05)] transition-all hover:border-[var(--color-primary)]/30 hover:shadow-lg">
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.49 0-2.95-.4-4.22-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.01 4.54-3.68 8.23-8.2 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.13.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
                  </svg>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-emerald-700">Canal Principal</p>
                <h3 className="mt-1 font-title text-xl sm:text-2xl text-[var(--color-ink)]">WhatsApp</h3>
                <p className="mt-2 text-xs sm:text-sm leading-6 text-[var(--color-muted)]">
                  Canal mais ágil para esclarecer dúvidas, confirmar horários e organizar sua primeira avaliação.
                </p>
              </div>
              <div className="mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="whatsapp_click"
                  data-track-location="contact_card"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:bg-[#20ba5a] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.49 0-2.95-.4-4.22-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.01 4.54-3.68 8.23-8.2 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.13.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
                  </svg>
                  <span>{settings.whatsapp ?? "(48) 98506-3001"}</span>
                </a>
              </div>
            </div>

            {/* Card Horários */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(63,39,56,0.05)] transition-all hover:border-[var(--color-primary)]/30 hover:shadow-lg">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-surface)] text-[var(--color-primary)]">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">Hora Marcada</p>
                <h3 className="mt-1 font-title text-xl sm:text-2xl text-[var(--color-ink)]">Horários</h3>
                <div className="mt-2 space-y-1 text-xs sm:text-sm leading-6 text-[var(--color-muted)]">
                  <p className="font-semibold text-[var(--color-ink)]">
                    {settings.openingHours[0] ?? "Segunda a Sexta: 09:00 às 12:00 e 14:00 às 19:00"}
                  </p>
                  <p>
                    Consultas e avaliações conduzidas com reserva prévia para garantir pontualidade.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="whatsapp_click"
                  data-track-location="contact_hours_card"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-xs sm:text-sm font-semibold text-[var(--color-primary)] transition-all hover:border-[var(--color-primary)] hover:bg-white"
                >
                  <svg className="h-4 w-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 7.5h18M4.5 4.5h15A2.25 2.25 0 0121.75 6.75v13.5A2.25 2.25 0 0119.5 22.5H4.5A2.25 2.25 0 012.25 20.25V6.75A2.25 2.25 0 014.5 4.5z" />
                  </svg>
                  <span>Consultar Horários</span>
                </a>
              </div>
            </div>

            {/* Card E-mail & Contato Institucional */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(63,39,56,0.05)] transition-all hover:border-[var(--color-primary)]/30 hover:shadow-lg">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-surface)] text-[var(--color-primary)]">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">Contato Direto</p>
                <h3 className="mt-1 font-title text-xl sm:text-2xl text-[var(--color-ink)]">E-mail</h3>
                <p className="mt-2 text-xs sm:text-sm leading-6 text-[var(--color-muted)]">
                  Canal para envio de documentação, laudos, contato comercial e parcerias institucionais.
                </p>
                <p className="mt-2 font-mono text-xs text-[var(--color-ink)] break-all font-medium">
                  {settings.email ?? "odontoestetica.net@gmail.com"}
                </p>
              </div>
              <div className="mt-6">
                <a
                  href={`mailto:${settings.email ?? "odontoestetica.net@gmail.com"}`}
                  data-track-event="email_click"
                  data-track-location="contact_card_email"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-xs sm:text-sm font-semibold text-[var(--color-primary)] transition-all hover:border-[var(--color-primary)] hover:bg-white"
                >
                  <svg className="h-4 w-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  <span>Enviar E-mail</span>
                </a>
              </div>
            </div>

            {/* Card Endereço & Copiar */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(63,39,56,0.05)] transition-all hover:border-[var(--color-primary)]/30 hover:shadow-lg">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-surface)] text-[var(--color-primary)]">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">Endereço Oficial</p>
                <h3 className="mt-1 font-title text-xl sm:text-2xl text-[var(--color-ink)]">Localização</h3>
                <p className="mt-2 text-xs sm:text-sm leading-6 text-[var(--color-muted)]">
                  Drª Sara Michelon<br />
                  <strong>SC-403, 6201 - Sala 218</strong><br />
                  Ingleses Norte, Florianópolis — SC
                </p>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs sm:text-sm font-semibold transition-all ${
                    copied
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                      </svg>
                      <span>Copiar Endereço</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. O HUB DE MOBILIDADE ("Waze / Uber / Google Maps / Apple Maps") */}
      <Section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-8 sm:py-10">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Rotas com 1 Toque</Eyebrow>
            <Heading as="h2">Como Chegar à Clínica</Heading>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)] sm:text-lg">
              Escolha seu aplicativo de mobilidade preferido. Ao clicar, a rota até a sala 218 no complexo <em>Ingleses Saúde & Office</em> já é iniciada automaticamente.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1. Botão Waze */}
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="directions_click"
              data-track-location="waze"
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#33ccff]/60 hover:shadow-xl hover:shadow-[#33ccff]/10"
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#33ccff]/10 blur-xl transition-all group-hover:bg-[#33ccff]/25" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#33ccff]/15 text-[#0099cc] transition-transform duration-300 group-hover:scale-110">
                    <WazeLogo className="h-7 w-7" />
                  </div>
                  <span className="rounded-full bg-[#33ccff]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0088b8]">
                    GPS Ativo
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-[var(--color-ink)]">Waze</h3>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  Evite congestionamentos no Norte da Ilha com rotas inteligentes e alertas em tempo real.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#0099cc] transition-colors group-hover:text-[#0077a3]">
                <span>Navegar via Waze</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </a>

            {/* 2. Botão Uber */}
            <a
              href={uberUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="directions_click"
              data-track-location="uber"
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-[#000000] p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-900 hover:shadow-2xl hover:shadow-black/20"
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10 blur-xl transition-all group-hover:bg-white/20" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white transition-transform duration-300 group-hover:scale-110">
                    <UberLogo className="h-5 w-auto max-w-[34px]" />
                  </div>
                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white">
                    Sem Digitar
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">Uber</h3>
                <p className="mt-1 text-xs text-white/70">
                  Abre o aplicativo com destino pré-preenchido na sala 218 do Ingleses Saúde & Office.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white transition-colors">
                <span>Pedir viagem de Uber</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </a>

            {/* 3. Botão Google Maps */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="directions_click"
              data-track-location="google_maps"
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-500/10 blur-xl transition-all group-hover:bg-emerald-500/25" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-110">
                    <GoogleMapsLogo className="h-7 w-auto" />
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                    Rotas & Horários
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-[var(--color-ink)]">Google Maps</h3>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  Consulte rotas de carro, transporte público ou caminhada com a precisão do Google Maps.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors group-hover:text-emerald-700">
                <span>Abrir Google Maps</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </a>

            {/* 4. Botão Apple Maps */}
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="directions_click"
              data-track-location="apple_maps"
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/40 hover:shadow-xl hover:shadow-[var(--color-primary)]/10"
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[var(--color-primary)]/10 blur-xl transition-all group-hover:bg-[var(--color-primary)]/20" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition-transform duration-300 group-hover:scale-110 shadow-sm">
                    <AppleMapsLogo className="h-8 w-8" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-surface-strong)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-primary)]">
                    <AppleLogo className="h-3 w-3" />
                    <span>iOS / CarPlay</span>
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-[var(--color-ink)]">Apple Maps</h3>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  Navegação nativa integrada para usuários de iPhone, iPad e painéis compatíveis com Apple CarPlay.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] transition-colors">
                <span>Navegar com Apple</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </a>
          </div>
        </Container>
      </Section>

      {/* 4. MAPA INTERATIVO RESPONSIVO */}
      <Section className="py-8 sm:py-10">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-2xl">
            {/* Header bar do mapa */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--color-ink)]">Centro de Odontologia Estética Drª Sara Michelon</p>
                  <p className="text-xs text-[var(--color-muted)]">SC-403, 6201 - 218 - Ingleses Norte, Florianópolis — SC, 88058-001</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="directions_click"
                  data-track-location="map_header"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--color-primary)] shadow-sm transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)]"
                >
                  <span>Expandir no Google Maps</span>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Iframe Interativo */}
            <div className="relative aspect-[16/11] w-full sm:aspect-[16/8] lg:aspect-[21/9] min-h-[380px] lg:min-h-[460px]">
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
        </Container>
      </Section>

      {/* 5. ESTRUTURA DO EDIFÍCIO, COMODIDADES & RECONHECIMENTO VISUAL */}
      <Section className="border-t border-[var(--color-border)] bg-[var(--color-surface-strong)] py-6 sm:py-8 lg:py-8">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <Eyebrow>Conforto & Facilidade</Eyebrow>
              <Heading as="h2">Estrutura Pronta para Receber Você</Heading>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)] sm:text-lg">
                Projetamos cada detalhe para que sua visita seja tranquila, segura e pontual. Desde o estacionamento até o acesso aos consultórios, você conta com comodidade integral.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-primary)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V14.25m11.25-6.75h4.125" />
                    </svg>
                  </div>
                  <h4 className="mt-3 font-bold text-[var(--color-ink)]">Estacionamento</h4>
                  <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">
                    Vagas rotativas disponíveis no complexo empresarial para sua conveniência e segurança.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-primary)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.765z" />
                    </svg>
                  </div>
                  <h4 className="mt-3 font-bold text-[var(--color-ink)]">Acessibilidade Total</h4>
                  <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">
                    Elevadores modernos e rampas de acesso com conformidade para pessoas com mobilidade reduzida.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-primary)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                  <h4 className="mt-3 font-bold text-[var(--color-ink)]">2º Andar · Sala 218</h4>
                  <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">
                    Ambiente privativo e climatizado na Torre Comercial do Ingleses Saúde & Office.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-primary)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="mt-3 font-bold text-[var(--color-ink)]">Atendimento Exclusivo</h4>
                  <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">
                    Segunda a Sexta: 09:00 às 12:00 e das 14:00 às 19:00. Atendimentos com hora marcada para pontualidade.
                  </p>
                </div>
              </div>
            </div>

            {/* Imagens de Reconhecimento do Prédio e CTA */}
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-neutral-100 shadow-md">
                  <Image
                    src="/images/real/clinica/clinica-entrada-nova.webp"
                    alt="Acesso e entrada à clínica Dra. Sara Michelon na Sala 218"
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Acesso Sala 218</p>
                    <p className="text-sm font-bold">Entrada da Clínica</p>
                  </div>
                </div>

                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-neutral-100 shadow-md">
                  <Image
                    src="/images/real/clinica/clinic-consultorio-1-angulo.webp"
                    alt="Consultório da clínica odontológica da Dra. Sara Michelon com nova cadeira"
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Ambiente Clínico</p>
                    <p className="text-sm font-bold">Sala 218</p>
                  </div>
                </div>
              </div>

              {/* Botão posicionado abaixo das imagens */}
              <div className="flex flex-col sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="whatsapp_click"
                  data-track-location="amenities_cta"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[var(--color-primary-dark)] hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 active:scale-[0.99]"
                >
                  <span>Agendar Consulta pelo WhatsApp</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
