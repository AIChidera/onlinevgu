import { IconAward } from '@tabler/icons-react'

/**
 * Slim strip mounted above the Hero. Leads with VGU's Google Agentic AI
 * recognition (the strongest, most differentiated credibility hook), with
 * admissions status as a secondary clause. No countdown - a specific "closes
 * in N days" claim needs a real, currently-true target date to stay honest,
 * and hardcoding one here just becomes stale again the next time intake
 * dates roll over. If a future intake gets its own countdown, drive it from
 * a real config date rather than a literal string.
 */
export default function IntakeCountdown({ nextBatch = 'July 2026' }: { nextBatch?: string }) {
  return (
    <div className="bg-vgu-yellow border-b border-neutral-900/10">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 max-w-[1280px] px-5 md:px-8 lg:px-12 py-2.5">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-vgu-red">
            <IconAward size={14} stroke={2.25} className="text-white" />
          </span>
          <span className="inline-flex items-center rounded-full bg-vgu-red px-3 py-1 text-[11px] md:text-[12px] font-heading font-bold uppercase tracking-[0.03em] text-white animate-pulse">
            Rajasthan&apos;s First Google Agentic AI University
          </span>
        </div>
        <div className="hidden sm:inline-flex flex-none items-center gap-2">
          <span className="relative flex h-2 w-2 flex-none">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-[13px] md:text-[14px] font-heading font-semibold text-neutral-900">
            {nextBatch} admissions open
          </span>
        </div>
      </div>
    </div>
  )
}
