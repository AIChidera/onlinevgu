import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - Coming Soon | Online VGU',
  description: 'Career guides, alumni outcomes, and program breakdowns from VGU faculty and placement team. Launching soon.',
  alternates: { canonical: 'https://onlinevgu.in/blog' },
  openGraph: {
    title: 'Blog - Coming Soon | Online VGU',
    description: 'Career guides, alumni outcomes, and program breakdowns from VGU faculty and placement team.',
    url: 'https://onlinevgu.in/blog',
  },
}

export default function BlogPage() {
  return (
    <main>
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center min-h-[calc(100dvh-72px)] px-5"
        style={{ background: 'linear-gradient(135deg, #110805 0%, #821a12 38%, #2d0f0b 68%, #110805 100%)' }}
      >
        {/* Dot grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Warm glow accents */}
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-vgu-red/25 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-vgu-yellow/10 blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-[600px] mx-auto py-24">

          {/* Eyebrow */}
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-5">
            Blog
          </p>

          {/* Heading */}
          <h1 className="font-heading font-bold text-[38px] tracking-[-1px] leading-[1.15] text-white mb-6 md:text-[52px]">
            Real stories.{' '}
            <span className="text-vgu-yellow">Coming soon.</span>
          </h1>

          {/* Body */}
          <p className="text-[16px] font-body leading-[1.7] text-white/70 mb-8 max-w-[460px] mx-auto md:text-[18px]">
            Career guides, alumni outcomes, and program breakdowns written by VGU's faculty and placement team. We're finishing the details.
          </p>

          {/* Pulse badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/20 px-5 py-2.5 mb-10">
            <span className="relative flex h-2.5 w-2.5 flex-none" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vgu-yellow opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vgu-yellow" />
            </span>
            <span className="text-[13px] font-body font-semibold text-white/80">Launching soon</span>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white font-heading font-semibold text-[15px] px-8 py-3.5 transition-all duration-200 shadow-[0_4px_16px_rgba(192,64,54,0.35)]"
            >
              Explore Programs
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-md border-2 border-white/30 hover:bg-white/10 text-white font-heading font-semibold text-[15px] px-[30px] py-3 transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </section>
    </main>
  )
}
