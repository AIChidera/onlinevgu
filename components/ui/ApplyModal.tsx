'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { IconX, IconLock, IconRocket, IconCheck } from '@tabler/icons-react'

function sanitizeText(v: string) {
  return v.replace(/<[^>]*>/g, '').replace(/javascript\s*:/gi, '').replace(/on\w+\s*=\s*/gi, '').replace(/[<>]/g, '')
}
function sanitizePhone(v: string) {
  return v.replace(/[^\d\s+\-().]/g, '')
}

const UG_PROGRAMMES = ['B.Com', 'BBA', 'BCA', 'BA', 'B.Sc', 'B.Lib']
const PG_PROGRAMMES = ['MBA', 'MCA', 'M.Com', 'MA', 'M.Lib', 'Healthcare MBA']

const INTAKE_OPTIONS = [
  { value: 'July 2026',     label: 'July 2026',    sub: 'Next batch',        popular: true  },
  { value: 'January 2027', label: 'January 2027', sub: 'Winter intake',     popular: false },
  { value: 'July 2027',    label: 'July 2027',    sub: 'Future intake',     popular: false },
  { value: 'Not sure yet', label: 'Not sure yet', sub: "I'll decide later", popular: false },
]

const QUICK_FACTS = ['No entrance exam', 'Enrol in 30 minutes', 'EMIs from ₹2,999/mo']

export default function ApplyModal() {
  const [open, setOpen]             = useState(false)
  const [form, setForm]             = useState({
    name: '', email: '', mobile: '',
    level: '' as '' | 'ug' | 'pg',
    programme: '', intake: '',
    consent: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [submitError, setSubmitError] = useState('')
  const triggerRef = useRef<HTMLElement | null>(null)

  const INITIAL_FORM = { name: '', email: '', mobile: '', level: '' as '' | 'ug' | 'pg', programme: '', intake: '', consent: false }

  const closeModal = useCallback(() => {
    setOpen(false)
    if (submitted) {
      setForm(INITIAL_FORM)
      setSubmitted(false)
      setSubmitError('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted])

  // Intercept all [data-apply-trigger] clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest('[data-apply-trigger]')
      if (trigger) {
        e.preventDefault()
        triggerRef.current = trigger as HTMLElement
        setOpen(prev => !prev)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Blur the trigger on close so the browser doesn't restore focus and show a ring
  useEffect(() => {
    if (!open) {
      triggerRef.current?.blur()
      triggerRef.current = null
    }
  }, [open])

  // ESC to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeModal])

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      const clean = name === 'mobile' ? sanitizePhone(value) : sanitizeText(value)
      setForm(prev => ({ ...prev, [name]: clean }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.level || !form.programme || !form.intake) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:            form.name,
          email:           form.email,
          phone:           form.mobile,
          programInterest: `${form.level === 'ug' ? 'UG' : 'PG'} - ${form.programme}`,
          intake:          form.intake,
          source:          'modal-apply',
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

  const programmes = form.level === 'ug' ? UG_PROGRAMMES : form.level === 'pg' ? PG_PROGRAMMES : []
  const canSubmit  = !!form.level && !!form.programme && !!form.intake

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center sm:justify-center p-0 sm:p-6"
      onClick={closeModal}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal card — flex column so header is sticky and body scrolls */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Start Your Application"
        className="relative z-10 w-full max-w-[560px] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[90vh] sm:h-auto sm:max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* ══ Red header ══ - pinned, never scrolls */}
        <div className="flex-none relative bg-vgu-red px-7 pt-8 pb-7 overflow-hidden">
          {/* Decorative background depth */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-14 -right-14 w-56 h-56 rounded-full bg-white/[0.07]" />
            <div className="absolute -bottom-16 -left-8  w-44 h-44 rounded-full bg-black/[0.12]" />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          {/* Close */}
          <button
            onClick={closeModal}
            aria-label="Close"
            className="absolute top-4 right-4 z-[30] w-8 h-8 rounded-full bg-white/15 hover:bg-white/28 flex items-center justify-center transition-colors duration-150"
          >
            <IconX size={16} className="text-white" />
          </button>

          <div className="relative z-10">
            {/* Brand row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-none shadow-sm">
                <IconRocket size={18} className="text-white" />
              </div>
              <span className="text-[11px] font-body font-bold uppercase tracking-[0.12em] text-white/60">
                Online VGU · Admissions 2026
              </span>
            </div>

            <h2 className="font-heading font-bold text-[30px] tracking-[-0.5px] leading-[1.2] text-white">
              Start Your Application
            </h2>
            <p className="mt-1.5 text-[14px] font-body text-white/65">
              Join 50,000+ learners. A counsellor will guide you through the next steps.
            </p>

            {/* Quick-fact chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {QUICK_FACTS.map(fact => (
                <span
                  key={fact}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3 py-1 text-[12px] font-body font-semibold text-white/85"
                >
                  <span className="flex-none w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center">
                    <IconCheck size={8} className="text-white" stroke={3} />
                  </span>
                  {fact}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ══ Form body ══ - this div scrolls */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-white px-7 py-6" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y', overscrollBehaviorY: 'contain' }}>
          {submitted ? (
            /* ── Success state ── */
            <div className="py-10 text-center">
              <div className="relative inline-flex mb-5">
                <div className="absolute inset-0 rounded-full bg-green-200/50 animate-ping [animation-duration:2s]" />
                <div className="relative w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <IconCheck size={28} className="text-green-600" stroke={2.5} />
                </div>
              </div>
              <h3 className="font-heading font-bold text-[22px] text-neutral-900 mb-2">
                Application started!
              </h3>
              <p className="text-[14px] font-body text-neutral-500 max-w-[300px] mx-auto leading-[1.7]">
                A VGU counsellor will call you within 2 hours to walk you through the next steps.
              </p>
              <button
                onClick={closeModal}
                className="mt-6 rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white px-10 py-3 text-[14px] font-semibold font-heading transition-colors duration-150"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* ── 1. Level selector ── */}
              <div>
                <p className="mb-2.5 text-[11px] font-body font-bold uppercase tracking-[0.08em] text-neutral-400">
                  What do you want to study?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {(['ug', 'pg'] as const).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, level: lvl, programme: '' }))}
                      className={[
                        'group relative rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200',
                        form.level === lvl
                          ? 'border-vgu-red bg-vgu-red/[0.04] shadow-[0_0_0_3px_rgba(192,64,54,0.10)]'
                          : 'border-neutral-200 bg-neutral-50 hover:border-vgu-red/40 hover:bg-white hover:shadow-sm',
                      ].join(' ')}
                    >
                      {form.level === lvl && (
                        <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-vgu-red flex items-center justify-center">
                          <IconCheck size={10} className="text-white" stroke={3} />
                        </span>
                      )}
                      <p className="text-[10px] font-body font-bold uppercase tracking-[0.08em] text-neutral-400 mb-0.5">
                        {lvl === 'ug' ? 'Undergraduate' : 'Postgraduate'}
                      </p>
                      <p className={[
                        'font-heading font-bold text-[14px] transition-colors duration-150',
                        form.level === lvl ? 'text-vgu-red' : 'text-neutral-700 group-hover:text-neutral-900',
                      ].join(' ')}>
                        {lvl === 'ug' ? 'B.Com, BBA, BCA…' : 'MBA, MCA, M.Com…'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── 2. Programme pills (slides in after level chosen) ── */}
              {form.level && (
                <div>
                  <p className="mb-2.5 text-[11px] font-body font-bold uppercase tracking-[0.08em] text-neutral-400">
                    Choose your program
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {programmes.map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, programme: p }))}
                        className={[
                          'rounded-full border-2 px-4 py-2 text-[13px] font-heading font-semibold transition-all duration-150',
                          form.programme === p
                            ? 'bg-vgu-red border-vgu-red text-white shadow-[0_2px_12px_rgba(192,64,54,0.28)]'
                            : 'border-neutral-200 bg-white text-neutral-600 hover:border-vgu-red/50 hover:text-vgu-red hover:shadow-sm',
                        ].join(' ')}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  {form.level === 'pg' && (
                    <p className="mt-2 text-[11px] font-body text-neutral-400">
                      ★ MBA is our most popular program · Next batch: July 2026
                    </p>
                  )}
                </div>
              )}

              {/* ── 3. Personal details ── */}
              <div>
                <p className="mb-2.5 text-[11px] font-body font-bold uppercase tracking-[0.08em] text-neutral-400">
                  Your details
                </p>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      name="name" type="text" placeholder="Full name" required
                      maxLength={100} autoComplete="name"
                      value={form.name} onChange={handleChange}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base font-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-all"
                    />
                    <input
                      name="email" type="email" placeholder="Email address" required
                      maxLength={254} autoComplete="email"
                      value={form.email} onChange={handleChange}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base font-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-all"
                    />
                  </div>
                  <div className="flex rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden focus-within:border-vgu-red focus-within:ring-2 focus-within:ring-vgu-red/10 focus-within:bg-white transition-all">
                    <span className="flex items-center pl-4 pr-3 text-[13px] font-body font-semibold text-neutral-500 border-r border-neutral-200 flex-none">
                      🇮🇳 +91
                    </span>
                    <input
                      name="mobile" type="tel" placeholder="Mobile number" required
                      maxLength={15} inputMode="tel" autoComplete="tel"
                      value={form.mobile} onChange={handleChange}
                      className="flex-1 px-3 py-3 text-base font-body text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* ── 4. Intake timing ── */}
              <div>
                <p className="mb-2.5 text-[11px] font-body font-bold uppercase tracking-[0.08em] text-neutral-400">
                  When do you plan to start?
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {INTAKE_OPTIONS.map(o => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, intake: o.value }))}
                      className={[
                        'relative rounded-xl border-2 px-3.5 py-3 text-left transition-all duration-150',
                        form.intake === o.value
                          ? 'border-vgu-red bg-vgu-red/[0.04] shadow-[0_0_0_3px_rgba(192,64,54,0.08)]'
                          : 'border-neutral-200 bg-neutral-50 hover:border-vgu-red/40 hover:bg-white hover:shadow-sm',
                      ].join(' ')}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={[
                          'font-heading font-bold text-[13px]',
                          form.intake === o.value ? 'text-vgu-red' : 'text-neutral-800',
                        ].join(' ')}>
                          {o.label}
                        </span>
                        {o.popular && (
                          <span className="rounded-full bg-vgu-yellow px-2 py-0.5 text-[9px] font-body font-bold text-neutral-900 leading-none whitespace-nowrap">
                            Next batch
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] font-body text-neutral-400">{o.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Consent ── */}
              <label className="flex items-start gap-3 cursor-pointer -mt-1">
                <input
                  type="checkbox" name="consent" required
                  checked={form.consent}
                  onChange={handleChange}
                  className="mt-[3px] flex-none accent-[#C04036]"
                />
                <span className="text-[12px] font-body text-neutral-400 leading-[1.6]">
                  I authorise VGU to contact me via call, SMS, email, and WhatsApp regarding my application. This consent overrides any DNC/NDNC registration.
                </span>
              </label>

              {/* ── Error ── */}
              {submitError && (
                <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-[13px] font-body text-red-600">
                  {submitError}
                </p>
              )}

              {/* ── Submit ── */}
              <button
                type="submit"
                disabled={submitting || !canSubmit}
                className="w-full rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white py-4 text-[15px] font-semibold font-heading transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(192,64,54,0.32)] hover:shadow-[0_6px_28px_rgba(192,64,54,0.44)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_12px_rgba(192,64,54,0.22)]"
              >
                {submitting ? 'Submitting…' : <>Start My Application <IconRocket size={16} /></>}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[12px] font-body text-neutral-400">
                <IconLock size={12} />
                Your details are safe. We never spam or share your information.
              </p>

            </form>
          )}
        </div>
      </div>
    </div>
  )
}
