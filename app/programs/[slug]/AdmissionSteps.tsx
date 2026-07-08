import { IconForms, IconFileCheck, IconCreditCard, IconDeviceLaptop, IconCheck, IconFileText } from '@tabler/icons-react'
import SketchSparkle from '@/components/ui/sketch/SketchSparkle'

interface Doc { name: string; note: string; level?: 'ug' | 'pg'; optional?: boolean }

const PALETTE = [
  { grad: 'linear-gradient(135deg,#C04036,#821a12)', shadow: 'rgba(192,64,54,0.38)' },
  { grad: 'linear-gradient(135deg,#FFA412,#C04036)', shadow: 'rgba(255,164,18,0.38)' },
  { grad: 'linear-gradient(135deg,#821a12,#3b0d09)', shadow: 'rgba(130,26,18,0.38)' },
]

const STEPS = [
  { num: '01', Icon: IconForms,        title: 'Apply Online',     desc: 'Fill the 5-minute form. No entrance exam, no hassle.',                          time: '5 min',   ...PALETTE[0] },
  { num: '02', Icon: IconFileCheck,    title: 'Verify Documents', desc: 'Upload soft copies of your degree and ID. Our team verifies within 24 hours.',  time: '24 hrs',  ...PALETTE[1] },
  { num: '03', Icon: IconCreditCard,   title: 'Pay & Enroll',     desc: 'Pay the full fee or choose a no-cost EMI plan. Instant enrollment confirmation.', time: 'Instant', ...PALETTE[2] },
  { num: '04', Icon: IconDeviceLaptop, title: 'Start Learning',   desc: 'Access the LMS immediately. Your first live session starts within 7 days.',      time: '7 days',  ...PALETTE[0] },
]

interface Props {
  programName:  string
  programLevel: 'ug' | 'pg'
  eligibility:  string[]
  documents:    Doc[]
}

export default function AdmissionSteps({ programName, programLevel, eligibility, documents }: Props) {
  const visibleDocs = documents.filter(d => !d.level || d.level === programLevel)

  return (
    <section className="relative bg-neutral-900 border-t border-white/[0.06] py-16 px-5 md:px-8 lg:px-12 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
      />
      <div className="relative mx-auto max-w-[1280px]">

        {/* Header */}
        <div className="text-center mb-10 relative">
          <SketchSparkle color="yellow" size={28} trigger="in-view" delayMs={0} className="top-1 left-0 lg:left-8" />
          <SketchSparkle color="yellow" size={20} trigger="in-view" delayMs={400} rotateDeg={15} className="-top-1 right-0 lg:right-8" />
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-3">Admissions</p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] text-white lg:text-[32px]">
            {programName} Admission Process
          </h2>
          <p className="mt-3 text-[16px] font-body text-white/55 max-w-[440px] mx-auto">
            No campus visit, no entrance exam. Everything happens online.
          </p>
        </div>

        {/* Eligibility check */}
        {eligibility.length > 0 && (
          <div data-animate="fade-up" className="mb-12 rounded-2xl bg-white/[0.05] border border-white/[0.09] px-6 py-6 text-center">
            <p className="text-[11px] font-heading font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-4">
              Quick eligibility check
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {eligibility.map(e => (
                <div key={e} className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/[0.12] px-4 py-2">
                  <IconCheck size={12} stroke={2.5} className="text-vgu-yellow flex-none" />
                  <span className="text-[13px] font-body text-white/80">{e}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative mb-14">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-white/[0.14] z-0" aria-hidden="true" />

          {STEPS.map((s, i) => (
            <div
              key={s.num}
              data-animate="fade-up"
              className="relative z-10 flex flex-col items-center text-center group"
              style={{ animationDelay: `${i * 110}ms` }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                style={{ background: s.grad, boxShadow: `0 8px 32px ${s.shadow}` }}
              >
                <s.Icon size={28} stroke={1.5} className="text-white" />
              </div>
              <span className="text-[11px] font-heading font-bold uppercase tracking-[0.08em] text-white/35 mb-1">Step {s.num}</span>
              <h3 className="font-heading font-bold text-[17px] text-white mb-2">{s.title}</h3>
              <p className="hidden md:block text-[14px] font-body text-white/55 leading-relaxed max-w-[200px] flex-1">{s.desc}</p>
              <span className="mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-body font-semibold bg-white/10 border border-white/15 text-white/60">
                {s.time}
              </span>
            </div>
          ))}
        </div>

        {/* Documents */}
        {visibleDocs.length > 0 && (
          <div data-animate="fade-up">
            <p className="text-[11px] font-heading font-bold uppercase tracking-[0.08em] text-white/35 mb-4 text-center">
              Have these ready before you apply
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {visibleDocs.map((d, i) => (
                <div
                  key={d.name}
                  data-animate="fade-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                  className="flex items-start gap-3 rounded-xl bg-white/[0.05] border border-white/[0.09] p-4 hover:border-white/[0.18] transition-colors duration-200"
                >
                  <div className="flex-none w-8 h-8 rounded-lg bg-vgu-yellow/10 border border-vgu-yellow/20 flex items-center justify-center mt-0.5">
                    <IconFileText size={15} stroke={1.75} className="text-vgu-yellow" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="font-heading font-semibold text-[16px] text-white/90">{d.name}</p>
                      {d.optional && (
                        <span className="rounded-full bg-white/10 text-white/40 text-[10px] font-heading font-bold uppercase tracking-[0.06em] px-2 py-0.5">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] font-body text-white/45 leading-[1.5]">{d.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
