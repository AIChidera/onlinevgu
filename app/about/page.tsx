import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getMilestones } from '@/lib/sanity'

// Placeholder — replace with '/images/about-hero-bg.jpg' when ready.
const HERO_IMAGE_SRC = 'https://images.unsplash.com/photo-1562774053-701939374585?w=1400&q=80&auto=format&fit=crop'
import {
  IconAward,
  IconUsers,
  IconGlobe,
  IconBuildingBank,
  IconCheck,
  IconShieldCheck,
} from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { FOUNDING_YEAR } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About VGU - Vivekananda Global University Online',
  description:
    'Learn about Vivekananda Global University - NAAC A+, UGC-entitled, and committed to accessible quality education since 2012.',
  alternates: { canonical: 'https://onlinevgu.in/about' },
  openGraph: {
    title: 'About VGU - Vivekananda Global University Online',
    description: 'NAAC A+ university, founded 2012 in Jaipur. 50,000+ learners across 40+ countries.',
    url: 'https://onlinevgu.in/about',
  },
}

const STATS = [
  { value: String(FOUNDING_YEAR), label: 'Year established', Icon: IconBuildingBank },
  { value: 'NAAC A+', label: 'Accreditation grade', Icon: IconAward        },
  { value: '50,000+', label: 'Online learners',     Icon: IconUsers        },
  { value: '40+',     label: 'Countries',            Icon: IconGlobe        },
]

const ACCREDITATIONS = [
  {
    name: 'UGC',
    full: 'University Grants Commission',
    detail: 'Distance Education Bureau entitlement - degrees carry the same legal standing as on-campus qualifications.',
    color: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  {
    name: 'NAAC A+',
    full: 'National Assessment and Accreditation Council',
    detail: 'Highest grade - 3.52 / 4.0 CGPA. Reaccredited in 2021, reflecting sustained academic excellence.',
    color: 'bg-vgu-red/5 text-vgu-red border-vgu-red/15',
  },
  {
    name: 'AICTE',
    full: 'All India Council for Technical Education',
    detail: 'Approved programs in Technology and Management - ensuring curriculum meets national standards.',
    color: 'bg-orange-50 text-orange-700 border-orange-100',
  },
  {
    name: 'NIRF',
    full: 'National Institutional Ranking Framework',
    detail: 'Ranked by the Ministry of Education under the University and Management categories.',
    color: 'bg-purple-50 text-purple-700 border-purple-100',
  },
  {
    name: 'AIU',
    full: 'Association of Indian Universities',
    detail: 'Member institution - VGU degrees are recognised for equivalence by all AIU member universities.',
    color: 'bg-green-50 text-green-700 border-green-100',
  },
  {
    name: 'WES',
    full: 'World Education Services, Canada',
    detail: 'International degree recognition - VGU graduates can use their degree for immigration and work abroad.',
    color: 'bg-teal-50 text-teal-700 border-teal-100',
  },
]

const MILESTONES = [
  { year: '2012', event: 'University established in Jaipur, Rajasthan' },
  { year: '2015', event: 'First UGC-DEB approved online programs launched' },
  { year: '2018', event: 'NAAC accreditation - A grade achieved' },
  { year: '2019', event: 'Online division scaled - programs open to learners nationwide' },
  { year: '2021', event: 'NAAC A+ reaccreditation - highest grade achieved' },
  { year: '2022', event: 'Coursera institutional partnership - 7,000+ courses added free for all students' },
  { year: '2023', event: '50,000+ online learners milestone crossed' },
  { year: '2024', event: 'WES Canada recognition extended to online programs' },
]

const VALUES = [
  {
    title: 'Accessible quality',
    body:  'Every Indian deserves access to a degree from a great university - not just those who can afford to leave home.',
  },
  {
    title: 'Employer credibility',
    body:  'UGC-entitled degrees. No asterisks, no footnotes. The same certificate an on-campus student receives.',
  },
  {
    title: 'Real outcomes',
    body:  '95% placement rate - built on 500+ hiring partners and a placement cell that works year-round.',
  },
  {
    title: 'Faculty with practice',
    body:  'Professors who consult for Fortune 500 companies and publish active research - not just career academics.',
  },
]

export default async function AboutPage() {
  const sanityMilestones = await getMilestones()
  const activeMilestones = sanityMilestones.length > 0
    ? sanityMilestones.map(m => ({ year: String(m.year), event: m.event }))
    : MILESTONES

  return (
    <div>
      <Breadcrumb items={[{ label: 'About VGU' }]} />

      {/* ══ Hero ══ */}
      <section className="relative overflow-hidden">
        {/* Background image behind gradient overlay — set HERO_IMAGE_SRC above to activate */}
        {HERO_IMAGE_SRC && (
          <Image src={HERO_IMAGE_SRC} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(192,64,54,0.93) 0%, rgba(130,26,18,0.96) 100%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="opacity-40 absolute inset-0">
          <StrokeArt variant="dark" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 py-16 lg:py-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[13px] font-body text-white/55">
            <Link href="/" className="hover:text-white transition-colors duration-150">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80">About</span>
          </nav>

          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-4">
            About Vivekananda Global University
          </p>
          <h1 className="font-heading font-black text-[36px] md:text-[48px] lg:text-[64px] tracking-[-2px] leading-[0.95] text-white">
            {new Date().getFullYear() - FOUNDING_YEAR} years of<br />
            <span className="text-vgu-yellow">academic excellence.</span>
          </h1>
          <p className="mt-6 text-[15px] font-body leading-[1.7] text-white/75 max-w-[580px] lg:text-[17px]">
            Founded in {FOUNDING_YEAR} in Jaipur, VGU has grown into one of India&apos;s most respected
            NAAC A+ universities - now bringing that same quality education online to
            learners across 40+ countries.
          </p>

          {/* Quick facts */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              'NAAC A+ Accredited',
              'UGC Distance Education Bureau',
              'No entrance exam',
              'Degrees valid globally',
            ].map(fact => (
              <span
                key={fact}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-4 py-2 text-[13px] font-body font-semibold text-white"
              >
                <IconCheck size={13} stroke={2.5} />
                {fact}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Stats strip ══ */}
      <section className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {STATS.map(({ value, label, Icon }, i) => (
              <div
                key={label}
                data-animate="fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
                className="flex items-center gap-4 md:flex-col md:items-center md:text-center md:gap-2"
              >
                <div className="flex-none w-10 h-10 rounded-xl bg-vgu-red/10 flex items-center justify-center md:w-12 md:h-12">
                  <Icon size={20} className="text-vgu-red" stroke={1.5} />
                </div>
                <div>
                  <div className="font-heading font-black text-[26px] leading-none text-neutral-900 md:text-[32px]">
                    {value}
                  </div>
                  <div className="mt-1 text-[13px] font-body text-neutral-500">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Mission & Values ══ */}
      <section className="bg-neutral-50 py-16 px-5 md:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center">

            {/* Left */}
            <div data-animate="slide-from-left">
              <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
                Our mission
              </p>
              <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-6 md:text-[40px]">
                Making great education accessible to every serious learner.
              </h2>
              <p className="text-[15px] font-body leading-[1.7] text-neutral-600 mb-5 lg:text-[17px]">
                Geography, cost, or life stage should not determine the quality of education
                someone receives. VGU Online exists to make a NAAC A+ degree available to
                working professionals, rural students, and career-changers - wherever they are.
              </p>
              <p className="text-[15px] font-body leading-[1.7] text-neutral-600 lg:text-[17px]">
                We do not compromise on accreditation, faculty, or outcomes. The degree you
                earn online is the same degree you would earn on campus - same certificate,
                same legal standing, same employer recognition.
              </p>
            </div>

            {/* Right: values */}
            <div className="flex flex-col gap-4">
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  data-animate="fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="flex items-start gap-4 rounded-2xl bg-white border border-neutral-200 p-5 hover:border-vgu-red/20 hover:shadow-[0_4px_20px_rgba(192,64,54,0.08)] transition-all duration-200"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-vgu-red/10 mt-0.5">
                    <IconCheck size={15} stroke={2.5} className="text-vgu-red" />
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-[16px] text-neutral-900 mb-1">{v.title}</h3>
                    <p className="text-[14px] font-body text-neutral-500 leading-[1.65]">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══ Accreditations ══ */}
      <section className="bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1280px]">

          <div data-animate="fade-up" className="text-center mb-14 md:mb-10">
            <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Recognised by
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
              Accreditations &amp; Recognition
            </h2>
            <p className="mt-4 text-[15px] font-body leading-[1.7] text-neutral-500 max-w-[560px] mx-auto lg:text-[17px]">
              Credentials recognised by Indian and international bodies - giving your degree global credibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACCREDITATIONS.map((a, i) => (
              <div
                key={a.name}
                data-animate="materialize"
                style={{ animationDelay: `${i * 70}ms` }}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(192,64,54,0.12)] transition-all duration-200"
              >
                <div className={['inline-flex items-center rounded-full border px-3.5 py-1.5 text-[13px] font-heading font-black mb-4', a.color].join(' ')}>
                  {a.name}
                </div>
                <h3 className="font-heading font-bold text-[16px] text-neutral-900 mb-2 leading-snug">{a.full}</h3>
                <p className="text-[14px] font-body text-neutral-500 leading-[1.65]">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ History timeline ══ */}
      <section className="bg-neutral-50 py-16 px-5 md:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-16 items-start">

            {/* Left */}
            <div data-animate="slide-from-left" className="lg:sticky lg:top-[120px]">
              <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
                Our history
              </p>
              <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-5 md:text-[40px]">
                {new Date().getFullYear() - FOUNDING_YEAR}+ Years of Impact
              </h2>
              <p className="text-[16px] font-body leading-[1.7] text-neutral-500">
                From a single campus in Jaipur to a globally accessible online university -
                a quarter-century of making quality education reachable for every serious learner.
              </p>
              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-vgu-red/[0.05] border border-vgu-red/15 px-5 py-4">
                <IconShieldCheck size={22} className="text-vgu-red flex-none" stroke={1.5} />
                <div>
                  <div className="font-heading font-bold text-[14px] text-neutral-900">NAAC A+</div>
                  <div className="text-[12px] font-body text-neutral-500">Reaccredited 2021 · 3.52 / 4.0 CGPA</div>
                </div>
              </div>
            </div>

            {/* Right: timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] top-2 bottom-2 w-px bg-neutral-200" aria-hidden="true" />

              <div className="flex flex-col gap-0">
                {activeMilestones.map((m, i) => (
                  <div
                    key={m.year}
                    data-animate="fade-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                    className="relative flex items-start gap-6 pb-8 last:pb-0"
                  >
                    {/* Dot */}
                    <div className={[
                      'relative z-10 flex-none w-9 h-9 rounded-full border-2 flex items-center justify-center font-heading font-black text-[10px] transition-all',
                      i === activeMilestones.length - 1
                        ? 'border-vgu-red bg-vgu-red text-white shadow-[0_0_0_4px_rgba(192,64,54,0.15)]'
                        : 'border-neutral-200 bg-white text-neutral-400',
                    ].join(' ')}>
                      {i + 1}
                    </div>
                    <div className="flex-1 pt-1.5">
                      <div className="font-heading font-black text-[14px] text-vgu-red mb-0.5">{m.year}</div>
                      <p className="text-[15px] font-body text-neutral-700 leading-snug">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


    </div>
  )
}
