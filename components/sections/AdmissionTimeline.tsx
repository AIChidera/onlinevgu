'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import SectionWrapper from '@/components/layout/SectionWrapper'
import Button from '@/components/ui/Button'

const STEPS = [
  {
    number: '01',
    title: 'Fill enquiry form',
    body: 'Share your details and program interest. A counsellor will call you within 2 hours.',
    time: '5 minutes',
  },
  {
    number: '02',
    title: 'Choose your program',
    body: 'Discuss specialisations, fee structure, and EMI options with your dedicated counsellor.',
    time: '1 call',
  },
  {
    number: '03',
    title: 'Submit documents',
    body: 'Upload marksheets, ID proof, and passport photo through our secure portal.',
    time: '10 minutes',
  },
  {
    number: '04',
    title: 'Pay & enrol',
    body: 'Complete admission fee online. Instant enrolment confirmation sent to your email.',
    time: '2 minutes',
  },
  {
    number: '05',
    title: 'Start learning',
    body: 'Get access to the learning portal, live schedule, and your first week of content.',
    time: 'Same day',
  },
]

export default function AdmissionTimeline() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <SectionWrapper id="admissions" bg="white">
      <div className="grid grid-cols-2 gap-16 items-center lg:grid-cols-1 lg:gap-10">
        <div>
          <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
            Simple admissions
          </p>
          <h2 className="font-heading text-[40px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[32px]">
            Enrol in under<br />
            30 minutes — online
          </h2>
          <p className="mt-4 text-[17px] text-neutral-600 leading-relaxed max-w-[440px]">
            No entrance exams. No campus visits. Just a simple online process from anywhere in India
            (or the world).
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="/apply" size="lg">
              Apply now →
            </Button>
            <Button variant="secondary" size="lg" as="a" href="/apply#brochure">
              Download brochure
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-neutral-100">
            {[
              { label: 'Intake', value: 'Jan & Jul' },
              { label: 'Min. qualification', value: '10+2 / Graduation' },
              { label: 'Entrance exam', value: 'Not required' },
            ].map((i) => (
              <div key={i.label}>
                <div className="text-[12px] text-neutral-400 uppercase tracking-wider font-heading font-semibold mb-0.5">
                  {i.label}
                </div>
                <div className="text-[15px] font-heading font-bold text-neutral-900">{i.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div ref={ref} className="relative pl-4">
          {/* Vertical line */}
          <div className="absolute left-[28px] top-3 bottom-3 w-px bg-neutral-200" />

          <div className="flex flex-col gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={[
                  'flex gap-4 transition-all duration-500',
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6',
                ].join(' ')}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 border-vgu-red bg-white">
                  <span className="font-heading text-[13px] font-black text-vgu-red">{step.number}</span>
                </div>
                <div className="pt-1.5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading text-[15px] font-bold text-neutral-900">{step.title}</h3>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-500">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-[13px] text-neutral-600 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
