'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import {
  IconMenu2,
  IconX,
  IconHome,
  IconInfoCircle,
  IconSchool,
  IconClipboardCheck,
  IconBriefcase,
  IconArticle,
  IconPhone,
  IconChevronRight,
  IconChevronDown,
  IconArrowRight,
} from '@tabler/icons-react'
import { PROGRAMMES } from '@/app/programs/data'

const NAV_LINKS = [
  { label: 'About',      href: '/about',         Icon: IconInfoCircle      },
  { label: 'Programs',   href: '/programs',      Icon: IconSchool          },
  { label: 'Admissions', href: '/#how-to-apply', Icon: IconClipboardCheck  },
  { label: 'Placements', href: '/placements',    Icon: IconBriefcase       },
  { label: 'Blog',       href: '/blog',          Icon: IconArticle         },
]

const UG_PROGRAMMES = PROGRAMMES.filter(p => p.level === 'ug')
const PG_PROGRAMMES = PROGRAMMES.filter(p => p.level === 'pg')
const DISCIPLINE_COUNT = new Set(PROGRAMMES.map(p => p.discipline)).size

// Active for the exact page and any of its sub-routes (e.g. /programs/bba
// should still highlight "Programs"), never for hash anchors or external links.
function isNavActive(href: string, pathname: string): boolean {
  if (href.startsWith('http') || href.includes('#')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const pathname                      = usePathname()
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const drawerRef                     = useRef<HTMLDivElement>(null)
  const hamburgerRef                  = useRef<HTMLButtonElement>(null)
  const programsRef                   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer / programs menu on escape
  useEffect(() => {
    if (!mobileOpen && !programsOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMobileOpen(false)
      setProgramsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen, programsOpen])

  // A client-side route change (clicking a program link) should always
  // collapse the menu - otherwise it can be left open, hovering over stale
  // content, on the page that was just navigated to.
  useEffect(() => {
    setProgramsOpen(false)
  }, [pathname])

  // Close on any tap outside the drawer - checked against the actual click
  // target rather than the backdrop's hit-testing, since the sticky header
  // sits above the backdrop (z-100 vs z-40) and would otherwise swallow taps
  // in that band without ever reaching the backdrop's own onClick.
  useEffect(() => {
    if (!mobileOpen) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (drawerRef.current?.contains(target)) return
      if (hamburgerRef.current?.contains(target)) return
      setMobileOpen(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [mobileOpen])

  return (
    <>
      <header
        className={[
          'sticky top-0 z-[100] transition-all duration-200',
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.08)] border-b border-neutral-200'
            : 'bg-white border-b border-neutral-200',
        ].join(' ')}
      >
        <div className="mx-auto flex h-[64px] lg:h-[72px] max-w-[1280px] items-center px-5 md:px-8 lg:px-12">
          {/* Logo lockup - VGU + NAAC paired tightly.
              Logo containers are taller than the navbar bar itself; the
              transparent padding baked into both PNGs absorbs the overflow,
              so the visible content sits centered within the header height. */}
          <Link href="/" className="flex-none flex items-center" aria-label="Online VGU - NAAC A+ Accredited - Home">
            <Image
              src="/logos/vgu-logo.png"
              alt="Online VGU - Entitled by UGC"
              width={300}
              height={300}
              unoptimized
              priority
              className="h-[72px] md:h-[80px] lg:h-[88px] w-auto object-contain"
            />
            <Image
              src="/logos/naac-grade-a-plus.png"
              alt="NAAC A+ Accredited University"
              width={400}
              height={200}
              unoptimized
              className="hidden sm:block h-[80px] md:h-[88px] lg:h-[96px] w-auto object-contain -ml-8 md:-ml-11 lg:-ml-12"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-8" aria-label="Main">
            {NAV_LINKS.map((link) => {
              const active = isNavActive(link.href, pathname)

              if (link.label === 'Programs') {
                return (
                  <div
                    key={link.label}
                    ref={programsRef}
                    className="relative"
                    onMouseEnter={() => setProgramsOpen(true)}
                    onMouseLeave={() => setProgramsOpen(false)}
                    onFocus={() => setProgramsOpen(true)}
                    onBlur={(e) => {
                      if (!programsRef.current?.contains(e.relatedTarget as Node)) setProgramsOpen(false)
                    }}
                  >
                    <a
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      aria-haspopup="true"
                      aria-expanded={programsOpen}
                      className={[
                        'relative inline-flex items-center gap-1 font-heading font-medium text-[15px] transition-colors duration-150',
                        'after:absolute after:bottom-[-22px] after:left-0 after:h-[3px] after:rounded-full after:bg-vgu-red after:transition-all after:duration-300',
                        active
                          ? 'text-vgu-red after:w-full'
                          : 'text-neutral-900 hover:text-vgu-red after:w-0 hover:after:w-full',
                      ].join(' ')}
                    >
                      {link.label}
                      <IconChevronDown
                        size={14}
                        stroke={2}
                        className={`transition-transform duration-200 ${programsOpen ? 'rotate-180' : ''}`}
                      />
                    </a>

                    {/* Mega menu - the wrapper starts flush at top-full (no margin) and
                        carries the visual gap as its own top padding instead, so that
                        gap is still "inside" this hoverable element rather than being
                        genuinely empty space the mouse can fall through and lose hover
                        state while crossing from the trigger down to the panel. */}
                    <div
                      className={[
                        'absolute left-1/2 top-full w-[540px] -translate-x-1/2 pt-4 transition-all duration-200',
                        programsOpen
                          ? 'visible translate-y-0 opacity-100'
                          : 'invisible -translate-y-1 opacity-0 pointer-events-none',
                      ].join(' ')}
                      onMouseEnter={() => setProgramsOpen(true)}
                      onMouseLeave={() => setProgramsOpen(false)}
                    >
                      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_20px_48px_rgba(17,24,39,0.14)]">
                        <div className="grid grid-cols-2 gap-8">
                          {/* Undergraduate - shorter list. The summary/CTA is
                              absolutely positioned to the bottom of this column so
                              it fills the remaining space and lines up exactly with
                              the bottom of the taller Postgraduate list, rather than
                              being sized into the flow (which would inflate this
                              column's own height and drift past Postgraduate's end). */}
                          <div className="relative">
                            <p className="mb-3 text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red">
                              Undergraduate
                            </p>
                            <ul className="flex flex-col gap-0.5">
                              {UG_PROGRAMMES.map((p) => (
                                <li key={p.slug}>
                                  <Link
                                    href={`/programs/${p.slug}`}
                                    className="group -mx-2.5 flex flex-col rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-neutral-50"
                                  >
                                    <span className="font-heading font-bold text-[14px] text-neutral-900 transition-colors group-hover:text-vgu-red">
                                      {p.name}
                                    </span>
                                    <span className="mt-0.5 text-[12px] text-neutral-500">{p.fullName}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>

                            {/* pb-2 matches the py-2 every program link carries, so
                                this text's visible baseline lands level with the
                                Postgraduate list's last item instead of sitting
                                lower (the program links' own bottom padding pushes
                                their visible text up from the true bottom edge). */}
                            <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-100 pt-4 pb-2">
                              <p className="text-[13px] text-neutral-500">
                                {PROGRAMMES.length} programs across {DISCIPLINE_COUNT} disciplines
                              </p>
                              <Link
                                href="/programs"
                                className="group mt-2 inline-flex items-center gap-1.5 text-[14px] font-heading font-semibold text-vgu-red transition-colors duration-150 hover:text-vgu-red-dark"
                              >
                                View all programs
                                <IconArrowRight size={15} className="transition-transform duration-150 group-hover:translate-x-1" />
                              </Link>
                            </div>
                          </div>
                          <div>
                            <p className="mb-3 text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red">
                              Postgraduate
                            </p>
                            <ul className="flex flex-col gap-0.5">
                              {PG_PROGRAMMES.map((p) => (
                                <li key={p.slug}>
                                  <Link
                                    href={`/programs/${p.slug}`}
                                    className="group -mx-2.5 flex flex-col rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-neutral-50"
                                  >
                                    <span className="flex items-center gap-1.5">
                                      <span className="font-heading font-bold text-[14px] text-neutral-900 transition-colors group-hover:text-vgu-red">
                                        {p.name}
                                      </span>
                                      {p.popular && (
                                        <span className="inline-flex items-center rounded-full bg-vgu-yellow px-1.5 py-0.5 text-[9px] font-heading font-bold uppercase tracking-[0.02em] text-neutral-900">
                                          Popular
                                        </span>
                                      )}
                                    </span>
                                    <span className="mt-0.5 text-[12px] text-neutral-500">{p.fullName}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'relative font-heading font-medium text-[15px] transition-colors duration-150',
                    'after:absolute after:bottom-[-22px] after:left-0 after:h-[3px] after:rounded-full after:bg-vgu-red after:transition-all after:duration-300',
                    active
                      ? 'text-vgu-red after:w-full'
                      : 'text-neutral-900 hover:text-vgu-red after:w-0 hover:after:w-full',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <Link
              href="/contact"
              className={[
                'font-heading font-medium text-[15px] transition-colors duration-150',
                pathname === '/contact' ? 'text-vgu-red' : 'text-neutral-600 hover:text-vgu-red',
              ].join(' ')}
            >
              Contact
            </Link>
            <a
              href="#counsellor"
              data-apply-trigger
              className="border-2 border-vgu-red bg-vgu-red hover:bg-white text-white hover:text-vgu-red rounded-md px-8 py-3.5 text-[15px] font-heading font-semibold transition-all duration-200"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            className="ml-auto flex lg:hidden h-11 w-11 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer - slides from right */}
      <div
        className={[
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          mobileOpen ? 'visible' : 'invisible',
        ].join(' ')}
      >
        {/* Backdrop */}
        <div
          className={[
            'absolute inset-0 bg-black/40 transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel - sits below the sticky header (z-40 < header's z-100), which
            stays visible and owns the single hamburger/X toggle. No internal header here.
            Offset is header height (64px) + the IntakeCountdown banner above it (~38px),
            not just the header alone, or the top of the panel gets clipped under the banner. */}
        <div
          ref={drawerRef}
          className={[
            'absolute right-0 top-[103px] bottom-0 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          {/* Drawer links */}
          <nav className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
            <p className="px-4 mb-3 text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red">
              Menu
            </p>
            <div className="flex flex-col gap-1.5">
              <Link
                href="/"
                aria-current={pathname === '/' ? 'page' : undefined}
                className={[
                  'group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 min-h-[44px] font-heading font-semibold text-[16px] transition-all duration-200',
                  pathname === '/'
                    ? 'bg-vgu-red text-white shadow-[0_6px_20px_rgba(192,64,54,0.32)]'
                    : 'text-neutral-800 hover:bg-neutral-50',
                ].join(' ')}
                onClick={() => setMobileOpen(false)}
              >
                <IconHome size={20} stroke={1.75} className={pathname === '/' ? 'text-white' : 'text-vgu-red'} />
                <span className="flex-1">Home</span>
                <IconChevronRight
                  size={16}
                  className={pathname === '/' ? 'text-white/70' : 'text-neutral-300 group-hover:text-vgu-red/50'}
                />
              </Link>
              {NAV_LINKS.map((link) => {
                const active = isNavActive(link.href, pathname)
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 min-h-[44px] font-heading font-semibold text-[16px] transition-all duration-200',
                      active
                        ? 'bg-vgu-red text-white shadow-[0_6px_20px_rgba(192,64,54,0.32)]'
                        : 'text-neutral-800 hover:bg-neutral-50',
                    ].join(' ')}
                    onClick={() => setMobileOpen(false)}
                  >
                    <link.Icon size={20} stroke={1.75} className={active ? 'text-white' : 'text-vgu-red'} />
                    <span className="flex-1">{link.label}</span>
                    <IconChevronRight
                      size={16}
                      className={active ? 'text-white/70' : 'text-neutral-300 group-hover:text-vgu-red/50'}
                    />
                  </a>
                )
              })}
              <Link
                href="/contact"
                aria-current={pathname === '/contact' ? 'page' : undefined}
                className={[
                  'group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 min-h-[44px] font-heading font-semibold text-[16px] transition-all duration-200',
                  pathname === '/contact'
                    ? 'bg-vgu-red text-white shadow-[0_6px_20px_rgba(192,64,54,0.32)]'
                    : 'text-neutral-800 hover:bg-neutral-50',
                ].join(' ')}
                onClick={() => setMobileOpen(false)}
              >
                <IconPhone size={20} stroke={1.75} className={pathname === '/contact' ? 'text-white' : 'text-vgu-red'} />
                <span className="flex-1">Contact</span>
                <IconChevronRight
                  size={16}
                  className={pathname === '/contact' ? 'text-white/70' : 'text-neutral-300 group-hover:text-vgu-red/50'}
                />
              </Link>
            </div>
          </nav>

          {/* Drawer CTA */}
          <div className="p-5 border-t border-neutral-100">
            <a
              href="#counsellor"
              data-apply-trigger
              className="block w-full border-2 border-vgu-red bg-vgu-red hover:bg-white text-white hover:text-vgu-red text-center rounded-md px-8 py-3.5 text-[15px] font-heading font-semibold transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
