import Link from 'next/link'
import Image from 'next/image'
import { IconPhone, IconMail, IconMapPin } from '@tabler/icons-react'
import { getSiteConfig } from '@/lib/sanity'
import FooterLinkGroup from './FooterLinkGroup'

// Grouped Undergraduate-then-Postgraduate, most-popular-first within each
// group (MBA leads PG - it's flagged "Most Popular" sitewide) - mirrors the
// exact grouping/order already used in the navbar's Programs mega menu.
const PROGRAM_LINKS = [
  { label: 'Online BBA',      href: '/programs/bba'      },
  { label: 'Online BBA-AAFT', href: '/programs/bba-aaft' },
  { label: 'Online BCA',      href: '/programs/bca'      },
  { label: 'Online BA',       href: '/programs/ba'       },
  { label: 'Online MBA',      href: '/programs/mba'      },
  { label: 'Online MBA-IF',   href: '/programs/mba-if'   },
  { label: 'Online MBA-DFAA', href: '/programs/mba-dfaa' },
  { label: 'Online MCA',      href: '/programs/mca'      },
  { label: 'Online MA English', href: '/programs/ma'     },
  { label: 'Online M.Sc',     href: '/programs/msc'      },
  { label: 'Online MAJMC',    href: '/programs/majmc'    },
]

// Merges the site's "about/discover" links with its action/support links into
// one column - the live site's own "Discover Us" mostly duplicates content we
// already place elsewhere (Terms in the bottom bar, CIQA in Resources), so a
// standalone column for it would be nearly empty. Folding it into Discover Us
// keeps every real link while freeing a column for "For Enrolled Students"
// below. Leadership, Community, and Approvals and Accreditation are kept as
// `#` placeholders - they're dead links on the live site too, reproduced here
// exactly as-is rather than pointed somewhere real.
//
// Ordered top-to-bottom as a funnel: who we are -> what we offer/produce ->
// answer objections/get help -> take action. Apply Now sits last on purpose -
// it's the strongest commitment ask, so it lands as the final item a scanning
// eye reaches, right after Download Brochure (the lower-commitment version of
// the same ask). "Student Portal" moved out of this column entirely - it's
// for enrolled students, not prospects, so it now lives in "For Enrolled
// Students" instead. Renamed "Careers" -> "Placements" to match the label
// the navbar already uses for the same /placements page and avoid reading as
// a VGU staff-hiring page.
const COMPANY_LINKS = [
  { label: 'About VGU',                     href: '/about'      },
  { label: 'Leadership',                    href: '#'           },
  { label: 'Community',                     href: '#'           },
  { label: 'Approvals and Accreditation',   href: '#'           },
  { label: 'Campus Life',                   href: '/#campus'    },
  { label: 'Blog',                          href: '/blog'       },
  { label: 'Placements',                    href: '/placements' },
  { label: 'FAQs',              href: '/#faq'               },
  { label: 'Contact Us',        href: '/contact'            },
  { label: 'Download Brochure', href: '/apply#brochure', brochureTrigger: true },
  { label: 'Apply Now',         href: '#counsellor',        applyTrigger: true },
]

// Ordered trust/compliance documents first (the column's real job for a
// prospect is proving legitimacy - UGC Approval leads since "UGC Entitled"
// is the credibility signal called out at the top of the homepage), then the
// one policy doc that matters right before paying (Refund Policy), then the
// lower-urgency engagement/notice content last. Academic Calendar, Newsletter,
// Announcements, and Important Notices all point at their own dedicated,
// anchored section on /updates (see app/updates/page.tsx) rather than a raw
// PDF link, so Academic Calendar and Newsletter are no longer external/newTab.
const RESOURCE_LINKS = [
  { label: 'UGC Approval',       href: '/documents/ugc-approval.pdf',  newTab: true },
  { label: 'AICTE - NOC',        href: '/documents/aicte-noc.pdf',     newTab: true },
  { label: 'CIQA',               href: 'https://cdoevgu.com/ciqa.php', newTab: true },
  { label: 'Refund Policy',      href: '/documents/refund-policy.pdf', newTab: true },
  { label: 'Academic Calendar',  href: '/updates#academic-calendar' },
  { label: 'Newsletter',         href: '/updates#newsletter' },
  { label: 'Announcements',      href: '/updates#announcements' },
  { label: 'Important Notices',  href: '/updates#notices' },
]

// For enrolled students - same order as the live site's column (LMS 1, LMS 2,
// Exam Fee, Exam Form, Result), same hrefs too. The live site's last item is
// a dead "Existing Learners" `#` placeholder; we swap in "Student Portal"
// (our own real hub, see /student-portal) in that exact slot since it's the
// working equivalent of the same "everything else for enrolled students" idea.
const ENROLLED_LINKS = [
  { label: 'LMS 1 (BBA, MBA)',                                      href: 'https://lms.onlinevgu.com/login',                                     newTab: true },
  { label: 'LMS 2 (BA, BCA, MCA, M.Sc., Maths, MA English, MA JMC)', href: 'https://ol.vgu.universitycopilot.com/login',                          newTab: true },
  { label: 'Exam Fee',                                              href: 'https://smartpay.easebuzz.in/168702/f96d8ee7dc46400ba2df37045bc2db65', newTab: true },
  { label: 'Exam Form',                                             href: 'https://vguerp.epravesh.com/public/login',                            newTab: true },
  { label: 'Result',                                                href: 'https://vguerp.epravesh.com/public/login',                            newTab: true },
  { label: 'Student Portal',                                        href: '/student-portal' },
]

const MAPS_URL = 'https://www.google.com/maps/place/Vivekananda+Global+University/@26.8120353,75.8915397,17z/data=!3m1!4b1!4m6!3m5!1s0x396dc873264c3df3:0x4c7b45a9ce474b8!8m2!3d26.8120353!4d75.8915397!16s%2Fm%2F012wp4bp'

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


  return (
    <footer className="bg-vgu-dark text-white/80 pt-16 pb-6 font-body">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_0.85fr_0.85fr_0.85fr_0.85fr] gap-8 lg:gap-10 lg:pb-12 lg:border-b lg:border-white/10">

            {/* Brand col */}
            <div data-animate="fade-up">
              <Link href="/" className="flex-none" aria-label="Online VGU - Home">
                <Image
                  src="/logos/vgu-logo-white.png"
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
              <div className="mt-5 flex gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={socialHrefs[s.label] ?? s.href}
                    aria-label={s.label}
                    className={[
                      'flex h-11 w-11 items-center justify-center rounded-full border border-white/15',
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
              <div className="mt-6 flex flex-col divide-y divide-white/[0.06] text-[13px] text-white/55 lg:divide-y-0 lg:gap-2.5">
                <a href={`tel:${config.phoneTel}`} className="flex min-h-[44px] items-center gap-2.5 py-2.5 hover:text-white/80 transition-colors duration-150 lg:min-h-0 lg:py-0">
                  <IconPhone size={14} className="flex-none text-white/40" />
                  <span><span className="text-white/35 text-[11px] font-heading uppercase tracking-[0.06em] mr-1">Admissions</span>{config.phone}</span>
                </a>
                <a href="tel:+919549086333" className="flex min-h-[44px] items-center gap-2.5 py-2.5 hover:text-white/80 transition-colors duration-150 lg:min-h-0 lg:py-0">
                  <IconPhone size={14} className="flex-none text-white/40" />
                  <span><span className="text-white/35 text-[11px] font-heading uppercase tracking-[0.06em] mr-1">Student Helpline</span>+91 95490 86333</span>
                </a>
                <a href={`mailto:${config.email}`} className="flex min-h-[44px] items-center gap-2.5 py-2.5 hover:text-white/80 transition-colors duration-150 lg:min-h-0 lg:py-0">
                  <IconMail size={14} className="flex-none text-white/40" />
                  {config.email}
                </a>
                <div className="flex min-h-[44px] items-start gap-2.5 py-2.5 text-white/55 lg:min-h-0 lg:py-0">
                  <IconMapPin size={14} className="flex-none text-white/40 mt-[14px] lg:mt-[2px]" />
                  <span>{config.address.replace(/\n/g, ', ')}</span>
                </div>
              </div>

              {/* Get Directions - exact live-site Google Maps place link */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center min-h-[44px] rounded-md bg-black hover:bg-neutral-900 text-white font-heading font-semibold text-[14px] px-6 py-3 transition-all duration-200"
              >
                Get Directions
              </a>
            </div>

            {/* Company / Programs / Resources / For Enrolled Students - matches the
                live site's column order (Discover Us, Online Programs, Resources,
                For Enrolled Students) exactly. Stacked accordions on mobile,
                plain columns on desktop. */}
            <FooterLinkGroup title="Discover Us" links={COMPANY_LINKS} delay={80} />
            <FooterLinkGroup title="Online Programs" links={PROGRAM_LINKS} delay={160} />
            <FooterLinkGroup title="Resources" links={RESOURCE_LINKS} delay={240} />
            <FooterLinkGroup title="For Enrolled Students" links={ENROLLED_LINKS} delay={320} />
          </div>

          {/* Bottom bar */}
          <div className="mt-6 flex flex-col gap-3 text-[12px] text-white/40 lg:flex-row lg:items-center lg:justify-between">
            <span>© {new Date().getFullYear()} Vivekananda Global University. All rights reserved.</span>
            <div className="flex flex-wrap gap-5">
              <a href="/terms" className="flex items-center min-h-[44px] text-white/60 hover:text-white transition-colors">Terms &amp; Conditions</a>
              <a href="/privacy" className="flex items-center min-h-[44px] text-white/60 hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
  )
}
