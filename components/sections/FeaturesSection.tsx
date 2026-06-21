'use client'

import {
  IconAward,
  IconSchool,
  IconDeviceMobile,
  IconCreditCard,
} from '@tabler/icons-react'
import BrandIcon from '@/components/ui/BrandIcon'
import { FOUNDING_YEAR } from '@/lib/constants'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'

interface Feature {
  title:   string
  body:    string
  badge?:  string
  grad:    string
  glow:    string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon:    React.ComponentType<any>
}

const FEATURES: Feature[] = [
  {
    title: 'UGC-Entitled Degree',
    body:  'Employer-recognised, eligible for higher studies, and valid for government jobs. Same weight as any campus degree.',
    grad:  'linear-gradient(135deg,#C04036,#821a12)',
    glow:  'rgba(192,64,54,0.32)',
    Icon:  IconAward,
  },
  {
    title: 'Industry-Active Faculty',
    body:  'Learn from professors who consult for Fortune 500 companies, publish research, and mentor startups on the side.',
    grad:  'linear-gradient(135deg,#FFA412,#C04036)',
    glow:  'rgba(255,164,18,0.32)',
    Icon:  IconSchool,
  },
  {
    title: 'Mobile-First Learning',
    body:  'Lectures, live classes, assignments, grades, all in one app built for the smartphone-first Indian learner.',
    grad:  'linear-gradient(135deg,#821a12,#3b0d09)',
    glow:  'rgba(130,26,18,0.32)',
    Icon:  IconDeviceMobile,
  },
  {
    title: 'No Entrance Exam',
    badge: 'EMI from ₹2,999/mo',
    body:  'Enrol online in 30 minutes. EMIs via 12 partner banks. Merit scholarships and education loans available.',
    grad:  'linear-gradient(135deg,#C04036,#FFA412)',
    glow:  'rgba(192,64,54,0.28)',
    Icon:  IconCreditCard,
  },
]

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
            What makes Online VGU different.
          </h2>
          <p className="hidden md:block mt-4 text-[16px] lg:text-[17px] font-body leading-[1.7] text-neutral-600 max-w-[600px] mx-auto">
            {new Date().getFullYear() - FOUNDING_YEAR} years of academic excellence, now accessible from wherever you are.
          </p>
        </div>

        {/* 4 differentiator cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-4 lg:mb-8">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={i * 80} />
          ))}
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

function FeatureCard({ feature: f, delay = 0 }: { feature: Feature; delay?: number }) {
  return (
    <div
      data-animate="fade-up"
      style={{ animationDelay: `${delay}ms` }}
      className="group/card flex flex-col rounded-2xl bg-white border border-neutral-200/80 p-4 md:p-6
                 shadow-[0_4px_16px_rgba(17,24,39,0.07)]
                 transition-all duration-300 hover:-translate-y-1 hover:border-vgu-red/20 hover:shadow-[0_12px_32px_rgba(192,64,54,0.14)]"
    >
      {/* Gradient icon circle */}
      <div
        className="mb-3 md:mb-4 w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-none
                   transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-3"
        style={{ background: f.grad, boxShadow: `0 6px 16px ${f.glow}` }}
      >
        <f.Icon size={20} className="text-white" stroke={1.75} />
      </div>

      <h3 className="font-heading font-bold text-[14px] md:text-[17px] leading-[1.3] text-neutral-900 mb-1.5 md:mb-2">
        {f.title}
      </h3>

      {f.badge && (
        <span className="mb-1 md:mb-2 inline-flex w-fit rounded-full px-2.5 py-[3px]
                         text-[11px] font-heading font-semibold
                         bg-vgu-yellow/15 border border-vgu-yellow/30 text-neutral-600">
          {f.badge}
        </span>
      )}

      <p className="hidden md:block text-[16px] font-body leading-[1.6] text-neutral-600">
        {f.body}
      </p>
    </div>
  )
}
