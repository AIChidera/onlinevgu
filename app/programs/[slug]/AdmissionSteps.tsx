import { IconFileText, IconCheck } from '@tabler/icons-react'
import SketchSparkle from '@/components/ui/sketch/SketchSparkle'

interface Doc { name: string; note: string; level?: 'ug' | 'pg'; optional?: boolean }

const PALETTE = [
  { grad: 'linear-gradient(135deg,#C04036,#821a12)', shadow: 'rgba(192,64,54,0.38)' },
  { grad: 'linear-gradient(135deg,#FFA412,#C04036)', shadow: 'rgba(255,164,18,0.38)' },
  { grad: 'linear-gradient(135deg,#821a12,#3b0d09)', shadow: 'rgba(130,26,18,0.38)' },
]

const STEPS = [
  { num: '01', title: 'Apply Online',     desc: 'Fill the 5-minute form. No entrance exam, no hassle.',                          time: '5 min',   ...PALETTE[0] },
  { num: '02', title: 'Verify Documents', desc: 'Upload soft copies of your degree and ID. Our team verifies within 24 hours.',  time: '24 hrs',  ...PALETTE[1] },
  { num: '03', title: 'Pay & Enroll',     desc: 'Pay the full fee or choose a no-cost EMI plan. Instant enrollment confirmation.', time: 'Instant', ...PALETTE[2] },
  { num: '04', title: 'Start Learning',   desc: 'Access the LMS immediately. Your first live session starts within 7 days.',      time: '7 days',  ...PALETTE[0] },
]

interface Props {
  programName:  string
  programLevel: 'ug' | 'pg'
  documents:    Doc[]
  eligibility?: string[]
}

export default function AdmissionSteps({ programName, programLevel, documents, eligibility = [] }: Props) {
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

          {/* Eligibility - folded into the header as plain inline chips (no
              card, no boxed label) rather than a second boxed subsection, so
              it reads as "who this is for" context attached to the intro
              copy instead of competing with the Documents card grid below
              for the same "checklist in a box" visual role. */}
          {eligibility.length > 0 && (
            <div data-animate="fade-up" className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-[640px] mx-auto">
              {eligibility.map(item => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] font-body text-white/70 leading-none"
                >
                  <IconCheck size={12} stroke={3} className="flex-none text-vgu-yellow" />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

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
                <span className="font-heading font-bold text-[28px] text-white">{s.num}</span>
              </div>
              <h3 className="font-heading font-bold text-[17px] text-white mb-2">{s.title}</h3>
              <p className="hidden md:block text-[14px] font-body text-white/55 leading-relaxed max-w-[200px] flex-1">{s.desc}</p>
              <span className="mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-body font-semibold bg-white/10 border border-white/15 text-white/60">
                {s.time}
              </span>
            </div>
          ))}
        </div>

        {/* Documents - a single consolidated checklist card with divided
            rows, not a card-per-item grid. A grid of big rounded cards reads
            as a feature/benefit pattern (like ProgramHighlights); this is
            just a paperwork checklist, so it's styled like one - closer to
            how upGrad and Manipal present the same content, as a plain list
            rather than a promo grid. Keeps it visually distinct from the
            Eligibility chips above instead of reading as a second copy of
            the same "grid of boxes" idea. */}
        {visibleDocs.length > 0 && (
          <div data-animate="fade-up" className="mx-auto max-w-[720px]">
            <p className="text-[11px] font-heading font-bold uppercase tracking-[0.08em] text-white/35 mb-4 text-center">
              Have these ready before you apply
            </p>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] divide-y divide-white/[0.06] overflow-hidden">
              {visibleDocs.map((d, i) => (
                <div
                  key={d.name}
                  data-animate="fade-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                  className="flex items-center gap-3.5 px-5 py-4"
                >
                  <div className="flex-none w-8 h-8 rounded-lg bg-vgu-yellow/10 border border-vgu-yellow/20 flex items-center justify-center">
                    <IconFileText size={15} stroke={1.75} className="text-vgu-yellow" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-heading font-semibold text-[15px] text-white/90">{d.name}</p>
                      {d.optional && (
                        <span className="rounded-full bg-white/10 text-white/40 text-[10px] font-heading font-bold uppercase tracking-[0.06em] px-2 py-0.5">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] font-body text-white/45 leading-[1.4]">{d.note}</p>
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
