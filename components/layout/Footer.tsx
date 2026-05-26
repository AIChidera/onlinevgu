import Link from 'next/link'

const PROGRAMME_LINKS = [
  { label: 'BBA',                href: '/programs/bba'              },
  { label: 'BCA',                href: '/programs/bca'              },
  { label: 'MBA Healthcare',     href: '/programs/mba-healthcare'   },
  { label: 'Executive MBA',      href: '/programs/exec-mba'         },
  { label: 'MCA',                href: '/programs/mca'              },
  { label: 'MSc Data Science',   href: '/programs/msc-data-science' },
]

const COMPANY_LINKS = [
  { label: 'About VGU',      href: '/about'           },
  { label: 'Accreditations', href: '/#accreditation'  },
  { label: 'Campus Life',    href: '/#campus'         },
  { label: 'Blog',           href: '/blog'            },
  { label: 'Careers',        href: '/about#careers'   },
]

const SUPPORT_LINKS = [
  { label: 'FAQs',            href: '/#faq'          },
  { label: 'Contact Us',      href: '/contact'       },
  { label: 'Apply Now',       href: '#counsellor'    },
  { label: 'Download Brochure', href: '/apply#brochure' },
  { label: 'Student Portal',  href: 'https://lms.vgu.ac.in' },
]

const SOCIALS = [
  {
    label: 'LinkedIn',
    href:  '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.3 18.3V9.7H5.7v8.6h2.6zM7 8.6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11.3 9.7v-4.7c0-2.4-1.3-3.5-3-3.5a2.6 2.6 0 0 0-2.3 1.3V9.7h-2.6v8.6H13v-4.6c0-1.2.4-2 1.6-2 1.2 0 1.5.9 1.5 2v4.6h2.2z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 11.4a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2z"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href:  '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23 7s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.1-1C16.9 3.5 12 3.5 12 3.5s-4.9 0-7.9.2c-.5 0-1.3.1-2.1 1C1.2 5.4 1 7 1 7S.8 8.9.8 10.7v1.7C.8 14.3 1 16.2 1 16.2s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.7.2 7.7.2s4.9 0 7.9-.2c.5-.1 1.3-.1 2.1-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.7C23.2 8.9 23 7 23 7zM9.8 14.4V7.9l6.3 3.3-6.3 3.2z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href:  '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-vgu-dark text-white/80 pt-16 pb-6 font-body">
      <div className="mx-auto max-w-[1280px] px-12 lg:px-8 md:px-5">

        {/* Main grid */}
        <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 xl:grid-cols-2 md:grid-cols-1 pb-12 border-b border-white/10">

          {/* Brand col */}
          <div>
            <Link href="/" className="font-heading font-bold text-[22px] text-white tracking-tight">
              Online VGU
            </Link>
            <p className="mt-3 text-[14px] font-body leading-[1.7] text-white/60 max-w-[280px]">
              UGC-entitled online degrees from Vivekananda Global University — NAAC A+ accredited,
              AICTE approved. Trusted by 50,000+ learners across India.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-150 hover:-translate-y-0.5"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-6 flex flex-col gap-2 text-[13px] text-white/55">
              <span>📞 1800 123 456 · Mon–Sat 9am–7pm IST</span>
              <span>✉ admissions@onlinevgu.in</span>
              <span>📍 Vivekananda Global University, Jaipur, Rajasthan 303012</span>
            </div>
          </div>

          {/* Programmes */}
          <FooterCol title="Programmes" links={PROGRAMME_LINKS} />

          {/* Company */}
          <FooterCol title="Company" links={COMPANY_LINKS} />

          {/* Support */}
          <FooterCol title="Support" links={SUPPORT_LINKS} />
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[12px] text-white/40">
          <span>© {new Date().getFullYear()} Vivekananda Global University. All rights reserved.</span>
          <div className="flex flex-wrap gap-5">
            {['Privacy Policy', 'Terms of Use', 'Refund Policy', 'Disclaimer'].map((t) => (
              <a key={t} href="#" className="hover:text-white/70 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 className="mb-4 font-heading text-[12px] font-bold uppercase tracking-[0.08em] text-white">
        {title}
      </h5>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-[13px] font-body text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
