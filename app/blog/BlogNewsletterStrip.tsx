'use client'

import { useState } from 'react'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'

export default function BlogNewsletterStrip() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="sketch-hover-group relative bg-vgu-red overflow-hidden px-5 md:px-8 lg:px-12 pb-16 lg:pb-20 pt-20 lg:pt-24" style={{ boxShadow: 'inset 0 1px 0 0 #F9FAFB' }}>
      {/* Hover-reveal flourish - draws in slowly on section hover, retraces on leave */}
      <SketchFlourish shape="swoop" color="yellow" opacity={0.06} strokeWidth={28} durationMs={2400} className="[transform:scaleX(-1)]" />
      {/* Wave swoop from the section above (neutral-50 BlogIndex bg) */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 64" className="w-full" preserveAspectRatio="none" style={{ display: 'block' }}>
          <path d="M0,0 C320,64 640,0 960,48 C1120,64 1300,24 1440,40 L1440,0 Z" fill="#F9FAFB" />
        </svg>
      </div>
      {/* Decorative orbs */}
      <div aria-hidden="true" className="absolute -top-8 -right-16 w-72 h-72 rounded-full opacity-[0.12]" style={{ background: 'radial-gradient(circle, #FFA412 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="absolute -bottom-12 -left-20 w-64 h-64 rounded-full opacity-[0.10]" style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 65%)' }} />
      <div data-animate="fade-up" className="relative z-10 mx-auto max-w-[680px] text-center">
        <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-white/60 mb-3">
          Stay ahead
        </p>
        <h2 className="font-heading font-bold text-[26px] tracking-[-0.5px] leading-[1.2] text-white mb-3 md:text-[34px]">
          Career guides, straight to your inbox.
        </h2>
        <p className="text-[15px] font-body leading-[1.65] text-white/75 mb-8 max-w-[500px] mx-auto">
          Join 50,000+ learners getting our monthly roundup of placement results, skill guides, and program updates.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 bg-white/15 border border-white/25 text-white font-heading font-semibold text-[15px] rounded-md px-8 py-4">
            <IconCheck size={18} stroke={2.5} className="text-vgu-yellow" />
            You&apos;re in. Watch your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[460px] mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 min-w-0 rounded-full bg-white/10 border border-white/25 text-white placeholder-white/50 font-body text-[15px] px-5 py-3.5 focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all duration-200"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex-none inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-vgu-red font-heading font-semibold text-[15px] rounded-md px-7 py-3.5 transition-all duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.18)] disabled:opacity-70"
            >
              {loading ? 'Subscribing...' : (
                <>
                  <span>Subscribe</span>
                  <IconArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}

        <p className="mt-5 text-[12px] font-body text-white/40">No spam. Unsubscribe any time.</p>
      </div>
    </section>
  )
}
