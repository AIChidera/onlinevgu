import Link from 'next/link'
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react'
import { getSiteSettings } from '@/lib/sanity'

const PROGRAM_LINKS = [
  { label: 'BBA',            href: '/programs/bba'            },
  { label: 'BCA',            href: '/programs/bca'            },
  { label: 'B.Com',          href: '/programs/bcom'           },
  { label: 'MBA',            href: '/programs/mba'            },
  { label: 'MCA',            href: '/programs/mca'            },
  { label: 'MBA Healthcare', href: '/programs/mba-healthcare' },
]

const COMPANY_LINKS = [
  { label: 'About VGU',      href: '/about'          },
  { label: 'Accreditations', href: '/#accreditation' },
  { label: 'Campus Life',    href: '/#campus'        },
  { label: 'Blog',           href: 'https://blog.vgu.ac.in' },
  { label: 'Careers',        href: '/about#careers'  },
]

const SUPPORT_LINKS = [
  { label: 'FAQs',              href: '/#faq'               },
  { label: 'Contact Us',        href: '/contact'            },
  { label: 'Apply Now',         href: '#counsellor',        applyTrigger: true },
  { label: 'Download Brochure', href: '/apply#brochure'     },
  { label: 'Student Portal',    href: 'https://lms.vgu.ac.in' },
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
  const settings = await getSiteSettings()

  const phone        = settings?.phoneDisplay    || '1800 123 456'
  const email        = settings?.admissionsEmail || 'admissions@onlinevgu.in'
  const socialHrefs: Record<string, string> = {
    LinkedIn:    settings?.socialLinkedIn  || '#',
    Instagram:   settings?.socialInstagram || '#',
    YouTube:     settings?.socialYouTube   || '#',
    'Twitter / X': settings?.socialX      || '#',
    Facebook:    settings?.socialFacebook  || '#',
  }

  return (
    <footer className="bg-vgu-dark text-white/80 pt-16 pb-6 font-body">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-8 lg:gap-10 pb-12 border-b border-white/10">

            {/* Brand col */}
            <div data-animate="fade-up">
              <Link href="/" className="font-heading font-bold text-[22px] text-white tracking-tight">
                Online VGU
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
                <span className="flex items-center gap-2.5">
                  <IconPhone size={14} className="flex-none text-white/40" />
                  {phone} · Mon-Sat 9am-7pm IST
                </span>
                <span className="flex items-center gap-2.5">
                  <IconMail size={14} className="flex-none text-white/40" />
                  {email}
                </span>
                <a
                  href="https://maps.google.com/?q=Vivekananda+Global+University,+Jaipur,+Rajasthan+303012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-white/55 hover:text-white/80 transition-colors duration-150"
                >
                  <IconMapPin size={14} className="flex-none text-white/40 mt-[2px]" />
                  Vivekananda Global University, Jaipur, Rajasthan 303012
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
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Use',   href: '#'        },
                { label: 'Refund Policy',  href: '#'        },
                { label: 'Disclaimer',     href: '#'        },
              ].map((t) => (
                <a key={t.label} href={t.href} className="hover:text-white/70 transition-colors">{t.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
  )
}

function FooterCol({ title, links, delay = 0 }: { title: string; links: { label: string; href: string; applyTrigger?: boolean }[]; delay?: number }) {
  return (
    <div data-animate="fade-up" style={{ animationDelay: `${delay}ms` }}>
      <h5 className="mb-4 font-heading text-[12px] font-bold uppercase tracking-[0.08em] text-white">
        {title}
      </h5>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              {...(l.applyTrigger ? { 'data-apply-trigger': 'true' } : {})}
              className="text-[13px] font-body text-white/60 hover:text-white transition-colors duration-150"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
