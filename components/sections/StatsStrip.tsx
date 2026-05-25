'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const STATS = [
  { value: '50,000+', label: 'Learners enrolled', icon: '👥' },
  { value: '40+',     label: 'Countries represented', icon: '🌏' },
  { value: '4.8 / 5', label: 'Average student rating', icon: '⭐' },
  { value: '95%',     label: 'Placement rate', icon: '💼' },
  { value: '25+',     label: 'Years of excellence', icon: '🏅' },
  { value: '11',      label: 'Online programs', icon: '📚' },
]

export default function StatsStrip() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <div ref={ref} className="bg-vgu-red py-12 md:py-10">
      <div className="mx-auto max-w-content px-12 md:px-5">
        <div className="grid grid-cols-6 gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={[
                'flex flex-col items-center text-center transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
              ].join(' ')}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-2xl mb-2">{s.icon}</span>
              <div className="font-heading text-[28px] font-black leading-none text-white md:text-[24px]">
                {s.value}
              </div>
              <div className="mt-1.5 text-[13px] font-medium text-white/75 leading-tight max-w-[100px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
