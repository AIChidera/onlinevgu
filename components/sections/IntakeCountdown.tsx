'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'

// Next intake: July 2025
const INTAKE_DATE = new Date('2025-07-01T00:00:00')

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function getTimeLeft() {
  const diff = INTAKE_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  }
}

export default function IntakeCountdown() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Days',    value: pad(time.days)    },
    { label: 'Hours',   value: pad(time.hours)   },
    { label: 'Minutes', value: pad(time.minutes) },
    { label: 'Seconds', value: pad(time.seconds) },
  ]

  return (
    <section className="relative overflow-hidden bg-vgu-red py-16 md:py-12">
      {/* Subtle background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-content px-12 md:px-5">
        <div className="grid grid-cols-2 gap-12 items-center lg:grid-cols-1 lg:gap-8">
          {/* Left copy */}
          <div>
            <p className="text-sm font-heading font-semibold uppercase tracking-widest text-white/70 mb-3">
              Next intake closes soon
            </p>
            <h2 className="font-heading text-[40px] font-extrabold leading-tight tracking-tight text-white md:text-[30px]">
              July 2025 admissions<br />
              are now open.
            </h2>
            <p className="mt-4 text-[17px] text-white/75 leading-relaxed max-w-[400px]">
              Seats fill fast. Secure your spot before the deadline — no entrance exam required.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="yellow" size="lg" as="a" href="/apply">
                Apply now →
              </Button>
              <Button
                variant="ghost"
                size="lg"
                as="a"
                href="/apply#brochure"
                className="text-white border-white/30 hover:bg-white/10"
              >
                Download brochure
              </Button>
            </div>
          </div>

          {/* Right countdown */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="mb-4 text-[14px] font-heading font-semibold uppercase tracking-widest text-white/60">
              Intake closes in
            </div>
            <div className="flex gap-4 sm:gap-3">
              {units.map((u) => (
                <div key={u.label} className="flex flex-col items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm sm:h-16 sm:w-16">
                    <span className="font-heading text-[36px] font-black text-white tabular-nums sm:text-[28px]">
                      {u.value}
                    </span>
                  </div>
                  <span className="mt-2 text-[11px] font-heading font-semibold uppercase tracking-wider text-white/60">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-white/10 border border-white/20 px-6 py-4 text-[14px] text-white/80 leading-relaxed">
              <div className="font-heading font-bold text-white mb-1">July 2025 intake</div>
              Classes begin · 1 July 2025<br />
              Application deadline · 25 June 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
