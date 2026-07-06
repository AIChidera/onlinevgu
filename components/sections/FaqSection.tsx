'use client'

import { useState } from 'react'
import { IconHeadset, IconPlus } from '@tabler/icons-react'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import type { SanityFaq } from '@/lib/sanity'

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
    a: 'Absolutely - the programs are designed for working professionals. Live sessions are scheduled on evenings and weekends, and all classes are recorded so you can study at midnight or 6am, at your own pace.',
  },
  {
    q: 'What is the minimum eligibility for online programs?',
    a: "For UG programs (B.Com, BBA, BCA, BA, B.Sc, B.Lib): 10+2 or equivalent from any recognised board, any stream, minimum 45% marks. For PG programs (MBA, MCA, M.Com, MA, M.Lib, Healthcare MBA): any bachelor's degree from a UGC-recognised university, minimum 50% marks.",
  },
  {
    q: 'Is there an entrance exam?',
    a: "No entrance exam is required for admission to VGU's online programs. Admission is based on merit from your qualifying examination marks.",
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

export default function FaqSection({ faqs: sanityFaqs = [] }: { faqs?: SanityFaq[] }) {
  const activeFaqs = sanityFaqs.length > 0
    ? sanityFaqs.map(f => ({ q: f.question, a: f.answer }))
    : FAQS
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section
      id="faq"
      className="sketch-hover-group group relative overflow-hidden bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24"
    >
      <SketchFlourish shape="arc" color="red" opacity={0.04} strokeWidth={20} />
      <div className="relative z-10 mx-auto max-w-[860px]">
        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-10">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Common Questions
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[36px] lg:text-[40px]">
            Got questions? Here are the answers.
          </h2>
        </div>

        {/* Accordion */}
        <div data-animate="fade-up" style={{ animationDelay: '150ms' }} className="flex flex-col divide-y divide-neutral-200 rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
          {activeFaqs.map((faq, i) => (
            <div
              key={i}
              className={[
                'border-l-4 transition-colors duration-200',
                openIndex === i ? 'border-vgu-red bg-vgu-red/[0.02]' : 'border-transparent',
              ].join(' ')}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                aria-expanded={openIndex === i}
                className="flex w-full items-center gap-4 px-6 py-5 text-left hover:bg-neutral-100 transition-colors duration-150"
              >
                <span className={[
                  'flex-none w-8 font-heading font-bold text-[12px] tabular-nums text-right transition-colors duration-150',
                  openIndex === i ? 'text-vgu-red' : 'text-neutral-400',
                ].join(' ')}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className={[
                  'flex-1 font-heading font-semibold text-[16px] leading-snug transition-colors duration-150',
                  openIndex === i ? 'text-vgu-red' : 'text-neutral-900',
                ].join(' ')}>
                  {faq.q}
                </span>

                <span className={[
                  'flex-none w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200',
                  openIndex === i
                    ? 'bg-vgu-red text-white rotate-45'
                    : 'bg-neutral-100 text-neutral-500',
                ].join(' ')}>
                  <IconPlus size={14} stroke={2.5} />
                </span>
              </button>

              <div
                className={[
                  'overflow-hidden transition-all duration-300 ease-out',
                  openIndex === i ? 'max-h-[500px]' : 'max-h-0',
                ].join(' ')}
              >
                <p className="pl-12 sm:pl-[72px] pr-6 pb-5 text-[16px] font-body leading-[1.75] text-neutral-600">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Below accordion CTA */}
        <div className="mt-10 text-center">
          <p className="text-[16px] font-body text-neutral-500 mb-4">Still have questions?</p>
          <a
            href="#counsellor"
            className="inline-flex items-center gap-2 bg-white border-2 border-vgu-red text-vgu-red hover:bg-vgu-red/5 rounded-md px-8 py-3 text-[15px] font-heading font-semibold transition-colors duration-150"
          >
            <IconHeadset size={18} />
            Talk to a Counsellor
          </a>
        </div>
      </div>
    </section>
  )
}
