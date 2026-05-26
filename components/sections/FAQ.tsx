'use client'

import { useState } from 'react'
import SectionWrapper from '@/components/layout/SectionWrapper'

const FAQS = [
  {
    q: 'Are VGU online degrees valid and recognised by employers?',
    a: 'Yes. VGU\'s online degrees are UGC-entitled (under the UGC\'s Distance Education Bureau), which means they carry the same legal standing as on-campus degrees from UGC-recognised universities. They are accepted by government employers, PSUs, and private companies alike.',
  },
  {
    q: 'Do I need to visit the campus at any point?',
    a: 'No. Admissions, coursework, exams, and graduation are all 100% online. There is no mandatory campus visit. Optional on-campus workshops are organised periodically but are never compulsory.',
  },
  {
    q: 'Can I pursue a VGU online degree while working full-time?',
    a: 'Absolutely — the programs are designed for working professionals. Live sessions are scheduled on evenings and weekends, and all classes are recorded. Many of our students hold demanding jobs while studying.',
  },
  {
    q: 'What is the minimum eligibility for online programs?',
    a: 'For UG programs (BBA, BCA, B.Com): 10+2 or equivalent from any recognised board, any stream, minimum 50% marks. For PG programs (MBA, MCA, M.Com, MA): any bachelor\'s degree from a UGC-recognised university, minimum 50% marks.',
  },
  {
    q: 'Is there an entrance exam?',
    a: 'No entrance exam is required for admission to VGU\'s online programs. Admission is merit-based on qualifying examination marks.',
  },
  {
    q: 'How are exams conducted?',
    a: 'Exams are conducted online through our proctored exam portal at the end of each semester. You can appear from home using a laptop or PC with a webcam. The system uses AI-powered proctoring to ensure integrity.',
  },
  {
    q: 'What EMI options are available?',
    a: 'We offer no-cost EMI plans starting at ₹2,999/month through 12 partner banks including HDFC, ICICI, Axis, SBI, and Kotak. You can also pay semester-wise. Scholarships of up to 50% are available for meritorious students.',
  },
  {
    q: 'Will the degree certificate mention "online" or "distance"?',
    a: 'No. The degree certificate issued by Vivekananda Global University does not state "online" or "distance." It is identical in format and language to the on-campus degree certificate.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <SectionWrapper id="faqs" bg="white">
      <div className="text-center mb-12">
        <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
          FAQs
        </p>
        <h2 className="font-heading text-[40px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[32px]">
          Everything you need to know
        </h2>
        <p className="mt-3 text-[16px] text-neutral-600 max-w-[480px] mx-auto">
          Can&apos;t find your answer?{' '}
          <a href="https://wa.me/911800123456" className="text-vgu-red font-semibold hover:underline">
            Chat with a counsellor
          </a>
        </p>
      </div>

      <div className="max-w-[780px] mx-auto flex flex-col gap-1">
        {FAQS.map((faq, i) => (
          <div key={i} className="border-b border-neutral-200 last:border-0">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-heading text-[16px] font-semibold text-neutral-900 leading-snug">
                {faq.q}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={[
                  'flex-none text-neutral-400 transition-transform duration-200',
                  open === i ? 'rotate-180 text-vgu-red' : '',
                ].join(' ')}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div
              className={[
                'overflow-hidden transition-all duration-300 ease-out',
                open === i ? 'max-h-96 pb-5' : 'max-h-0',
              ].join(' ')}
            >
              <p className="text-[15px] text-neutral-600 leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
