"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-primary text-primary-foreground shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image
            src="/images/maison-lorayane.jpg"
            alt="Maison L'Orayane"
            width={60}
            height={100}
            className="rounded-full"
            />
            <span className="ml-3 text-xl font-bold text-primary-foreground">Maison L'Orayane</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">
                Accueil
              </Link>
              <Link href="/histoire" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">
                Notre Histoire
              </Link>
              <Link href="/boutique" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">
                Boutique
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-primary-foreground"
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                // Close icon
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open ? (
          <div id="mobile-menu" className="md:hidden pb-3">
            <div className="space-y-1 pt-2">
              <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:opacity-90" onClick={() => setOpen(false)}>
                Accueil
              </Link>
              <Link href="/histoire" className="block px-3 py-2 rounded-md text-base font-medium hover:opacity-90" onClick={() => setOpen(false)}>
                Notre Histoire
              </Link>
              <Link href="/boutique" className="block px-3 py-2 rounded-md text-base font-medium hover:opacity-90" onClick={() => setOpen(false)}>
                Boutique
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  )
}