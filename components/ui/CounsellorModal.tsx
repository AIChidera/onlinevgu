'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  IconHeadset,
  IconLock,
  IconShieldCheck,
  IconClock,
  IconThumbUp,
  IconX,
} from '@tabler/icons-react'

const PROGRAMMES = [
  'B.Com', 'BBA', 'BCA', 'BA', 'B.Sc', 'B.Lib',
  'MBA', 'MCA', 'M.Com', 'MA', 'M.Lib', 'Healthcare MBA',
]

const TRUST_PILLS = [
  { Icon: IconThumbUp,     label: 'Free consultation' },
  { Icon: IconShieldCheck, label: 'No obligation'     },
  { Icon: IconClock,       label: 'Reply in 2 min'    },
]

export default function CounsellorModal() {
  const [open, setOpen]           = useState(false)
  const [form, setForm]           = useState({ name: '', mobile: '', email: '', programme: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const triggerRef = useRef<HTMLElement | null>(null)

  // Intercept all href="#counsellor" clicks anywhere on the page
  useEffect(() => {
    const handleOpen = () => setOpen(true)

    const handleClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      // Match any <a href="#counsellor"> or any element with data-counsellor-trigger
      // but NOT elements that also carry data-apply-trigger (those open ApplyModal instead)
      const anchor = el.closest('a[href="#counsellor"], [data-counsellor-trigger]')
      if (anchor && !anchor.hasAttribute('data-apply-trigger')) {
        e.preventDefault()
        triggerRef.current = anchor as HTMLElement
        setOpen(prev => !prev)
      }
    }

    window.addEventListener('counsellor:open', handleOpen)
    document.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('counsellor:open', handleOpen)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Blur the trigger on close so the browser doesn't restore focus and show a ring
  useEffect(() => {
    if (!open) {
      triggerRef.current?.blur()
      triggerRef.current = null
    }
  }, [open])

  // ESC key closes
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Lock body scroll while open (position:fixed is required for iOS Safari)
  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.documentElement.scrollTop = scrollY
    }
  }, [open])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:            form.name,
          email:           form.email,
          phone:           form.mobile,
          programInterest: form.programme,
          source:          'modal-counsellor',
        }),
      })
      setSubmitted(true)
    } catch {
      // fail silently
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center sm:justify-center p-0 sm:p-6"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal card — card itself scrolls, not the outer wrapper */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Talk to a Counsellor"
        className="relative z-10 w-full max-w-[900px] rounded-t-2xl sm:rounded-2xl shadow-2xl bg-vgu-beige h-[90vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y', overscrollBehaviorY: 'contain' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors duration-150"
        >
          <IconX size={18} className="text-neutral-700" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ── Left: counsellor image ── */}
          <div className="relative hidden lg:block min-h-[520px]">
            {/* Warm fallback gradient — shows if image fails to load */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, #d4a574 0%, #a0603a 40%, #6b3520 100%)' }}
            />

            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=85&auto=format&fit=crop&crop=top"
              fill
              alt="VGU admissions counsellor"
              className="object-cover object-top"
              sizes="(max-width: 1024px) 0vw, 450px"
            />

            {/* Bottom scrim so the floating trust card stays readable */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.10) 40%, transparent 100%)' }}
            />

            {/* Floating trust card */}
            <div className="absolute bottom-10 right-6 bg-white rounded-2xl p-4 shadow-xl animate-float-up min-w-[200px] z-10 [animation-delay:300ms]">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-vgu-red flex-none bg-vgu-beige">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80&auto=format&fit=crop&crop=faces"
                    fill
                    alt="Ananya Gupta"
                    className="object-cover"
                    sizes="36px"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-vgu-red font-heading font-black text-[14px]">
                    A
                  </div>
                </div>
                <div>
                  <p className="font-heading font-bold text-[13px] text-neutral-900">Ananya Gupta</p>
                  <p className="text-[11px] font-body text-neutral-500">Admissions Counsellor · VGU</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-body font-semibold text-neutral-800">
                <span className="relative flex h-2 w-2 flex-none">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available now · Avg. response 2 min
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="flex flex-col justify-center px-10 py-12 md:px-6 md:py-8">
            <span className="inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5 text-[12px] font-body font-bold uppercase tracking-[0.08em] mb-5 bg-vgu-red-dark/10 border border-vgu-red-dark/20 text-vgu-red-dark">
              <IconHeadset size={14} />
              Talk to a Counsellor
            </span>

            <h2 className="font-heading font-bold text-[26px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-3 md:text-[34px]">
              Have Questions?<br />
              <span className="text-vgu-red">We&apos;re Here to Help.</span>
            </h2>
            <p className="text-[15px] font-body leading-[1.7] text-neutral-500 mb-6 max-w-[380px]">
              Free, no-obligation guidance on programs, fees, and eligibility.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-green-50 border border-green-200 px-6 py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <IconThumbUp size={22} className="text-green-600" />
                </div>
                <p className="font-heading font-bold text-[18px] text-neutral-900 mb-1">We&apos;ve got your details!</p>
                <p className="text-[14px] font-body text-neutral-500">Ananya will call you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  name="name" type="text" placeholder="Your full name" required
                  value={form.name} onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[15px] font-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-colors"
                />
                <input
                  name="mobile" type="tel" placeholder="Mobile number" required
                  value={form.mobile} onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[15px] font-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-colors"
                />
                <input
                  name="email" type="email" placeholder="Email address" required
                  value={form.email} onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[15px] font-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-colors"
                />
                <select
                  name="programme" required value={form.programme} onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[15px] font-body text-neutral-700 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-colors appearance-none"
                >
                  <option value="" disabled>Select a program</option>
                  {PROGRAMMES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                <button
                  type="submit" disabled={submitting}
                  className="mt-1 w-full rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white py-3.5 text-[15px] font-semibold font-heading transition-colors duration-150 disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Talk to a Counsellor →'}
                </button>

                <p className="flex items-center gap-1.5 text-[12px] font-body text-neutral-400 mt-1">
                  <IconLock size={12} />
                  Your details are safe. We never spam or share your information.
                </p>
              </form>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {TRUST_PILLS.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/70 border border-white px-3 py-1.5 text-[12px] font-body font-semibold text-neutral-700"
                >
                  <Icon size={13} className="text-vgu-red" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
