'use client'

import StrokeArt from '@/components/ui/StrokeArt'

export default function Hero() {
  return (
    <section className="group relative min-h-screen bg-vgu-dark flex items-center overflow-hidden pt-[72px]">
      {/* Stroke art (hover-triggered) */}
      <StrokeArt variant="dark" />

      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[-5%]  w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(192,64,54,0.5)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,164,18,0.12)_0%,transparent_70%)] blur-[80px]" />
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-12 lg:px-8 md:px-5 py-20 grid grid-cols-[1fr_420px] gap-16 items-center xl:grid-cols-[1fr_380px] lg:grid-cols-1 lg:gap-12">

        {/* ── Left: copy ─────────────────────────────────── */}
        <div>
          {/* Eyebrow */}
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-gold mb-5">
            UGC-Entitled · Online Degrees
          </p>

          {/* H1 */}
          <h1 className="font-heading font-black text-[56px] tracking-tight leading-[1.1] text-white lg:text-[48px] md:text-[36px] sm:text-[32px]">
            Learn online.<br />
            Earn a degree that<br />
            <span className="text-vgu-yellow">opens doors.</span>
          </h1>

          {/* Subtext */}
          <p className="mt-5 text-[18px] font-body leading-[1.7] text-white/75 max-w-[480px] md:text-[16px]">
            VGU&apos;s UGC-entitled online degrees are recognised by employers across
            India and beyond — study fully online, at your own pace.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#counsellor"
              className="bg-vgu-red hover:bg-[#a8352b] text-white rounded-full px-8 py-3.5 text-[15px] font-semibold transition-colors duration-150 shadow-[0_4px_20px_rgba(192,64,54,0.45)]"
            >
              Apply Now — It&apos;s Free
            </a>
            <a
              href="#programs"
              className="bg-transparent border-2 border-white/40 hover:border-white text-white rounded-lg px-8 py-3.5 text-[15px] font-semibold transition-colors duration-150"
            >
              Explore Programmes
            </a>
          </div>

          {/* Trust micro-stats */}
          <div className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-8">
            {[
              { value: '50,000+', label: 'Learners enrolled' },
              { value: '4.8 / 5', label: 'Student rating' },
              { value: 'NAAC A+', label: 'Accredited · Est. 1998' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-heading font-black text-[20px] text-vgu-yellow leading-none">{value}</span>
                <span className="mt-1 text-[12px] font-body text-white/55">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: floating badge cluster (hidden below lg) ── */}
        <div className="relative hidden lg:flex items-center justify-center min-h-[420px] lg:min-h-[320px] lg:max-w-[440px] lg:mx-auto lg:w-full xl:flex">
          {/* Central glow orb */}
          <div
            aria-hidden="true"
            className="absolute inset-[10%] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle at 40% 40%, #C04036 0%, #FFA412 60%, transparent 80%)',
            }}
          />

          {/* Large decorative ring */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-white/10"
            style={{ margin: '8%' }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-white/5"
            style={{ margin: '20%' }}
          />

          {/* Central icon cluster */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,164,18,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <p className="text-white/60 text-[13px] font-body text-center leading-tight">
              Your degree.<br/>Your schedule.
            </p>
          </div>

          {/* ── Floating badge 1 — Learners ── */}
          <div
            className="absolute top-4 left-0 animate-float-up rounded-2xl bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.25)] min-w-[150px]"
            style={{ animationDelay: '0s' }}
          >
            <div className="font-heading font-black text-[22px] leading-none text-vgu-red">50,000+</div>
            <div className="mt-1 text-[11px] font-body text-gray-500">Learners enrolled</div>
          </div>

          {/* ── Floating badge 2 — Rating ── */}
          <div
            className="absolute bottom-16 right-0 animate-float-up rounded-2xl bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.25)] min-w-[140px]"
            style={{ animationDelay: '1.3s' }}
          >
            <div className="flex gap-0.5 text-vgu-yellow text-[13px]">{'★★★★★'}</div>
            <div className="font-heading font-black text-[18px] leading-none text-vgu-red mt-1">4.8 / 5</div>
            <div className="mt-0.5 text-[11px] font-body text-gray-500">12,400+ reviews</div>
          </div>

          {/* ── Floating badge 3 — Placement ── */}
          <div
            className="absolute bottom-0 left-4 animate-float-up rounded-2xl bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.25)] min-w-[140px]"
            style={{ animationDelay: '0.7s' }}
          >
            <div className="font-heading font-black text-[22px] leading-none text-vgu-red">93%</div>
            <div className="mt-1 text-[11px] font-body text-gray-500">Placement rate</div>
          </div>

          {/* ── Floating badge 4 — Live counsellor ── */}
          <div
            className="absolute top-10 right-0 animate-float-up flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
            style={{ animationDelay: '2s' }}
          >
            <span className="relative flex h-2.5 w-2.5 flex-none">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <div>
              <div className="font-heading text-[12px] font-bold text-gray-900">Live now</div>
              <div className="text-[10px] font-body text-gray-500">Counsellor available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
