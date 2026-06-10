import { NEXT_BATCH } from '@/lib/constants'
import SectionWrapper from '@/components/layout/SectionWrapper'
import Button from '@/components/ui/Button'

const STEPS = [
  {
    number: '01',
    title: 'Register online',
    body: 'Fill a quick enquiry form. A counsellor calls you within 2 hours.',
  },
  {
    number: '02',
    title: 'Choose your program',
    body: 'Pick your degree and specialisation with guidance from our advisors.',
  },
  {
    number: '03',
    title: 'Pay fees',
    body: 'Pay securely online. EMI options available from ₹2,999/month.',
  },
  {
    number: '04',
    title: 'Begin learning',
    body: 'Get instant access to the learning portal and start on day one.',
  },
]

export default function AdmissionTimeline() {
  return (
    <SectionWrapper id="admissions" bg="white">
      <div className="text-center mb-12">
        <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
          Simple admissions
        </p>
        <h2 className="font-heading text-[32px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[40px]">
          Join in 4 simple steps
        </h2>
        <p className="mt-3 text-[15px] text-neutral-600 max-w-[480px] mx-auto leading-relaxed lg:text-[17px]">
          No entrance exams. No campus visits. Enrol 100% online in under 30 minutes.
        </p>
      </div>

      {/* Horizontal steps */}
      <div className="relative">
        {/* Connector line */}
        <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-neutral-200 lg:hidden" />

        <div className="grid grid-cols-4 gap-6 lg:grid-cols-2 md:grid-cols-1">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              data-animate="fade-up"
              className="flex flex-col items-center text-center"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Number circle */}
              <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-vgu-red shadow-[0_8px_24px_rgba(192,64,54,0.30)]">
                <span className="font-heading text-[22px] font-black text-white">{step.number}</span>
              </div>

              <h3 className="font-heading text-[17px] font-bold text-neutral-900 mb-2">
                {step.title}
              </h3>
              <p className="text-[14px] text-neutral-600 leading-relaxed max-w-[200px]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <Button as="a" href="/apply" size="lg">
          Enrol now →
        </Button>
        <div className="flex flex-wrap justify-center gap-6 text-[13px] text-neutral-500">
          {[
            { label: 'Next intake', value: NEXT_BATCH },
            { label: 'Min. qualification', value: '10+2 / Graduation' },
            { label: 'Entrance exam', value: 'Not required' },
          ].map((item) => (
            <span key={item.label}>
              <span className="text-neutral-400">{item.label}: </span>
              <span className="font-heading font-semibold text-neutral-700">{item.value}</span>
            </span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
