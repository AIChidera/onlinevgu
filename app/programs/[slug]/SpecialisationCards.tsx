'use client'

import { useState } from 'react'
import { IconCheck, IconBook, IconBriefcase } from '@tabler/icons-react'
import { SPEC_DETAILS } from './specialisationDetails'

export default function SpecialisationCards({ specialisations }: { specialisations: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(1)

  return (
    <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      {specialisations.map((name, i) => {
        const detail = SPEC_DETAILS[name]
        const isOpen = activeIndex === i

        return (
          <div
            key={name}
            className={`relative transition-colors duration-300 ${i > 0 ? 'border-t border-neutral-100' : ''} ${
              isOpen ? 'bg-vgu-red/[0.025]' : 'bg-white hover:bg-neutral-50/60'
            }`}
          >
            {/* Left accent bar */}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm transition-all duration-300 ${
                isOpen ? 'bg-vgu-red' : 'bg-transparent'
              }`}
            />

            {/* Header trigger */}
            <button
              onClick={() => setActiveIndex(i)}
              className="group w-full flex items-center gap-4 pl-6 pr-5 md:pl-8 md:pr-6 py-[18px] md:py-5 text-left"
              aria-expanded={isOpen}
            >
              {/* Number */}
              <span
                className={`flex-none w-6 text-center font-heading font-bold text-[12px] tracking-[0.06em] tabular-nums transition-colors duration-300 ${
                  isOpen ? 'text-vgu-red' : 'text-neutral-300 group-hover:text-neutral-400'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Title */}
              <h3
                className={`flex-1 font-heading font-semibold text-[15px] md:text-[17px] leading-snug transition-colors duration-300 ${
                  isOpen ? 'text-neutral-900' : 'text-neutral-600 group-hover:text-neutral-800'
                }`}
              >
                {name}
              </h3>

              {/* Plus / × toggle */}
              <span
                className={`flex-none w-[28px] h-[28px] rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? 'bg-vgu-red text-white rotate-45'
                    : 'bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200 group-hover:text-neutral-600'
                }`}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            {/* Expanding panel */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="pl-16 md:pl-[72px] pr-5 md:pr-7 pb-7 md:pb-9">
                  <div className="h-px bg-neutral-100 mb-5" />

                  {/* Summary */}
                  {detail?.summary && (
                    <p className="font-body text-[15px] md:text-[16px] leading-[1.75] text-neutral-500 mb-6 pl-3 border-l-2 border-vgu-red/25 max-w-[560px]">
                      {detail.summary}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 md:gap-10 items-start">

                    {/* Skills - chip pills */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <IconBook size={12} stroke={2} className="text-vgu-red flex-none" />
                        <p className="text-[11px] font-heading font-bold uppercase tracking-[0.08em] text-vgu-red">
                          What you&apos;ll learn
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(detail?.skills ?? ['Industry curriculum', 'Practical case studies', 'Expert mentorship']).map(skill => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 rounded bg-vgu-red/[0.06] border border-vgu-red/[0.14] px-2.5 py-1.5 text-[12px] font-body font-medium text-vgu-red leading-none"
                          >
                            <IconCheck size={10} stroke={2.5} className="flex-none" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Career paths - structured rows */}
                    {detail?.roles && detail.roles.length > 0 && (
                      <div className="sm:min-w-[180px]">
                        <div className="flex items-center gap-1.5 mb-3">
                          <IconBriefcase size={12} stroke={2} className="text-neutral-400 flex-none" />
                          <p className="text-[11px] font-heading font-bold uppercase tracking-[0.08em] text-neutral-400">
                            Career paths
                          </p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {detail.roles.map(role => (
                            <div key={role} className="flex items-center gap-2">
                              <span className="text-[11px] font-heading font-bold text-vgu-red flex-none leading-none">↗</span>
                              <span className="text-[13px] font-body font-semibold text-neutral-700 leading-snug">{role}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
