'use client'

import { useEffect, useState } from 'react'
import { IconClock, IconArrowRight } from '@tabler/icons-react'

// Bible §07: real urgency only. Update this when the next intake changes.
const INTAKE_DATE = new Date('2026-07-01T00:00:00')

function getDaysLeft() {
  const diff = INTAKE_DATE.getTime() - Date.now()
  return Math.max(0, Math.floor(diff / 86400000))
}

/**
 * Slim amber strip mounted above the Hero. Bible §07: subtle amber, not aggressive red.
 * Bible §10: real intake countdowns build genuine scarcity without pressure-selling.
 */
export default function IntakeCountdown({ nextBatch = 'July 2026' }: { nextBatch?: string }) {
  const [days, setDays] = useState<number | null>(null)

  useEffect(() => {
    setDays(getDaysLeft())
    const id = setInterval(() => setDays(getDaysLeft()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-vgu-yellow border-b border-neutral-900/10">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-5 md:px-8 lg:px-12 py-2.5">
        <div className="flex items-center gap-2.5 text-[13px] md:text-[14px] font-heading font-semibold text-neutral-900 leading-tight">
          <IconClock size={16} stroke={2.25} className="flex-none" />
          {days !== null && days > 0 ? (
            <span>
              {nextBatch} intake closes in{' '}
              <strong className="font-bold">{days} days</strong>
              <span className="hidden sm:inline"> · Application deadline 25 June 2026</span>
            </span>
          ) : (
            <span>
              {nextBatch} intake, applications open
              <span className="hidden sm:inline"> · Deadline 25 June 2026</span>
            </span>
          )}
        </div>
        <a
          href="#counsellor"
          data-apply-trigger
          className="hidden sm:inline-flex flex-none items-center gap-1 text-[13px] font-heading font-bold text-neutral-900 underline underline-offset-4 decoration-2 decoration-neutral-900/40 hover:decoration-neutral-900"
        >
          Apply now <IconArrowRight size={14} stroke={2.5} />
        </a>
      </div>
    </div>
  )
}
