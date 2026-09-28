"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {ButtonLink, Container} from "@/components/design-system";
import {fallbackNavigation} from "@/lib/content/fallback";
import type {NavigationItem, SiteSettings} from "@/lib/content/types";

const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]";

function ChevronDownIcon({className}: {className?: string}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className ?? "h-4 w-4"}
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CloseIcon({className}: {className?: string}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-5 w-5"}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function MenuIcon({className}: {className?: string}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-5 w-5"}
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function SiteHeader({settings}: {settings: SiteSettings}) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close menus when route changes
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenDropdown(null);
    setIsDrawerOpen(false);
    setOpenMobileGroup(null);
  }

  // Active navigation item with mega-menu
  const activeItem = fallbackNavigation.find(
    (item) => item.label === openDropdown && item.groups && item.groups.length > 0
  );

  // Handle click outside to close desktop dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // Handle ESC key to close dropdowns or drawer
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setIsDrawerOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isDrawerOpen]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((current) => (current === label ? null : label));
  };

  const toggleMobileGroup = (label: string) => {
    setOpenMobileGroup((current) => (current === label ? null : label));
  };

  return (
    <>
      <header
        ref={headerRef}
        className="site-header sticky top-0 z-40 border-b border-[var(--color-border)]/70 bg-white/95 backdrop-blur-md transition-shadow"
      >
        <Container className="relative flex min-h-[82px] sm:min-h-[90px] py-2 sm:py-2.5 items-center justify-between gap-2 xl:gap-4 max-w-[1380px]">
          {/* Brand Logo & Authority Identifier */}
          <Link
            href="/"
            aria-label={`${settings.clinicName} — página inicial`}
            className={`${focusClass} flex items-center gap-2.5 sm:gap-3.5 shrink-0 transition-opacity hover:opacity-90`}
          >
            <Image
              src="/images/logo-dra-sara.webp"
              alt={settings.clinicName}
              width={152}
              height={85}
              priority
              className="h-11 sm:h-14 w-auto object-contain shrink-0"
            />
            <div className="h-8 sm:h-10 w-px bg-[var(--color-border)] shrink-0" aria-hidden="true" />
            <div className="flex flex-col justify-center leading-[1.18]">
              <span className="font-title text-[10px] min-[360px]:text-[11px] sm:text-xs font-semibold tracking-tight text-[var(--color-primary)]">
                Centro de Odontologia Estética
              </span>
              <span className="font-title text-[10.5px] min-[360px]:text-[11.5px] sm:text-xs font-bold text-[var(--color-primary)]">
                Dra. Sara Michelon
              </span>
              <span className="mt-0.5 text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-medium tracking-wide text-[var(--color-mauve)]">
                Nos Ingleses desde 2014
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Navegação principal" className="hidden xl:block shrink-0">
            <ul className="flex items-center gap-0.5 2xl:gap-1.5">
              {fallbackNavigation.map((item: NavigationItem) => {
                const hasGroups = Boolean(item.groups && item.groups.length > 0);
                const isOpen = openDropdown === item.label;

                if (hasGroups) {
                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() => toggleDropdown(item.label)}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        className={`${focusClass} flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-full px-2.5 2xl:px-3.5 py-2 text-xs 2xl:text-sm font-medium transition-colors ${
                          isOpen
                            ? "bg-[var(--color-pink)] text-[var(--color-primary)] font-semibold"
                            : "text-[var(--color-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-mauve)]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDownIcon
                          className={`h-3.5 w-3.5 2xl:h-4 2xl:w-4 transition-transform duration-200 ${
                            isOpen
                              ? "rotate-180 text-[var(--color-primary)]"
                              : "text-[var(--color-muted)]"
                          }`}
                        />
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${focusClass} block whitespace-nowrap rounded-full px-2.5 2xl:px-3.5 py-2 text-xs 2xl:text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-mauve)]`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action Button (Desktop CTA) */}
          <div className="hidden sm:block shrink-0">
            <ButtonLink href="/contato" location="header" className="whitespace-nowrap px-4 2xl:px-6">
              Agendar avaliação
            </ButtonLink>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 xl:hidden shrink-0">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={isDrawerOpen}
              className={`${focusClass} flex h-10 sm:h-11 items-center gap-1.5 sm:gap-2 rounded-lg border border-[var(--color-border)] px-3 sm:px-3.5 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface)] active:scale-95`}
            >
              <MenuIcon className="h-5 w-5" />
              <span className="text-xs uppercase tracking-wider font-semibold">Menu</span>
            </button>
          </div>

          {/* Desktop Mega-Menu Dropdown Panel (Positioned centered relative to the Container) */}
          <div
            className={`absolute left-0 right-0 top-full mt-2 hidden transition-all duration-200 ease-out xl:block ${
              activeItem
                ? "pointer-events-auto visible translate-y-0 opacity-100"
                : "pointer-events-none invisible -translate-y-2 opacity-0"
            }`}
          >
            {activeItem && (
              <div
                className={`mx-auto rounded-2xl border border-[var(--color-border)]/80 bg-white p-8 shadow-[0_24px_60px_-15px_rgba(63,39,56,0.18)] ${
                  activeItem.groups && activeItem.groups.length > 1
                    ? "max-w-[1140px]"
                    : "max-w-[780px]"
                }`}
              >
                <div
                  className={`grid gap-8 ${
                    activeItem.groups && activeItem.groups.length > 1
                      ? "grid-cols-[1.15fr_repeat(4,minmax(0,1fr))]"
                      : "grid-cols-[1.15fr_1.85fr]"
                  }`}
                >
                  {/* Overview Left Column */}
                  <div className="border-r border-[var(--color-border)]/50 pr-6">
                    <p className="font-title text-2xl text-[var(--color-primary)]">
                      {activeItem.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                      {activeItem.label === "Odontologia"
                        ? "Tratamentos integrados conduzidos com planejamento individualizado nos Ingleses, Florianópolis."
                        : "Procedimentos e avaliação facial integrados com foco em naturalidade e harmonia."}
                    </p>
                    <Link
                      href={activeItem.href}
                      onClick={() => setOpenDropdown(null)}
                      className={`${focusClass} mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--color-surface)] px-4 py-2.5 text-xs font-semibold tracking-wide text-[var(--color-primary)] transition-all hover:bg-[var(--color-surface-strong)] hover:text-[var(--color-mauve)]`}
                    >
                      <span>Ver visão geral</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {/* Groups Columns */}
                  {activeItem.groups && activeItem.groups.length > 1 ? (
                    activeItem.groups.map((group) => (
                      <div key={group.label}>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-mauve)]">
                          {group.label}
                        </p>
                        <ul className="mt-4 grid gap-2.5">
                          {group.items.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setOpenDropdown(null)}
                                className={`${focusClass} block text-sm leading-snug text-[var(--color-ink)]/85 transition-colors hover:text-[var(--color-mauve)]`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div>
                      {activeItem.groups?.map((group) => (
                        <div key={group.label}>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-mauve)]">
                            {group.label}
                          </p>
                          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
                            {group.items.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className={`${focusClass} block text-sm leading-snug text-[var(--color-ink)]/85 transition-colors hover:text-[var(--color-mauve)]`}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </header>

      {/* Mobile Lateral Drawer Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-all duration-300 xl:hidden ${
          isDrawerOpen
            ? "pointer-events-auto opacity-100 visible"
            : "pointer-events-none opacity-0 invisible"
        }`}
      />

      {/* Mobile Lateral Drawer (Slides from Right) */}
      <aside
        role="dialog"
        aria-label="Menu principal"
        aria-modal="true"
        aria-hidden={!isDrawerOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] xl:hidden ${
          isDrawerOpen
            ? "translate-x-0 opacity-100 visible pointer-events-auto"
            : "translate-x-full opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-20 items-center justify-between border-b border-[var(--color-border)]/80 px-6">
          <Link
            href="/"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Página inicial"
            className="flex items-center gap-3"
          >
            <Image
              src="/images/logo-icon-dra-sara.webp"
              alt={`Ícone da clínica ${settings.clinicName}`}
              width={36}
              height={36}
              className="h-8 w-8 object-contain shrink-0"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-title text-base font-bold text-[var(--color-primary)]">
                {settings.clinicName}
              </span>
              <span className="text-[11px] font-medium text-[var(--color-mauve)]">
                Nos Ingleses desde 2014
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Fechar menu"
            className={`${focusClass} flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface)] active:scale-90`}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Navigation List (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <nav aria-label="Navegação mobile">
            <ul className="grid gap-1">
              {fallbackNavigation.map((item: NavigationItem) => {
                const hasGroups = Boolean(item.groups && item.groups.length > 0);
                const isGroupOpen = openMobileGroup === item.label;

                if (hasGroups) {
                  return (
                    <li key={item.href} className="border-b border-[var(--color-border)]/40 pb-1">
                      <button
                        type="button"
                        onClick={() => toggleMobileGroup(item.label)}
                        className={`${focusClass} flex min-h-12 w-full cursor-pointer items-center justify-between py-2.5 text-left text-base font-semibold text-[var(--color-primary)]`}
                      >
                        <span>{item.label}</span>
                        <ChevronDownIcon
                          className={`h-4 w-4 text-[var(--color-mauve)] transition-transform duration-200 ${
                            isGroupOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile Submenu Accordion */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isGroupOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="border-l-2 border-[var(--color-mauve)]/30 pb-3 pl-4 pt-1">
                          <Link
                            href={item.href}
                            onClick={() => setIsDrawerOpen(false)}
                            className="block py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-mauve)] hover:underline"
                          >
                            Ver visão geral de {item.label} →
                          </Link>
                          {item.groups
                            ?.flatMap((group) => group.items)
                            .map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsDrawerOpen(false)}
                                className="block py-2 text-sm text-[var(--color-ink)]/80 transition-colors hover:text-[var(--color-mauve)]"
                              >
                                {child.label}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.href} className="border-b border-[var(--color-border)]/40 pb-1">
                    <Link
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className={`${focusClass} flex min-h-12 items-center py-2.5 text-base font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-mauve)]`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Drawer Footer CTA */}
        <div className="border-t border-[var(--color-border)]/80 bg-[var(--color-surface)] p-6">
          <ButtonLink
            href="/contato"
            location="mobile_navigation"
            className="w-full justify-center py-3 text-center"
          >
            Agendar avaliação
          </ButtonLink>
          <p className="mt-4 text-center text-xs text-[var(--color-muted)]">
            {settings.locality}
          </p>
        </div>
      </aside>
    </>
  );
}
