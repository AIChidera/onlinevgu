import type { Metadata } from 'next'
import Image from 'next/image'
import { getMilestones, getSiteConfig } from '@/lib/sanity'
import {
  IconAward,
  IconUsers,
  IconGlobe,
  IconBuildingBank,
  IconSchool,
  IconCertificate,
  IconTrendingUp,
  IconBrain,
  IconArrowRight,
} from '@tabler/icons-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import HirerStrip from '@/app/programs/[slug]/HirerStrip'

export const revalidate = 3600

const HERO_IMAGE_SRC =
  'https://images.unsplash.com/photo-1562774053-701939374585?w=1400&q=80&auto=format&fit=crop'

export const metadata: Metadata = {
  title: 'About VGU - Vivekananda Global University Online',
  description:
    'Learn about Vivekananda Global University - NAAC A+, UGC-entitled, and committed to accessible quality education since 2012.',
  alternates: { canonical: 'https://onlinevgu.com/about' },
  openGraph: {
    title: 'About VGU - Vivekananda Global University Online',
    description: 'NAAC A+ university, founded 2012 in Jaipur. 50,000+ learners across 40+ countries.',
    url: 'https://onlinevgu.com/about',
  },
}

function buildStats(config: { foundingYear: number; stats: { learners: string; countries: string } }) {
  return [
    { value: String(config.foundingYear), label: 'Year established',    detail: 'Jaipur, Rajasthan',         Icon: IconBuildingBank },
    { value: 'NAAC A+',                   label: 'Accreditation grade', detail: '3.29 / 4.0 CGPA Â· Valid 2027', Icon: IconAward     },
    { value: config.stats.learners,       label: 'Online learners',     detail: 'Across India & abroad',     Icon: IconUsers        },
    { value: config.stats.countries,      label: 'Countries',           detail: 'Global alumni network',     Icon: IconGlobe        },
  ]
}

const VALUES = [
  {
    title: 'Accessible quality',
    body:  'Every Indian deserves access to a degree from a great university - not just those who can afford to leave home.',
    Icon:  IconSchool,
  },
  {
    title: 'Employer credibility',
    body:  'UGC-entitled degrees. No asterisks, no footnotes. The same certificate an on-campus student receives.',
    Icon:  IconCertificate,
  },
  {
    title: 'Real outcomes',
    body:  '95% placement rate - built on 500+ hiring partners and a placement cell that works year-round.',
    Icon:  IconTrendingUp,
  },
  {
    title: 'Faculty with practice',
    body:  'Professors who consult for Fortune 500 companies and publish active research - not just career academics.',
    Icon:  IconBrain,
  },
]

// Accreditation color styles - dynamic data values, inline styles permitted
const ACC_STYLES = {
  red:  { bar: '#C04036', bg: 'rgba(192,64,54,0.06)',  text: '#C04036', border: 'rgba(192,64,54,0.20)',  cardBg: 'linear-gradient(135deg, #ffffff 55%, rgba(192,64,54,0.05) 100%)'  },
  yel:  { bar: '#FFA412', bg: 'rgba(255,164,18,0.10)', text: '#7a4d00', border: 'rgba(255,164,18,0.35)', cardBg: 'linear-gradient(135deg, #ffffff 55%, rgba(255,164,18,0.07) 100%)' },
  dark: { bar: '#821a12', bg: 'rgba(130,26,18,0.06)',  text: '#821a12', border: 'rgba(130,26,18,0.20)',  cardBg: 'linear-gradient(135deg, #ffffff 55%, rgba(130,26,18,0.05) 100%)'  },
}

const ACCREDITATIONS = [
  { name: 'UGC',     full: 'University Grants Commission',                  detail: 'Distance Education Bureau entitlement, degrees carry the same legal standing as on-campus qualifications.', s: ACC_STYLES.red,  logo: '/logos/ugc-entitled.png',      status: 'Entitled',   ghost: 'U' },
  { name: 'NAAC A+', full: 'National Assessment and Accreditation Council', detail: 'Highest grade, 3.29 / 4.0 CGPA. First cycle accreditation in 2022, valid through 2027.',                  s: ACC_STYLES.yel,  logo: '/logos/naac-grade-a-plus.png', status: 'A+ Grade',   ghost: 'N' },
  { name: 'AICTE',   full: 'All India Council for Technical Education',     detail: 'Approved programs in Technology and Management, ensuring curriculum meets national standards.',               s: ACC_STYLES.dark, logo: '/logos/aicte-approved.png',    status: 'Approved',   ghost: 'A' },
  { name: 'NIRF',    full: 'National Institutional Ranking Framework',      detail: 'Ranked by the Ministry of Education under the University and Management categories.',                          s: ACC_STYLES.red,  logo: null,                     status: 'Ranked',     ghost: 'N' },
  { name: 'AIU',     full: 'Association of Indian Universities',            detail: 'Member institution, VGU degrees are recognised for equivalence by all AIU member universities.',               s: ACC_STYLES.yel,  logo: null,                     status: 'Member',     ghost: 'A' },
  { name: 'WES',     full: 'World Education Services, Canada',              detail: 'International degree recognition, VGU graduates can use their degree for immigration and work abroad.',         s: ACC_STYLES.dark, logo: null,                     status: 'Recognised', ghost: 'W' },
]

const CAMPUS_IMAGE_SRC =
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=80&auto=format&fit=crop'

const CAMPUS_FEATURES = [
  {
    title: 'In-person campus immersions',
    body:  'Step onto campus multiple times a year for workshops, labs, and hands-on sessions with faculty who bring real industry experience.',
    Icon:  IconSchool,
  },
  {
    title: 'Graduation ceremony on campus',
    body:  'Cross the same stage as every VGU student and receive your degree in Jaipur. A moment earned - properly celebrated.',
    Icon:  IconCertificate,
  },
  {
    title: 'Faculty and peer meetups',
    body:  'Connect face-to-face with classmates and professors. Build relationships that outlast the program.',
    Icon:  IconUsers,
  },
]

const HIRERS = [
  'TCS', 'Infosys', 'Wipro', 'Accenture', 'HCL',
  'IBM', 'Deloitte', 'EY', 'KPMG', 'Cognizant',
  'Amazon', 'Flipkart', 'HDFC Bank', 'ICICI Bank', 'Bajaj Finserv',
  'Reliance Industries', 'Tata Group', 'Mahindra', 'Zomato', 'PhonePe',
  'Tech Mahindra', 'Capgemini', 'LTIMindtree', 'Axis Bank', 'Mphasis',
]

const ALUMNI_TESTIMONIALS = [
  {
    quote:   'The MBA from VGU gave me the same degree as an on-campus student. My employer never asked if it was online.',
    name:    'Rahul Sharma',
    program: 'MBA Â· 2023 batch',
    avatar:  'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=160&q=80&auto=format&fit=crop',
  },
  {
    quote:   'Working full-time in Hyderabad meant I couldn\'t relocate. VGU let me earn my MCA without giving up my job or my family.',
    name:    'Priya Nair',
    program: 'MCA Â· 2023 batch',
    avatar:  'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=160&q=80&auto=format&fit=crop',
  },
  {
    quote:   'The campus immersion week changed everything. I came back with a co-founder and a completely new career direction.',
    name:    'Aditya Mehta',
    program: 'BBA Â· 2024 batch',
    avatar:  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&q=80&auto=format&fit=crop',
  },
]

function buildAlumniFeatures(config: { stats: { learners: string; hiringPartners: string; placement: string; countries: string } }) {
  return [
    {
      stat:  config.stats.learners,
      label: 'Learners and counting',
      body:  `Online learners from across India and ${config.stats.countries} countries. A community that grows every semester.`,
      Icon:  IconGlobe,
    },
    {
      stat:  config.stats.hiringPartners,
      label: 'Hiring partners',
      body:  'AI-powered placement portal, unlimited mock interviews, and a placement cell working year-round.',
      Icon:  IconTrendingUp,
    },
    {
      stat:  config.stats.placement,
      label: 'Placement rate',
      body:  'Class of 2023. Built on real employer relationships and a curriculum aligned with what companies hire for.',
      Icon:  IconAward,
    },
  ]
}

const MILESTONES = [
  { year: '2012', tag: 'Foundation',  event: 'VGU established in Jaipur under Rajasthan Private Universities Act (No. 11/2012)' },
  { year: '2013', tag: 'Foundation',  event: 'First academic session commences - inaugural batch enrolled across flagship programs' },
  { year: '2022', tag: 'Achievement', event: 'NAAC A+ first cycle accreditation - CGPA 3.29/4.0, valid through 2027' },
  { year: '2022', tag: 'Digital',     event: 'Online VGU (CDOE) launches - UGC-entitled online degrees open to learners nationwide' },
  { year: '2022', tag: 'Partnership', event: 'Coursera institutional partnership - 7,000+ courses free for all enrolled students' },
  { year: '2024', tag: 'Partnership', event: "Google Cloud partnership - Rajasthan's first Generative AI Campus launched at VGU" },
  { year: '2025', tag: 'Rankings',    event: 'QS World Rankings: 95th in India, 666th in Asia; NIRF ranked 151-200 (University category)' },
  { year: '2026', tag: 'Rankings',    event: 'IIRF ranked 37th Private University in India' },
]

export default async function AboutPage() {
  const [sanityMilestones, config] = await Promise.all([getMilestones(), getSiteConfig()])
  const activeMilestones =
    sanityMilestones.length > 0
      ? sanityMilestones.map(m => ({ year: String(m.year), tag: (m as { tag?: string }).tag ?? '', event: m.event }))
      : MILESTONES

  const STATS = buildStats(config)
  const ALUMNI_FEATURES = buildAlumniFeatures(config)
  const yearsOld = new Date().getFullYear() - config.foundingYear

  return (
    <div>
      {/* â•â• Hero - swoop yellow (whisper-faint on the photo) â•â• */}
      <section className="sketch-hover-group group relative flex items-center overflow-hidden min-h-[480px] lg:min-h-[560px]">
        <Image
          src={HERO_IMAGE_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/70" />

        {/* Breadcrumb - pinned to the hero's own top edge, independent of the
            content column's py-16+ padding */}
        <div className="absolute top-0 left-0 right-0 z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12">
          <Breadcrumb items={[{ label: 'About VGU' }]} variant="overlay" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">
          <div className="max-w-[680px]">
            <p
              className="anim-load-left text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-yellow mb-6"
              style={{ animationDelay: '0ms' }}
            >
              About Vivekananda Global University
            </p>

            <h1
              className="anim-load-left font-heading font-bold tracking-tight leading-[1.05] text-white text-[36px] md:text-[48px] lg:text-[56px]"
              style={{ animationDelay: '70ms' }}
            >
              {yearsOld} years of<br />
              <span className="text-vgu-yellow">academic excellence.</span>
            </h1>

            <p
              className="anim-load-left mt-8 text-[16px] lg:text-[17px] font-body leading-[1.7] text-white/85 max-w-[580px]"
              style={{ animationDelay: '140ms' }}
            >
              Founded in {config.foundingYear} in Jaipur, VGU has grown into one of India&apos;s most respected
              NAAC A+ universities - now bringing that same quality online to learners across {config.stats.countries} countries.
            </p>

            <div
              className="anim-load-left mt-12 flex flex-col gap-4"
              style={{ animationDelay: '210ms' }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#counsellor"
                  data-apply-trigger
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-md bg-white text-vgu-red font-heading font-bold text-[17px] px-10 py-[18px] transition-all duration-200 shadow-[0_6px_32px_rgba(255,255,255,0.22)] hover:shadow-[0_10px_48px_rgba(255,255,255,0.36)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  Apply Now
                  <IconArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="/programs"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/60 bg-transparent hover:bg-white/10 hover:border-white text-white font-heading font-semibold text-[15px] px-7 py-[15px] transition-all duration-200"
                >
                  Our Programs
                  <IconArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â•â• Stats strip - arc sweeps across the achievement numbers â•â• */}
      <section className="sketch-hover-group group relative overflow-hidden bg-white border-b border-neutral-200">
        <SketchFlourish shape="arc" color="red" opacity={0.04} strokeWidth={20} />

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 py-8 md:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-6">
            {STATS.map(({ value, label, detail, Icon }, i) => (
              <div
                key={label}
                data-animate="fade-up"
                style={{
                  animationDelay: `${i * 80}ms`,
                  background: 'linear-gradient(135deg, #ffffff 55%, rgba(192,64,54,0.04) 100%)',
                }}
                className="group flex flex-row md:flex-col items-center text-left md:text-center gap-3 md:gap-0 rounded-2xl p-3 md:p-6 border border-transparent shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-vgu-red/20 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(192,64,54,0.12)] transition-all duration-200 cursor-default"
              >
                <div
                  className="w-11 h-11 md:w-14 md:h-14 rounded-xl flex flex-none items-center justify-center md:mb-4 transition-all duration-200 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                >
                  <Icon size={20} className="text-white md:hidden" stroke={1.5} />
                  <Icon size={24} className="text-white hidden md:block" stroke={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-bold text-[20px] leading-none text-vgu-yellow md:font-black md:text-[48px]">
                    {value}
                  </div>
                  <div className="mt-1 md:mt-2 text-[13px] md:text-[14px] font-heading font-semibold text-neutral-800 leading-snug">
                    {label}
                  </div>
                  <div className="text-[11px] md:text-[12px] font-body text-neutral-400 leading-snug md:mt-1">
                    {detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â• Mission & Values - loop (Q-shape) suits the philosophical section â•â• */}
      <section className="sketch-hover-group group relative overflow-hidden bg-neutral-50 py-16 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="loop" color="red" opacity={0.04} strokeWidth={20} />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div data-animate="slide-from-left">
              <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
                Our mission
              </p>
              <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-6 md:text-[40px]">
                Making great education accessible to every serious learner.
              </h2>

              {/* Pull-quote - typographic treatment per Design Bible testimonial card spec */}
              <div className="bg-white rounded-2xl px-6 pt-4 pb-5 mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <div
                  className="font-heading font-bold text-[64px] text-vgu-red leading-[0.8] mb-2 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <p className="text-[17px] font-body leading-[1.7] text-neutral-700 italic">
                  Geography, cost, or life stage should not determine the quality of
                  education someone receives.
                </p>
              </div>

              <p className="text-[16px] font-body leading-[1.7] text-neutral-600 lg:text-[17px]">
                VGU Online exists to make a NAAC A+ degree available to working professionals,
                rural students, and career-changers - wherever they are. The certificate, legal
                standing, and employer recognition are identical to the on-campus version.
              </p>
            </div>

            {/* Right: values */}

            {/* Mobile - horizontal snap-scroll strip (breaks the wall) */}
            <div className="md:hidden -mx-5 px-5 scroll-pl-5 overflow-x-auto snap-x snap-mandatory flex gap-3 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {VALUES.map((v, i) => (
                <div key={v.title} className="snap-start flex-none w-[80vw] max-w-[300px]">
                  <div
                    style={{ background: 'linear-gradient(135deg, #ffffff 55%, rgba(192,64,54,0.05) 100%)' }}
                    className="group/card relative overflow-hidden flex flex-col rounded-2xl border border-vgu-red/15 p-5 h-full shadow-[0_6px_24px_rgba(192,64,54,0.10)]"
                  >
                    {/* Ghost number watermark */}
                    <span
                      className="absolute -bottom-3 right-3 font-heading font-black leading-none select-none pointer-events-none text-[72px] text-vgu-red"
                      style={{ opacity: 0.07 }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span
                      className="flex h-11 w-11 flex-none items-center justify-center rounded-xl mt-2 mb-4 shadow-[0_4px_14px_rgba(192,64,54,0.30)]"
                      style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                    >
                      <v.Icon size={18} stroke={1.5} className="text-white" />
                    </span>
                    <div className="relative">
                      <h3 className="font-heading font-bold text-[16px] text-neutral-900 mb-2">{v.title}</h3>
                      <p className="text-[16px] font-body text-neutral-500 leading-[1.65]">{v.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop - vertical stack */}
            <div className="hidden md:flex md:flex-col gap-4">
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  data-animate="fade-up"
                  style={{
                    animationDelay: `${i * 80}ms`,
                    background: 'linear-gradient(135deg, #ffffff 60%, rgba(192,64,54,0.04) 100%)',
                  }}
                  className="group/card relative overflow-hidden flex items-start gap-4 rounded-2xl border border-neutral-200 p-6 hover:border-vgu-red/30 hover:shadow-[0_8px_24px_rgba(192,64,54,0.10)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span
                    className="absolute -bottom-3 right-3 font-heading font-black leading-none select-none pointer-events-none text-[72px] text-vgu-red"
                    style={{ opacity: 0.06 }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="flex h-11 w-11 flex-none items-center justify-center rounded-xl mt-0.5 shadow-[0_4px_14px_rgba(192,64,54,0.28)] transition-all duration-200 group-hover:scale-110 group-hover:rotate-3 group-hover/card:scale-110 group-hover/card:rotate-3"
                    style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                  >
                    <v.Icon size={18} stroke={1.5} className="text-white" />
                  </span>
                  <div className="relative">
                    <h3 className="font-heading font-bold text-[16px] text-neutral-900 mb-1.5">{v.title}</h3>
                    <p className="text-[16px] font-body text-neutral-500 leading-[1.65]">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* â•â• Accreditations - monogram (VGU-V) in a credibility section â•â• */}
      <section className="sketch-hover-group group relative overflow-hidden bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="monogram" color="red-dark" opacity={0.05} strokeWidth={20} />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div data-animate="fade-up" className="text-center mb-12">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Recognised by
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
              Accreditations &amp; Recognition
            </h2>
          </div>

          {/* Mobile - 2Ã—3 compact trust-badge grid */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {ACCREDITATIONS.map((a, i) => (
              <div
                key={a.name}
                data-animate="materialize"
                style={{
                  animationDelay: `${i * 60}ms`,
                  background: a.s.cardBg,
                  borderColor: a.s.border,
                }}
                className="relative overflow-hidden rounded-2xl border p-4 flex flex-col items-center text-center shadow-[0_6px_20px_rgba(0,0,0,0.09)]"
              >
                {/* Ghost letter */}
                <span
                  className="absolute -bottom-3 right-1 font-heading font-black leading-none select-none pointer-events-none text-[56px]"
                  style={{ color: a.s.bar, opacity: 0.08 }}
                  aria-hidden="true"
                >
                  {a.ghost}
                </span>

                {/* Logo or colour badge */}
                <div className="relative mt-2 mb-3">
                  {a.logo ? (
                    <div className="w-28 h-14 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
                      <Image src={a.logo} alt={a.name} width={112} height={56} unoptimized className="object-contain w-full h-full" />
                    </div>
                  ) : (
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                      style={{ background: a.s.bar }}
                    >
                      <span className="font-heading font-black text-white text-[12px] leading-none tracking-tight">{a.name}</span>
                    </div>
                  )}
                </div>

                {/* Acronym */}
                <div className="relative font-heading font-bold text-[16px] text-neutral-900 leading-tight mb-2">
                  {a.name}
                </div>

                {/* Status badge */}
                <span
                  className="relative inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-heading font-bold"
                  style={{ background: a.s.bg, color: a.s.text, borderColor: a.s.border }}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop - full detail 3-col grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACCREDITATIONS.map((a, i) => (
              <div
                key={a.name}
                data-animate="materialize"
                style={{
                  animationDelay: `${i * 70}ms`,
                  background: a.s.cardBg,
                }}
                className="group/card relative rounded-2xl border border-neutral-200 overflow-hidden hover:-translate-y-1 hover:border-vgu-red/20 hover:shadow-[0_8px_24px_rgba(192,64,54,0.12)] transition-all duration-200"
              >
                <span
                  className="absolute -bottom-4 right-2 font-heading font-black leading-none select-none pointer-events-none text-[96px]"
                  style={{ color: a.s.bar, opacity: 0.07 }}
                  aria-hidden="true"
                >
                  {a.ghost}
                </span>
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-5">
                    {a.logo ? (
                      <div className="w-28 h-14 rounded-xl overflow-hidden flex-none shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover/card:scale-105">
                        <Image src={a.logo} alt={a.name} width={112} height={56} unoptimized className="object-contain w-full h-full" />
                      </div>
                    ) : (
                      <div
                        className="w-14 h-14 rounded-xl flex-none flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover/card:scale-105"
                        style={{ background: a.s.bar }}
                      >
                        <span className="font-heading font-black text-white text-[13px] leading-none tracking-tight">{a.name}</span>
                      </div>
                    )}
                    <span
                      className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-heading font-bold"
                      style={{ background: a.s.bg, color: a.s.text, borderColor: a.s.border }}
                    >
                      {a.status}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-[16px] text-neutral-900 mb-2 leading-snug">{a.full}</h3>
                  <p className="text-[15px] font-body text-neutral-500 leading-[1.65]">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â• Campus Experience - arc (digital reach spanning the physical) â•â• */}
      <section className="sketch-hover-group group relative overflow-hidden bg-vgu-beige py-10 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="arc" color="red" opacity={0.04} strokeWidth={20} />
        <SketchFlourish shape="arc" color="red" opacity={0.04} strokeWidth={20} className="rotate-180" />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Left: copy + features */}
            <div data-animate="slide-from-left">
              <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
                Campus experience
              </p>
              <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-5 md:text-[40px]">
                Your degree is online.<br />Your university is real.
              </h2>
              <p className="text-[16px] font-body leading-[1.7] text-neutral-600 mb-5 lg:mb-8 lg:text-[17px]">
                Online doesn&apos;t mean isolated. VGU brings you to campus for immersions, connects you with faculty in person, and celebrates your graduation on the same stage as every other VGU student.
              </p>

              {/* Mobile: snap-scroll strip */}
              <div className="md:hidden -mx-5 px-5 scroll-pl-5 overflow-x-auto snap-x snap-mandatory flex gap-3 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {CAMPUS_FEATURES.map((f) => (
                  <div key={f.title} className="snap-start flex-none w-[78vw] max-w-[290px]">
                    <div
                      className="group/feat flex flex-col rounded-2xl border border-neutral-200/80 bg-white/80 p-4 h-full hover:border-vgu-red/20 hover:bg-white hover:shadow-[0_6px_20px_rgba(192,64,54,0.09)] transition-all duration-200"
                    >
                      <div
                        className="flex-none w-9 h-9 rounded-xl flex items-center justify-center mb-3 shadow-[0_4px_14px_rgba(192,64,54,0.25)]"
                        style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                      >
                        <f.Icon size={16} stroke={1.5} className="text-white" />
                      </div>
                      <div className="font-heading font-semibold text-[16px] text-neutral-900 mb-1.5">{f.title}</div>
                      <p className="text-[16px] font-body text-neutral-500 leading-[1.65]">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: stacked list */}
              <div className="hidden md:flex flex-col gap-3">
                {CAMPUS_FEATURES.map((f, i) => (
                  <div
                    key={f.title}
                    data-animate="fade-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                    className="group/feat flex items-start gap-4 rounded-2xl border border-neutral-200/80 bg-white/80 p-5 hover:border-vgu-red/20 hover:bg-white hover:shadow-[0_6px_20px_rgba(192,64,54,0.09)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div
                      className="flex-none w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 shadow-[0_4px_14px_rgba(192,64,54,0.25)] transition-all duration-200 group-hover/feat:scale-110 group-hover/feat:rotate-3"
                      style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                    >
                      <f.Icon size={18} stroke={1.5} className="text-white" />
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-[16px] text-neutral-900 mb-1.5">{f.title}</div>
                      <p className="text-[16px] font-body text-neutral-500 leading-[1.65]">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/programs"
                className="inline-flex items-center gap-2 mt-6 md:mt-8 border-2 border-vgu-red text-vgu-red hover:bg-vgu-red hover:text-white font-heading font-semibold text-[16px] rounded-md px-[30px] py-3 transition-all duration-200"
              >
                Explore programs
                <IconArrowRight size={15} />
              </a>
            </div>

            {/* Right: clean image + proof strip */}
            <div data-animate="slide-from-right" className="flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-[4/3] shadow-[0_20px_56px_rgba(0,0,0,0.14)]">
                <Image
                  src={CAMPUS_IMAGE_SRC}
                  alt="VGU students at campus graduation ceremony"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Proof strip */}
              <div className="mockup-float grid grid-cols-3 divide-x divide-neutral-200 rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.07)]">
                <div className="flex flex-col items-center py-4 md:py-7 px-4">
                  <span className="font-heading font-black text-[28px] text-vgu-yellow leading-none">3Ã—</span>
                  <span className="mt-1.5 text-[11px] font-heading font-semibold text-neutral-500 uppercase tracking-[0.06em] text-center leading-tight">Immersions<br/>per year</span>
                </div>
                <div className="flex flex-col items-center py-4 md:py-7 px-4">
                  <span className="font-heading font-black text-[28px] text-vgu-yellow leading-none">100%</span>
                  <span className="mt-1.5 text-[11px] font-heading font-semibold text-neutral-500 uppercase tracking-[0.06em] text-center leading-tight">On-campus<br/>degree</span>
                </div>
                <div className="flex flex-col items-center py-4 md:py-7 px-4">
                  <span className="font-heading font-black text-[28px] text-vgu-yellow leading-none">50K+</span>
                  <span className="mt-1.5 text-[11px] font-heading font-semibold text-neutral-500 uppercase tracking-[0.06em] text-center leading-tight">Alumni<br/>network</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* â•â• Hiring Partners - loop (employer-graduate connection) â•â• */}
      <section className="sketch-hover-group group relative overflow-hidden bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="loop" color="red" opacity={0.03} strokeWidth={20} />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div data-animate="fade-up" className="text-center mb-10">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Hiring partners
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
              {config.stats.hiringPartners} companies hire VGU graduates
            </h2>
            <p className="mt-4 text-[16px] font-body leading-[1.7] text-neutral-500 max-w-[540px] mx-auto lg:text-[17px]">
              From India&apos;s biggest conglomerates to global tech firms - a VGU degree opens real doors.
            </p>
          </div>

          <HirerStrip hirers={HIRERS} />

          <div
            data-animate="fade-up"
            style={{ animationDelay: '180ms' }}
            className="mt-10 text-center"
          >
            <a
              href="#counsellor"
              data-apply-trigger
              className="inline-flex items-center gap-2 bg-vgu-red hover:bg-vgu-red-dark text-white hover:text-white font-heading font-semibold text-[16px] rounded-md px-9 py-4 transition-all duration-200 shadow-[0_8px_24px_rgba(192,64,54,0.30)] hover:shadow-[0_14px_36px_rgba(130,26,18,0.40)] hover:-translate-y-0.5"
            >
              Start your career journey
              <IconArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* â•â• History timeline - wave conveys the flow of time â•â• */}
      <section className="sketch-hover-group group relative overflow-hidden bg-neutral-50 py-12 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="wave" color="red" opacity={0.04} strokeWidth={20} />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-16 items-start">

            {/* Left sticky panel - mobile: identity card, desktop: dissolves via md:contents */}
            <div data-animate="slide-from-left" className="lg:sticky lg:top-[120px]">
              <div
                className="rounded-2xl border border-vgu-red/15 p-6 shadow-[0_8px_32px_rgba(192,64,54,0.10)] md:contents"
                style={{ background: 'linear-gradient(145deg, #ffffff 50%, rgba(192,64,54,0.06) 100%)' }}
              >
                <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-4">
                  Our history
                </p>

                {/* Big display year counter */}
                <div className="font-heading font-black leading-[0.85] text-vgu-yellow text-[64px] md:text-[80px] mb-2">
                  {yearsOld}+
                </div>
                <h2 className="font-heading font-bold text-[24px] md:text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-4">
                  Years of steady impact
                </h2>

                {/* Red rule */}
                <div className="w-10 h-[3px] rounded-full mb-5" style={{ background: 'linear-gradient(to right, #C04036, #821a12)' }} />

                <p className="text-[16px] font-body leading-[1.7] text-neutral-500">
                  From a single campus in Jaipur to a globally accessible online university -
                  a decade-plus of making quality education reachable for every serious learner.
                </p>

                {/* NAAC card */}
                <div
                  className="mt-6 flex items-center gap-4 rounded-2xl border border-vgu-red/20 px-4 py-4 shadow-[0_4px_16px_rgba(192,64,54,0.12)]"
                  style={{ background: 'linear-gradient(135deg, #ffffff 45%, rgba(192,64,54,0.07) 100%)' }}
                >
                  <div className="flex-none w-24 h-12 rounded-xl overflow-hidden shadow-[0_4px_14px_rgba(192,64,54,0.20)]">
                    <Image src="/logos/naac-grade-a-plus.png" width={96} height={48} alt="NAAC A+" unoptimized className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-[15px] text-neutral-900 leading-tight">NAAC A+ Accredited</div>
                    <div className="text-[12px] font-body text-neutral-500 mt-0.5">First cycle 2022 Â· 3.29/4.0 CGPA Â· Valid 2027</div>
                  </div>
                </div>

                {/* Recent achievement chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { label: 'QS 95th in India', year: '2025' },
                    { label: 'Google AI Campus', year: '2024' },
                    { label: 'IIRF 37th Pvt Uni', year: '2026' },
                  ].map((chip) => (
                    <span
                      key={chip.label}
                      className="inline-flex items-center gap-1 rounded-full border border-vgu-red/30 bg-vgu-red/[0.06] px-3 py-1.5 text-[11px] font-heading font-semibold text-vgu-red shadow-sm"
                    >
                      {chip.label}
                      <span className="mx-0.5 font-normal text-neutral-400">Â·</span>
                      <span className="font-normal text-neutral-400">{chip.year}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: timeline */}
            <div className="relative">
              {/* Gradient vertical line */}
              <div
                className="absolute left-[17px] top-[18px] bottom-4 w-0.5 rounded-full"
                aria-hidden="true"
                style={{ background: 'linear-gradient(to bottom, #E5E7EB 0%, #C04036 100%)' }}
              />

              <div className="flex flex-col gap-4">
                {activeMilestones.map((m, i) => {
                  const isLatest = i === activeMilestones.length - 1
                  return (
                    <div
                      key={i}
                      data-animate="fade-up"
                      style={{ animationDelay: `${i * 55}ms` }}
                      className="relative flex items-start gap-5"
                    >
                      {/* Dot */}
                      <div
                        className={[
                          'relative z-10 flex-none w-9 h-9 rounded-full border-2 flex items-center justify-center font-heading font-black text-[10px] transition-all duration-200',
                          isLatest
                            ? 'border-vgu-red bg-vgu-red text-white shadow-[0_0_0_4px_rgba(192,64,54,0.15)]'
                            : 'border-neutral-200 bg-white text-neutral-400',
                        ].join(' ')}
                      >
                        {isLatest && (
                          <span
                            className="absolute inline-flex h-full w-full rounded-full bg-vgu-red opacity-30 animate-ping"
                            aria-hidden="true"
                          />
                        )}
                        {i + 1}
                      </div>

                      {/* Card */}
                      <div
                        className={[
                          'flex-1 rounded-2xl border p-4 md:p-5 transition-all duration-200',
                          isLatest
                            ? 'border-vgu-red/25 hover:shadow-[0_4px_20px_rgba(192,64,54,0.12)] hover:-translate-y-0.5'
                            : 'border-neutral-200 bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] hover:border-neutral-300 hover:-translate-y-0.5',
                        ].join(' ')}
                        style={isLatest ? { background: 'linear-gradient(135deg, #ffffff 55%, rgba(192,64,54,0.04) 100%)' } : undefined}
                      >
                        {/* Tag + Year row */}
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[22px] font-heading font-black text-vgu-yellow leading-none">{m.year}</span>
                          {m.tag && (
                            <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.08em] text-neutral-400">
                              {m.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[16px] font-body text-neutral-700 leading-[1.6]">{m.event}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* â•â• Alumni Community - swoop (sweeping sense of a large, growing community) â•â• */}
      <section className="sketch-hover-group group relative overflow-hidden bg-white py-12 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="swoop" color="red" opacity={0.04} strokeWidth={20} />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div data-animate="fade-up" className="text-center mb-8 md:mb-12">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Alumni community
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.15] text-neutral-900 md:text-[40px] max-w-[640px] mx-auto">
              Join {config.stats.learners} learners who didn&apos;t wait.
            </h2>
            <p className="mt-4 text-[16px] font-body leading-[1.7] text-neutral-500 max-w-[520px] mx-auto lg:text-[17px]">
              Working professionals, fresh graduates, and career-changers from across India and {config.stats.countries} countries - one alumni network.
            </p>
          </div>

          {/* Alumni features - Mobile: snap-scroll, Desktop: 3-col grid */}
          <div className="md:hidden -mx-5 px-5 scroll-pl-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex gap-4 pb-4 mb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ALUMNI_FEATURES.map((f, i) => (
              <div key={f.label} className="snap-start flex-none w-[72vw] max-w-[280px]">
                <div
                  data-animate="materialize"
                  style={{
                    animationDelay: `${i * 80}ms`,
                    background: 'linear-gradient(135deg, #ffffff 55%, rgba(192,64,54,0.04) 100%)',
                  }}
                  className="group/card relative overflow-hidden rounded-2xl border border-vgu-red/15 p-6 h-full shadow-[0_6px_24px_rgba(192,64,54,0.10)] hover:border-vgu-red/30 hover:shadow-[0_14px_36px_rgba(192,64,54,0.16)] hover:-translate-y-1.5 transition-all duration-200"
                >
                  <span
                    className="absolute -bottom-3 right-3 font-heading font-black leading-none select-none pointer-events-none text-[72px] text-vgu-red"
                    style={{ opacity: 0.06 }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-[0_4px_14px_rgba(192,64,54,0.28)] transition-all duration-200 group-hover/card:scale-110 group-hover/card:rotate-3"
                    style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                  >
                    <f.Icon size={20} stroke={1.5} className="text-white" />
                  </div>
                  <div className="font-heading font-black text-[38px] text-vgu-yellow leading-none mb-1.5">{f.stat}</div>
                  <h3 className="font-heading font-bold text-[16px] text-neutral-900 mb-2">{f.label}</h3>
                  <p className="text-[16px] font-body text-neutral-500 leading-[1.65]">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-3 gap-5 mb-12">
            {ALUMNI_FEATURES.map((f, i) => (
              <div
                key={f.label}
                data-animate="materialize"
                style={{
                  animationDelay: `${i * 80}ms`,
                  background: 'linear-gradient(135deg, #ffffff 55%, rgba(192,64,54,0.04) 100%)',
                }}
                className="group/card relative overflow-hidden rounded-2xl border border-neutral-200 p-6 hover:border-vgu-red/25 hover:shadow-[0_8px_28px_rgba(192,64,54,0.11)] hover:-translate-y-1 transition-all duration-200"
              >
                <span
                  className="absolute -bottom-3 right-3 font-heading font-black leading-none select-none pointer-events-none text-[72px] text-vgu-red"
                  style={{ opacity: 0.06 }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shadow-[0_4px_14px_rgba(192,64,54,0.28)] transition-all duration-200 group-hover:scale-110 group-hover:rotate-3 group-hover/card:scale-110 group-hover/card:rotate-3"
                  style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                >
                  <f.Icon size={20} stroke={1.5} className="text-white" />
                </div>
                <div className="font-heading font-black text-[38px] text-vgu-yellow leading-none mb-1.5">{f.stat}</div>
                <h3 className="font-heading font-bold text-[16px] text-neutral-900 mb-2">{f.label}</h3>
                <p className="text-[16px] font-body text-neutral-500 leading-[1.65]">{f.body}</p>
              </div>
            ))}
          </div>

          {/* Testimonial cards - Mobile: snap-scroll, Desktop: 3-col grid */}
          <div className="md:hidden -mx-5 px-5 scroll-pl-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex gap-4 pb-4 mb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ALUMNI_TESTIMONIALS.map((t, i) => (
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
                  <div className="flex-1 px-5 pt-5 pb-6">
                    <div className="font-heading font-bold text-[48px] text-vgu-red leading-[0.75] mb-3 select-none" aria-hidden="true">&ldquo;</div>
                    <p className="text-[16px] font-body text-neutral-600 leading-[1.7] italic">{t.quote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-3 gap-5 mb-12">
            {ALUMNI_TESTIMONIALS.map((t, i) => (
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
                <div className="flex-1 px-5 pt-5 pb-6">
                  <div className="font-heading font-bold text-[52px] text-vgu-red leading-[0.75] mb-3 select-none" aria-hidden="true">&ldquo;</div>
                  <p className="text-[16px] font-body text-neutral-600 leading-[1.7] italic">{t.quote}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            data-animate="fade-up"
            style={{ animationDelay: '280ms' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#counsellor"
              data-apply-trigger
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-vgu-red hover:bg-vgu-red-dark text-white hover:text-white font-heading font-semibold text-[16px] whitespace-nowrap rounded-md px-9 py-4 transition-all duration-200 shadow-[0_8px_24px_rgba(192,64,54,0.30)] hover:shadow-[0_14px_36px_rgba(130,26,18,0.40)] hover:-translate-y-0.5"
            >
              Apply Now
              <IconArrowRight size={16} />
            </a>
            <a
              href="/programs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-vgu-red text-vgu-red hover:bg-vgu-red/5 font-heading font-semibold text-[16px] whitespace-nowrap rounded-md px-8 py-3.5 transition-all duration-200"
            >
              Browse programs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
