import Link from 'next/link'

/**
 * Slim strip mounted above the Hero. Leads with VGU's Google Agentic AI
 * recognition (the strongest, most differentiated credibility hook), with
 * admissions status as a secondary clause. No countdown - a specific "closes
 * in N days" claim needs a real, currently-true target date to stay honest,
 * and hardcoding one here just becomes stale again the next time intake
 * dates roll over. If a future intake gets its own countdown, drive it from
 * a real config date rather than a literal string.
 *
 * Design: dark vgu-red-dark ground (the site's established "serious moment"
 * color - footer, hover states) instead of flat vgu-yellow, no badge/pill
 * wrapper, no pulse/ping loop. The claim reads as a stated fact rather than
 * a shouted ad. Attention is earned by making the claim a real link to the
 * blog post that backs it up, so a closer look pays off with substance -
 * not by animating it. (A one-time entrance animation was tried and dropped:
 * it depended on the external stylesheet loading before first paint, which
 * isn't guaranteed, so it could show up as a glitchy snap-then-correct
 * instead of a clean reveal. Not worth the fragility for a decorative touch.)
 */
export default function IntakeCountdown({ nextBatch = 'July 2026' }: { nextBatch?: string }) {
  return (
    <div className="bg-vgu-red-dark border-b border-vgu-gold/[0.18]">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 max-w-[1280px] px-5 md:px-8 lg:px-12 py-2.5">
        <Link href="/blog/rajasthan-first-google-agentic-ai-university" className="group flex items-center gap-2.5">
          <span className="flex-none w-1.5 h-1.5 rounded-full bg-vgu-gold" aria-hidden="true" />
          <span className="text-[13px] md:text-[13.5px] font-body font-semibold text-white underline-offset-4 decoration-vgu-gold/60 group-hover:underline group-hover:text-vgu-gold/95 transition-colors duration-200">
            Rajasthan&apos;s first Google Agentic AI University
          </span>
        </Link>
        <div className="hidden sm:flex flex-none items-center gap-2">
          <span className="flex-none w-1.5 h-1.5 rounded-full bg-vgu-gold" aria-hidden="true" />
          <span className="text-[13px] font-body font-medium text-white/65">
            {nextBatch} admissions open
          </span>
        </div>
      </div>
    </div>
  )
}
