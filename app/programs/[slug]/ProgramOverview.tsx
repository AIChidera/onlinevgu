import { IconUsers, IconSchool, IconCalendar, IconBriefcase } from '@tabler/icons-react'
import type { Persona, DeptAtGlance } from './programExtras'

interface Props {
  programName:     string
  programFullName: string
  overview:        string[]
  whoItsFor:       Persona[]
  deptAtGlance:    DeptAtGlance
}

export default function ProgramOverview({ programName, programFullName, overview, whoItsFor, deptAtGlance }: Props) {
  const stats = [
    { Icon: IconUsers,     value: deptAtGlance.alumniPlaced,     label: 'Alumni placed'     },
    { Icon: IconBriefcase, value: deptAtGlance.hiringPartners,   label: 'Hiring partners'   },
    { Icon: IconSchool,    value: deptAtGlance.faculty,          label: 'Faculty'           },
    { Icon: IconCalendar,  value: deptAtGlance.batchesCompleted, label: 'Batches completed' },
  ]

  return (
    <section className="bg-white pt-14 pb-10 lg:pt-16 lg:pb-12 px-5 md:px-8 lg:px-12 border-b border-neutral-100">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

          {/* Left: prose + persona cards */}
          <div>
            <div data-animate="fade-up">
              <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
                Program Overview
              </p>
              <h2 className="font-heading font-bold text-[28px] lg:text-[34px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-6">
                About the {programFullName}
              </h2>
              <div className="space-y-4">
                {overview.map((p, i) => (
                  <p key={i} className="text-[16px] lg:text-[17px] font-body leading-[1.75] text-neutral-600">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {whoItsFor.length > 0 && (
              <div className="mt-10">
                <p className="font-heading font-bold text-[17px] text-neutral-900 mb-4">
                  Who is this for?
                </p>
                <div className="divide-y divide-neutral-200">
                  {whoItsFor.map((p, i) => (
                    <div
                      key={p.persona}
                      data-animate="fade-up"
                      style={{ animationDelay: `${i * 60}ms` }}
                      className="flex gap-4 py-5 first:pt-0 last:pb-0"
                    >
                      <div className="flex-none w-0.5 bg-vgu-red rounded-full self-stretch" />
                      <div className="min-w-0">
                        <p className="font-heading font-bold text-[17px] tracking-[-0.2px] text-neutral-900 mb-1">{p.persona}</p>
                        <p className="text-[15px] font-body leading-[1.7] text-neutral-600">{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: dept at a glance card */}
          <aside data-animate="fade-up" style={{ animationDelay: '120ms' }}>
            <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(17,24,39,0.08)] border border-neutral-200">

              {/* Branded gradient header */}
              <div className="px-6 py-5" style={{ background: 'linear-gradient(135deg,#C04036,#821a12)' }}>
                <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.1em] text-white/60 mb-1">
                  At a glance
                </p>
                <p className="font-heading font-bold text-[17px] text-white">{programName} Online</p>
              </div>

              {/* 2×2 stats grid - gap-px with bg-neutral-100 creates 1px internal dividers */}
              <div className="grid grid-cols-2 gap-px bg-neutral-100">
                {stats.map(s => (
                  <div key={s.label} className="bg-white px-5 py-5">
                    <s.Icon size={16} stroke={1.75} className="text-vgu-red mb-1" />
                    <p className="font-heading font-black text-[28px] leading-none text-vgu-yellow tabular-nums mb-1.5">
                      {s.value}
                    </p>
                    <p className="text-[12px] font-body text-neutral-500 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div className="px-5 py-3.5 bg-neutral-50 border-t border-neutral-100">
                <p className="text-[11px] font-body text-neutral-400">
                  VGU {programName} programme - 2025-26 academic cycle.
                </p>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </section>
  )
}
