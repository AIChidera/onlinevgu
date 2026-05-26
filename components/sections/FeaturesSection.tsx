'use client'

import Image from 'next/image'
import {
  IconAward,
  IconVideo,
  IconSchool,
  IconBriefcase,
  IconDeviceMobile,
  IconBooks,
  IconCreditCard,
  IconArrowRight,
} from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'

interface Feature {
  title: string
  body:  string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon:  React.ComponentType<any>
}

const FEATURES: Feature[] = [
  {
    title: 'UGC-Entitled Degree',
    body:  'Employer-recognised, eligible for higher studies, and valid for government jobs. Same weight as any campus degree.',
    Icon:  IconAward,
  },
  {
    title: 'Live Classes & Recordings',
    body:  'Attend live on weekends or watch recordings anytime. Every session is saved forever so no class is ever missed.',
    Icon:  IconVideo,
  },
  {
    title: 'Industry-Active Faculty',
    body:  'Learn from professors who consult for Fortune 500 companies, publish active research, and work with startups.',
    Icon:  IconSchool,
  },
  {
    title: '93% Placement Support',
    body:  'Dedicated career centre, 500+ hiring partners, mock interviews, LinkedIn optimisation, and referral networks.',
    Icon:  IconBriefcase,
  },
  {
    title: 'Mobile-First Learning',
    body:  'Download lectures, join live classes, submit assignments, and check grades. All from one seamless mobile app.',
    Icon:  IconDeviceMobile,
  },
  {
    title: 'Digital Library Access',
    body:  '25,000+ e-books, JSTOR, IEEE Xplore and VGU\'s full research archive. Included at no extra cost.',
    Icon:  IconBooks,
  },
  {
    title: 'Flexible EMIs from ₹2,999/mo',
    body:  'No-cost EMI plans via 12 partner banks. Merit scholarships available. Education loans facilitated.',
    Icon:  IconCreditCard,
  },
]

const COURSERA_PARTNERS = ['Google', 'IBM', 'Meta', 'AWS', 'Microsoft', 'DeepLearning.AI']
const PARTNER_COLORS: Record<string, string> = {
  Google: '#4285F4', IBM: '#0530AD', Meta: '#0866FF',
  AWS: '#FF9900', Microsoft: '#00A4EF', 'DeepLearning.AI': '#E84393',
}

export default function FeaturesSection() {
  return (
    <section id="features" className="group relative overflow-hidden">
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/library-bg.jpg"
          fill
          className="object-cover"
          alt=""
          priority={false}
          onError={() => {/* silently use gradient fallback */}}
        />
      </div>
      {/* Gradient overlay (also serves as fallback when image missing) */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(130,26,18,0.96) 0%, rgba(17,8,5,0.93) 100%)' }}
      />

      <StrokeArt variant="dark" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-12 lg:px-8 md:px-5 py-24 md:py-16">
        {/* Header */}
        <div className="text-center mb-14 md:mb-10">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-gold mb-3">
            Why VGU Online
          </p>
          <h2 className="font-heading font-extrabold text-[40px] tracking-tight leading-[1.2] text-white md:text-[28px]">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-[17px] font-body leading-[1.7] text-white/60 max-w-[500px] mx-auto">
            25 years of academic excellence, now accessible from wherever you are.
          </p>
        </div>

        {/* 3-col grid — Coursera at [4] spans 2 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Features 1–3 */}
          {FEATURES.slice(0, 3).map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}

          {/* Feature 4 */}
          <FeatureCard feature={FEATURES[3]} />

          {/* ── Coursera card (col-span-2) ── */}
          <div
            className="group/card relative rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 sm:col-span-2 lg:col-span-2"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            {/* Top gradient border on hover */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-200"
              style={{ background: 'linear-gradient(90deg, #C04036, #FFA412)' }}
            />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] h-full">
              {/* Left: description */}
              <div className="p-7 flex flex-col justify-between border-b border-white/10 md:border-b-0 md:border-r">
                <div>
                  {/* Coursera logo mark */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0056D2] flex items-center justify-center flex-none shadow-lg">
                      <span className="font-black text-white text-[16px]">C</span>
                    </div>
                    <div>
                      <p className="font-heading font-bold text-[16px] text-white">Coursera</p>
                      <p className="text-[11px] font-body text-vgu-yellow">Included free with every programme</p>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-[20px] leading-[1.3] text-white mb-2">
                    7,000+ world-class courses at no extra cost.
                  </h3>
                  <p className="text-[14px] font-body text-white/60 leading-[1.7]">
                    Every VGU programme comes bundled with a full Coursera licence. Earn certificates
                    from Google, IBM, Meta and more, shareable directly to your LinkedIn profile.
                  </p>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-body font-semibold text-vgu-yellow">
                  <span>Explore Coursera courses</span>
                  <IconArrowRight size={14} />
                </div>
              </div>

              {/* Right: partner logos grid */}
              <div className="p-7 flex flex-col justify-center">
                <p className="text-[11px] font-body font-bold uppercase tracking-[0.08em] text-white/40 mb-4">
                  Top partners included
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {COURSERA_PARTNERS.map((name) => (
                    <div
                      key={name}
                      className="flex flex-col items-center gap-2 rounded-xl py-3 px-2 transition-colors duration-150 hover:bg-white/5"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black text-white"
                        style={{ background: PARTNER_COLORS[name] }}
                      >
                        {name[0]}
                      </div>
                      <span className="text-[11px] font-body text-white/50 text-center leading-tight">{name}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-4 rounded-xl px-4 py-2.5 text-center"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span className="font-heading font-black text-[20px] text-vgu-yellow">7,000+</span>
                  <span className="ml-2 text-[13px] font-body text-white/50">courses available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features 5–7 */}
          {FEATURES.slice(4).map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-10 rounded-2xl overflow-hidden">
          <div
            className="flex items-center justify-between gap-6 px-8 py-6 md:flex-col md:text-center"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <div>
              <p className="font-heading font-extrabold text-[22px] text-white leading-tight">
                Ready to start your journey?
              </p>
              <p className="mt-1 text-[14px] font-body text-white/55">
                No entrance exam · Enrol online in 30 minutes · EMIs from ₹2,999/month
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap md:justify-center">
              <a
                href="#counsellor"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold transition-all duration-150 hover:opacity-90 hover:shadow-lg"
                style={{ background: '#FFA412', color: '#111827' }}
              >
                Apply Now
                <IconArrowRight size={16} />
              </a>
              <a
                href="#counsellor"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-white/10"
                style={{ border: '2px solid rgba(255,255,255,0.3)' }}
              >
                Talk to a Counsellor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature: f }: { feature: Feature }) {
  return (
    <div
      className="group/card relative rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
    >
      {/* Top gradient border on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-200"
        style={{ background: 'linear-gradient(90deg, #C04036, #FFA412)' }}
      />
      <div
        className="mb-4 w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.10)' }}
      >
        <f.Icon size={22} className="text-white/75" stroke={1.5} />
      </div>
      <h3 className="font-heading font-bold text-[17px] leading-[1.3] text-white mb-2">
        {f.title}
      </h3>
      <p className="text-[14px] font-body leading-[1.7] text-white/55">
        {f.body}
      </p>
    </div>
  )
}
