import { IconArrowRight, IconHeadset } from '@tabler/icons-react'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'

export default function FooterCTA({ nextBatch = 'July 2026' }: { nextBatch?: string }) {
  return (
    <section className="sketch-hover-group relative overflow-hidden bg-vgu-red py-14 px-5 md:px-8 lg:px-12 lg:py-20">
      <SketchFlourish shape="swoop" color="yellow" opacity={0.09} strokeWidth={28} durationMs={2400} />
      <div data-animate="fade-up" className="relative z-10 mx-auto max-w-[1280px] flex flex-col items-center text-center gap-6">
        <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-white/55">
          Start Today
        </p>
        <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.15] text-white md:text-[32px] lg:text-[48px]">
          Your Degree is<br />One Click Away.
        </h2>
        <p className="text-[17px] font-body leading-[1.7] text-white/70 max-w-[460px]">
          No entrance exam. No campus visit. Enrol 100% online and start learning in {nextBatch}.
        </p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <a
            href="#counsellor"
            data-apply-trigger
            className="inline-flex items-center gap-2 rounded-md bg-white text-vgu-red hover:bg-vgu-beige font-heading font-semibold text-[15px] px-5 py-3 md:px-8 md:py-4 md:text-[16px] whitespace-nowrap transition-all duration-150 shadow-lg"
          >
            Apply Now
            <IconArrowRight size={16} />
          </a>
          <a
            href="#counsellor"
            className="inline-flex items-center gap-2 rounded-md border-2 border-white/40 text-white hover:text-white hover:bg-white/15 hover:border-white/60 font-heading font-semibold text-[15px] px-5 py-3 md:px-8 md:py-4 md:text-[16px] whitespace-nowrap transition-all duration-150"
          >
            <IconHeadset size={16} />
            Talk to a Counsellor
          </a>
        </div>
        <p className="text-[13px] font-body text-white/45">
          Free consultation · No obligation · Counsellor calls within 2 hours
        </p>
      </div>
    </section>
  )
}
