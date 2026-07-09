'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconCookie } from '@tabler/icons-react'

type Consent = 'accepted' | 'rejected'
const STORAGE_KEY = 'vgu_cookie_consent'

export default function CookieConsent() {
  const pathname = usePathname()
  // Program detail pages show a fixed bottom-0 mobile CTA bar below lg - lift the
  // banner clear of it there so it doesn't cover the Apply Now / Talk to Counsellor buttons.
  const hasStickyCTA          = pathname?.startsWith('/programs/') ?? false
  const [mounted, setMounted] = useState(false)
  const [show, setShow]     = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'accepted' || stored === 'rejected') return
    } catch {}
    const t = setTimeout(() => {
      setShow(true)
      requestAnimationFrame(() => setMounted(true))
    }, 900)
    return () => clearTimeout(t)
  }, [])

  const save = (choice: Consent) => {
    try { localStorage.setItem(STORAGE_KEY, choice) } catch {}
    setMounted(false)
    setTimeout(() => setShow(false), 350)
  }

  if (!show) return null

  return (
    /* Outer positioner - floating card, docked to the bottom-right corner at every
       width. Lifted clear of the mobile sticky CTA bar on program detail pages. */
    <div
      className={[
        'fixed z-[120] left-4 right-4',
        'sm:left-auto sm:right-5 sm:w-[380px]',
        hasStickyCTA ? 'bottom-[116px] lg:bottom-5' : 'bottom-5',
        'transition-all duration-350 ease-out',
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
      ].join(' ')}
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
    >
      {/* Card */}
      <div
        className="w-full
                   bg-white rounded-2xl overflow-hidden
                   border border-neutral-200/80
                   shadow-[0_16px_48px_rgba(17,24,39,0.20),0_4px_16px_rgba(17,24,39,0.08)]"
      >
        {/* Gradient accent bar */}
        <div
          aria-hidden="true"
          className="h-[3px] w-full"
          style={{ background: 'linear-gradient(90deg, #C04036 0%, #FFA412 60%, #eecf63 100%)' }}
        />

        <div className="p-5">
          {/* Header row */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex-none w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #C04036, #821a12)',
                boxShadow: '0 4px 14px rgba(192,64,54,0.32)',
              }}
            >
              <IconCookie size={18} stroke={2} className="text-white" />
            </div>
            <h2 className="font-heading font-bold text-[15px] text-neutral-900 leading-tight">
              We use cookies
            </h2>
          </div>

          {/* Body */}
          <p className="text-[13px] font-body leading-[1.65] text-neutral-600 mb-4">
            We use essential, analytics, and preference cookies to give you the best
            experience on Online VGU. Read our{' '}
            <Link
              href="/privacy#cookies"
              className="font-semibold text-vgu-red underline underline-offset-2 hover:text-vgu-red-dark transition-colors"
            >
              Privacy Policy
            </Link>{' '}
            for details.
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => save('accepted')}
              className="flex-1 inline-flex items-center justify-center rounded-full
                         bg-vgu-red hover:bg-vgu-red-dark
                         text-white font-heading font-semibold text-[13px]
                         px-4 py-2.5 transition-all duration-200 whitespace-nowrap
                         shadow-[0_4px_12px_rgba(192,64,54,0.30)]"
            >
              Accept All
            </button>
            <button
              onClick={() => save('rejected')}
              className="flex-1 inline-flex items-center justify-center rounded-md
                         border-2 border-neutral-200 hover:border-neutral-300
                         bg-white text-neutral-600 hover:text-neutral-800
                         font-heading font-semibold text-[13px]
                         px-4 py-2.5 transition-all duration-200 whitespace-nowrap"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
