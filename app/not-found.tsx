import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowLeft, IconArrowRight, IconHome, IconBook, IconHeadset } from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for could not be found.',
}

const QUICK_LINKS = [
  {
    href: '/',
    Icon: IconHome,
    title: 'Back to Home',
    desc: 'Start fresh from the VGU homepage.',
    iconBg: 'bg-vgu-red/10',
    iconColor: 'text-vgu-red',
  },
  {
    href: '/programs',
    Icon: IconBook,
    title: 'Browse Programs',
    desc: 'MBA, MCA, BBA, BCA and 20+ online degrees.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    href: '/contact',
    Icon: IconHeadset,
    title: 'Talk to Us',
    desc: 'Free counselling - no obligation, reply in 2 minutes.',
    iconBg: 'bg-vgu-yellow/20',
    iconColor: 'text-amber-600',
  },
]

export default function NotFound() {
  return (
    <div>
      {/* ── Hero band ── */}
      <section className="relative overflow-hidden bg-vgu-red py-24 px-5 md:px-8 lg:px-12 lg:py-36 text-center">
        <StrokeArt variant="dark" />

        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Ghost number */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
        >
          <span
            className="font-heading font-black text-white leading-none"
            style={{ fontSize: 'clamp(180px, 35vw, 400px)', opacity: 0.06 }}
          >
            404
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-[620px]">
          <p
            className="anim-load-left text-[12px] font-body font-bold uppercase tracking-[0.08em] text-white/50 mb-5"
            style={{ animationDelay: '0ms' }}
          >
            Error 404
          </p>
          <h1
            className="anim-load-left font-heading font-black text-[38px] tracking-[-2px] leading-[1.05] text-white md:text-[56px] lg:text-[68px]"
            style={{ animationDelay: '70ms' }}
          >
            Oops. This page<br />
            <span className="text-vgu-yellow">doesn't exist.</span>
          </h1>
          <p
            className="anim-load-left mt-5 text-[16px] font-body leading-[1.75] text-white/65 max-w-[440px] mx-auto"
            style={{ animationDelay: '140ms' }}
          >
            The link may be broken, the page may have moved, or it was never here.
            Either way - let's get you somewhere useful.
          </p>

          <div
            className="anim-load-left mt-9 flex items-center justify-center gap-3 flex-wrap"
            style={{ animationDelay: '210ms' }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white text-vgu-red hover:bg-vgu-beige font-heading font-semibold text-[15px] px-7 py-3.5 transition-all duration-200 shadow-[0_6px_24px_rgba(0,0,0,0.22)]"
            >
              <IconArrowLeft size={16} />
              Go to Home
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/35 text-white hover:bg-white/12 hover:border-white/60 font-heading font-semibold text-[15px] px-7 py-3.5 transition-all duration-200"
            >
              Browse Programs
              <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick links ── */}
      <section className="bg-neutral-50 py-14 px-5 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[900px]">
          <p
            data-animate="fade-up"
            className="text-center text-[12px] font-body font-bold uppercase tracking-[0.08em] text-neutral-400 mb-7"
          >
            Or head to
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {QUICK_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                data-animate="materialize"
                style={{ animationDelay: `${i * 80}ms` }}
                className="group flex flex-col gap-4 rounded-2xl bg-white border border-neutral-200 p-6 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(192,64,54,0.10)] hover:border-vgu-red/20 transition-all duration-200"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-none ${link.iconBg}`}>
                  <link.Icon size={21} className={link.iconColor} stroke={1.5} />
                </div>
                <div>
                  <p className="font-heading font-bold text-[15px] text-neutral-900 group-hover:text-vgu-red transition-colors duration-150">
                    {link.title}
                  </p>
                  <p className="mt-1 text-[13px] font-body text-neutral-500 leading-[1.6]">
                    {link.desc}
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-heading font-semibold text-vgu-red group-hover:gap-2.5 transition-all duration-150">
                  Visit <IconArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
