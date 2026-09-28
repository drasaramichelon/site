import type {Metadata, Viewport} from "next";
import {Manrope, Tenor_Sans} from "next/font/google";
import "./globals.css";
import {SiteShell} from "@/components/site-shell";
import {TrackingProvider} from "@/components/tracking-provider";
import {getSiteSettings} from "@/lib/sanity/repository";

const tenor = Tenor_Sans({subsets: ["latin"], weight: "400", variable: "--font-tenor", display: "swap"});
const manrope = Manrope({subsets: ["latin"], variable: "--font-manrope", display: "swap"});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(settings.siteUrl || "https://odontoestetica.net"),
    title: {default: "Dra. Sara Michelon | Odontologia e Estética", template: "%s"},
    description: "Odontologia e estética nos Ingleses, Florianópolis, com planejamento individual.",
    applicationName: settings.clinicName,
    alternates: {canonical: "/"},
    openGraph: {type: "website", locale: "pt_BR", siteName: settings.clinicName},
    twitter: {card: "summary_large_image"},
    icons: {icon: "/images/logo-icon-dra-sara.webp", apple: "/images/logo-icon-dra-sara.webp"},
  };
}

export const viewport: Viewport = {themeColor: "#3F2738", colorScheme: "light"};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const settings = await getSiteSettings();
  return (
    <html lang="pt-BR" className={`${tenor.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning><TrackingProvider ids={settings.trackingIds} /><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
