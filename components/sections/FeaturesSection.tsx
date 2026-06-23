'use client'

import BrandIcon from '@/components/ui/BrandIcon'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'

const COURSERA_PARTNERS = ['Google', 'IBM', 'Meta', 'AWS', 'Microsoft', 'DeepLearning.AI']
const PARTNER_LABEL: Record<string, string> = { 'DeepLearning.AI': 'DL.AI' }

export default function FeaturesSection() {
  return (
    <section id="features" className="sketch-hover-group group relative overflow-hidden bg-vgu-beige py-12 lg:py-24">
      <SketchFlourish shape="swoop"    color="red-dark" opacity={0.07} strokeWidth={20} />
      <SketchFlourish shape="monogram" color="red-dark" opacity={0.05} strokeWidth={20} className="translate-x-1/3 translate-y-1/3" />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">

        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-8 md:mb-12">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Why Online VGU
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[36px] lg:text-[40px]">
            Every degree comes with 7,000+ Coursera courses.
          </h2>
        </div>

        {/* Coursera highlight - full-width dark featured card */}
        <div
          data-animate="fade-up"
          style={{
            animationDelay: '320ms',
            background: 'linear-gradient(135deg, #821a12 0%, #C04036 100%)',
          }}
          className="group/card relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(130,26,18,0.30)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] h-full">
            {/* Left: description */}
            <div className="p-5 md:p-7 lg:p-9 flex flex-col justify-between border-b border-white/10 md:border-b-0 md:border-r">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-none shadow-lg">
                    <BrandIcon name="Coursera" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-[16px] text-white">Coursera</p>
                    <p className="text-[11px] font-body text-vgu-yellow">Included free with every program</p>
                  </div>
                </div>
                <h3 className="font-heading font-bold text-[18px] md:text-[20px] lg:text-[24px] leading-[1.3] text-white mb-2">
                  7,000+ world-class courses at no extra cost.
                </h3>
                <p className="text-[16px] font-body text-white/80 leading-[1.65]">
                  Every VGU program comes bundled with a full Coursera licence. Earn certificates
                  from Google, IBM, Meta and more, shareable directly to your LinkedIn profile.
                </p>
              </div>
            </div>

            {/* Right: partner logos */}
            <div className="p-5 md:p-7 lg:p-9 flex flex-col justify-center">
              <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-white/55 mb-4">
                Top partners included
              </p>
              <div className="grid grid-cols-3 gap-3">
                {COURSERA_PARTNERS.map((name) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-2 rounded-xl py-3 px-2 bg-white/[0.07] border border-white/10 transition-colors duration-150 hover:bg-white/[0.12]"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-none">
                      <BrandIcon name={name} />
                    </div>
                    <span className="text-[11px] font-body text-white/75 text-center leading-tight">{PARTNER_LABEL[name] ?? name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl px-4 py-2.5 text-center bg-white/[0.07] border border-white/10">
                <span className="font-heading font-black text-[20px] text-vgu-yellow">7,000+</span>
                <span className="ml-2 text-[13px] font-body text-white/80">courses available</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
