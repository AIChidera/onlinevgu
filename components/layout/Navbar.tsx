'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import Button from '@/components/ui/Button'

const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Programs',   href: '/programs', dropdown: true },
  { label: 'About',      href: '/about' },
  { label: 'Admissions', href: '/apply' },
  { label: 'Placements', href: '/#placements' },
  { label: 'Blog',       href: '/blog' },
]

const UG_PROGRAMS = [
  { name: 'Online BBA',   href: '/programs/online-bba' },
  { name: 'Online BCA',   href: '/programs/online-bca' },
  { name: 'Online B.Com', href: '/programs/online-bcom' },
  { name: 'Online B.Sc',  href: '/programs/online-bsc' },
  { name: 'Online B.Lib', href: '/programs/online-blib' },
]

const PG_PROGRAMS = [
  { name: 'Online MBA',           href: '/programs/online-mba' },
  { name: 'MBA in Healthcare',    href: '/programs/online-mba-healthcare' },
  { name: 'Online MCA',           href: '/programs/online-mca' },
  { name: 'Online M.Com',         href: '/programs/online-mcom' },
  { name: 'Online MA',            href: '/programs/online-ma' },
  { name: 'Online M.Lib',         href: '/programs/online-mlib' },
]

export default function Navbar() {
  const { scrolled } = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-200',
        scrolled
          ? 'bg-white/95 backdrop-blur-[12px] shadow-sm border-b border-neutral-200'
          : 'bg-white/90 backdrop-blur-[8px] border-b border-neutral-200/60',
      ].join(' ')}
    >
      <div className="mx-auto flex h-[72px] max-w-content items-center gap-8 px-12 md:px-5">
        {/* Logo */}
        <Link href="/" className="flex-none">
          <Image src="/assets/logo.svg" alt="Online VGU" width={160} height={40} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-1 items-center gap-6" aria-label="Main">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="group relative flex items-center">
                <Link
                  href={link.href}
                  className="flex items-center gap-1.5 font-heading font-semibold text-[15px] text-neutral-900 hover:text-vgu-red transition-colors py-6"
                >
                  {link.label}
                  <ChevronDown />
                </Link>

                {/* Dropdown */}
                <div
                  className="absolute top-full left-[-16px] z-50 w-80 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg
                              opacity-0 pointer-events-none translate-y-1.5 transition-all duration-200 ease-out-quint
                              group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
                              before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                >
                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      <div className="px-3 pb-2 text-[11px] font-heading font-semibold uppercase tracking-widest text-neutral-400">
                        Undergraduate
                      </div>
                      {UG_PROGRAMS.map((p) => (
                        <Link
                          key={p.name}
                          href={p.href}
                          className="block rounded-md px-3 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50 hover:text-vgu-red transition-colors"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <div className="px-3 pb-2 text-[11px] font-heading font-semibold uppercase tracking-widest text-neutral-400">
                        Postgraduate
                      </div>
                      {PG_PROGRAMS.map((p) => (
                        <Link
                          key={p.name}
                          href={p.href}
                          className="block rounded-md px-3 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50 hover:text-vgu-red transition-colors"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="font-heading font-semibold text-[15px] text-neutral-900 hover:text-vgu-red transition-colors py-6"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="ml-auto hidden md:flex items-center gap-3">
          <a
            href="tel:+911800123456"
            className="flex items-center gap-2 font-heading font-bold text-sm text-neutral-900 hover:text-vgu-red transition-colors px-3 py-2 rounded-md hover:bg-neutral-50"
          >
            <PhoneIcon />
            1800 123 456
          </a>
          <Button size="sm" as="a" href="/apply">
            Apply now
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="ml-auto flex md:hidden h-11 w-11 items-center justify-center rounded-md text-neutral-900 hover:bg-neutral-50"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[64px] bottom-0 z-40 overflow-y-auto bg-white px-5 py-6 flex flex-col gap-1 animate-rise-in md:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.dropdown ? '/programs' : l.href}
              className="flex items-center justify-between border-b border-neutral-200 py-3.5 font-heading font-semibold text-[17px] text-neutral-900 hover:text-vgu-red"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
              <ChevronRight />
            </Link>
          ))}
          <a
            href="tel:+911800123456"
            className="mt-4 flex items-center gap-2 border-b border-neutral-200 py-3.5 font-heading font-semibold text-[17px] text-neutral-900"
          >
            1800 123 456
          </a>
          <Button
            className="mt-4"
            fullWidth
            as="a"
            href="/apply"
            onClick={() => setMobileOpen(false)}
          >
            Apply now →
          </Button>
        </div>
      )}
    </header>
  )
}

// ── Inline SVG icons (keeps component self-contained) ─────────

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 transition-transform group-hover:rotate-180 duration-200" aria-hidden="true">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6"/>
      <line x1="4" y1="12" x2="20" y2="12"/>
      <line x1="4" y1="18" x2="20" y2="18"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-vgu-red" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12 19.79 19.79 0 0 1 1.06 3.38 2 2 0 0 1 3.04 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}
