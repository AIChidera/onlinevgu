import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { IconPhone, IconBrandWhatsapp, IconMail, IconMapPin, IconClock, IconArrowRight } from '@tabler/icons-react'

// Placeholder — replace with '/images/contact-hero-bg.jpg' when ready.
const HERO_IMAGE_SRC = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&q=80&auto=format&fit=crop'
import ContactForm from '@/components/forms/ContactForm'
import StrokeArt from '@/components/ui/StrokeArt'
import Breadcrumb from '@/components/ui/Breadcrumb'

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

const CONTACT_CHANNELS = [
  {
    Icon: IconPhone,
    title: 'Call us',
    primary: '1800 123 456',
    sub: 'Toll-free · Mon-Sat, 9am-7pm IST',
    href: 'tel:+911800123456',
    cta: 'Call now',
    color: 'bg-blue-50 border-blue-100 text-blue-700',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    Icon: IconBrandWhatsapp,
    title: 'WhatsApp',
    primary: '+91 98765 43210',
    sub: 'Usually replies in 15 minutes',
    href: 'https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20know%20more%20about%20VGU%20online%20programs',
    cta: 'Chat now',
    color: 'bg-green-50 border-green-100 text-green-700',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    Icon: IconMail,
    title: 'Email',
    primary: 'admissions@onlinevgu.in',
    sub: 'Replies within 24 hours',
    href: 'mailto:admissions@onlinevgu.in',
    cta: 'Send email',
    color: 'bg-vgu-red/5 border-vgu-red/15 text-vgu-red',
    iconBg: 'bg-vgu-red/10',
    iconColor: 'text-vgu-red',
  },
]

export default function ContactPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      {/* ══ Hero ══ */}
      <section className="relative overflow-hidden">
        {/* Background image behind gradient overlay — set HERO_IMAGE_SRC above to activate */}
        {HERO_IMAGE_SRC && (
          <Image src={HERO_IMAGE_SRC} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        )}
        <div
          className="absolute inset-0"
          style={{ background: HERO_IMAGE_SRC ? 'linear-gradient(135deg, rgba(192,64,54,0.93) 0%, rgba(130,26,18,0.96) 100%)' : 'linear-gradient(135deg, #C04036 0%, #821a12 100%)' }}
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
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[13px] font-body text-white/55">
            <Link href="/" className="hover:text-white transition-colors duration-150">Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80">Contact</span>
          </nav>

          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-4">
            We&apos;re here to help
          </p>
          <h1 className="font-heading font-black text-[36px] md:text-[48px] lg:text-[64px] tracking-[-2px] leading-[0.95] text-white">
            Talk to a real<br />
            <span className="text-vgu-yellow">counsellor.</span>
          </h1>
          <p className="mt-6 text-[15px] font-body leading-[1.7] text-white/75 max-w-[520px] lg:text-[17px]">
            No chatbots. No automated hold queues. A trained VGU admissions
            counsellor will answer your questions - free and no obligation.
          </p>

          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2.5 text-[14px] font-body text-white/70">
              <IconClock size={16} className="text-white/50" stroke={1.5} />
              Mon-Sat, 9am-7pm IST
            </div>
            <div className="w-px h-4 bg-white/20" aria-hidden="true" />
            <div className="flex items-center gap-2.5 text-[14px] font-body text-white/70">
              Average response: <strong className="text-white">2 minutes</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Contact channels ══ */}
      <section className="bg-white py-16 px-5 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CONTACT_CHANNELS.map((c, i) => (
              <div
                key={c.title}
                data-animate="materialize"
                style={{ animationDelay: `${i * 80}ms` }}
                className={['rounded-2xl border p-6 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(17,24,39,0.08)] transition-all duration-200', c.color].join(' ')}
              >
                <div className={['w-12 h-12 rounded-xl flex items-center justify-center mb-4', c.iconBg].join(' ')}>
                  <c.Icon size={22} className={c.iconColor} stroke={1.5} />
                </div>
                <h2 className="font-heading font-bold text-[18px] text-neutral-900 mb-1">{c.title}</h2>
                <p className="font-heading font-semibold text-[15px] text-neutral-800 mb-1">{c.primary}</p>
                <p className="text-[13px] font-body text-neutral-500 mb-5">{c.sub}</p>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 text-[14px] font-heading font-semibold text-vgu-red hover:gap-2.5 transition-all duration-150"
                >
                  {c.cta} <IconArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Form + Address ══ */}
      <section className="bg-neutral-50 py-16 px-5 md:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">

            {/* Left: form */}
            <div data-animate="slide-from-left">
              <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
                Send a message
              </p>
              <h2 className="font-heading font-bold text-[26px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-2 md:text-[36px]">
                Leave us a message
              </h2>
              <p className="text-[16px] font-body leading-[1.7] text-neutral-500 mb-8">
                Fill in your question and we&apos;ll get back within 24 hours.
              </p>
              <div className="rounded-2xl bg-white border border-neutral-200 p-8 shadow-[0_2px_12px_rgba(17,24,39,0.05)] md:p-5">
                <ContactForm />
              </div>
            </div>

            {/* Right: address + office hours */}
            <div data-animate="slide-from-right" className="flex flex-col gap-5 lg:sticky lg:top-[120px]">

              {/* Address */}
              <div className="rounded-2xl bg-white border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-vgu-red/10 flex items-center justify-center flex-none">
                    <IconMapPin size={18} className="text-vgu-red" stroke={1.5} />
                  </div>
                  <h3 className="font-heading font-bold text-[16px] text-neutral-900">Campus Address</h3>
                </div>
                <address className="not-italic text-[14px] font-body text-neutral-600 leading-[1.8]">
                  Vivekananda Global University<br />
                  VGU Campus, Jagatpura<br />
                  Jaipur, Rajasthan - 303 012<br />
                  India
                </address>
              </div>

              {/* Office hours */}
              <div className="rounded-2xl bg-white border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-vgu-red/10 flex items-center justify-center flex-none">
                    <IconClock size={18} className="text-vgu-red" stroke={1.5} />
                  </div>
                  <h3 className="font-heading font-bold text-[16px] text-neutral-900">Office Hours</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { days: 'Monday - Friday', hours: '9:00 am - 7:00 pm IST' },
                    { days: 'Saturday',         hours: '9:00 am - 5:00 pm IST' },
                    { days: 'Sunday',            hours: 'Closed' },
                  ].map((row) => (
                    <div key={row.days} className="flex items-center justify-between gap-4 text-[14px] font-body">
                      <span className="text-neutral-600">{row.days}</span>
                      <span className={row.hours === 'Closed' ? 'text-neutral-400' : 'font-semibold text-neutral-900'}>
                        {row.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick CTA */}
              <a
                href="#counsellor"
                className="flex items-center justify-center gap-2 rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white py-3.5 text-[15px] font-semibold font-heading transition-all duration-200 shadow-[0_4px_16px_rgba(192,64,54,0.28)]"
              >
                Talk to a Counsellor
                <IconArrowRight size={16} />
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
