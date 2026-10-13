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
  gtag_report_conversion?: (url?: string) => boolean;
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
 * Normaliza o ID do Google Ads garantindo o prefixo AW- exigido pela Google Tag.
 */
function formatGoogleAdsId(rawId?: string | null): string | null {
  if (!rawId) return null;
  const clean = rawId.trim();
  if (!clean) return null;
  return clean.toUpperCase().startsWith("AW-") ? clean : `AW-${clean}`;
}

/**
 * Normaliza o rótulo de conversão corrigindo erros tipográficos conhecidos de digitação
 * (por exemplo, a confusão comum de 'l' minúsculo por 'I' maiúsculo no sufixo de hash).
 */
function sanitizeConversionLabel(rawLabel?: string | null): string | null {
  if (!rawLabel) return null;
  const clean = rawLabel.trim();
  if (clean === "pfKdCIrUmq8cEPiNjdlD") {
    return "pfKdCIrUmq8cEPiNjdID";
  }
  return clean.length > 0 ? clean : null;
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
 * Detector inteligente de links de contato e rotas externas.
 * Identifica automaticamente WhatsApp, ligações, e-mail, rotas/mapa e redes sociais.
 */
function detectOutboundLink(anchor: HTMLAnchorElement): {
  event: string;
  payload: Record<string, unknown>;
} | null {
  const href = anchor.href;
  if (!href) return null;

  const urlLower = href.toLowerCase();

  // 1. WhatsApp (wa.me, api.whatsapp.com, web.whatsapp.com)
  if (
    urlLower.includes("wa.me") ||
    urlLower.includes("whatsapp.com") ||
    urlLower.includes("api.whatsapp.com")
  ) {
    return {
      event: "whatsapp_click",
      payload: {
        destination_url: href,
        link_text: anchor.innerText?.trim() || "WhatsApp",
        outbound: true,
      },
    };
  }

  // 2. Chamadas telefônicas (tel:)
  if (urlLower.startsWith("tel:")) {
    return {
      event: "phone_click",
      payload: {
        destination_url: href,
        phone_number: href.replace(/^tel:/i, "").trim(),
        link_text: anchor.innerText?.trim() || "Telefone",
        outbound: true,
      },
    };
  }

  // 3. E-mail (mailto:)
  if (urlLower.startsWith("mailto:")) {
    return {
      event: "email_click",
      payload: {
        destination_url: href,
        email_address: href.replace(/^mailto:/i, "").trim(),
        link_text: anchor.innerText?.trim() || "E-mail",
        outbound: true,
      },
    };
  }

  // 4. Rotas e mapas (Google Maps, Waze)
  if (
    urlLower.includes("google.com/maps") ||
    urlLower.includes("maps.app.goo.gl") ||
    urlLower.includes("waze.com")
  ) {
    return {
      event: "directions_click",
      payload: {
        destination_url: href,
        link_text: anchor.innerText?.trim() || "Como Chegar",
        outbound: true,
      },
    };
  }

  // 5. Redes Sociais externas (Instagram, Facebook)
  if (
    urlLower.includes("instagram.com") ||
    urlLower.includes("facebook.com") ||
    urlLower.includes("linkedin.com") ||
    urlLower.includes("youtube.com")
  ) {
    return {
      event: "social_click",
      payload: {
        destination_url: href,
        social_network: urlLower.includes("instagram.com")
          ? "Instagram"
          : urlLower.includes("facebook.com")
          ? "Facebook"
          : "Social",
        link_text: anchor.innerText?.trim() || "Rede Social",
        outbound: true,
      },
    };
  }

  // 6. Demais links externos saindo do domínio da clínica
  try {
    const urlObj = new URL(href, window.location.origin);
    if (
      urlObj.origin !== window.location.origin &&
      !urlLower.startsWith("javascript:")
    ) {
      return {
        event: "outbound_click",
        payload: {
          destination_url: href,
          destination_host: urlObj.hostname,
          link_text: anchor.innerText?.trim() || "Link Externo",
          outbound: true,
        },
      };
    }
  } catch {
    // URL inválida ignorada
  }

  return null;
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

  // 1. Google Tag Manager (DataLayer push unificado)
  if (target.dataLayer) {
    target.dataLayer.push({event, ...enriched});
  }

  // 2. Google Analytics 4 & Google Ads (gtag direto)
  if (target.gtag) {
    // Evento base no GA4
    target.gtag("event", event, {
      transport_type: "beacon",
      ...enriched,
    });

    const adsId = formatGoogleAdsId(ids.googleAds);
    const adsLabel = sanitizeConversionLabel(ids.googleAdsConversionLabel);

    // Disparo explícito da Ação de Conversão no Google Ads para cliques no WhatsApp
    if (event === "whatsapp_click" && adsId && adsLabel) {
      target.gtag("event", "conversion", {
        send_to: `${adsId}/${adsLabel}`,
        value: 1.0,
        currency: "BRL",
        transport_type: "beacon",
        ...enriched,
      });
    }

    // Mapeamento de Lead padrão do Google
    if (event === "whatsapp_click") {
      target.gtag("event", "generate_lead", {
        currency: "BRL",
        value: 1.0,
        transport_type: "beacon",
        ...enriched,
      });
    }

    // Mapeamento de Contato telefônico
    if (event === "phone_click") {
      target.gtag("event", "contact", {
        method: "phone",
        transport_type: "beacon",
        ...enriched,
      });
    }

    // Mapeamento de Contato por e-mail
    if (event === "email_click") {
      target.gtag("event", "contact", {
        method: "email",
        transport_type: "beacon",
        ...enriched,
      });
    }

    // Mapeamento de Localização
    if (event === "directions_click") {
      target.gtag("event", "find_location", {
        transport_type: "beacon",
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

      case "email_click":
        target.fbq("track", "Contact", {
          content_name: "E-mail Clínico",
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
  const adsId = formatGoogleAdsId(ids.googleAds);
  const adsLabel = sanitizeConversionLabel(ids.googleAdsConversionLabel);
  const ga4Id = ids.ga4?.trim() || null;

  const hasGoogle = Boolean(ga4Id || ids.gtm || adsId);
  const hasMeta = Boolean(ids.metaPixel);
  const hasClarity = Boolean(ids.clarity);
  const isEnabled = hasGoogle || hasMeta || hasClarity;

  // Recupera consentimento prévio do localStorage de forma síncrona
  const [consent, setConsent] = useState<Consent>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY) as Consent;
      if (stored === "accepted" || stored === "rejected") return stored;
    } catch {
      // Ignora erro se localStorage for bloqueado
    }
    return null;
  });

  const isInitialized = useRef(false);

  // Inicialização das tags com Google Consent Mode v2 e Meta Pixel
  useEffect(() => {
    if (!isEnabled || isInitialized.current) return;
    isInitialized.current = true;

    // Inicializa parâmetros de campanha no sessionStorage
    getCampaignParams();

    const target = window as AnalyticsWindow;
    const isAccepted = consent === "accepted";

    // --- A. GOOGLE TAG MANAGER (SE HOUVER CONTAINER GTM) ---
    if (ids.gtm) {
      dataLayer().push({"gtm.start": Date.now(), event: "gtm.js"});
      loadScript(
        "dra-sara-gtm",
        `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(ids.gtm)}`
      );
    }

    // --- B. GOOGLE TAG (GA4 + GOOGLE ADS COM CONSENT MODE V2) ---
    const primaryGoogleId = adsId ?? ga4Id;

    if (primaryGoogleId) {
      target.gtag ??= (...args: unknown[]) => {
        dataLayer().push(args);
      };

      // Google Consent Mode v2 - Garante conformidade com LGPD e modelagem do Google Ads
      target.gtag("consent", "default", {
        analytics_storage: isAccepted ? "granted" : "denied",
        ad_storage: isAccepted && Boolean(adsId) ? "granted" : "denied",
        ad_user_data: isAccepted && Boolean(adsId) ? "granted" : "denied",
        ad_personalization: "denied",
        wait_for_update: 500,
      });

      target.gtag("js", new Date());

      // Carrega o script oficial do Google Tag Manager / gtag.js
      loadScript(
        "dra-sara-gtag",
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primaryGoogleId)}`
      );

      // Configuração inicial do GA4 (sem page_view automático duplicado)
      if (ga4Id) {
        target.gtag("config", ga4Id, {send_page_view: false});
      }

      // Configuração explícita do Google Ads Tag para reconhecimento no Tag Assistant e conversões
      if (adsId) {
        target.gtag("config", adsId);
      }

      // Função global recomendada pelo Google Ads para verificação e disparos diretos
      target.gtag_report_conversion = (url?: string) => {
        const callback = () => {
          if (typeof url !== "undefined" && url) {
            window.location.href = url;
          }
        };

        if (target.gtag && adsId && adsLabel) {
          target.gtag("event", "conversion", {
            send_to: `${adsId}/${adsLabel}`,
            event_callback: callback,
            transport_type: "beacon",
          });
        } else {
          callback();
        }
        return false;
      };
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

    // --- D. MICROSOFT CLARITY ---
    if (ids.clarity) {
      if (!target.clarity) {
        const clarityStub = function (...args: unknown[]) {
          ((clarityStub as unknown as {q: unknown[]}).q ??= []).push(args);
        };
        (clarityStub as unknown as {q: unknown[]}).q = [];
        target.clarity = clarityStub;
      }
      loadScript("dra-sara-clarity", `https://www.clarity.ms/tag/${encodeURIComponent(ids.clarity)}`);
    }
  }, [adsId, adsLabel, consent, ga4Id, ids.clarity, ids.gtm, ids.metaPixel, isEnabled]);

  // Atualiza permissões do Consent Mode quando o usuário responde ao banner
  useEffect(() => {
    if (!isEnabled || consent === null) return;
    const target = window as AnalyticsWindow;

    if (consent === "accepted") {
      target.gtag?.("consent", "update", {
        analytics_storage: "granted",
        ad_storage: adsId ? "granted" : "denied",
        ad_user_data: adsId ? "granted" : "denied",
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
  }, [adsId, consent, isEnabled]);

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

  // Delegação global de eventos de clique: captura marcações manuais E intercepta links externos/contatos
  useEffect(() => {
    if (!isEnabled) return;

    function handleClick(event: MouseEvent) {
      const targetEl = event.target as HTMLElement | null;
      if (!targetEl) return;

      const trackEl = targetEl.closest<HTMLElement>("[data-track-event]");
      const anchorEl = targetEl.closest<HTMLAnchorElement>("a");

      // 1. Elemento com marcação explícita de rastreamento
      if (trackEl?.dataset.trackEvent) {
        const outboundMeta = anchorEl ? detectOutboundLink(anchorEl) : null;
        sendEvent(
          trackEl.dataset.trackEvent,
          {
            cta_location: trackEl.dataset.trackLocation,
            treatment: trackEl.dataset.treatment,
            ...(outboundMeta ? outboundMeta.payload : {}),
          },
          ids
        );
        return;
      }

      // 2. Link âncora navegando para fora do site ou para canais de contato (WhatsApp, tel, mailto, mapa)
      if (anchorEl) {
        const detected = detectOutboundLink(anchorEl);
        if (detected) {
          sendEvent(
            detected.event,
            {
              cta_location: anchorEl.dataset.trackLocation ?? "outbound_link",
              ...detected.payload,
            },
            ids
          );
        }
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ids, isEnabled]);

  // Não exibe o banner se não houver rastreamento configurado ou se o usuário já tiver respondido
  if (!isEnabled || consent !== null) return null;

  const handleConsent = (value: Exclude<Consent, null>) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // Ignora erro de storage
    }
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
