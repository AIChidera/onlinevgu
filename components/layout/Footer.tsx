import Link from 'next/link'
import Image from 'next/image'

const PROGRAMS_LINKS = [
  { label: 'Online MBA',   href: '/programs/online-mba' },
  { label: 'Online MCA',   href: '/programs/online-mca' },
  { label: 'Online M.Com', href: '/programs/online-mcom' },
  { label: 'Online BBA',   href: '/programs/online-bba' },
  { label: 'Online BCA',   href: '/programs/online-bca' },
  { label: 'All programs', href: '/programs' },
]

const ABOUT_LINKS = [
  { label: 'Why VGU',        href: '/#why-vgu' },
  { label: 'Accreditations', href: '/#accreditation' },
  { label: 'Faculty',        href: '/#faculty' },
  { label: 'Placements',     href: '/#placements' },
  { label: 'Press & Media',  href: '/about#media' },
  { label: 'Careers',        href: '/about#careers' },
]

const RESOURCE_LINKS = [
  { label: 'Download brochure',  href: '/apply#brochure' },
  { label: 'Fee structure',      href: '/programs#fees' },
  { label: 'EMI plans',          href: '/programs#emi' },
  { label: 'Scholarships',       href: '/apply#scholarships' },
  { label: 'Sample certificates',href: '/about#certificates' },
  { label: 'FAQs',               href: '/#faqs' },
]

const SOCIALS = [
  { id: 'facebook',  href: '#', label: 'Facebook',  hoverBg: 'hover:bg-[#1877F2]' },
  { id: 'linkedin',  href: '#', label: 'LinkedIn',  hoverBg: 'hover:bg-[#0A66C2]' },
  { id: 'instagram', href: '#', label: 'Instagram', hoverBg: 'hover:bg-gradient-to-br hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5]' },
  { id: 'youtube',   href: '#', label: 'YouTube',   hoverBg: 'hover:bg-[#FF0000]' },
]

export default function Footer() {
  return (
    <footer className="bg-vgu-red-dark text-white/85 pt-20 pb-6 font-body">
      <div className="mx-auto max-w-content px-12 md:px-5">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1.1fr] gap-10 xl:grid-cols-2 md:grid-cols-1">
          {/* Brand */}
          <div>
            <Image
              src="/assets/logo.svg"
              alt="Online VGU"
              width={140}
              height={36}
              className="brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-[280px]">
              India&apos;s accredited online university. UGC-entitled degrees, NAAC A+ accredited,
              recognised by AICTE. Built for working professionals and fresh graduates.
            </p>
            <div className="mt-4 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  className={[
                    'flex h-9 w-9 items-center justify-center rounded-full',
                    'bg-white/10 text-white transition-all duration-200',
                    'hover:-translate-y-0.5',
                    s.hoverBg,
                  ].join(' ')}
                >
                  <SocialIcon id={s.id} />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <FooterCol title="Programs" links={PROGRAMS_LINKS} />

          {/* About */}
          <FooterCol title="About" links={ABOUT_LINKS} />

          {/* Resources */}
          <FooterCol title="Resources" links={RESOURCE_LINKS} />

          {/* Contact */}
          <div>
            <h5 className="mb-4 font-heading text-[13px] font-bold uppercase tracking-widest text-white">
              Talk to us
            </h5>
            <div className="flex flex-col gap-3">
              <ContactRow icon="phone">
                <div>
                  <div className="font-heading font-bold">1800 123 456</div>
                  <div className="text-xs text-white/60">Mon–Sat, 9am–7pm IST</div>
                </div>
              </ContactRow>
              <ContactRow icon="mail">
                <a href="mailto:admissions@onlinevgu.in" className="text-white/85 hover:text-white text-sm">
                  admissions@onlinevgu.in
                </a>
              </ContactRow>
              <ContactRow icon="map-pin">
                <span className="text-sm">
                  Vivekananda Global University<br />
                  Jaipur, Rajasthan 303012
                </span>
              </ContactRow>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-[13px] text-white/65">
          <span>© {new Date().getFullYear()} Vivekananda Global University. All rights reserved.</span>
          <div className="flex flex-wrap gap-6">
            {['Privacy policy', 'Terms of use', 'Refund policy', 'Disclaimer'].map((t) => (
              <a key={t} href="#" className="hover:text-white transition-colors">{t}</a>
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
      <h5 className="mb-4 font-heading text-[13px] font-bold uppercase tracking-widest text-white">
        {title}
      </h5>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-white/75 hover:text-white transition-colors hover:underline underline-offset-3"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactRow({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-vgu-yellow">
        <ContactIcon name={icon} />
      </span>
      <div className="text-sm text-white/85">{children}</div>
    </div>
  )
}

function ContactIcon({ name }: { name: string }) {
  const props = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (name === 'phone') return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12 19.79 19.79 0 0 1 1.06 3.38 2 2 0 0 1 3.04 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  if (name === 'mail')  return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
  return <svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}

function SocialIcon({ id }: { id: string }) {
  const sz = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true }
  if (id === 'facebook')  return <svg {...sz}><path d="M22 12a10 10 0 1 0-11.6 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>
  if (id === 'linkedin')  return <svg {...sz}><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.3 18.3V9.7H5.7v8.6h2.6zM7 8.6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11.3 9.7v-4.7c0-2.4-1.3-3.5-3-3.5a2.6 2.6 0 0 0-2.3 1.3V9.7h-2.6v8.6H13v-4.6c0-1.2.4-2 1.6-2 1.2 0 1.5.9 1.5 2v4.6h2.2z"/></svg>
  if (id === 'youtube')   return <svg {...sz}><path d="M23 7s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.1-1C16.9 3.5 12 3.5 12 3.5s-4.9 0-7.9.2c-.5 0-1.3.1-2.1 1C1.2 5.4 1 7 1 7S.8 8.9.8 10.7v1.7C.8 14.3 1 16.2 1 16.2s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.7.2 7.7.2s4.9 0 7.9-.2c.5-.1 1.3-.1 2.1-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.7C23.2 8.9 23 7 23 7zM9.8 14.4V7.9l6.3 3.3-6.3 3.2z"/></svg>
  // instagram
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.4a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2z"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
}
