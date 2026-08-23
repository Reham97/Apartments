"use client";

import Link from "next/link";
import { Building2, Menu, Plus, X } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/ui/Container";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-18">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Building2 className="size-5" />
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900">
              Apartment<span className="text-blue-600">Hub</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-3 md:flex">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Apartments
            </Link>

            <Link
              href="/apartments/new"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <Plus className="size-4" />
              Add apartment
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="border-t border-slate-100 py-3 md:hidden">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Apartments
              </Link>

              <Link
                href="/apartments/new"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus className="size-4" />
                Add apartment
              </Link>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}