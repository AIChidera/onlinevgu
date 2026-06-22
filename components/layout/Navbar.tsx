'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
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
          {/* Logo */}
          <Link
            href="/"
            className="flex-none font-heading font-bold text-[22px] text-vgu-red tracking-tight"
          >
            Online VGU
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
              className="border-2 border-vgu-red bg-vgu-red hover:bg-white text-white hover:text-vgu-red rounded-full px-8 py-3.5 text-[15px] font-heading font-semibold transition-all duration-200"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
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

        {/* Drawer panel */}
        <div
          className={[
            'absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          {/* Drawer header */}
          <div className="flex h-[64px] items-center justify-between px-6 border-b border-neutral-200">
            <span className="font-heading font-bold text-[20px] text-vgu-red">Online VGU</span>
            <button
              className="h-11 w-11 flex items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <IconX size={20} />
            </button>
          </div>

          {/* Drawer links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
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
              className="block w-full border-2 border-vgu-red bg-vgu-red hover:bg-white text-white hover:text-vgu-red text-center rounded-full px-8 py-3.5 text-[15px] font-heading font-semibold transition-all duration-200"
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
