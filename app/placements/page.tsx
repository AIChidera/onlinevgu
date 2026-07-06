import type { Metadata } from 'next'
import Image from 'next/image'
import {
  IconTrendingUp,
  IconBuilding,
  IconAward,
  IconUsers,
  IconBrain,
  IconHeadset,
  IconFileText,
  IconBrandLinkedin,
  IconClock,
  IconDeviceLaptop,
  IconBuildingBank,
  IconBriefcase,
  IconShoppingCart,
  IconStethoscope,
  IconUserCheck,
  IconClipboardList,
  IconMessage,
  IconCertificate,
  IconArrowRight,
} from '@tabler/icons-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import HirerStrip from '@/app/programs/[slug]/HirerStrip'

export const revalidate = 3600

const HERO_IMAGE_SRC =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&q=80&auto=format&fit=crop'

export const metadata: Metadata = {
  title: 'Placements - Online VGU Career Outcomes',
  description:
    '95% placement rate, 500+ hiring partners, AI-powered placement portal. See where Online VGU graduates land across IT, BFSI, consulting, and more.',
  alternates: { canonical: 'https://onlinevgu.in/placements' },
  openGraph: {
    title: 'Placements - Online VGU',
    description: '95% placement rate across 500+ hiring partners. Real degrees, real careers.',
    url: 'https://onlinevgu.in/placements',
  },
}

const STATS = [
  { value: '95%',     label: 'Placement rate',  detail: 'Class of 2023, within 6 months', Icon: IconTrendingUp },
  { value: '500+',    label: 'Hiring partners', detail: 'Across India and abroad',         Icon: IconBuilding   },
  { value: '25+',     label: 'Top recruiters',  detail: 'TCS, Deloitte, Amazon and more',  Icon: IconAward      },
  { value: '50,000+', label: 'Alumni network',  detail: 'Across 40+ countries',            Icon: IconUsers      },
]

const SUPPORT_SERVICES = [
  {
    title: 'AI Placement Portal',
    body:  'Personalised job matches scored against your skills, goals, and location preferences.',
    Icon:  IconBrain,
  },
  {
    title: 'Unlimited Mock Interviews',
    body:  'One-on-one practice rounds with industry mentors and recruiters, as many as you need.',
    Icon:  IconHeadset,
  },
  {
    title: 'Resume Review',
    body:  'Personalised feedback from recruiters at the firms you actually want to work at.',
    Icon:  IconFileText,
  },
  {
    title: 'LinkedIn Optimisation',
    body:  'Recruiter-ready profile, properly tagged, with a portfolio that gets clicks.',
    Icon:  IconBrandLinkedin,
  },
  {
    title: 'Industry Expert Sessions',
    body:  'Hiring managers and HR leads share what they actually look for in candidates.',
    Icon:  IconUsers,
  },
  {
    title: 'Year-round Placement Cell',
    body:  'Dedicated support that runs all twelve months, not just at the end of your program.',
    Icon:  IconClock,
  },
]

const HIRERS = [
  'TCS', 'Infosys', 'Wipro', 'Accenture', 'HCL',
  'IBM', 'Deloitte', 'EY', 'KPMG', 'Cognizant',
  'Amazon', 'Flipkart', 'HDFC Bank', 'ICICI Bank', 'Bajaj Finserv',
  'Reliance Industries', 'Tata Group', 'Mahindra', 'Zomato', 'PhonePe',
  'Tech Mahindra', 'Capgemini', 'LTIMindtree', 'Axis Bank', 'Mphasis',
]

const INDUSTRIES = [
  {
    title:     'IT Services & Tech',
    body:      'Application development, cloud, DevOps, data engineering, product roles.',
    companies: 'TCS · Infosys · HCL · Wipro · Cognizant',
    Icon:      IconDeviceLaptop,
  },
  {
    title:     'BFSI & Fintech',
    body:      'Banking operations, insurance, lending, fintech product, risk and compliance.',
    companies: 'HDFC Bank · ICICI Bank · Axis Bank · Bajaj Finserv · PhonePe',
    Icon:      IconBuildingBank,
  },
  {
    title:     'Consulting & Advisory',
    body:      'Strategy, audit, tax, technology consulting, and process advisory.',
    companies: 'Deloitte · EY · KPMG · Accenture · Capgemini',
    Icon:      IconBriefcase,
  },
  {
    title:     'E-commerce & Internet',
    body:      'Product, operations, growth, category management, and partnerships.',
    companies: 'Amazon · Flipkart · Zomato',
    Icon:      IconShoppingCart,
  },
  {
    title:     'Conglomerates',
    body:      'Operations, projects, supply chain, and leadership rotation programs.',
    companies: 'Tata Group · Reliance Industries · Mahindra',
    Icon:      IconBuilding,
  },
  {
    title:     'Healthcare & Pharma',
    body:      'Healthcare administration, hospital operations, pharma management.',
    companies: 'Apollo · Fortis · Cipla · Sun Pharma',
    Icon:      IconStethoscope,
  },
]

const PROCESS_STEPS = [
  {
    badge: 'Stage 1',
    title: 'Profile Build',
    body:  'Resume rebuild, LinkedIn polish, skill mapping. We baseline where you are.',
    time:  '1-2 weeks',
    Icon:  IconUserCheck,
  },
  {
    badge: 'Stage 2',
    title: 'Pre-Placement Training',
    body:  'Mock interviews, group discussions, aptitude prep, industry sessions.',
    time:  '4 weeks',
    Icon:  IconClipboardList,
  },
  {
    badge: 'Stage 3',
    title: 'Interview Scheduling',
    body:  'Recruiter matches via the AI portal. We book slots, prep you, debrief after.',
    time:  'Rolling',
    Icon:  IconMessage,
  },
  {
    badge: 'Stage 4',
    title: 'Offer & Onboarding',
    body:  'Negotiation guidance, joining support, alumni network introduction.',
    time:  'On offer',
    Icon:  IconCertificate,
  },
]

const SUCCESS_STORIES = [
  {
    name:    'Ananya Sharma',
    program: 'MBA · 2023 batch',
    journey: 'Sales Executive → Product Manager',
    company: 'Razorpay',
    quote:   'The mock interviews felt harder than the real ones. By the time I sat in the Razorpay PM round, the pressure felt familiar.',
    avatar:  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80&auto=format&fit=crop',
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

export default function PlacementsPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Placements' }]} />

      {/* ══ Hero - swoop yellow (whisper-faint on the photo) ══ */}
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

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">
          <div className="max-w-[700px]">
            <p
              className="anim-load-left text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-yellow mb-6"
              style={{ animationDelay: '0ms' }}
            >
              Placements &amp; Careers
            </p>

            <h1
              className="anim-load-left font-heading font-bold tracking-tight leading-[1.05] text-white text-[36px] md:text-[48px] lg:text-[56px]"
              style={{ animationDelay: '70ms' }}
            >
              Built for<br />
              <span className="text-vgu-yellow">real careers.</span>
            </h1>

            <p
              className="anim-load-left mt-8 text-[16px] lg:text-[17px] font-body leading-[1.7] text-white/85 max-w-[600px]"
              style={{ animationDelay: '140ms' }}
            >
              95% of our 2023 batch placed within six months. Every learner gets the same support - no asterisks.
            </p>

            <div
              className="anim-load-left mt-12 flex flex-col gap-4"
              style={{ animationDelay: '210ms' }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#counsellor"
                  data-apply-trigger
                  className="group inline-flex items-center gap-3 rounded-md bg-white text-vgu-red font-heading font-bold text-[17px] px-10 py-[18px] transition-all duration-200 shadow-[0_6px_32px_rgba(255,255,255,0.22)] hover:shadow-[0_10px_48px_rgba(255,255,255,0.36)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  Apply Now
                  <IconArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="/programs"
                  className="group inline-flex items-center gap-2 rounded-md border-2 border-white/60 bg-transparent hover:bg-white/10 hover:border-white text-white font-heading font-semibold text-[15px] px-7 py-[15px] transition-all duration-200"
                >
                  Browse Programs
                  <IconArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Stats strip - arc sweeps across the achievement numbers ══ */}
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
                className="group/card flex flex-col items-center text-center rounded-2xl p-3 md:p-6 border border-transparent shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-vgu-red/20 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(192,64,54,0.12)] transition-all duration-200 cursor-default"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110 group-hover:rotate-3 group-hover/card:scale-110 group-hover/card:rotate-3"
                  style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                >
                  <Icon size={24} className="text-white" stroke={1.5} />
                </div>
                <div className="font-heading font-black text-[34px] md:text-[44px] leading-none text-vgu-yellow">
                  {value}
                </div>
                <div className="mt-2 text-[14px] font-heading font-semibold text-neutral-800 leading-snug">
                  {label}
                </div>
                <div className="mt-1 text-[12px] font-body text-neutral-400 leading-snug">
                  {detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Career Support - loop (continuous service surrounding the learner) ══ */}
      <section className="sketch-hover-group group relative overflow-hidden bg-neutral-50 py-12 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="loop" color="red" opacity={0.04} strokeWidth={20} />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div data-animate="fade-up" className="text-center mb-8 md:mb-12">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              How we support you
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
              A placement cell that actually places you.
            </h2>
            <p className="mt-4 text-[16px] font-body leading-[1.7] text-neutral-500 max-w-[560px] mx-auto lg:text-[17px]">
              Every Online VGU learner gets the same end-to-end placement support that on-campus students receive. No extra cost, no asterisks.
            </p>
          </div>

          {/* Mobile: snap-scroll strip */}
          <div className="md:hidden -mx-5 px-5 overflow-x-auto snap-x snap-mandatory flex gap-3 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SUPPORT_SERVICES.map((s, i) => (
              <div key={s.title} className="snap-start flex-none w-[80vw] max-w-[300px]">
                <div
                  className="group/card relative overflow-hidden flex flex-col rounded-2xl border border-vgu-red/15 p-5 h-full shadow-[0_6px_24px_rgba(192,64,54,0.10)] hover:border-vgu-red/30 hover:shadow-[0_14px_36px_rgba(192,64,54,0.16)] hover:-translate-y-1.5 transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #ffffff 55%, rgba(192,64,54,0.05) 100%)' }}
                >
                  {/* Ghost number */}
                  <span
                    className="absolute -bottom-3 right-3 font-heading font-black leading-none select-none pointer-events-none text-[72px] text-vgu-red"
                    style={{ opacity: 0.07 }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-none shadow-[0_4px_14px_rgba(192,64,54,0.28)] transition-all duration-200 group-hover/card:scale-110 group-hover/card:rotate-3"
                    style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                  >
                    <s.Icon size={20} stroke={1.5} className="text-white" />
                  </div>
                  <h3 className="relative font-heading font-bold text-[16px] text-neutral-900 mb-2 leading-snug">{s.title}</h3>
                  <p className="relative text-[16px] font-body text-neutral-500 leading-[1.65]">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: 2-col sm, 3-col lg grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUPPORT_SERVICES.map((s, i) => (
              <div
                key={s.title}
                data-animate="fade-up"
                style={{
                  animationDelay: `${i * 60}ms`,
                  background: 'linear-gradient(135deg, #ffffff 60%, rgba(192,64,54,0.04) 100%)',
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
                  <s.Icon size={20} stroke={1.5} className="text-white" />
                </div>
                <h3 className="relative font-heading font-bold text-[16px] text-neutral-900 mb-2 leading-snug">{s.title}</h3>
                <p className="relative text-[16px] font-body text-neutral-500 leading-[1.65]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Hiring Partners - wave (continuous flow of recruiter connections) ══ */}
      <section className="sketch-hover-group group relative overflow-hidden bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="wave" color="red" opacity={0.03} strokeWidth={20} />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div data-animate="fade-up" className="text-center mb-10">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Where you&apos;ll work
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
              500+ companies hire VGU graduates
            </h2>
            <p className="mt-4 text-[16px] font-body leading-[1.7] text-neutral-500 max-w-[560px] mx-auto lg:text-[17px]">
              From India&apos;s biggest conglomerates to global tech firms across IT, finance, consulting, and more.
            </p>
          </div>

          <HirerStrip hirers={HIRERS} />

          <p
            data-animate="fade-up"
            style={{ animationDelay: '180ms' }}
            className="mt-10 text-center text-[13px] font-body text-neutral-400"
          >
            And 475+ more recruiters across India and abroad.
          </p>
        </div>
      </section>

      {/* ══ Industries - monogram + flipped arc (sectors held in a stylised V) ══ */}
      <section className="sketch-hover-group group relative overflow-hidden bg-vgu-beige py-12 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="monogram" color="red-dark" opacity={0.05} strokeWidth={20} />
        <SketchFlourish shape="arc" color="red" opacity={0.04} strokeWidth={20} className="rotate-180" />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div data-animate="fade-up" className="text-center mb-8 md:mb-12">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Industries we place into
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
              Hiring across every major sector.
            </h2>
            <p className="mt-4 text-[16px] font-body leading-[1.7] text-neutral-600 max-w-[600px] mx-auto lg:text-[17px]">
              Wherever your career heads next, the same team supports you with industry-specific prep, recruiter relationships, and alumni connections.
            </p>
          </div>

          {/* Mobile: snap-scroll strip */}
          <div className="md:hidden -mx-5 px-5 overflow-x-auto snap-x snap-mandatory flex gap-3 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {INDUSTRIES.map((ind) => (
              <div key={ind.title} className="snap-start flex-none w-[80vw] max-w-[300px]">
                <div
                  className="group/card relative overflow-hidden flex flex-col rounded-2xl border border-vgu-red/15 p-5 h-full shadow-[0_6px_24px_rgba(192,64,54,0.10)] hover:border-vgu-red/30 hover:shadow-[0_14px_36px_rgba(192,64,54,0.16)] hover:-translate-y-1.5 transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #ffffff 60%, rgba(192,64,54,0.05) 100%)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-none shadow-[0_4px_14px_rgba(192,64,54,0.28)] transition-all duration-200 group-hover/card:scale-110 group-hover/card:rotate-3"
                    style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                  >
                    <ind.Icon size={20} stroke={1.5} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-[16px] text-neutral-900 mb-2 leading-snug">{ind.title}</h3>
                  <p className="text-[16px] font-body text-neutral-500 leading-[1.65] mb-4 flex-1">{ind.body}</p>
                  <div className="pt-3 border-t border-neutral-100/70">
                    <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.06em] text-neutral-400 mb-1.5">Hires from</p>
                    <p className="text-[13px] font-heading font-semibold text-neutral-700 leading-[1.55]">{ind.companies}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: 2-col sm, 3-col lg grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <div
                key={ind.title}
                data-animate="materialize"
                style={{
                  animationDelay: `${i * 70}ms`,
                  background: 'linear-gradient(135deg, #ffffff 60%, rgba(192,64,54,0.05) 100%)',
                }}
                className="group/card relative overflow-hidden rounded-2xl border border-neutral-200 p-6 hover:border-vgu-red/25 hover:shadow-[0_10px_32px_rgba(192,64,54,0.12)] hover:-translate-y-1 transition-all duration-200"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-[0_4px_14px_rgba(192,64,54,0.28)] transition-all duration-200 group-hover:scale-110 group-hover:rotate-3 group-hover/card:scale-110 group-hover/card:rotate-3"
                  style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                >
                  <ind.Icon size={22} stroke={1.5} className="text-white" />
                </div>

                <h3 className="font-heading font-bold text-[17px] text-neutral-900 mb-2 leading-snug">
                  {ind.title}
                </h3>
                <p className="text-[16px] font-body text-neutral-500 leading-[1.65] mb-4">
                  {ind.body}
                </p>

                <div className="pt-3 border-t border-neutral-100">
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.06em] text-neutral-400 mb-1.5">
                    Hires from
                  </p>
                  <p className="text-[13px] font-heading font-semibold text-neutral-700 leading-[1.55]">
                    {ind.companies}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Placement Process - wave (flow of time through the journey) ══ */}
      <section className="sketch-hover-group group relative overflow-hidden bg-white py-12 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="wave" color="red" opacity={0.04} strokeWidth={20} />
        {/* Subtle dot-grid texture per Design Bible §10 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(192,64,54,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div data-animate="fade-up" className="text-center mb-8 md:mb-14">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Your placement journey
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
              From profile build to first day of work.
            </h2>
            <p className="mt-4 text-[16px] font-body leading-[1.7] text-neutral-500 max-w-[540px] mx-auto lg:text-[17px]">
              A four-stage process the placement cell runs with you, end-to-end.
            </p>
          </div>

          {/* Steps + dashed connector */}
          <div className="relative">
            {/* Dashed connector - desktop 4-col only */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute hidden lg:block top-[75px] left-[12.5%] right-[12.5%] border-t-2 border-dashed border-vgu-red/60"
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 gap-y-10 md:gap-8 md:gap-y-12">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.badge}
                  data-animate="fade-up"
                  className="flex flex-col items-center text-center"
                  style={{ animationDelay: `${i * 110}ms` }}
                >
                  {/* Circle + badge + watermark */}
                  <div className="relative mb-6 pt-3">
                    {/* Faded watermark number */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-heading font-black text-vgu-red/[0.10]"
                      style={{ fontSize: '112px', lineHeight: 1, zIndex: -1 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10 rounded-full px-3 py-0.5 text-[11px] font-heading font-semibold text-white whitespace-nowrap bg-vgu-red">
                      {step.badge}
                    </div>

                    <div
                      className={[
                        'group/circle relative z-0 flex items-center justify-center rounded-full bg-white',
                        'w-[76px] h-[76px] mt-[10px] md:w-[100px] md:h-[100px] md:mt-[14px] border-2 border-vgu-red',
                        'shadow-[0_4px_16px_rgba(192,64,54,0.12)] transition-all duration-300',
                        'hover:bg-vgu-red hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(192,64,54,0.30)]',
                        'group-hover:scale-110',
                      ].join(' ')}
                    >
                      <step.Icon
                        size={28}
                        stroke={1.5}
                        className="md:hidden transition-colors duration-300 text-vgu-red group-hover/circle:text-white"
                      />
                      <step.Icon
                        size={36}
                        stroke={1.5}
                        className="hidden md:block transition-colors duration-300 text-vgu-red group-hover/circle:text-white"
                      />
                    </div>
                  </div>

                  <h3 className="font-heading font-semibold text-[15px] leading-[1.3] text-neutral-900 mb-2 md:font-bold md:text-[18px]">
                    {step.title}
                  </h3>
                  <p className="hidden md:block text-[16px] font-body leading-[1.7] text-neutral-500 max-w-[200px] mb-3">
                    {step.body}
                  </p>
                  <span className="inline-flex items-center rounded-full border border-vgu-red/20 bg-vgu-red/[0.05] px-3 py-1 text-[11px] font-heading font-semibold text-vgu-red">
                    {step.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Microcopy */}
          <div
            data-animate="fade-up"
            style={{ animationDelay: '500ms' }}
            className="mt-10 md:mt-12 text-center"
          >
            <p className="text-[13px] font-body text-neutral-500">
              Placement support included with every program.
            </p>
          </div>
        </div>
      </section>

      {/* ══ Success Stories - swoop (sweeping arc of careers in motion) ══ */}
      <section className="sketch-hover-group group relative overflow-hidden bg-neutral-50 py-12 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="swoop" color="red" opacity={0.04} strokeWidth={20} />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div data-animate="fade-up" className="text-center mb-8 md:mb-12">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Real outcomes
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.15] text-neutral-900 md:text-[40px] max-w-[660px] mx-auto">
              Where Online VGU degrees actually go.
            </h2>
          </div>

          {/* Mobile: snap-scroll strip */}
          <div className="md:hidden -mx-5 px-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex gap-4 pb-4 mb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SUCCESS_STORIES.map((t, i) => (
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
                  <div className="px-5 pt-5 pb-3">
                    <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.06em] text-neutral-400 mb-1.5">Career path</p>
                    <p className="text-[14px] font-heading font-semibold text-neutral-800 leading-snug mb-3">{t.journey}</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-vgu-yellow/15 border border-vgu-yellow/35 px-2.5 py-1 text-[11px] font-heading font-bold text-[#7a4d00]">
                      <IconBriefcase size={11} stroke={2} />
                      {t.company}
                    </span>
                  </div>
                  <div className="flex-1 px-5 pt-3 pb-6">
                    <div className="font-heading font-bold text-[42px] text-vgu-red leading-[0.75] mb-2 select-none" aria-hidden="true">&ldquo;</div>
                    <p className="text-[16px] font-body text-neutral-600 leading-[1.7] italic">{t.quote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop: 3-col grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-5 mb-12">
            {SUCCESS_STORIES.map((t, i) => (
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
                <div className="px-5 pt-5 pb-3">
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.06em] text-neutral-400 mb-1.5">Career path</p>
                  <p className="text-[15px] font-heading font-semibold text-neutral-800 leading-snug mb-3">{t.journey}</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-vgu-yellow/15 border border-vgu-yellow/35 px-2.5 py-1 text-[11px] font-heading font-bold text-[#7a4d00]">
                    <IconBriefcase size={11} stroke={2} />
                    {t.company}
                  </span>
                </div>
                <div className="flex-1 px-5 pt-3 pb-6">
                  <div className="font-heading font-bold text-[42px] text-vgu-red leading-[0.75] mb-2 select-none" aria-hidden="true">&ldquo;</div>
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
              Browse Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
