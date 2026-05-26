'use client'

import StrokeArt from '@/components/ui/StrokeArt'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const MAIN_STATS = [
  { value: '50,000+', label: 'Learners Enrolled',    sub: 'Across India & beyond'       },
  { value: '40+',     label: 'Industry Partners',    sub: 'Hiring our graduates'         },
  { value: '93%',     label: 'Placement Rate',       sub: 'Within 6 months of graduation'},
  { value: '4.8/5',   label: 'Student Rating',       sub: 'From 12,400+ reviews'         },
]

const PLACEMENT_STATS = [
  { value: '25,000+', label: 'Learners Placed'        },
  { value: '20,000+', label: 'Hiring Companies'       },
  { value: '500+',    label: 'Mock Interviews Hosted' },
  { value: '1,000+',  label: 'Counselling Sessions'   },
]

export default function ImpactSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="impact" className="group relative overflow-hidden bg-vgu-dark py-24 px-12 lg:px-8 md:px-5 md:py-16">
      <StrokeArt variant="dark" />

      {/* Background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,164,18,0.08)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(192,64,54,0.3)_0%,transparent_70%)] blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-gold mb-3">
            Our Impact
          </p>
          <h2 className="font-heading font-extrabold text-[40px] tracking-tight leading-[1.2] text-white md:text-[28px]">
            Numbers That Speak for Themselves
          </h2>
        </div>

        {/* 4 main stat tiles */}
        <div
          ref={ref}
          className="grid grid-cols-4 gap-5 lg:grid-cols-2 sm:grid-cols-1"
        >
          {MAIN_STATS.map((s, i) => (
            <div
              key={s.label}
              className={[
                'group/tile relative rounded-2xl border p-8 text-center transition-all duration-300',
                'hover:-translate-y-1',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              ].join(' ')}
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(255,255,255,0.12)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Top gradient border on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200"
                style={{ background: 'linear-gradient(90deg,#C04036,#FFA412)' }}
              />

              <div className="font-heading font-black text-[48px] leading-none text-vgu-yellow md:text-[40px]">
                {s.value}
              </div>
              <div className="mt-3 font-heading font-bold text-[17px] text-white leading-tight">
                {s.label}
              </div>
              <div className="mt-1.5 text-[13px] font-body text-white/50">
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Placement strip */}
        <div
          className="mt-8 rounded-2xl overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Strip header */}
          <div
            className="px-8 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.15)' }}
          >
            <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-gold/80 text-center">
              Placement & Career Support — At a Glance
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 sm:grid-cols-2">
            {PLACEMENT_STATS.map((s, i) => (
              <div
                key={s.label}
                className={[
                  'flex flex-col items-center justify-center py-7 px-4 text-center',
                  i < PLACEMENT_STATS.length - 1
                    ? 'border-r sm:border-r-0 sm:even:border-r-0 sm:border-b'
                    : '',
                ].join(' ')}
                style={{ borderColor: 'rgba(255,255,255,0.10)' }}
              >
                <div className="font-heading font-black text-[32px] leading-none text-vgu-yellow md:text-[26px]">
                  {s.value}
                </div>
                <div className="mt-2 text-[13px] font-body text-white/60 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
