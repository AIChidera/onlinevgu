'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  IconHeadset,
  IconLock,
  IconShieldCheck,
  IconClock,
  IconThumbUp,
  IconPlus,
} from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'

// ── FAQ data ─────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Are VGU online degrees valid and recognised by employers?',
    a: "Yes. VGU's online degrees are UGC-entitled (under the UGC's Distance Education Bureau), which means they carry the same legal standing as on-campus degrees from UGC-recognised universities. They are accepted by government employers, PSUs, and private companies alike.",
  },
  {
    q: 'Do I need to visit the campus at any point?',
    a: 'No. Admissions, coursework, exams, and graduation are all 100% online. There is no mandatory campus visit. Optional on-campus immersion workshops are organised periodically but are never compulsory.',
  },
  {
    q: 'Can I pursue a VGU online degree while working full-time?',
    a: 'Absolutely — the programmes are designed for working professionals. Live sessions are scheduled on evenings and weekends, and all classes are recorded so you can study at midnight or 6am, at your own pace.',
  },
  {
    q: 'What is the minimum eligibility for online programmes?',
    a: "For UG programmes (BBA, BCA): 10+2 or equivalent from any recognised board, any stream, minimum 45% marks. For PG programmes (MBA Healthcare, Executive MBA, MCA, MSc Data Science): any bachelor's degree from a UGC-recognised university, minimum 50% marks.",
  },
  {
    q: 'Is there an entrance exam?',
    a: "No entrance exam is required for admission to VGU's online programmes. Admission is based on merit from your qualifying examination marks.",
  },
  {
    q: 'How are exams conducted?',
    a: 'Exams are conducted online through our AI-proctored exam portal at the end of each semester. You appear from home using a laptop with a webcam. The system ensures academic integrity without requiring a physical exam centre.',
  },
  {
    q: 'What EMI options are available?',
    a: 'No-cost EMI plans start at ₹2,999/month through 12 partner banks including HDFC, ICICI, Axis, SBI, and Kotak. You can also pay semester-wise. Merit scholarships of up to 50% are available.',
  },
  {
    q: 'Will the degree certificate mention "online" or "distance"?',
    a: 'No. The degree certificate issued by Vivekananda Global University does not state "online" or "distance." It is identical in format and language to the on-campus degree certificate.',
  },
]

const PROGRAMMES = [
  'BBA',
  'BCA',
  'MBA Healthcare',
  'Executive MBA',
  'MCA',
  'MSc Data Science & AI',
]

const TRUST_PILLS = [
  { Icon: IconThumbUp,    label: 'Free consultation' },
  { Icon: IconShieldCheck, label: 'No obligation'    },
  { Icon: IconClock,       label: 'Reply in 2 min'   },
]

// ── Component ─────────────────────────────────────────────────────
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  // Form state
  const [form, setForm]       = useState({ name: '', mobile: '', email: '', programme: '', consent: false })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
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
          source:          'homepage-counsellor',
        }),
      })
      setSubmitted(true)
    } catch {
      // fail silently — form submits regardless
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* ════════════════════════ FAQ ════════════════════════ */}
      <section
        id="faq"
        className="group relative overflow-hidden bg-[#F9FAFB] py-24 px-12 lg:px-8 md:px-5 md:py-16"
      >
        <StrokeArt variant="light" />

        <div className="relative z-10 mx-auto max-w-[860px]">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Common Questions
            </p>
            <h2 className="font-heading font-extrabold text-[40px] tracking-tight leading-[1.2] text-gray-900 md:text-[28px]">
              Everything You Need to Know
            </h2>
          </div>

          {/* Accordion */}
          <div className="flex flex-col divide-y divide-gray-200 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
                >
                  <span className={[
                    'font-heading font-semibold text-[16px] leading-snug transition-colors duration-150',
                    openIndex === i ? 'text-vgu-red' : 'text-gray-900',
                  ].join(' ')}>
                    {faq.q}
                  </span>
                  {/* + becomes × when open */}
                  <span className={[
                    'flex-none w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200',
                    openIndex === i
                      ? 'bg-vgu-red text-white rotate-45'
                      : 'bg-gray-100 text-gray-500',
                  ].join(' ')}>
                    <IconPlus size={14} stroke={2.5} />
                  </span>
                </button>

                {/* Answer — max-h transition */}
                <div
                  className={[
                    'overflow-hidden transition-all duration-300 ease-out',
                    openIndex === i ? 'max-h-[300px]' : 'max-h-0',
                  ].join(' ')}
                >
                  <p className="px-6 pb-5 text-[15px] font-body leading-[1.75] text-gray-600">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Below accordion CTA */}
          <div className="mt-10 text-center">
            <p className="text-[15px] font-body text-gray-500 mb-4">Still have questions?</p>
            <a
              href="#counsellor"
              className="inline-flex items-center gap-2 bg-white border-2 border-vgu-red text-vgu-red hover:bg-red-50 rounded-full px-8 py-3 text-[15px] font-semibold transition-colors duration-150"
            >
              <IconHeadset size={18} />
              Talk to a Counsellor
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════ COUNSELLOR SUB-SECTION ══════════════════ */}
      <div
        id="counsellor"
        className="group relative overflow-hidden"
        style={{ background: '#F4D7C1' }}
      >
        <StrokeArt variant="light" />

        <div className="relative z-10 mx-auto max-w-[1280px] grid grid-cols-1 min-h-[560px] lg:grid-cols-2">
          {/* ── LEFT: counsellor image ── */}
          <div className="relative overflow-hidden min-h-[400px] lg:min-h-[320px]">
            {/* Placeholder gradient until /images/counsellor.jpg supplied */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #c8956c 0%, #9e6040 50%, #7a3d22 100%)' }}
            />

            {/* next/image will render when file exists */}
            <Image
              src="/images/counsellor.jpg"
              fill
              className="object-cover object-top"
              alt="VGU Admissions Counsellor"
              onError={() => {/* silently use gradient fallback */}}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.08), rgba(130,26,18,0.18))' }}
            />

            {/* Placeholder silhouette (shown when counsellor.jpg is not yet supplied) */}
            <div className="absolute inset-0 flex items-center justify-center text-white/40 select-none">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>

            {/* Floating trust card */}
            <div
              className="absolute bottom-10 right-0 translate-x-4 bg-white rounded-2xl p-4 shadow-xl animate-float-up min-w-[200px] z-10"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-vgu-red flex-none">
                  <Image
                    src="/images/counsellor-avatar.jpg"
                    fill
                    alt="Ananya Gupta"
                    className="object-cover"
                    sizes="36px"
                    onError={() => {/* silently use gradient fallback */}}
                  />
                  {/* Avatar fallback */}
                  <div className="absolute inset-0 flex items-center justify-center bg-vgu-beige text-vgu-red font-heading font-black text-[14px]">
                    A
                  </div>
                </div>
                <div>
                  <p className="font-heading font-bold text-[13px] text-gray-900">Ananya Gupta</p>
                  <p className="text-[11px] font-body text-gray-500">Admissions Counsellor · VGU</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-body font-semibold text-gray-800">
                <span className="relative flex h-2 w-2 flex-none">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available now · Avg. response 2 min
              </div>
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div className="flex flex-col justify-center px-14 py-16 lg:px-8 lg:py-12 md:px-5">
            {/* Eyebrow pill */}
            <span
              className="inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5 text-[12px] font-body font-bold uppercase tracking-[0.08em] mb-5"
              style={{
                background: 'rgba(130,26,18,0.10)',
                border: '1px solid rgba(130,26,18,0.20)',
                color: '#821a12',
              }}
            >
              <IconHeadset size={14} />
              Talk to a Counsellor
            </span>

            <h2 className="font-heading font-black text-[38px] tracking-tight leading-[1.2] text-gray-900 mb-3 md:text-[28px]">
              Have Questions?<br />
              <span className="text-vgu-red">We&apos;re Here to Help.</span>
            </h2>
            <p className="text-[16px] font-body leading-[1.7] text-gray-500 mb-7 max-w-[420px]">
              Speak to a VGU admissions counsellor — free, no obligation. Get personalised
              guidance on programmes, fees, and eligibility.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-green-50 border border-green-200 px-6 py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <IconThumbUp size={22} className="text-green-600" />
                </div>
                <p className="font-heading font-bold text-[18px] text-gray-900 mb-1">We&apos;ve got your details!</p>
                <p className="text-[14px] font-body text-gray-500">Ananya will call you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] font-body text-gray-900 placeholder-gray-400 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-colors"
                />
                <input
                  name="mobile"
                  type="tel"
                  placeholder="Mobile number"
                  required
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] font-body text-gray-900 placeholder-gray-400 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-colors"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] font-body text-gray-900 placeholder-gray-400 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-colors"
                />
                <select
                  name="programme"
                  required
                  value={form.programme}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] font-body text-gray-700 focus:outline-none focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/10 transition-colors appearance-none"
                >
                  <option value="" disabled>Select a programme</option>
                  {PROGRAMMES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 w-full rounded-full bg-vgu-red hover:bg-vgu-dark text-white py-3.5 text-[15px] font-semibold font-body transition-colors duration-150 disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Talk to a Counsellor →'}
                </button>

                {/* Privacy note */}
                <p className="flex items-center gap-1.5 text-[12px] font-body text-gray-400 mt-1">
                  <IconLock size={12} />
                  Your details are safe. We never spam or share your information.
                </p>
              </form>
            )}

            {/* Trust badge pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {TRUST_PILLS.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/70 border border-white px-3 py-1.5 text-[12px] font-body font-semibold text-gray-700"
                >
                  <Icon size={13} className="text-vgu-red" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
