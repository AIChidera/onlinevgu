'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const STATS = [
  { value: '50,000+', label: 'Learners enrolled' },
  { value: '40+',     label: 'Countries represented' },
  { value: '95%',     label: 'Placement rate' },
  { value: '11',      label: 'Online programs' },
]

export default function StatsStrip() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <div className="bg-white border-y border-neutral-100 py-16 md:py-12">
      <div className="mx-auto max-w-content px-12 md:px-5">
        <h2 className="text-center font-heading text-[32px] font-extrabold text-neutral-900 mb-12 md:text-[26px]">
          Numbers that speak for themselves
        </h2>
        <div
          ref={ref}
          className="grid grid-cols-4 gap-8 lg:grid-cols-2 md:grid-cols-2"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={[
                'flex flex-col items-center text-center transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
              ].join(' ')}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-heading text-[52px] font-black leading-none text-vgu-red md:text-[40px]">
                {s.value}
              </div>
              <div className="mt-2 text-[15px] font-medium text-neutral-500 leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
