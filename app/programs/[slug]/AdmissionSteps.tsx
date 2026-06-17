import { IconForms, IconFileCheck, IconCreditCard, IconDeviceLaptop } from '@tabler/icons-react'
import SketchSparkle from '@/components/ui/sketch/SketchSparkle'

// Brand-only 3-palette cycle, fourth step wraps back to red.
const PALETTE = [
  { grad: 'linear-gradient(135deg,#C04036,#821a12)', color: '#C04036', shadow: 'rgba(192,64,54,0.38)' },
  { grad: 'linear-gradient(135deg,#FFA412,#C04036)', color: '#FFA412', shadow: 'rgba(255,164,18,0.38)' },
  { grad: 'linear-gradient(135deg,#821a12,#3b0d09)', color: '#821a12', shadow: 'rgba(130,26,18,0.38)' },
]

const STEPS = [
  { num: '01', Icon: IconForms,        title: 'Apply Online',     desc: 'Fill the 5-minute form. No entrance exam, no hassle.',                 time: '5 min',   ...PALETTE[0] },
  { num: '02', Icon: IconFileCheck,    title: 'Verify Documents', desc: 'Upload soft copies of your degree and ID. Our team verifies within 24 hours.', time: '24 hrs', ...PALETTE[1] },
  { num: '03', Icon: IconCreditCard,   title: 'Pay & Enroll',     desc: 'Pay the full fee or choose a no-cost EMI plan. Instant enrollment confirmation.', time: 'Instant', ...PALETTE[2] },
  { num: '04', Icon: IconDeviceLaptop, title: 'Start Learning',   desc: 'Access the LMS immediately. Your first live session starts within 7 days.', time: '7 days', ...PALETTE[0] },
]

export default function AdmissionSteps() {
  return (
    <section className="relative bg-neutral-900 border-t border-white/[0.06] py-16 px-5 md:px-8 lg:px-12 overflow-hidden">
      {/* Dot texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
      />
      <div className="relative mx-auto max-w-[1280px]">

        <div className="text-center mb-12 relative">
          <SketchSparkle color="yellow" size={28} trigger="in-view" delayMs={0} className="top-1 left-0 lg:left-8" />
          <SketchSparkle color="yellow" size={20} trigger="in-view" delayMs={400} rotateDeg={15} className="-top-1 right-0 lg:right-8" />
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-3">Admissions</p>
          <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-white lg:text-[32px]">
            From form to first class, in under 30 minutes.
          </h2>
          <p className="mt-3 text-[16px] font-body text-white/55 max-w-[440px] mx-auto">
            No campus visit, no entrance exam. Everything happens online.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line, desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-white/[0.14] z-0" aria-hidden="true" />

          {STEPS.map((s, i) => (
            <div
              key={s.num}
              data-animate="fade-up"
              className="relative z-10 flex flex-col items-center text-center group"
              style={{ animationDelay: `${i * 110}ms` }}
            >
              {/* Icon circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                style={{
                  background: s.grad,
                  boxShadow: `0 8px 32px ${s.shadow}`,
                }}
              >
                <s.Icon size={28} stroke={1.5} className="text-white" />
              </div>

              <span className="text-[11px] font-heading font-bold uppercase tracking-[0.08em] text-white/35 mb-1">
                Step {s.num}
              </span>

              <h3 className="font-heading font-bold text-[17px] text-white mb-2">{s.title}</h3>

              <p className="text-[14px] font-body text-white/55 leading-relaxed max-w-[200px] flex-1">
                {s.desc}
              </p>

              <span className="mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-body font-semibold bg-white/10 border border-white/15 text-white/60">
                {s.time}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
