'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { IconMenu2, IconX } from '@tabler/icons-react'

const NAV_LINKS = [
  { label: 'Programmes', href: '#programs'     },
  { label: 'Campus Life', href: '#campus'       },
  { label: 'Stories',     href: '#testimonials' },
  { label: 'FAQs',        href: '#faq'          },
]

export default function Navbar() {
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
          'fixed inset-x-0 top-0 z-50 transition-all duration-200',
          scrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-200'
            : 'bg-white border-b border-neutral-200',
        ].join(' ')}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center px-12 lg:px-8 md:px-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex-none font-heading font-bold text-[22px] text-vgu-red tracking-tight"
          >
            Online VGU
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-8" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body font-semibold text-[15px] text-gray-700 hover:text-vgu-red transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex ml-auto">
            <a
              href="#counsellor"
              className="bg-vgu-red hover:bg-vgu-dark text-white rounded-full px-7 py-3 text-[15px] font-semibold transition-colors duration-150"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="ml-auto flex lg:hidden h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer — slides from right */}
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
          <div className="flex h-[72px] items-center justify-between px-6 border-b border-neutral-200">
            <span className="font-heading font-bold text-[20px] text-vgu-red">Online VGU</span>
            <button
              className="h-9 w-9 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <IconX size={20} />
            </button>
          </div>

          {/* Drawer links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-between border-b border-gray-100 py-4 px-2 font-heading font-semibold text-[17px] text-gray-900 hover:text-vgu-red transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </a>
            ))}
          </nav>

          {/* Drawer CTA */}
          <div className="p-5 border-t border-gray-100">
            <a
              href="#counsellor"
              className="block w-full bg-vgu-red hover:bg-vgu-dark text-white text-center rounded-full px-7 py-3.5 text-[15px] font-semibold transition-colors duration-150"
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
