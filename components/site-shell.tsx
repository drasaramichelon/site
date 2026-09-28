import Image from "next/image";
import Link from "next/link";
import type {ReactNode} from "react";
import {Container, SocialChannelsSection} from "@/components/design-system";
import {SiteHeader} from "@/components/site-header";
import {fallbackNavigation} from "@/lib/content/fallback";
import {getSiteSettings} from "@/lib/sanity/repository";

async function Header() {
  const settings = await getSiteSettings();
  return <SiteHeader settings={settings} />;
}

async function Footer() {
  const settings = await getSiteSettings();
  return (
    <footer className="site-footer bg-[var(--color-ink)] py-6 text-white sm:py-7">
      <Container>
        <div className="grid gap-6 border-b border-white/10 pb-5 sm:gap-8 sm:pb-6 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Image src="/images/logo-dra-sara.webp" alt={settings.clinicName} width={151} height={85} className="h-9 w-auto brightness-0 invert" />
            <p className="mt-2.5 max-w-sm text-xs leading-5 text-white/60 sm:text-sm sm:leading-6">Odontologia e estética com planejamento individual nos Ingleses, Norte da Ilha de Florianópolis.</p>
            <p className="mt-2 text-xs text-white/80"><span className="font-semibold text-white">Responsável Técnica:</span> Dra. Sara Michelon · CRO-SC 10632</p>
            <p className="mt-0.5 text-xs text-white/60">Registro EPAO 1697 SC</p>

            {/* Redes Sociais */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <a
                href="https://www.instagram.com/drasaramichelon"
                target="_blank"
                rel="noopener noreferrer"
                data-track-event="social_click"
                data-track-location="footer_instagram"
                className="group inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/80 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                title="Instagram da Dra. Sara Michelon"
              >
                <svg className="h-3.5 w-3.5 shrink-0 fill-current text-white/80 transition-colors group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@drasaramichelon</span>
              </a>
              <a
                href="https://www.facebook.com/odontoesteticadrasara"
                target="_blank"
                rel="noopener noreferrer"
                data-track-event="social_click"
                data-track-location="footer_facebook"
                className="group inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/80 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                title="Página no Facebook: Centro de Odontologia Estética Dra Sara Michelon"
              >
                <svg className="h-3.5 w-3.5 shrink-0 fill-current text-white/80 transition-colors group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-xs">Navegação</p>
            <ul className="mt-2.5 grid gap-1.5 text-xs text-white/75 sm:text-sm">
              {fallbackNavigation.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link className="transition-colors hover:text-white hover:underline" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-xs">Clínica & Contato</p>
            <p className="mt-2.5 text-xs leading-5 text-white/75 sm:text-sm sm:leading-6">
              {settings.streetAddress ? (
                <>
                  {settings.streetAddress}<br />
                  {settings.locality}
                </>
              ) : (
                <>
                  {settings.locality}<br />
                  {settings.region}
                </>
              )}
            </p>
            <div className="mt-2 flex flex-col gap-1 text-xs text-white/75 sm:text-sm">
              {settings.whatsapp && (
                <a
                  href={`https://wa.me/55${settings.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="whatsapp_click"
                  data-track-location="footer"
                  className="transition-colors hover:text-white hover:underline"
                >
                  Recepção / WhatsApp: {settings.whatsapp}
                </a>
              )}
              {settings.phone && settings.phone !== settings.whatsapp && (
                <a
                  href={`tel:+55${settings.phone.replace(/\D/g, "")}`}
                  data-track-event="phone_click"
                  data-track-location="footer"
                  className="transition-colors hover:text-white hover:underline"
                >
                  Telefone: {settings.phone}
                </a>
              )}
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  data-track-event="email_click"
                  data-track-location="footer"
                  className="transition-colors hover:text-white hover:underline"
                >
                  E-mail: {settings.email}
                </a>
              )}
              {settings.commercialPhone && (
                <a
                  href={`https://wa.me/55${settings.commercialPhone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="commercial_click"
                  data-track-location="footer"
                  className="mt-0.5 text-[11px] text-white/50 transition-colors hover:text-white/80 hover:underline"
                >
                  Comercial (suporte): {settings.commercialPhone}
                </a>
              )}
            </div>

            <Link href="/contato" className="group mt-3 inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-4 transition-colors hover:text-[var(--color-gold-light)] sm:text-sm">
              <span>Ver rotas, mapa e contato</span>
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-3.5 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <p>© {new Date().getFullYear()} {settings.clinicName}. Todos os direitos reservados.</p>
            <span className="hidden sm:inline" aria-hidden="true">•</span>
            <p className="text-white/60">Responsável Técnica: Dra. Sara Michelon · CRO-SC 10632 · Registro EPAO 1697 SC</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/politica-de-privacidade" className="hover:text-white">Privacidade</Link>
            <Link href="/politica-de-cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export async function SiteShell({children}: {children: ReactNode}) {
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-clip">{children}</main>
      <SocialChannelsSection />
      <Footer />
    </>
  );
}
