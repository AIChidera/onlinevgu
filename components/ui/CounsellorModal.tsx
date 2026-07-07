'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import {
  IconHeadset,
  IconLock,
  IconThumbUp,
  IconX,
  IconBrandWhatsapp,
} from '@tabler/icons-react'
import PhoneField from '@/components/ui/PhoneField'

const INITIAL_FORM = { name: '', mobile: '', email: '', programme: '' }
const DEFAULT_DIAL = '+91'

const DEFAULT_WHATSAPP_URL = 'https://wa.me/918035018677?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20VGU%20online%20degrees'

// Strip HTML tags, script injection, and event-handler patterns client-side
function sanitizeText(v: string) {
  return v
    .replace(/<[^>]*>/g, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/on\w+\s*=\s*/gi, '')
    .replace(/[<>]/g, '')
}

// Strip anything that isn't a valid phone character
function sanitizePhone(v: string) {
  return v.replace(/[^\d\s+\-().]/g, '')
}

export default function CounsellorModal({ whatsappUrl }: { whatsappUrl?: string }) {
  const waHref = whatsappUrl || DEFAULT_WHATSAPP_URL
  const [open, setOpen]               = useState(false)
  const [form, setForm]               = useState(INITIAL_FORM)
  const [dialCode, setDialCode]       = useState(DEFAULT_DIAL)
  const [submitting, setSubmitting]   = useState(false)
  const [submitted, setSubmitted]     = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [programmes, setProgrammes]   = useState<string[]>([])
  const triggerRef = useRef<HTMLElement | null>(null)

  // Fetch real program list from Sanity once on mount
  useEffect(() => {
    fetch('/api/programs')
      .then(r => r.ok ? r.json() : [])
      .then((data: { name: string }[]) => setProgrammes(data.map(p => p.name)))
      .catch(() => {})
  }, [])

  // Reset to initial state only when closed after a successful submission
  const closeModal = useCallback(() => {
    setOpen(false)
    if (submitted) {
      setForm(INITIAL_FORM)
      setDialCode(DEFAULT_DIAL)
      setSubmitted(false)
      setSubmitError('')
    }
  }, [submitted])

  // Intercept all href="#counsellor" clicks anywhere on the page
  useEffect(() => {
    const handleOpen = () => setOpen(true)

    const handleClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const anchor = el.closest('a[href="#counsellor"], [data-counsellor-trigger]')
      if (anchor && !anchor.hasAttribute('data-apply-trigger')) {
        e.preventDefault()
        triggerRef.current = anchor as HTMLElement
        const programName = anchor.getAttribute('data-program') ?? ''
        setForm({ ...INITIAL_FORM, programme: programName })
        setOpen(true)
      }
    }

    window.addEventListener('counsellor:open', handleOpen)
    document.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('counsellor:open', handleOpen)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      triggerRef.current?.blur()
      triggerRef.current = null
    }
  }, [open])

  // ESC key closes
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeModal])

  // Lock body scroll while open
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
    const clean = name === 'mobile' ? sanitizePhone(value) : sanitizeText(value)
    setForm(prev => ({ ...prev, [name]: clean }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:            form.name,
          email:           form.email,
          phone:           dialCode + form.mobile,
          programInterest: form.programme,
          source:          'modal-counsellor',
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Something went wrong. Please try again.')
      }
      setSubmitted(true)
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center sm:justify-center p-0 sm:p-6"
      onClick={closeModal}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal card - max-h-95dvh on mobile, max-h-90vh on desktop, so the
            counsellor form never triggers an inner scroll on standard phones. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Talk to a Counsellor"
        className="relative z-10 w-full max-w-[900px] rounded-t-2xl sm:rounded-2xl shadow-2xl bg-vgu-beige max-h-[95dvh] sm:max-h-[90vh] overflow-y-auto"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y', overscrollBehaviorY: 'contain' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors duration-150"
        >
          <IconX size={18} className="text-neutral-700" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: counsellor image */}
          <div className="relative hidden lg:block min-h-[520px]">
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
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.10) 40%, transparent 100%)' }}
            />
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
                  <p className="text-[11px] font-body text-neutral-500">Admissions Counsellor - VGU</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-body font-semibold text-neutral-800">
                <span className="relative flex h-2 w-2 flex-none">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available now - Avg. response 2 min
              </div>
            </div>
          </div>

          {/* Right: form - padding trimmed so the panel fits on a 667-tall phone */}
          <div className="flex flex-col justify-center px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <span className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-[11px] font-body font-bold uppercase tracking-[0.08em] mb-3 bg-vgu-red-dark/10 border border-vgu-red-dark/20 text-vgu-red-dark">
              <IconHeadset size={12} />
              Talk to a Counsellor
            </span>

            <h2 className="font-heading font-bold text-[22px] tracking-[-0.5px] leading-[1.15] text-neutral-900 mb-2 sm:text-[28px]">
              Have Questions?{' '}
              <span className="text-vgu-red">We&apos;re Here to Help.</span>
            </h2>
            <p className="text-[13px] font-body leading-[1.55] text-neutral-500 mb-4 max-w-[380px]">
              Free, no-obligation guidance on programs, fees, and eligibility.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-green-50 border border-green-200 px-6 py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <IconThumbUp size={22} className="text-green-600" />
                </div>
                <p className="font-heading font-bold text-[18px] text-neutral-900 mb-1">
                  We&apos;ve got your details!
                </p>
                <p className="text-[14px] font-body text-neutral-500 mb-5">
                  Ananya will call you within 2 hours.
                </p>

                <p className="text-[12px] font-body font-semibold uppercase tracking-[0.06em] text-neutral-400 mb-3">
                  Need a quicker answer?
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeModal}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[14px] font-heading font-semibold text-white transition-colors duration-150"
                  style={{ backgroundColor: '#25D366' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1da851')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#25D366')}
                >
                  <IconBrandWhatsapp size={18} />
                  Chat on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5" noValidate>
                <input
                  name="name" type="text" placeholder="Your full name" required
                  maxLength={100}
                  value={form.name} onChange={handleChange}
                  autoComplete="name"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-[15px] font-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-colors"
                />
                <PhoneField
                  name="mobile"
                  placeholder="Mobile number"
                  required
                  maxLength={15}
                  value={form.mobile}
                  onChange={handleChange}
                  dialCode={dialCode}
                  onDialChange={setDialCode}
                />
                <input
                  name="email" type="email" placeholder="Email address" required
                  maxLength={254}
                  value={form.email} onChange={handleChange}
                  autoComplete="email"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-[15px] font-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-colors"
                />
                <select
                  name="programme" required value={form.programme} onChange={handleChange}
                  disabled={programmes.length === 0}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-[15px] font-body text-neutral-700 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-colors appearance-none disabled:opacity-50"
                >
                  <option value="" disabled>
                    {programmes.length === 0 ? 'Loading programs...' : 'Select a program'}
                  </option>
                  {programmes.map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                {submitError && (
                  <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-[13px] font-body text-red-600">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit" disabled={submitting}
                  className="w-full rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white py-3 text-[15px] font-semibold font-heading transition-colors duration-150 disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : 'Talk to a Counsellor'}
                </button>

                <p className="flex items-center gap-1.5 text-[11px] font-body text-neutral-400">
                  <IconLock size={11} />
                  Free consultation · No obligation · Reply in 2 min.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
