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
      <div className="grid grid-cols-[1fr_2fr] gap-16 lg:grid-cols-1 lg:gap-10">
        <div>
          <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
            FAQs
          </p>
          <h2 className="font-heading text-[40px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[32px]">
            Common questions
          </h2>
          <p className="mt-4 text-[16px] text-neutral-600 leading-relaxed">
            Can&apos;t find your answer? Chat with a counsellor — we&apos;re available Mon–Sat, 9am–7pm IST.
          </p>
          <a
            href="https://wa.me/911800123456"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#25D366]/10 px-4 py-2.5 text-[14px] font-heading font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.843L0 24l6.317-1.499A11.96 11.96 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 0 1-5.002-1.368l-.36-.214-3.727.885.913-3.617-.235-.372A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        <div className="flex flex-col gap-1">
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
                    open === i ? 'rotate-180' : '',
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
      </div>
    </SectionWrapper>
  )
}
