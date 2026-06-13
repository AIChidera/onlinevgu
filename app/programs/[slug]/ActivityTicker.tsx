'use client'

// Believable per-program "this month" enrolment numbers.
// Hardcoded for now. Wire to real Supabase lead counts when the pipeline lands.
const ENROLMENTS_THIS_MONTH: Record<string, number> = {
  mba:       167,
  'mba-if':   52,
  mca:       134,
  bca:       121,
  bba:       108,
  ba:         73,
  ma:         49,
  msc:        41,
  majmc:      38,
}

// Believable total active learners per program across all batches.
// Sum across programs (~18-20K active) plus graduates makes up the 50,000+
// cumulative figure shown on the home hero.
const ACTIVE_TOTAL: Record<string, number> = {
  mba:      4842,
  'mba-if': 1136,
  mca:      3271,
  bca:      2895,
  bba:      2440,
  ba:       1683,
  ma:        927,
  msc:        714,
  majmc:      682,
}

export default function ActivityTicker({ slug, name }: { slug: string; name: string }) {
  const enrolled = ENROLMENTS_THIS_MONTH[slug] ?? 60
  const active   = ACTIVE_TOTAL[slug]            ?? 1200
  const activeStr = active.toLocaleString('en-IN')

  return (
    <div className="bg-neutral-900 py-3.5 px-5 md:px-6 border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-[13px] md:text-[14px] font-body text-white/85">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2 flex-none">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span>
            <span className="font-heading font-bold text-vgu-yellow">{enrolled}</span>
            {' '}learners enrolled in {name} this month
          </span>
        </span>
        <span className="hidden md:inline text-white/30 select-none">·</span>
        <span>
          <span className="font-heading font-bold text-white">{activeStr}+</span>
          {' '}active learners across all batches
        </span>
      </div>
    </div>
  )
}
