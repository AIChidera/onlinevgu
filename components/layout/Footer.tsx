import Link from 'next/link'
import Image from 'next/image'
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react'
import { getSiteConfig } from '@/lib/sanity'

const PROGRAM_LINKS = [
  { label: 'BBA',      href: '/programs/bba'      },
  { label: 'BBA-AAFT', href: '/programs/bba-aaft' },
  { label: 'MBA',      href: '/programs/mba'      },
  { label: 'MBA-IF',   href: '/programs/mba-if'   },
  { label: 'MBA-DFAA', href: '/programs/mba-dfaa' },
  { label: 'BCA',      href: '/programs/bca'      },
  { label: 'MCA',      href: '/programs/mca'      },
  { label: 'BA',       href: '/programs/ba'       },
  { label: 'MA',       href: '/programs/ma'       },
  { label: 'M.Sc',     href: '/programs/msc'      },
  { label: 'MAJMC',    href: '/programs/majmc'    },
]

const COMPANY_LINKS = [
  { label: 'About VGU',   href: '/about'      },
  { label: 'Campus Life', href: '/#campus'    },
  { label: 'Blog',        href: '/blog'       },
  { label: 'Careers',     href: '/placements' },
]

const SUPPORT_LINKS = [
  { label: 'FAQs',              href: '/#faq'               },
  { label: 'Contact Us',        href: '/contact'            },
  { label: 'Apply Now',         href: '#counsellor',        applyTrigger: true },
  { label: 'Download Brochure', href: '/apply#brochure', brochureTrigger: true },
  { label: 'Student Portal',    href: '/student-portal'       },
]

const SOCIALS = [
  {
    label:      'LinkedIn',
    href:       '#',
    hoverClass: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.3 18.3V9.7H5.7v8.6h2.6zM7 8.6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11.3 9.7v-4.7c0-2.4-1.3-3.5-3-3.5a2.6 2.6 0 0 0-2.3 1.3V9.7h-2.6v8.6H13v-4.6c0-1.2.4-2 1.6-2 1.2 0 1.5.9 1.5 2v4.6h2.2z"/>
      </svg>
    ),
  },
  {
    label:      'Instagram',
    href:       '#',
    hoverClass: 'hover:bg-[#E1306C] hover:border-[#E1306C]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 11.4a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2z"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label:      'YouTube',
    href:       '#',
    hoverClass: 'hover:bg-[#FF0000] hover:border-[#FF0000]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23 7s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.1-1C16.9 3.5 12 3.5 12 3.5s-4.9 0-7.9.2c-.5 0-1.3.1-2.1 1C1.2 5.4 1 7 1 7S.8 8.9.8 10.7v1.7C.8 14.3 1 16.2 1 16.2s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.7.2 7.7.2s4.9 0 7.9-.2c.5-.1 1.3-.1 2.1-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.7C23.2 8.9 23 7 23 7zM9.8 14.4V7.9l6.3 3.3-6.3 3.2z"/>
      </svg>
    ),
  },
  {
    label:      'Twitter / X',
    href:       '#',
    hoverClass: 'hover:bg-[#111827] hover:border-[#111827]',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label:      'Facebook',
    href:       '#',
    hoverClass: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
]

export default async function Footer() {
  const config = await getSiteConfig()

  const socialHrefs: Record<string, string> = {
    LinkedIn:      config.socials.linkedin,
    Instagram:     config.socials.instagram,
    YouTube:       config.socials.youtube,
    'Twitter / X': config.socials.x,
    Facebook:      config.socials.facebook,
  }

  // For the map link URL - collapse address to one line and URL-encode
  const mapQuery = encodeURIComponent(config.address.replace(/\n/g, ', '))

  return (
    <footer className="bg-vgu-dark text-white/80 pt-16 pb-6 font-body">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-8 lg:gap-10 pb-12 border-b border-white/10">

            {/* Brand col */}
            <div data-animate="fade-up">
              <Link href="/" className="flex-none" aria-label="Online VGU - Home">
                <Image
                  src="/logos/vgu-logo.png"
                  alt="Online VGU"
                  width={200}
                  height={100}
                  unoptimized
                  className="h-11 w-auto object-contain"
                />
              </Link>
              <p className="mt-3 text-[14px] font-body leading-[1.7] text-white/60 max-w-[280px]">
                UGC-entitled online degrees from Vivekananda Global University - NAAC A+ accredited,
                AICTE approved. Trusted by 50,000+ learners across India.
              </p>

              {/* Social icons */}
              <div className="mt-5 flex gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={socialHrefs[s.label] ?? s.href}
                    aria-label={s.label}
                    className={[
                      'flex h-9 w-9 items-center justify-center rounded-full border border-white/15',
                      'bg-white/10 text-white/70 hover:text-white',
                      'transition-all duration-150 hover:-translate-y-0.5',
                      s.hoverClass,
                    ].join(' ')}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Contact */}
              <div className="mt-6 flex flex-col gap-2.5 text-[13px] text-white/55">
                <a href={`tel:${config.phoneTel}`} className="flex items-center gap-2.5 hover:text-white/80 transition-colors duration-150">
                  <IconPhone size={14} className="flex-none text-white/40" />
                  <span><span className="text-white/35 text-[11px] font-heading uppercase tracking-[0.06em] mr-1">Admissions</span>{config.phone}</span>
                </a>
                <a href="tel:+919549086333" className="flex items-center gap-2.5 hover:text-white/80 transition-colors duration-150">
                  <IconPhone size={14} className="flex-none text-white/40" />
                  <span><span className="text-white/35 text-[11px] font-heading uppercase tracking-[0.06em] mr-1">Student Helpline</span>+91 95490 86333</span>
                </a>
                <a href={`mailto:${config.email}`} className="flex items-center gap-2.5 hover:text-white/80 transition-colors duration-150">
                  <IconMail size={14} className="flex-none text-white/40" />
                  {config.email}
                </a>
                <a
                  href={`https://maps.google.com/?q=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-white/55 hover:text-white/80 transition-colors duration-150"
                >
                  <IconMapPin size={14} className="flex-none text-white/40 mt-[2px]" />
                  {config.address.replace(/\n/g, ', ')}
                </a>
              </div>
            </div>

            {/* Programs + Company: 2-col sub-grid on mobile; transparent on desktop so they flow into parent 4-col */}
            <div className="grid grid-cols-2 gap-6 lg:contents">
              <FooterCol title="Programs" links={PROGRAM_LINKS} delay={80} />
              <FooterCol title="Company" links={COMPANY_LINKS} delay={160} />
            </div>

            {/* Support */}
            <FooterCol title="Support" links={SUPPORT_LINKS} delay={240} />
          </div>

          {/* Bottom bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[12px] text-white/40">
            <span>© {new Date().getFullYear()} Vivekananda Global University. All rights reserved.</span>
            <div className="flex flex-wrap gap-5">
              <a href="/terms" className="text-white/60 hover:text-white transition-colors">Terms &amp; Conditions</a>
              <a href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
  )
}

function FooterCol({ title, links, delay = 0 }: { title: string; links: { label: string; href: string; applyTrigger?: boolean; brochureTrigger?: boolean }[]; delay?: number }) {
  return (
    <div data-animate="fade-up" style={{ animationDelay: `${delay}ms` }}>
      <h5 className="mb-4 font-heading text-[12px] font-semibold uppercase tracking-[0.08em] text-white">
        {title}
      </h5>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            {l.brochureTrigger ? (
              <button
                data-brochure-trigger="true"
                className="text-[13px] font-body text-white/60 hover:text-white transition-colors duration-150 text-left"
              >
                {l.label}
              </button>
            ) : (
              <Link
                href={l.href}
                {...(l.applyTrigger ? { 'data-apply-trigger': 'true' } : {})}
                className="text-[13px] font-body text-white/60 hover:text-white transition-colors duration-150"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
