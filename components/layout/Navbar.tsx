'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { IconMenu2, IconX } from '@tabler/icons-react'

const NAV_LINKS = [
  { label: 'About',      href: '/about'         },
  { label: 'Programs',   href: '/programs'      },
  { label: 'Admissions', href: '/#how-to-apply' },
  { label: 'Placements', href: '/placements'    },
  { label: 'Blog',       href: '/blog'          },
]

export default function Navbar() {
  const pathname                      = usePathname()
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const drawerRef                     = useRef<HTMLDivElement>(null)
  const hamburgerRef                  = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on escape
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

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
              // Active only for in-site path links (skip external + hash anchors)
              const isPath = !link.href.startsWith('http') && !link.href.includes('#')
              const active = isPath && pathname === link.href
              return (
                <a
                  key={link.label}
                  href={link.href}
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
            stays visible and owns the single hamburger/X toggle. No internal header here. */}
        <div
          ref={drawerRef}
          className={[
            'absolute right-0 top-16 bottom-0 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          {/* Drawer links */}
          <nav className="flex-1 overflow-y-auto px-4 pt-6 pb-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isPath = !link.href.startsWith('http') && !link.href.includes('#')
              const active = isPath && pathname === link.href
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={[
                    'border-b border-neutral-100 py-4 px-2 font-heading font-semibold text-[17px] transition-colors',
                    active ? 'text-vgu-red' : 'text-neutral-900 hover:text-vgu-red',
                  ].join(' ')}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              )
            })}
            <Link
              href="/contact"
              className={[
                'border-b border-neutral-100 py-4 px-2 font-heading font-semibold text-[17px] transition-colors',
                pathname === '/contact' ? 'text-vgu-red' : 'text-neutral-900 hover:text-vgu-red',
              ].join(' ')}
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
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
