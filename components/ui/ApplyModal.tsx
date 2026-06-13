'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { IconX, IconLock, IconRocket, IconCheck, IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import PhoneField from '@/components/ui/PhoneField'

function sanitizeText(v: string) {
  return v.replace(/<[^>]*>/g, '').replace(/javascript\s*:/gi, '').replace(/on\w+\s*=\s*/gi, '').replace(/[<>]/g, '')
}
function sanitizePhone(v: string) {
  return v.replace(/[^\d\s+\-().]/g, '')
}

// Two-step wizard: choosing programme on step 1, personal details + intake on
// step 2. This is what lets the modal fit without scrolling on every viewport
// from a 375x667 phone up to a 1440-wide desktop - a single tall form does not.
const INTAKE_OPTIONS = [
  { value: 'July 2026',    label: 'July 2026',   popular: true  },
  { value: 'January 2027', label: 'Jan 2027',    popular: false },
  { value: 'July 2027',    label: 'July 2027',   popular: false },
  { value: 'Not sure yet', label: 'Not sure',    popular: false },
]

const INITIAL_FORM = { name: '', email: '', mobile: '', level: '' as '' | 'ug' | 'pg', programme: '', intake: '', consent: false }

export default function ApplyModal() {
  const [open, setOpen]             = useState(false)
  const [step, setStep]             = useState<1 | 2>(1)
  const [form, setForm]             = useState(INITIAL_FORM)
  const [dialCode, setDialCode]       = useState('+91')
  const [submitting, setSubmitting]   = useState(false)
  const [submitted, setSubmitted]     = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [programList, setProgramList] = useState<{ name: string; level: string }[]>([])
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    fetch('/api/programs')
      .then(r => r.ok ? r.json() : [])
      .then((data: { name: string; level: string }[]) => setProgramList(data))
      .catch(() => {})
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
    if (submitted) {
      setForm(INITIAL_FORM)
      setDialCode('+91')
      setSubmitted(false)
      setSubmitError('')
      setStep(1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest('[data-apply-trigger]')
      if (trigger) {
        e.preventDefault()
        triggerRef.current = trigger as HTMLElement
        setStep(1)
        setOpen(prev => !prev)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    if (!open) {
      triggerRef.current?.blur()
      triggerRef.current = null
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeModal])

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
    if (!canSubmit) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:      form.name,
          email:     form.email,
          phone:     dialCode + form.mobile,
          level:     form.level,
          programme: form.programme,
          intake:    form.intake,
          consent:   form.consent,
          source:    'modal-apply',
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

  const programmes = form.level
    ? programList.filter(p => p.level === form.level).map(p => p.name)
    : []
  const canAdvance = !!form.level && !!form.programme
  const canSubmit  = canAdvance && !!form.intake && form.consent

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center sm:justify-center p-0 sm:p-6"
      onClick={closeModal}
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Start Your Application"
        className="relative z-10 w-full max-w-[560px] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[95dvh] sm:max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* ══ Compact red header ══ */}
        <div className="flex-none relative bg-vgu-red px-6 pt-5 pb-4 overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-14 -right-14 w-56 h-56 rounded-full bg-white/[0.07]" />
            <div className="absolute -bottom-16 -left-8  w-44 h-44 rounded-full bg-black/[0.12]" />
          </div>

          {/* Step-2 back button replaces the brand row */}
          {step === 2 && !submitted && (
            <button
              type="button"
              onClick={() => setStep(1)}
              aria-label="Back"
              className="absolute top-3 left-3 z-[30] inline-flex items-center gap-1 h-7 px-2 rounded-full bg-white/15 hover:bg-white/28 text-white text-[11px] font-heading font-semibold transition-colors duration-150"
            >
              <IconArrowLeft size={13} /> Back
            </button>
          )}

          <button
            onClick={closeModal}
            aria-label="Close"
            className="absolute top-3 right-3 z-[30] w-7 h-7 rounded-full bg-white/15 hover:bg-white/28 flex items-center justify-center transition-colors duration-150"
          >
            <IconX size={14} className="text-white" />
          </button>

          <div className={`relative z-10 ${step === 2 && !submitted ? 'pt-7' : ''}`}>
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-[10px] font-body font-bold uppercase tracking-[0.12em] text-white/60">
                Online VGU · Admissions 2026
              </span>
              {!submitted && (
                <span className="text-[10px] font-body font-bold uppercase tracking-[0.12em] text-white/55 flex-none">
                  Step {step} / 2
                </span>
              )}
            </div>
            <h2 className="font-heading font-bold text-[22px] tracking-[-0.5px] leading-[1.15] text-white">
              {submitted ? 'Application started!' : step === 1 ? 'Choose Your Program' : 'Almost Done'}
            </h2>
          </div>
        </div>

        {/* ══ Form body ══ - flex-1 + overflow-y-auto is a safety net only;
              steps are sized to fit inside the modal without scrolling. */}
        <div
          className="flex-1 min-h-0 overflow-y-auto bg-white px-6 py-4"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y', overscrollBehaviorY: 'contain' }}
        >
          {submitted ? (
            <div className="py-6 text-center">
              <div className="relative inline-flex mb-4">
                <div className="absolute inset-0 rounded-full bg-green-200/50 animate-ping [animation-duration:2s]" />
                <div className="relative w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                  <IconCheck size={24} className="text-green-600" stroke={2.5} />
                </div>
              </div>
              <p className="text-[14px] font-body text-neutral-600 max-w-[320px] mx-auto leading-[1.6]">
                A VGU counsellor will call you within 2 hours to walk you through the next steps.
              </p>
              <button
                onClick={closeModal}
                className="mt-5 rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white px-10 py-2.5 text-[14px] font-semibold font-heading transition-colors duration-150"
              >
                Done
              </button>
            </div>
          ) : step === 1 ? (
            /* ─── STEP 1 - Level + Programme ─── */
            <div className="flex flex-col gap-4">
              {/* Level */}
              <div>
                <p className="mb-2 text-[11px] font-body font-bold uppercase tracking-[0.08em] text-neutral-400">
                  What do you want to study?
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['ug', 'pg'] as const).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, level: lvl, programme: '' }))}
                      className={[
                        'group relative rounded-xl border-2 px-4 py-3 text-left transition-all duration-200',
                        form.level === lvl
                          ? 'border-vgu-red bg-vgu-red/[0.04] shadow-[0_0_0_3px_rgba(192,64,54,0.10)]'
                          : 'border-neutral-200 bg-neutral-50 hover:border-vgu-red/40 hover:bg-white hover:shadow-sm',
                      ].join(' ')}
                    >
                      {form.level === lvl && (
                        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-vgu-red flex items-center justify-center">
                          <IconCheck size={10} className="text-white" stroke={3} />
                        </span>
                      )}
                      <p className={[
                        'font-heading font-bold text-[14px] transition-colors duration-150',
                        form.level === lvl ? 'text-vgu-red' : 'text-neutral-800 group-hover:text-neutral-900',
                      ].join(' ')}>
                        {lvl === 'ug' ? 'Undergraduate' : 'Postgraduate'}
                      </p>
                      <p className="mt-0.5 text-[11px] font-body text-neutral-500">
                        {lvl === 'ug' ? '3-year bachelor\'s degrees' : '1-2 year master\'s degrees'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Programme pills */}
              {form.level && (
                <div>
                  <p className="mb-2 text-[11px] font-body font-bold uppercase tracking-[0.08em] text-neutral-400">
                    Choose your program
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {programmes.length === 0 ? (
                      <p className="text-[12px] font-body text-neutral-400">Loading programs…</p>
                    ) : programmes.map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, programme: p }))}
                        className={[
                          'rounded-full border-2 px-3.5 py-1.5 text-[13px] font-heading font-semibold transition-all duration-150',
                          form.programme === p
                            ? 'bg-vgu-red border-vgu-red text-white shadow-[0_2px_12px_rgba(192,64,54,0.28)]'
                            : 'border-neutral-200 bg-white text-neutral-600 hover:border-vgu-red/50 hover:text-vgu-red hover:shadow-sm',
                        ].join(' ')}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Continue button - pinned at the bottom of the step */}
              <button
                type="button"
                disabled={!canAdvance}
                onClick={() => setStep(2)}
                className="mt-1 w-full rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white py-3 text-[15px] font-semibold font-heading transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(192,64,54,0.32)] hover:shadow-[0_6px_28px_rgba(192,64,54,0.44)]"
              >
                Continue <IconArrowRight size={16} />
              </button>
            </div>
          ) : (
            /* ─── STEP 2 - Details + Intake + Consent + Submit ─── */
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Personal details */}
              <div>
                <p className="mb-2 text-[11px] font-body font-bold uppercase tracking-[0.08em] text-neutral-400">
                  Your details
                </p>
                <div className="flex flex-col gap-2.5">
                  <input
                    name="name" type="text" placeholder="Full name" required
                    maxLength={100} autoComplete="name"
                    value={form.name} onChange={handleChange}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-[15px] font-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-all"
                  />
                  <input
                    name="email" type="email" placeholder="Email address" required
                    maxLength={254} autoComplete="email"
                    value={form.email} onChange={handleChange}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-[15px] font-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-all"
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
                </div>
              </div>

              {/* Intake - single row on every viewport */}
              <div>
                <p className="mb-2 text-[11px] font-body font-bold uppercase tracking-[0.08em] text-neutral-400">
                  When do you plan to start?
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {INTAKE_OPTIONS.map(o => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, intake: o.value }))}
                      className={[
                        'relative rounded-lg border-2 px-2 py-2 text-center transition-all duration-150',
                        form.intake === o.value
                          ? 'border-vgu-red bg-vgu-red/[0.04] shadow-[0_0_0_3px_rgba(192,64,54,0.08)]'
                          : 'border-neutral-200 bg-neutral-50 hover:border-vgu-red/40 hover:bg-white',
                      ].join(' ')}
                    >
                      <span className={[
                        'block font-heading font-bold text-[12px] leading-tight',
                        form.intake === o.value ? 'text-vgu-red' : 'text-neutral-800',
                      ].join(' ')}>
                        {o.label}
                      </span>
                      {o.popular && (
                        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full bg-vgu-yellow px-1.5 py-0.5 text-[8px] font-body font-bold text-neutral-900 leading-none whitespace-nowrap">
                          Next batch
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consent */}
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox" name="consent" required
                  checked={form.consent}
                  onChange={handleChange}
                  className="mt-[3px] flex-none accent-[#C04036]"
                />
                <span className="text-[11px] font-body text-neutral-500 leading-[1.5]">
                  I authorise VGU to contact me via call, SMS, email, and WhatsApp.
                  This overrides any DNC/NDNC registration.
                </span>
              </label>

              {submitError && (
                <p className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-[12px] font-body text-red-600">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !canSubmit}
                className="w-full rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white py-3 text-[15px] font-semibold font-heading transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(192,64,54,0.32)] hover:shadow-[0_6px_28px_rgba(192,64,54,0.44)] hover:-translate-y-0.5 active:translate-y-0"
              >
                {submitting ? 'Submitting…' : <>Start My Application <IconRocket size={16} /></>}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[11px] font-body text-neutral-400 -mt-1">
                <IconLock size={11} />
                Your details are safe. We never spam or share your information.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
