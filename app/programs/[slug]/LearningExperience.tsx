import { IconCalendarTime, IconDeviceLaptop, IconUsersGroup } from '@tabler/icons-react'

interface Props {
  liveSchedule:  { days: string; hours: string; cadence: string }
  sampleWeek:    { day: string; activity: string; hours: string }[]
  lmsPlatform:   string
  mentorCadence: string
  cohortSize:    string
}

export default function LearningExperience({ liveSchedule, sampleWeek, lmsPlatform, mentorCadence, cohortSize }: Props) {
  const pillars = [
    {
      Icon:   IconCalendarTime,
      title:  'Live Sessions',
      lead:   liveSchedule.days,
      detail: `${liveSchedule.hours} · ${liveSchedule.cadence.toLowerCase()}`,
    },
    {
      Icon:   IconDeviceLaptop,
      title:  'Self-Paced LMS',
      lead:   '8-10 hours weekly',
      detail: lmsPlatform,
    },
    {
      Icon:   IconUsersGroup,
      title:  'Cohort & Mentor',
      lead:   cohortSize,
      detail: mentorCadence,
    },
  ]

  return (
    <section className="bg-neutral-50 py-16 lg:py-20 px-5 md:px-8 lg:px-12 border-t border-neutral-100">
      <div className="mx-auto max-w-[1280px]">

        <div data-animate="fade-up" className="mb-10 max-w-[640px]">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            How you&apos;ll study
          </p>
          <h2 className="font-heading font-bold text-[28px] lg:text-[34px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-4">
            Built around your work week.
          </h2>
          <p className="text-[16px] lg:text-[17px] font-body leading-[1.7] text-neutral-600">
            Live sessions sit on the weekend so the rest of your week stays free for work, family and self-paced study at your own rhythm.
          </p>
        </div>

        {/* 3-pillar grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              data-animate="fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
              className="rounded-2xl border border-neutral-200 bg-white p-6 hover:border-vgu-red/30 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-vgu-red/8 border border-vgu-red/15 flex items-center justify-center mb-4">
                <p.Icon size={18} stroke={1.75} className="text-vgu-red" />
              </div>
              <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-neutral-500 mb-1">
                {p.title}
              </p>
              <p className="font-heading font-bold text-[18px] text-neutral-900 mb-1.5 leading-snug">{p.lead}</p>
              <p className="text-[13px] font-body leading-[1.55] text-neutral-600">{p.detail}</p>
            </div>
          ))}
        </div>

        {/* Sample week */}
        <div data-animate="fade-up">
          <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/60">
              <p className="font-heading font-bold text-[15px] text-neutral-900">A typical week</p>
              <p className="text-[13px] font-body text-neutral-500 mt-0.5">Roughly 12-14 hours total - designed to fit around a full-time job</p>
            </div>
            <div className="divide-y divide-neutral-100">
              {sampleWeek.map(w => (
                <div
                  key={w.day}
                  className="grid grid-cols-[110px_1fr_auto] items-center gap-4 px-6 py-4"
                >
                  <p className="font-heading font-bold text-[13px] text-vgu-red uppercase tracking-[0.05em]">{w.day}</p>
                  <p className="text-[15px] font-body text-neutral-800 leading-snug">{w.activity}</p>
                  <p className="font-heading font-semibold text-[13px] text-neutral-500 tabular-nums whitespace-nowrap">{w.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
