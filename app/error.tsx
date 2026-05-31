'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { IconRefresh, IconArrowLeft, IconHeadset } from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      {/* ── Hero band ── */}
      <section className="relative overflow-hidden py-24 px-5 md:px-8 lg:px-12 lg:py-36 text-center"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #111827 100%)' }}
      >
        <StrokeArt variant="dark" />

        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Soft red glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #C04036 0%, transparent 70%)' }}
        />

        {/* Ghost text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
        >
          <span
            className="font-heading font-black text-white leading-none"
            style={{ fontSize: 'clamp(120px, 25vw, 300px)', opacity: 0.05 }}
          >
            500
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-[580px]">
          {/* Status pill */}
          <div
            className="anim-load-left inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 mb-6"
            style={{ animationDelay: '0ms', backgroundColor: 'rgba(255,255,255,0.07)' }}
          >
            <span className="relative flex h-2 w-2 flex-none">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vgu-yellow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-vgu-yellow" />
            </span>
            <span className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-white/50">
              Something went wrong
            </span>
          </div>

          <h1
            className="anim-load-left font-heading font-black text-[38px] tracking-[-2px] leading-[1.05] text-white md:text-[52px]"
            style={{ animationDelay: '70ms' }}
          >
            A quick<br />
            <span className="text-vgu-yellow">technical detour.</span>
          </h1>
          <p
            className="anim-load-left mt-5 text-[16px] font-body leading-[1.75] text-white/60 max-w-[420px] mx-auto"
            style={{ animationDelay: '140ms' }}
          >
            We hit an unexpected snag. Our team has been notified.
            A quick retry usually does the trick.
          </p>

          <div
            className="anim-load-left mt-9 flex items-center justify-center gap-3 flex-wrap"
            style={{ animationDelay: '210ms' }}
          >
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full bg-vgu-yellow text-neutral-900 hover:bg-vgu-yellow/90 font-heading font-semibold text-[15px] px-7 py-3.5 transition-all duration-200 shadow-[0_6px_24px_rgba(255,164,18,0.30)]"
            >
              <IconRefresh size={16} />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 text-white hover:bg-white/10 hover:border-white/45 font-heading font-semibold text-[15px] px-7 py-3.5 transition-all duration-200"
            >
              <IconArrowLeft size={16} />
              Go to Home
            </Link>
          </div>

          {error.digest && (
            <p
              className="anim-load-left mt-7 text-[11px] font-body text-white/25"
              style={{ animationDelay: '280ms' }}
            >
              Error ref: {error.digest}
            </p>
          )}
        </div>
      </section>

      {/* ── Support strip ── */}
      <section className="bg-neutral-50 py-10 px-5 md:px-8 lg:px-12">
        <div
          data-animate="fade-up"
          className="mx-auto max-w-[640px] flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-vgu-red/10 flex items-center justify-center flex-none">
            <IconHeadset size={20} className="text-vgu-red" stroke={1.5} />
          </div>
          <p className="text-[14px] font-body text-neutral-600 leading-[1.6]">
            Still running into this?{' '}
            <Link href="/contact" className="font-semibold text-vgu-red hover:text-vgu-red-dark transition-colors">
              Reach our support team
            </Link>
            {' '}and we&apos;ll get you sorted quickly.
          </p>
        </div>
      </section>
    </div>
  )
}
