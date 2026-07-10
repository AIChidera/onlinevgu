import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  IconPhone,
  IconBrandWhatsapp,
  IconMail,
  IconMapPin,
  IconClock,
  IconArrowRight,
  IconHeadset,
  IconBolt,
  IconCircleCheck,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandX,
  IconBrandFacebook,
  IconUsers,
  IconLifebuoy,
  IconAward,
  IconBriefcase,
  IconPlus,
} from '@tabler/icons-react'
import ContactForm from '@/components/forms/ContactForm'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import { getSiteConfig, type SiteConfig } from '@/lib/sanity'


const TRUST_PILLS = [
  { Icon: IconBolt,        label: 'Response within 2 hours' },
  { Icon: IconCircleCheck, label: 'Free · No obligation'    },
  { Icon: IconClock,       label: 'Mon-Sat, 9am-7pm IST'    },
]

function buildSocialItems(config: SiteConfig) {
  return [
    { Icon: IconBrandLinkedin,  label: 'LinkedIn',  href: config.socials.linkedin,  hover: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]' },
    { Icon: IconBrandInstagram, label: 'Instagram', href: config.socials.instagram, hover: 'hover:bg-[#E1306C] hover:border-[#E1306C]' },
    { Icon: IconBrandYoutube,   label: 'YouTube',   href: config.socials.youtube,   hover: 'hover:bg-[#FF0000] hover:border-[#FF0000]' },
    { Icon: IconBrandX,         label: 'X',         href: config.socials.x,         hover: 'hover:bg-[#111827] hover:border-[#111827]' },
    { Icon: IconBrandFacebook,  label: 'Facebook',  href: config.socials.facebook,  hover: 'hover:bg-[#1877F2] hover:border-[#1877F2]' },
  ]
}

const OFFICE_HOURS = [
  { d: 'Monday - Friday', h: '9:00 am - 7:00 pm' },
  { d: 'Saturday',         h: '9:00 am - 5:00 pm' },
  { d: 'Sunday',           h: 'Closed'            },
]

const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Vivekananda+Global+University+Jagatpura+Jaipur&z=15&output=embed'

const MAP_PLACE_URL =
  'https://www.google.com/maps/search/?api=1&query=Vivekananda+Global+University+VGU+Campus+Jagatpura+Jaipur+Rajasthan+303012'

function buildMiniFaqs(config: SiteConfig) {
  return [
    {
      q: 'Are VGU online degrees UGC-recognised?',
      a: "Yes. VGU's online programmes are UGC-entitled through the Distance Education Bureau (DEB), and the university is NAAC A+ accredited. Your degree is fully recognised by employers, government bodies, and other universities in India.",
    },
    {
      q: 'Can I pay fees in monthly EMIs?',
      a: 'Yes. We offer 0% interest EMI plans starting from ₹2,999/month through our finance partners. A counsellor can walk you through the options that match your programme and budget.',
    },
    {
      q: 'How long does the application process take?',
      a: 'Most applications are reviewed within 2-3 business days. A counsellor will reach out to confirm your details, request any missing documents, and guide you through the next steps.',
    },
    {
      q: 'Can I visit the campus before enrolling?',
      a: `Yes. The VGU campus in Jagatpura, Jaipur is open for visits Monday to Saturday. Email ${config.email} or call ${config.phone} to schedule a guided tour.`,
    },
  ]
}

function buildDepartments(config: SiteConfig) {
  const mailto = (subject: string) => `mailto:${config.email}?subject=${encodeURIComponent(subject)}`
  return [
    { Icon: IconUsers,      label: 'Admissions',           desc: 'Programme info, eligibility, fees, and the application process.',       href: mailto('Admissions enquiry') },
    { Icon: IconLifebuoy,   label: 'Student Support',      desc: 'LMS access, exam queries, and technical issues for enrolled students.', href: mailto('Student support')    },
    { Icon: IconAward,      label: 'Alumni Relations',     desc: 'Reconnect with VGU, share your updates, or join the alumni network.',   href: mailto('Alumni')             },
    { Icon: IconBriefcase,  label: 'Press & Partnerships', desc: 'Media enquiries, corporate tie-ups, and content collaborations.',       href: mailto('Press / Partnership') },
  ]
}

function buildContactChannels(config: SiteConfig) {
  return [
    {
      Icon:    IconPhone,
      label:   'Admission queries',
      primary: config.phone,
      sub:     'Mon-Sat, 9am-7pm IST',
      href:    `tel:${config.phoneTel}`,
      cta:     'Call now',
    },
    {
      Icon:    IconHeadset,
      label:   'Student helpline',
      primary: '+91 95490 86333',
      sub:     'For enrolled students',
      href:    'tel:+919549086333',
      cta:     'Call now',
    },
    {
      Icon:    IconBrandWhatsapp,
      label:   'WhatsApp',
      primary: config.phone,
      sub:     'Usually replies in 15 min',
      href:    config.whatsappUrl,
      cta:     'Chat now',
    },
    {
      Icon:    IconMail,
      label:   'Email',
      primary: config.email,
      sub:     'Replies within 24 hours',
      href:    `mailto:${config.email}`,
      cta:     'Send email',
    },
  ]
}

const COUNSELLORS = [
  {
    photo:     'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop&crop=faces',
    name:      'Priya Sharma',
    role:      'MBA & PG Specialist',
    bio:       "Helps working professionals choose between MBA, MCA, and management programmes. 8 years guiding senior managers and entrepreneurs.",
    languages: ['English', 'Hindi', 'Marathi'],
  },
  {
    photo:     'https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=400&q=80&auto=format&fit=crop&crop=faces',
    name:      'Rohan Verma',
    role:      'UG & Career Counsellor',
    bio:       'Specialises in undergraduate admissions - BBA, BCA, BA, B.Com - and helping students map their programme choice to their career goals.',
    languages: ['English', 'Hindi', 'Punjabi'],
  },
  {
    photo:     'https://images.unsplash.com/photo-1618245472177-2a74ad3b994a?w=400&q=80&auto=format&fit=crop&crop=faces',
    name:      'Anjali Mehta',
    role:      'Tech & MCA Specialist',
    bio:       'Computer Applications, BCA, MCA, and tech-track placement guidance for learners targeting product and engineering roles.',
    languages: ['English', 'Hindi', 'Gujarati'],
  },
]

export const metadata: Metadata = {
  title: 'Contact Us - VGU Online',
  description: 'Get in touch with the VGU admissions team. Call, WhatsApp, email, or fill out the form - we respond within 24 hours.',
  alternates: { canonical: 'https://onlinevgu.in/contact' },
  openGraph: {
    title: 'Contact Us - VGU Online',
    description: 'Free counselling · Reply within 2 hours · Mon-Sat 9am-7pm IST.',
    url: 'https://onlinevgu.in/contact',
  },
}

export default async function ContactPage() {
  const config = await getSiteConfig()
  const SOCIAL_ITEMS = buildSocialItems(config)
  const MINI_FAQS = buildMiniFaqs(config)
  const DEPARTMENTS = buildDepartments(config)
  const CONTACT_CHANNELS = buildContactChannels(config)
  const addressLines = config.addressLines

  return (
    <div>
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      {/* ══ Hero ══ */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #110805 0%, #4a0d08 45%, #821a12 100%)' }}
      >
        <SketchFlourish shape="swoop" color="yellow" opacity={0.04} strokeWidth={28} durationMs={2400} trigger="in-view" />
        <div aria-hidden="true" className="absolute -top-32 -right-24 h-[440px] w-[440px] rounded-full bg-vgu-red/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-40 -left-24 h-[380px] w-[380px] rounded-full bg-vgu-yellow/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 py-14 md:py-20 lg:py-24">
          <div className="max-w-[760px]">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm px-3.5 py-1.5 border border-white/15">
              <IconHeadset size={14} className="text-vgu-yellow" stroke={2} />
              <span className="text-[11px] md:text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-white/90">
                Talk to a counsellor
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold text-[36px] md:text-[52px] lg:text-[60px] tracking-[-1px] leading-[1.1] text-white mb-4 md:mb-6">
              Real people.{' '}
              <span className="text-vgu-yellow">Honest answers.</span>
            </h1>

            {/* Body */}
            <p className="text-[16px] md:text-[18px] font-body leading-[1.7] text-white/75 max-w-[600px]">
              No chatbots. No hold queues. A trained VGU admissions counsellor
              will answer your questions for free.
            </p>

            {/* Trust pill row */}
            <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-2 md:gap-2.5">
              {TRUST_PILLS.map((t) => (
                <div
                  key={t.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] border border-white/15 px-3.5 py-2 backdrop-blur-sm"
                >
                  <t.Icon size={14} className="text-vgu-yellow/90 flex-none" stroke={2} />
                  <span className="text-[12px] md:text-[13px] font-body text-white/85 whitespace-nowrap">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Quick channels ══ */}
      <section className="bg-white py-12 md:py-16 lg:py-20 px-5 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {CONTACT_CHANNELS.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                data-animate="fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
                className="group flex flex-row items-start sm:flex-col rounded-2xl bg-white border border-neutral-200/80 p-4 sm:p-5 md:p-6
                           shadow-[0_8px_28px_rgba(17,24,39,0.08)]
                           hover:-translate-y-1.5 hover:border-vgu-red/30
                           hover:shadow-[0_18px_40px_rgba(192,64,54,0.18)]
                           transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="flex-none w-11 h-11 rounded-xl flex items-center justify-center mr-4 sm:mr-0 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #C04036, #821a12)',
                    boxShadow: '0 6px 18px rgba(192,64,54,0.32)',
                  }}
                >
                  <c.Icon size={20} stroke={2} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-1.5 sm:mb-3">
                    {c.label}
                  </p>
                  <p className="font-heading font-bold text-[15px] sm:text-[16px] md:text-[17px] text-neutral-900 leading-snug break-words mb-1 group-hover:text-vgu-red transition-colors duration-200">
                    {c.primary}
                  </p>
                  <p className="text-[13px] font-body text-neutral-500 mb-3 sm:mb-5">{c.sub}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] md:text-[14px] font-heading font-semibold text-vgu-red group-hover:gap-2.5 transition-all duration-200">
                    {c.cta}
                    <IconArrowRight size={14} stroke={2.25} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Form + Reach us ══ */}
      <section className="bg-neutral-50 pt-4 md:pt-8 lg:pt-10 pb-12 md:pb-16 lg:pb-20 px-5 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px]">

          {/* Section header */}
          <div data-animate="fade-up" className="max-w-[680px] mb-8 md:mb-12">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Send us a message
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[36px] lg:text-[40px] tracking-[-0.5px] leading-[1.15] text-neutral-900">
              Tell us how we can help
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10 items-start">

            {/* Left: form card */}
            <div
              data-animate="fade-up"
              className="rounded-2xl bg-white border border-neutral-200/80 p-5 md:p-7 lg:p-8
                         shadow-[0_8px_28px_rgba(17,24,39,0.08)]"
            >
              <ContactForm phone={config.phone} phoneTel={config.phoneTel} />
            </div>

            {/* Right: rich card stack */}
            <div className="flex flex-col gap-4 md:gap-5 lg:sticky lg:top-[100px]">

              {/* Address card (clickable - opens map) */}
              <a
                href={MAP_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-animate="fade-up"
                style={{ animationDelay: '80ms' }}
                className="group flex items-start gap-4 rounded-2xl bg-white border border-neutral-200/80 p-5 md:p-6
                           shadow-[0_8px_28px_rgba(17,24,39,0.08)]
                           hover:-translate-y-1 hover:border-vgu-red/30
                           hover:shadow-[0_18px_40px_rgba(192,64,54,0.18)]
                           transition-all duration-300"
              >
                <div
                  className="flex-none w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #C04036, #821a12)',
                    boxShadow: '0 6px 18px rgba(192,64,54,0.32)',
                  }}
                >
                  <IconMapPin size={20} stroke={2} className="text-white" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-1.5">
                    Campus address
                  </p>
                  <address className="not-italic text-[14px] md:text-[15px] leading-[1.6] text-neutral-700 font-body group-hover:text-vgu-red transition-colors duration-200">
                    Vivekananda Global University<br />
                    {addressLines.map((line, i) => (
                      <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                    ))}
                  </address>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-heading font-semibold text-vgu-red group-hover:gap-2 transition-all duration-200">
                    Get directions <IconArrowRight size={12} stroke={2.25} />
                  </span>
                </div>
              </a>

              {/* Office hours card */}
              <div
                data-animate="fade-up"
                style={{ animationDelay: '160ms' }}
                className="flex items-start gap-4 rounded-2xl bg-white border border-neutral-200/80 p-5 md:p-6
                           shadow-[0_8px_28px_rgba(17,24,39,0.08)]
                           hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(17,24,39,0.14)]
                           transition-all duration-300"
              >
                <div
                  className="flex-none w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #C04036, #821a12)',
                    boxShadow: '0 6px 18px rgba(192,64,54,0.32)',
                  }}
                >
                  <IconClock size={20} stroke={2} className="text-white" />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-2.5">
                    Office hours (IST)
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {OFFICE_HOURS.map((row) => (
                      <li
                        key={row.d}
                        className="flex items-center justify-between gap-3 text-[13px] md:text-[14px] font-body"
                      >
                        <span className="text-neutral-600">{row.d}</span>
                        <span className={row.h === 'Closed' ? 'text-neutral-400' : 'font-semibold text-neutral-900'}>
                          {row.h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Socials card */}
              <div
                data-animate="fade-up"
                style={{ animationDelay: '240ms' }}
                className="rounded-2xl bg-white border border-neutral-200/80 p-5 md:p-6
                           shadow-[0_8px_28px_rgba(17,24,39,0.08)]
                           hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(17,24,39,0.14)]
                           transition-all duration-300"
              >
                <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-3">
                  Find us on
                </p>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_ITEMS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className={[
                        'group inline-flex items-center justify-center w-11 h-11 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:text-white hover:-translate-y-0.5 transition-all duration-200',
                        s.hover,
                      ].join(' ')}
                    >
                      <s.Icon size={18} stroke={1.75} className="transition-transform duration-200 group-hover:scale-110" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ Visit our campus (Map) ══ */}
      <section className="bg-white py-12 md:py-16 lg:py-20 px-5 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px]">

          {/* Section header */}
          <div data-animate="fade-up" className="max-w-[680px] mb-8 md:mb-10">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Visit our campus
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[36px] lg:text-[40px] tracking-[-0.5px] leading-[1.15] text-neutral-900 mb-3">
              Find us in Jaipur
            </h2>
            <p className="text-[16px] font-body leading-[1.7] text-neutral-500">
              Drop by the VGU campus in Jagatpura for a guided tour, or attend one of our scheduled
              immersion events.
            </p>
          </div>

          {/* Map container */}
          <div
            data-animate="fade-up"
            className="relative rounded-2xl overflow-hidden border border-neutral-200/80 shadow-[0_12px_36px_rgba(17,24,39,0.12)]"
          >
            <iframe
              src={MAP_EMBED_URL}
              title="VGU Campus location on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block w-full h-[280px] sm:h-[360px] md:h-[440px] lg:h-[480px] border-0"
            />

            {/* Floating info card - desktop only */}
            <div className="hidden md:block absolute top-5 left-5 max-w-[300px] rounded-2xl bg-white border border-neutral-200/80 p-5 shadow-[0_16px_40px_rgba(17,24,39,0.22)]">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex-none w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #C04036, #821a12)',
                    boxShadow: '0 6px 18px rgba(192,64,54,0.32)',
                  }}
                >
                  <IconMapPin size={18} stroke={2} className="text-white" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-1">
                    Campus address
                  </p>
                  <p className="font-heading font-bold text-[14px] text-neutral-900 leading-snug">
                    Vivekananda Global University
                  </p>
                </div>
              </div>
              <p className="text-[13px] font-body text-neutral-600 mb-4 leading-relaxed">
                {addressLines.map((line, i) => (
                  <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                ))}
              </p>
              <a
                href={MAP_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white font-heading font-semibold text-[13px] px-4 py-2 transition-all duration-200 shadow-[0_4px_12px_rgba(192,64,54,0.28)] whitespace-nowrap"
              >
                <IconMapPin size={14} stroke={2.25} />
                Get directions
              </a>
            </div>
          </div>

          {/* Mobile-only directions CTA below map */}
          <a
            href={MAP_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden mt-4 inline-flex items-center justify-center gap-2 w-full rounded-md bg-vgu-red hover:bg-vgu-red-dark text-white font-heading font-semibold text-[15px] px-6 py-3 transition-all duration-200 shadow-[0_4px_16px_rgba(192,64,54,0.28)] whitespace-nowrap"
          >
            <IconMapPin size={16} stroke={2} />
            Open in Google Maps
          </a>
        </div>
      </section>

      {/* ══ Departments ══ */}
      <section className="bg-neutral-50 py-12 md:py-16 lg:py-20 px-5 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px]">

          {/* Section header */}
          <div data-animate="fade-up" className="max-w-[680px] mb-8 md:mb-12">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Find the right team
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[36px] lg:text-[40px] tracking-[-0.5px] leading-[1.15] text-neutral-900">
              Who would you like to reach?
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {DEPARTMENTS.map((d, i) => (
              <a
                key={d.label}
                href={d.href}
                data-animate="fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
                className="group flex flex-row items-start sm:flex-col rounded-2xl bg-white border border-neutral-200/80 p-4 sm:p-5 md:p-6
                           shadow-[0_8px_28px_rgba(17,24,39,0.08)]
                           hover:-translate-y-1.5 hover:border-vgu-red/30
                           hover:shadow-[0_18px_40px_rgba(192,64,54,0.18)]
                           transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="flex-none w-12 h-12 rounded-xl flex items-center justify-center mr-4 sm:mr-0 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #C04036, #821a12)',
                    boxShadow: '0 6px 18px rgba(192,64,54,0.32)',
                  }}
                >
                  <d.Icon size={22} stroke={1.75} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-[16px] md:text-[17px] text-neutral-900 leading-snug mb-1.5 group-hover:text-vgu-red transition-colors duration-200">
                    {d.label}
                  </h3>
                  <p className="text-[13px] md:text-[14px] font-body text-neutral-500 leading-[1.6] mb-3 sm:mb-5">
                    {d.desc}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-heading font-semibold text-vgu-red group-hover:gap-2.5 transition-all duration-200">
                    Email this team
                    <IconArrowRight size={13} stroke={2.25} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Mini-FAQ ══ */}
      <section className="bg-white py-12 md:py-16 lg:py-20 px-5 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[860px]">

          {/* Section header */}
          <div data-animate="fade-up" className="text-center mb-8 md:mb-12">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Before you contact us
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[36px] lg:text-[40px] tracking-[-0.5px] leading-[1.15] text-neutral-900">
              Quick answers
            </h2>
          </div>

          {/* FAQ list */}
          <div className="flex flex-col gap-3 md:gap-4">
            {MINI_FAQS.map((item, i) => (
              <details
                key={item.q}
                data-animate="fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
                className="group rounded-2xl bg-white border border-neutral-200/80 overflow-hidden
                           shadow-[0_4px_16px_rgba(17,24,39,0.05)]
                           hover:border-vgu-red/25 hover:shadow-[0_8px_24px_rgba(17,24,39,0.09)]
                           open:border-vgu-red/30 open:shadow-[0_12px_32px_rgba(192,64,54,0.12)]
                           transition-all duration-200"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-heading font-semibold text-[16px] text-neutral-900 leading-snug group-open:text-vgu-red transition-colors duration-200">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex-none w-8 h-8 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center transition-all duration-200 group-open:bg-vgu-red group-open:border-vgu-red"
                  >
                    <IconPlus
                      size={16}
                      stroke={2.25}
                      className="text-neutral-500 transition-all duration-200 group-open:rotate-45 group-open:text-white"
                    />
                  </span>
                </summary>
                <div className="px-5 pb-5 md:px-6 md:pb-6">
                  <p className="text-[16px] font-body text-neutral-600 leading-[1.7]">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* Footer link */}
          <p data-animate="fade-up" className="mt-8 md:mt-10 text-center text-[14px] font-body text-neutral-500">
            Need more details?{' '}
            <Link href="/#faq" className="font-heading font-semibold text-vgu-red hover:underline">
              Read the full FAQ <IconArrowRight size={12} stroke={2.25} className="inline-block ml-0.5 -mt-0.5" />
            </Link>
          </p>
        </div>
      </section>

      {/* ══ Counsellors ══ */}
      <section className="sketch-hover-group relative overflow-hidden bg-neutral-50 py-12 md:py-16 lg:py-20 px-5 md:px-8 lg:px-12">
        <SketchFlourish shape="arc" color="red" opacity={0.06} strokeWidth={24} durationMs={2200} />
        <div className="relative z-10 mx-auto max-w-[1280px]">

          {/* Section header */}
          <div data-animate="fade-up" className="text-center max-w-[640px] mx-auto mb-10 md:mb-14">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Meet your counsellors
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[36px] lg:text-[40px] tracking-[-0.5px] leading-[1.15] text-neutral-900">
              Real people you&apos;ll{' '}
              <br className="sm:hidden" />
              actually talk to
            </h2>
          </div>

          {/* Counsellor cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {COUNSELLORS.map((c, i) => (
              <div
                key={c.name}
                data-animate="fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
                className="group flex flex-col items-center text-center rounded-2xl bg-white border border-neutral-200/80 p-5 sm:p-6 md:p-7
                           shadow-[0_8px_28px_rgba(17,24,39,0.08)]
                           hover:-translate-y-1.5 hover:border-vgu-red/25
                           hover:shadow-[0_18px_40px_rgba(192,64,54,0.16)]
                           transition-all duration-300"
              >
                {/* Avatar photo */}
                <div
                  className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-105 ring-2 ring-white shadow-[0_12px_32px_rgba(192,64,54,0.28)]"
                >
                  <Image
                    src={c.photo}
                    alt={c.name}
                    fill
                    sizes="(min-width: 768px) 96px, (min-width: 640px) 80px, 64px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Name */}
                <h3 className="font-heading font-bold text-[17px] md:text-[19px] text-neutral-900 mb-1">
                  {c.name}
                </h3>

                {/* Role */}
                <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-4">
                  {c.role}
                </p>

                {/* Bio */}
                <p className="text-[16px] font-body text-neutral-600 leading-[1.65] mb-5">
                  {c.bio}
                </p>

                {/* Languages */}
                <div className="mt-auto pt-4 w-full border-t border-neutral-100">
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.06em] text-neutral-400 mb-2.5">
                    Speaks
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {c.languages.map((lang) => (
                      <span
                        key={lang}
                        className="inline-flex items-center rounded-full bg-neutral-50 border border-neutral-200 px-2.5 py-1 text-[11px] md:text-[12px] font-body font-medium text-neutral-600"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
