'use client'

import { useEffect, useState } from 'react'

interface Props {
  feePerYear:   string
  emi?:         string
  programName:  string
  programLevel: 'ug' | 'pg'
}

export default function MobileStickyCTA({ feePerYear, emi, programName, programLevel }: Props) {
  const [overFooter, setOverFooter] = useState(false)

  // Hide the bar while the global <footer> (mounted in layout.tsx) is in view,
  // so it doesn't float on top of footer content - reappears once scrolled back up.
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => setOverFooter(entry.isIntersecting))
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={[
        'lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200',
        'shadow-[0_-6px_20px_rgba(17,24,39,0.08)] px-4 pt-3 transition-transform duration-300 ease-out',
        overFooter ? 'translate-y-full' : 'translate-y-0',
      ].join(' ')}
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
    >
      <p className="text-[11px] font-body text-neutral-500 text-center mb-2">
        {feePerYear}{emi ? ` · EMI from ${emi}` : ''}
      </p>
      <div className="flex items-center gap-3">
        <a
          href="#counsellor"
          data-apply-trigger
          data-program={programName}
          data-program-level={programLevel}
          className="flex-1 rounded-md bg-vgu-red hover:brightness-90 text-white py-3.5 text-[15px] font-semibold font-heading text-center transition-all duration-150 shadow-[0_4px_14px_rgba(192,64,54,0.32)]"
        >
          Apply Now
        </a>
        <a
          href="#counsellor"
          data-program={programName}
          className="flex-1 rounded-md bg-white border-2 border-vgu-red text-vgu-red hover:bg-vgu-red/[0.06] py-3.5 text-[15px] font-semibold font-heading text-center transition-all duration-150"
        >
          Talk to Counsellor
        </a>
      </div>
    </div>
  )
}
