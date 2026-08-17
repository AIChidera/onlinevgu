import Image from 'next/image'
import Link from 'next/link'
import { IconBriefcase, IconArrowRight } from '@tabler/icons-react'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import type { SanityTestimonial } from '@/lib/sanity'

interface Story {
  name:    string
  program: string
  journey: string
  company: string
  quote:   string
  avatar:  string
}

const DEFAULT_STORY_AVATAR =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80&auto=format&fit=crop'

// Same three placeholder profiles as the Placements page's own Success
// Stories section, so the homepage teaser and the full page never show
// mismatched content while Sanity is still being filled in.
const DEFAULT_STORIES: Story[] = [
  {
    name:    'Ananya Sharma',
    program: 'MBA · 2023 batch',
    journey: 'Sales Executive → Product Manager',
    company: 'Razorpay',
    quote:   'The mock interviews felt harder than the real ones. By the time I sat in the Razorpay PM round, the pressure felt familiar.',
    avatar:  DEFAULT_STORY_AVATAR,
  },
  {
    name:    'Vikram Iyer',
    program: 'MCA · 2023 batch',
    journey: 'Self-taught coder → Cloud Engineer',
    company: 'Accenture',
    quote:   'The free Coursera bundle let me earn AWS certifications that Accenture explicitly asked for in the interview.',
    avatar:  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop',
  },
  {
    name:    'Meera Krishnan',
    program: 'B.Com · 2024 batch',
    journey: 'Fresh graduate → Tax Associate',
    company: 'EY',
    quote:   'I was the first in my family to apply to a Big Four firm. The placement cell prepped me for every round.',
    avatar:  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&q=80&auto=format&fit=crop',
  },
]

export default function PlacementsHighlight({ stories: sanityStories = [] }: { stories?: SanityTestimonial[] }) {
  const activeStories: Story[] = sanityStories.length > 0
    ? sanityStories.slice(0, 3).map(t => ({
        name:    t.name,
        program: t.role,
        journey: t.journey || '',
        company: t.company || '',
        quote:   t.quote,
        avatar:  t.avatarUrl || DEFAULT_STORY_AVATAR,
      }))
    : DEFAULT_STORIES

  return (
    <section id="placements-highlight" className="sketch-hover-group group relative overflow-hidden bg-neutral-50 py-16 px-5 md:px-8 lg:px-12 lg:py-24">
      <SketchFlourish shape="swoop" color="red" opacity={0.04} strokeWidth={20} />

      <div className="relative z-10 mx-auto max-w-[1280px]">

        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-8 md:mb-12">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Placement Outcomes
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
            Where Online VGU graduates go next.
          </h2>
        </div>

        {/* Mobile: snap-scroll strip */}
        <div className="md:hidden -mx-5 px-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex gap-4 pb-4 mb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {activeStories.map((t, i) => (
            <div key={t.name} className="snap-start flex-none w-[82vw] max-w-[320px]">
              <div
                data-animate="fade-up"
                style={{ animationDelay: `${i * 90}ms` }}
                className="flex flex-col h-full rounded-2xl border border-vgu-red/15 bg-white overflow-hidden shadow-[0_6px_24px_rgba(192,64,54,0.10)] hover:border-vgu-red/30 hover:shadow-[0_14px_36px_rgba(192,64,54,0.16)] hover:-translate-y-1.5 transition-all duration-200"
              >
                <div
                  className="flex items-center gap-4 px-5 py-5 border-b border-neutral-100"
                  style={{ background: 'linear-gradient(135deg, #ffffff 0%, rgba(244,215,193,0.35) 100%)' }}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-none ring-[3px] ring-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]">
                    <Image src={t.avatar} alt={t.name} width={64} height={64} className="w-full h-full object-cover" sizes="64px" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-heading font-bold text-[16px] text-neutral-900 leading-tight">{t.name}</div>
                    <span className="mt-2 inline-flex items-center rounded-full border border-vgu-red/20 bg-vgu-red/[0.05] px-2.5 py-0.5 text-[10px] font-heading font-semibold text-vgu-red">
                      {t.program}
                    </span>
                  </div>
                </div>
                {t.journey && (
                  <div className="px-5 pt-5 pb-3">
                    <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.06em] text-neutral-400 mb-1.5">Career path</p>
                    <p className="text-[14px] font-heading font-semibold text-neutral-800 leading-snug mb-3">{t.journey}</p>
                    {t.company && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-vgu-yellow/15 border border-vgu-yellow/35 px-2.5 py-1 text-[11px] font-heading font-bold text-[#7a4d00]">
                        <IconBriefcase size={11} stroke={2} />
                        {t.company}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex-1 px-5 pt-3 pb-6">
                  <div className="font-heading font-bold text-[42px] text-vgu-red leading-[0.75] mb-2 select-none" aria-hidden="true">&ldquo;</div>
                  <p className="text-[16px] font-body text-neutral-600 leading-[1.7] italic">{t.quote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 mb-10">
          {activeStories.map((t, i) => (
            <div
              key={t.name}
              data-animate="fade-up"
              style={{ animationDelay: `${i * 90}ms` }}
              className="flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(192,64,54,0.12)] transition-all duration-200"
            >
              <div
                className="flex items-center gap-4 px-5 py-5 border-b border-neutral-100"
                style={{ background: 'linear-gradient(135deg, #ffffff 0%, rgba(244,215,193,0.35) 100%)' }}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden flex-none ring-[3px] ring-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]">
                  <Image src={t.avatar} alt={t.name} width={80} height={80} className="w-full h-full object-cover" sizes="80px" />
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-bold text-[17px] text-neutral-900 leading-tight">{t.name}</div>
                  <span className="mt-2 inline-flex items-center rounded-full border border-vgu-red/20 bg-vgu-red/[0.05] px-2.5 py-0.5 text-[11px] font-heading font-semibold text-vgu-red">
                    {t.program}
                  </span>
                </div>
              </div>
              {t.journey && (
                <div className="px-5 pt-5 pb-3">
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.06em] text-neutral-400 mb-1.5">Career path</p>
                  <p className="text-[15px] font-heading font-semibold text-neutral-800 leading-snug mb-3">{t.journey}</p>
                  {t.company && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-vgu-yellow/15 border border-vgu-yellow/35 px-2.5 py-1 text-[11px] font-heading font-bold text-[#7a4d00]">
                      <IconBriefcase size={11} stroke={2} />
                      {t.company}
                    </span>
                  )}
                </div>
              )}
              <div className="flex-1 px-5 pt-3 pb-6">
                <div className="font-heading font-bold text-[42px] text-vgu-red leading-[0.75] mb-2 select-none" aria-hidden="true">&ldquo;</div>
                <p className="text-[16px] font-body text-neutral-600 leading-[1.7] italic">{t.quote}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA - drives to the full Placements page rather than repeating its content */}
        <div data-animate="fade-up" className="text-center">
          <Link
            href="/placements"
            className="inline-flex items-center gap-2 bg-white border-2 border-vgu-red text-vgu-red hover:bg-vgu-red hover:text-white rounded-md px-[30px] py-3 text-[15px] font-heading font-semibold transition-all duration-200"
          >
            See all placement outcomes
            <IconArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  )
}
