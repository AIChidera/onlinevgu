'use client'
import { useState, useEffect, useCallback } from 'react'
import { IconDownload, IconLock, IconX, IconMail, IconCheck } from '@tabler/icons-react'
import PhoneField from '@/components/ui/PhoneField'

function sanitizeText(v: string) {
  return v.replace(/<[^>]*>/g, '').replace(/javascript\s*:/gi, '').replace(/on\w+\s*=\s*/gi, '').replace(/[<>]/g, '')
}
function sanitizePhone(v: string) {
  return v.replace(/[^\d\s+\-().]/g, '')
}

const INITIAL_FORM = { name: '', mobile: '', email: '' }
const DEFAULT_DIAL = '+91'

export default function BrochureModal() {
  const [open, setOpen]               = useState(false)
  const [program, setProgram]         = useState('')
  const [form, setForm]               = useState({ name: '', mobile: '', email: '' })
  const [dialCode, setDialCode]       = useState(DEFAULT_DIAL)
  const [programmes, setProgrammes]   = useState<string[]>([])
  const [submitting, setSubmitting]   = useState(false)
  const [submitted, setSubmitted]     = useState(false)
  const [submitEmail, setSubmitEmail] = useState('')
  const [submitError, setSubmitError] = useState('')

  const closeModal = useCallback(() => {
    setOpen(false)
    if (submitted) {
      setForm(INITIAL_FORM)
      setDialCode(DEFAULT_DIAL)
      setSubmitted(false)
      setSubmitError('')
      setSubmitEmail('')
    }
  }, [submitted])

  // Fetch real program list from Sanity once on mount
  useEffect(() => {
    fetch('/api/programs')
      .then(r => r.ok ? r.json() : [])
      .then((data: { name: string }[]) => setProgrammes(data.map(p => p.name)))
      .catch(() => {})
  }, [])

  // Intercept any click on an element carrying data-brochure-trigger
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest('[data-brochure-trigger]') as HTMLElement | null
      if (!trigger) return
      e.preventDefault()
      setProgram(trigger.dataset.program ?? '')
      setForm(INITIAL_FORM)
      setSubmitted(false)
      setSubmitError('')
      setSubmitEmail('')
      setOpen(true)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

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

  useEffect(() => {
    if (!open) (document.activeElement as HTMLElement)?.blur()
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
      const res = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:            form.name,
          email:           form.email,
          phone:           dialCode + form.mobile,
          programInterest: program || 'Not specified',
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Something went wrong. Please try again.')
      }
      setSubmitEmail(form.email)
      setSubmitted(true)
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false) }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center sm:justify-center p-0 sm:p-6"
      onClick={closeModal}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal card — flex column: header pinned, body scrolls */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Download Brochure"
        className="relative z-10 w-full max-w-[460px] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[90vh] sm:h-auto sm:max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close — floats over the red header */}
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors duration-150"
        >
          <IconX size={16} className="text-white" />
        </button>

        {/* Red header band — pinned, never scrolls */}
        <div
          className="flex-none px-8 pt-8 pb-6"
          style={{ background: 'linear-gradient(135deg,#C04036 0%,#821a12 100%)' }}
        >
          <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mb-4">
            <IconDownload size={20} className="text-white" />
          </div>
          <h2 className="font-heading font-bold text-[26px] text-white leading-snug tracking-[-0.3px]">
            Get Your Free Brochure
          </h2>
          <p className="mt-1.5 text-[14px] font-body text-white/65 leading-[1.6]">
            Curriculum, fee structure, and placement data - sent to your inbox in under 60 seconds.
          </p>
          {program && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3.5 py-1.5 text-[12px] font-body font-semibold text-white">
              {program} Brochure
            </div>
          )}
        </div>

        {/* Form / success — this div scrolls */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-white px-8 py-7" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y', overscrollBehaviorY: 'contain' }}>
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                <IconCheck size={26} className="text-green-600" />
              </div>
              <h3 className="font-heading font-bold text-[20px] text-neutral-900 mb-2">
                Brochure on its way!
              </h3>
              <p className="text-[14px] font-body text-neutral-500 mb-1">Sent to</p>
              <p className="text-[14px] font-heading font-bold text-neutral-900 mb-4">{submitEmail}</p>
              <p className="text-[13px] font-body text-neutral-400">
                A counsellor may also reach out if you have questions.
              </p>
              <button
                onClick={closeModal}
                className="mt-6 w-full rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white hover:text-white py-3 text-[14px] font-semibold font-heading transition-colors duration-150"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="name" type="text" placeholder="Your full name" required
                maxLength={100} autoComplete="name"
                value={form.name} onChange={handleChange}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base font-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 focus:bg-white transition-colors"
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
                maxLength={254} autoComplete="email"
                value={form.email} onChange={handleChange}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base font-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 focus:bg-white transition-colors"
              />

              {/* Program - locked if pre-filled from trigger, dropdown otherwise */}
              {program ? (
                <div className="w-full rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3 text-[15px] font-body text-neutral-500 flex items-center justify-between">
                  <span>{program}</span>
                  <IconCheck size={15} className="text-vgu-red flex-none" />
                </div>
              ) : (
                <select
                  value={program}
                  onChange={e => setProgram(e.target.value)}
                  required
                  disabled={programmes.length === 0}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base font-body text-neutral-700 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 focus:bg-white transition-colors appearance-none disabled:opacity-50"
                >
                  <option value="" disabled>
                    {programmes.length === 0 ? 'Loading programs...' : 'Select a program'}
                  </option>
                  {programmes.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              )}

              {submitError && (
                <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-[13px] font-body text-red-600">
                  {submitError}
                </p>
              )}

              <button
                type="submit" disabled={submitting}
                className="mt-1 w-full rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white hover:text-white py-3.5 text-[15px] font-semibold font-heading transition-colors duration-150 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <IconMail size={16} />
                {submitting ? 'Sending…' : 'Send My Brochure'}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[12px] font-body text-neutral-400">
                <IconLock size={12} />
                No spam. We never share your details.
              </p>
            </form>
          )}

          {!submitted && (
            <div className="mt-5 pt-5 border-t border-neutral-100 flex flex-wrap gap-2 justify-center">
              {['Free download', 'Instant email', 'No spam ever'].map(label => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-neutral-50 border border-neutral-200 px-3 py-1.5 text-[11px] font-body font-semibold text-neutral-600"
                >
                  <IconCheck size={11} className="text-vgu-red flex-none" />
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
