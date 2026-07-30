import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IconCalendarEvent,
  IconMail,
  IconSpeakerphone,
  IconAlertTriangle,
  IconFileText,
  IconArrowUpRight,
} from '@tabler/icons-react'
import SectionWrapper from '@/components/layout/SectionWrapper'
import { getNotices, type SanityNotice, type NoticeCategory } from '@/lib/sanity'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Updates - Academic Calendar, Newsletter & Notices - Online VGU',
  description:
    'Academic calendar, university newsletters, announcements, and important notices for Online VGU students and applicants.',
  alternates: { canonical: 'https://onlinevgu.com/updates' },
  openGraph: {
    title: 'Updates - Online VGU',
    description: 'Academic calendar, newsletters, announcements, and important notices, all in one place.',
    url: 'https://onlinevgu.com/updates',
  },
}

const SECTIONS: {
  id: string
  category: NoticeCategory
  eyebrow: string
  heading: string
  body: string
  Icon: typeof IconCalendarEvent
  bg: 'white' | 'light'
  // Only Academic Calendar and Newsletter have a real static document today -
  // used as the fallback when no Sanity entries exist yet for that category,
  // rather than showing an empty state for content we actually have.
  staticFallback?: { title: string; note: string; href: string }
}[] = [
  {
    id: 'academic-calendar',
    category: 'Academic Calendar',
    eyebrow: 'Dates that matter',
    heading: 'Academic Calendar',
    body: 'Semester start and end dates, exam windows, and holidays for the current academic year.',
    Icon: IconCalendarEvent,
    bg: 'white',
    staticFallback: {
      title: 'Academic Calendar',
      note: 'Semester dates, exam windows, and holidays',
      href: '/documents/academic-calendar.pdf',
    },
  },
  {
    id: 'newsletter',
    category: 'Newsletter',
    eyebrow: 'From the university',
    heading: 'Newsletter',
    body: 'Programme updates, campus milestones, and student stories from Vivekananda Global University.',
    Icon: IconMail,
    bg: 'light',
    staticFallback: {
      title: 'Newsletter',
      note: 'Latest issue',
      href: '/documents/newsletter.pdf',
    },
  },
  {
    id: 'announcements',
    category: 'Announcement',
    eyebrow: 'What is new',
    heading: 'Announcements',
    body: 'New programmes, scholarships, batch openings, and other news as it happens.',
    Icon: IconSpeakerphone,
    bg: 'white',
  },
  {
    id: 'notices',
    category: 'Important Notice',
    eyebrow: 'Please read',
    heading: 'Important Notices',
    body: 'Deadlines, exam-related notices, and other information that needs your attention.',
    Icon: IconAlertTriangle,
    bg: 'light',
  },
]

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function NoticeRow({ notice }: { notice: SanityNotice }) {
  const href = notice.attachmentUrl || notice.externalUrl
  const Wrapper = href ? 'a' : 'div'
  const wrapperProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={[
        'group flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-5',
        href ? 'hover:border-vgu-red/30 hover:shadow-[0_8px_24px_rgba(192,64,54,0.08)] transition-all duration-200' : '',
      ].join(' ')}
    >
      <div className="flex-none w-10 h-10 rounded-lg bg-vgu-red/[0.08] border border-vgu-red/[0.14] flex items-center justify-center mt-0.5">
        <IconFileText size={17} stroke={1.75} className="text-vgu-red" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="font-heading font-semibold text-[15px] text-neutral-900 leading-[1.4]">{notice.title}</p>
          {href && <IconArrowUpRight size={16} className="flex-none text-neutral-300 group-hover:text-vgu-red transition-colors duration-200 mt-0.5" />}
        </div>
        <p className="mt-1 text-[13px] font-body text-neutral-500">{formatDate(notice.date)}</p>
        {notice.summary && (
          <p className="mt-2 text-[14px] font-body text-neutral-600 leading-[1.6]">{notice.summary}</p>
        )}
      </div>
    </Wrapper>
  )
}

export default async function UpdatesPage() {
  const notices = await getNotices()

  return (
    <main>
      {/* Header */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #110805 0%, #821a12 38%, #2d0f0b 68%, #110805 100%)' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-vgu-red/25 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-vgu-yellow/10 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[900px] px-5 md:px-8 lg:px-12 py-16 md:py-20 text-center">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-5">
            Online VGU · Updates
          </p>
          <h1 className="font-heading font-bold text-[32px] md:text-[46px] tracking-[-1px] leading-[1.15] text-white mb-5">
            Everything the university has to say, in one place.
          </h1>
          <p className="text-[16px] md:text-[18px] font-body leading-[1.7] text-white/70 mb-10 max-w-[560px] mx-auto">
            Academic calendar, newsletters, announcements, and important notices -
            updated as the university publishes them.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/15 hover:border-vgu-yellow/50 hover:bg-white/[0.12] px-4 py-2.5 text-[13.5px] font-heading font-semibold text-white transition-all duration-200"
              >
                <s.Icon size={15} stroke={1.75} className="text-vgu-yellow" />
                {s.heading}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Four dedicated sections */}
      {SECTIONS.map(section => {
        const items = notices.filter(n => n.category === section.category)

        return (
          <SectionWrapper key={section.id} id={section.id} bg={section.bg}>
            <div className="max-w-[760px] mx-auto">
              <div className="text-center mb-10">
                <p className="text-[12px] font-heading font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
                  {section.eyebrow}
                </p>
                <h2 className="font-heading font-bold text-[28px] md:text-[32px] tracking-[-0.5px] text-neutral-900">
                  {section.heading}
                </h2>
                <p className="mt-3 text-[16px] font-body text-neutral-600 max-w-[520px] mx-auto">
                  {section.body}
                </p>
              </div>

              {items.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {items.map(n => <NoticeRow key={n._id} notice={n} />)}
                </div>
              ) : section.staticFallback ? (
                <a
                  href={section.staticFallback.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 hover:border-vgu-red/30 hover:shadow-[0_8px_24px_rgba(192,64,54,0.08)] transition-all duration-200"
                >
                  <div className="flex-none w-10 h-10 rounded-lg bg-vgu-red/[0.08] border border-vgu-red/[0.14] flex items-center justify-center">
                    <IconFileText size={17} stroke={1.75} className="text-vgu-red" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-semibold text-[15px] text-neutral-900">{section.staticFallback.title}</p>
                    <p className="text-[13px] font-body text-neutral-500 mt-0.5">{section.staticFallback.note}</p>
                  </div>
                  <IconArrowUpRight size={16} className="flex-none text-neutral-300 group-hover:text-vgu-red transition-colors duration-200" />
                </a>
              ) : (
                <div className="rounded-2xl border border-dashed border-neutral-200 bg-white/60 p-8 text-center">
                  <p className="text-[14px] font-body text-neutral-500">
                    Nothing posted here yet. Check back soon.
                  </p>
                </div>
              )}
            </div>
          </SectionWrapper>
        )
      })}

      {/* Closing CTA */}
      <SectionWrapper bg="white" className="!pt-0">
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white font-heading font-semibold text-[15px] px-8 py-3.5 transition-all duration-200"
          >
            Have a question? Contact us
          </Link>
        </div>
      </SectionWrapper>
    </main>
  )
}
