"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import type {SiteSettings} from "@/lib/content/types";

export type TrackingIds = SiteSettings["trackingIds"];

type AnalyticsPayload = Record<string, unknown>;
type Consent = "accepted" | "rejected" | null;

type FbqFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

type AnalyticsWindow = typeof window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: FbqFunction;
  _fbq?: unknown;
  clarity?: (...args: unknown[]) => void;
};

const CONSENT_STORAGE_KEY = "dra-sara-analytics-consent";
const CAMPAIGN_PARAMS_KEY = "dra-sara-campaign-params";

function loadScript(id: string, src: string) {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function dataLayer(): unknown[] {
  const target = window as AnalyticsWindow;
  target.dataLayer ??= [];
  return target.dataLayer;
}

/**
 * Captura e persiste parâmetros de campanha (UTMs e click IDs de Google/Meta Ads)
 * no sessionStorage para não perder a atribuição durante a navegação entre páginas.
 */
function getCampaignParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const trackingKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "gbraid",
      "wbraid",
      "fbclid",
    ];

    const currentParams: Record<string, string> = {};
    trackingKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) currentParams[key] = value;
    });

    if (Object.keys(currentParams).length > 0) {
      const storedStr = window.sessionStorage.getItem(CAMPAIGN_PARAMS_KEY);
      const stored = storedStr ? JSON.parse(storedStr) : {};
      const merged = {...stored, ...currentParams};
      window.sessionStorage.setItem(CAMPAIGN_PARAMS_KEY, JSON.stringify(merged));
      return merged;
    }

    const storedStr = window.sessionStorage.getItem(CAMPAIGN_PARAMS_KEY);
    return storedStr ? JSON.parse(storedStr) : {};
  } catch {
    return {};
  }
}

/**
 * Despachante unificado de eventos de rastreamento:
 * Envia simultaneamente para Google Analytics 4, Google Ads, Meta Pixel e GTM DataLayer.
 */
function sendEvent(event: string, payload: AnalyticsPayload, ids: TrackingIds) {
  if (typeof window === "undefined") return;
  const target = window as AnalyticsWindow;
  const campaign = getCampaignParams();

  const enriched: Record<string, unknown> = {
    page_path: window.location.pathname,
    page_title: document.title,
    ...campaign,
    ...payload,
  };

  // 1. Google Tag Manager (DataLayer push)
  if (target.dataLayer) {
    target.dataLayer.push({event, ...enriched});
  }

  // 2. Google Analytics 4 & Google Ads (gtag)
  if (target.gtag) {
    target.gtag("event", event, enriched);

    // Se houver conversion label específico configurado para Google Ads em cliques de conversão
    if (
      (event === "whatsapp_click" || event === "appointment_cta_click") &&
      ids.googleAds &&
      ids.googleAdsConversionLabel
    ) {
      target.gtag("event", "conversion", {
        send_to: `${ids.googleAds}/${ids.googleAdsConversionLabel}`,
        ...enriched,
      });
    }

    // Mapeamento para evento padrão de Lead do Google
    if (event === "whatsapp_click") {
      target.gtag("event", "generate_lead", {
        currency: "BRL",
        value: 0,
        ...enriched,
      });
    }
  }

  // 3. Meta Pixel (Facebook Pixel - fbq)
  if (target.fbq) {
    switch (event) {
      case "page_view":
        target.fbq("track", "PageView");
        break;

      case "whatsapp_click":
        target.fbq("track", "Contact", {
          content_name: "WhatsApp",
          ...enriched,
        });
        target.fbq("track", "Lead", {
          content_name: "Conversa WhatsApp",
          ...enriched,
        });
        target.fbq("trackCustom", "WhatsAppClick", enriched);
        break;

      case "phone_click":
        target.fbq("track", "Contact", {
          content_name: "Telefone Clínico",
          ...enriched,
        });
        break;

      case "appointment_cta_click":
        target.fbq("track", "Schedule", enriched);
        break;

      case "treatment_view":
        target.fbq("track", "ViewContent", {
          content_name: enriched.treatment ?? enriched.page_title,
          content_category: enriched.specialty ?? "Tratamento",
          ...enriched,
        });
        break;

      case "directions_click":
        target.fbq("track", "FindLocation", enriched);
        break;

      default:
        target.fbq("trackCustom", event, enriched);
        break;
    }
  }
}

export function TrackingProvider({ids}: {ids: TrackingIds}) {
  const pathname = usePathname();
  const hasGoogle = Boolean(ids.ga4 || ids.gtm || ids.googleAds);
  const hasMeta = Boolean(ids.metaPixel);
  const hasClarity = Boolean(ids.clarity);
  const isEnabled = hasGoogle || hasMeta || hasClarity;

  const [consent, setConsent] = useState<Consent>(null);
  const isInitialized = useRef(false);

  // Recupera consentimento prévio do localStorage
  useEffect(() => {
    if (!isEnabled) return;
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY) as Consent;
    if (stored === "accepted" || stored === "rejected") {
      const timer = window.setTimeout(() => setConsent(stored), 0);
      return () => window.clearTimeout(timer);
    }
  }, [isEnabled]);

  // Inicialização das tags com Google Consent Mode v2 e Meta Pixel
  useEffect(() => {
    if (!isEnabled || isInitialized.current) return;
    isInitialized.current = true;

    // Inicializa parâmetros de campanha no sessionStorage
    getCampaignParams();

    const target = window as AnalyticsWindow;
    const isAccepted = consent === "accepted";

    // --- A. GOOGLE TAG MANAGER ---
    if (ids.gtm) {
      dataLayer().push({"gtm.start": Date.now(), event: "gtm.js"});
      loadScript(
        "dra-sara-gtm",
        `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(ids.gtm)}`
      );
    }

    // --- B. GOOGLE TAG (GA4 + GOOGLE ADS COM CONSENT MODE V2) ---
    const measurementId = ids.ga4 ?? ids.googleAds;
    if (measurementId) {
      target.gtag ??= (...args: unknown[]) => {
        dataLayer().push(args);
      };

      // Google Consent Mode v2 - Garante conformidade com LGPD e permite modelagem do Google Ads
      target.gtag("consent", "default", {
        analytics_storage: isAccepted ? "granted" : "denied",
        ad_storage: isAccepted && ids.googleAds ? "granted" : "denied",
        ad_user_data: isAccepted && ids.googleAds ? "granted" : "denied",
        ad_personalization: "denied",
        wait_for_update: 500,
      });

      target.gtag("js", new Date());
      loadScript(
        "dra-sara-gtag",
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
      );

      // Configuração inicial do GA4 sem duplicar page_view automático
      target.gtag("config", measurementId, {send_page_view: false});

      // Configuração do Google Ads Tag se for diferente do GA4
      if (ids.googleAds && ids.googleAds !== measurementId) {
        target.gtag("config", ids.googleAds);
      }
    }

    // --- C. META PIXEL (FACEBOOK) ---
    if (ids.metaPixel) {
      if (!target.fbq) {
        const queue: unknown[][] = [];
        const fbqInstance: FbqFunction = function (...args: unknown[]) {
          if (fbqInstance.callMethod) {
            fbqInstance.callMethod(...args);
          } else {
            queue.push(args);
          }
        };
        fbqInstance.push = fbqInstance;
        fbqInstance.loaded = true;
        fbqInstance.version = "2.0";
        fbqInstance.queue = queue;
        target.fbq = fbqInstance;
        target._fbq = fbqInstance;

        loadScript("dra-sara-fbevents", "https://connect.facebook.net/en_US/fbevents.js");
        target.fbq("init", ids.metaPixel);
      }
    }

    // --- D. MICROSOFT CLARITY (OPCIONAL) ---
    if (ids.clarity) {
      loadScript("dra-sara-clarity", `https://www.clarity.ms/tag/${encodeURIComponent(ids.clarity)}`);
    }
  }, [consent, ids, isEnabled]);

  // Atualiza permissões do Consent Mode quando o usuário responde ao banner
  useEffect(() => {
    if (!isEnabled || consent === null) return;
    const target = window as AnalyticsWindow;

    if (consent === "accepted") {
      target.gtag?.("consent", "update", {
        analytics_storage: "granted",
        ad_storage: ids.googleAds ? "granted" : "denied",
        ad_user_data: ids.googleAds ? "granted" : "denied",
        ad_personalization: "denied",
      });
      target.fbq?.("consent", "grant");
    } else if (consent === "rejected") {
      target.gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      target.fbq?.("consent", "revoke");
    }
  }, [consent, ids.googleAds, isEnabled]);

  // Rastreamento automático de mudança de rota (SPA Pageviews) e visualizações de tratamento
  useEffect(() => {
    if (!isEnabled) return;

    // Dispara page_view em toda transição de página
    sendEvent("page_view", {}, ids);

    // Se for página de tratamento ou de conteúdo específico com marcador
    const marker = document.querySelector<HTMLElement>("[data-page-event]");
    if (marker?.dataset.pageEvent) {
      sendEvent(
        marker.dataset.pageEvent,
        {
          treatment: marker.dataset.treatment,
          specialty: marker.dataset.specialty,
          content_type: marker.dataset.contentType,
        },
        ids
      );
    }
  }, [ids, isEnabled, pathname]);

  // Delegação global de eventos de clique com marcação data-track-event
  useEffect(() => {
    if (!isEnabled) return;

    function handleClick(event: MouseEvent) {
      const element = (event.target as HTMLElement).closest<HTMLElement>("[data-track-event]");
      if (!element?.dataset.trackEvent) return;

      sendEvent(
        element.dataset.trackEvent,
        {
          cta_location: element.dataset.trackLocation,
          treatment: element.dataset.treatment,
        },
        ids
      );
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ids, isEnabled]);

  // Não exibe o banner se não houver rastreamento configurado ou se o usuário já tiver respondido
  if (!isEnabled || consent !== null) return null;

  const handleConsent = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    setConsent(value);
  };

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl border border-[var(--color-border)] bg-white p-5 shadow-[0_20px_70px_rgba(63,39,56,0.22)]"
      aria-label="Preferências de privacidade"
    >
      <p className="font-title text-xl text-[var(--color-primary)]">Sua escolha de privacidade</p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
        Com sua autorização, usamos medição de audiência e campanhas para melhorar o atendimento e o conteúdo.
        Recusar não altera a navegação pelo site.{" "}
        <Link href="/politica-de-cookies" className="font-semibold underline underline-offset-4">
          Saiba mais
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleConsent("accepted")}
          className="min-h-11 bg-[var(--color-primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
        >
          Aceitar medição
        </button>
        <button
          type="button"
          onClick={() => handleConsent("rejected")}
          className="min-h-11 border border-[var(--color-border)] px-5 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface)]"
        >
          Recusar
        </button>
      </div>
    </aside>
  );
}

