import BrandIcon from '@/components/ui/BrandIcon'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import type { SanityHomePage } from '@/lib/sanity'
import {
  IconBriefcase,
  IconCode,
  IconDatabase,
  IconPalette,
  IconUsersGroup,
  IconSpeakerphone,
  IconCertificate,
  IconAward,
  IconChecklist,
  IconTrendingUp,
  IconCreditCard,
} from '@tabler/icons-react'

const COURSERA_PARTNERS = ['Google', 'IBM', 'Meta', 'AWS', 'Microsoft', 'DeepLearning.AI']
const PARTNER_LABEL: Record<string, string> = { 'DeepLearning.AI': 'DL.AI' }

// LinkedIn Learning doesn't organize its catalog by named content-provider
// brands the way Coursera does (no "Google/IBM/Meta" equivalent exists to
// show honestly), so its sub-grid uses real topic icons instead of logos -
// still a genuine, distinct visual per item, just not a fabricated partner.
const LEARNING_CATEGORIES = [
  { label: 'Business',    Icon: IconBriefcase   },
  { label: 'Technology',  Icon: IconCode        },
  { label: 'Data & AI',   Icon: IconDatabase    },
  { label: 'Creative',    Icon: IconPalette     },
  { label: 'Leadership',  Icon: IconUsersGroup  },
  { label: 'Marketing',   Icon: IconSpeakerphone },
]

// Coursera and LinkedIn Learning are both platform-level inclusions (not one
// nested under the other), so they get identical card layouts side by side -
// same icon+badge, heading, description, sub-grid and stat pill structure.
// Google/IBM/Meta etc. stay inside the Coursera card only, since those are
// Coursera's own content partners, one level below the platform itself -
// folding LinkedIn Learning into that same grid as a 7th logo would
// misrepresent it as a "partner brand" rather than a bundled platform.
// name/subLabel/items (the partner-logo and category sub-grids) stay
// code-driven - they're tied to BrandIcon's fixed icon set and to
// LEARNING_CATEGORIES' fixed icon imports, so free-text CMS values could
// silently render blank. Only heading/desc/stat text is CMS-editable
// (see FeaturesSection's `home` prop below).
const DEFAULT_PLATFORMS = [
  {
    key: 'coursera',
    name: 'Coursera',
    heading: '10,000+ world-class courses at no extra cost.',
    desc: 'Every VGU program comes bundled with a full Coursera licence. Earn certificates from Google, IBM, Meta and more, shareable directly to your LinkedIn profile.',
    subLabel: 'Top partners included',
    items: COURSERA_PARTNERS.map(name => ({ key: name, label: PARTNER_LABEL[name] ?? name, brandIcon: name, Icon: undefined as React.ComponentType<{ size?: number; className?: string }> | undefined })),
    statValue: '10,000+',
    statLabel: 'courses available',
  },
  {
    key: 'linkedin-learning',
    name: 'LinkedIn Learning',
    heading: 'Expert-led courses, zero extra cost.',
    desc: 'Every VGU program also includes LinkedIn Learning access. Build skills across business, technology, and creative disciplines, with certificates that post straight to your profile.',
    subLabel: 'Popular categories',
    items: LEARNING_CATEGORIES.map(c => ({ key: c.label, label: c.label, brandIcon: undefined as string | undefined, Icon: c.Icon })),
    statValue: 'Included',
    statLabel: 'for your full program duration',
  },
]

// Real, already-verified facts used elsewhere on this site (TrustBar,
// ImpactSection, MBA program page, Placements page) - restated here as a
// short scannable strip rather than invented. Tied to a fixed icon set,
// same reasoning as COURSERA_PARTNERS/LEARNING_CATEGORIES above, so this
// stays code-driven rather than a free-text CMS field.
const SELLING_POINTS = [
  { label: 'UGC-Entitled Degree',        Icon: IconCertificate },
  { label: 'NAAC A+ Accredited',         Icon: IconAward       },
  { label: 'No Entrance Exam',           Icon: IconChecklist   },
  { label: '95% Placement Support',      Icon: IconTrendingUp  },
  { label: 'Industry-Linked Curriculum', Icon: IconBriefcase   },
  { label: 'Merit Scholarships & EMI',   Icon: IconCreditCard  },
]

export default function FeaturesSection({ home }: { home?: SanityHomePage | null }) {
  const eyebrow = home?.coursePlatformsEyebrow || 'Why Online VGU'
  const heading = home?.coursePlatformsHeading || '10,000+ courses. Two platforms. Included free.'

  const overrides: Record<string, { heading?: string; description?: string; statValue?: string; statLabel?: string } | undefined> = {
    coursera: home?.courseraCard,
    'linkedin-learning': home?.linkedinCard,
  }
  const PLATFORMS = DEFAULT_PLATFORMS.map(p => {
    const o = overrides[p.key]
    return {
      ...p,
      heading:   o?.heading || p.heading,
      desc:      o?.description || p.desc,
      statValue: o?.statValue || p.statValue,
      statLabel: o?.statLabel || p.statLabel,
    }
  })

  return (
    <section id="features" className="sketch-hover-group group relative overflow-hidden bg-vgu-beige py-12 lg:py-24">
      <SketchFlourish shape="swoop"    color="red-dark" opacity={0.07} strokeWidth={20} />
      <SketchFlourish shape="monogram" color="red-dark" opacity={0.05} strokeWidth={20} className="translate-x-1/3 translate-y-1/3" />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">

        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-8 md:mb-12">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            {eyebrow}
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[36px] lg:text-[40px]">
            {heading}
          </h2>
        </div>

        {/* Coursera + LinkedIn Learning - two equal-weight featured cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PLATFORMS.map((p, i) => (
            <div
              key={p.key}
              data-animate="fade-up"
              style={{
                animationDelay: `${320 + i * 120}ms`,
                background: 'linear-gradient(135deg, #821a12 0%, #C04036 100%)',
              }}
              className="group/card relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(130,26,18,0.30)] p-5 md:p-7 lg:p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl overflow-hidden flex-none shadow-lg bg-white">
                  <BrandIcon name={p.name} />
                </div>
                <div>
                  <p className="font-heading font-bold text-[16px] text-white">{p.name}</p>
                  <p className="text-[11px] font-body text-vgu-yellow">Included free with every program</p>
                </div>
              </div>
              <h3 className="font-heading font-bold text-[18px] md:text-[20px] leading-[1.3] text-white mb-2">
                {p.heading}
              </h3>
              <p className="text-[15px] font-body text-white/80 leading-[1.65] mb-5">
                {p.desc}
              </p>

              <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-white/55 mb-3">
                {p.subLabel}
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {p.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex flex-col items-center gap-1.5 rounded-xl py-2.5 px-2 bg-white/[0.07] border border-white/10 transition-colors duration-150 hover:bg-white/[0.12]"
                  >
                    {item.brandIcon ? (
                      <div className="w-7 h-7 rounded-lg overflow-hidden flex-none">
                        <BrandIcon name={item.brandIcon} />
                      </div>
                    ) : item.Icon ? (
                      <div className="w-7 h-7 rounded-lg flex-none flex items-center justify-center bg-white/10">
                        <item.Icon size={15} className="text-vgu-yellow" />
                      </div>
                    ) : null}
                    <span className="text-[10.5px] font-body text-white/75 text-center leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4">
                <div className="rounded-xl px-4 py-2.5 text-center bg-white/[0.07] border border-white/10">
                  <span className="font-heading font-black text-[18px] text-vgu-yellow">{p.statValue}</span>
                  <span className="ml-2 text-[12.5px] font-body text-white/80">{p.statLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selling points strip - short, factual summary restating verified
            facts already used elsewhere on this site (TrustBar, ImpactSection,
            program pages), consolidated here for scannability and SEO. */}
        <div data-animate="fade-up" className="mt-10 md:mt-12">
          <p className="text-center text-[15px] md:text-[16px] font-body text-neutral-700 leading-[1.7] max-w-[720px] mx-auto mb-6">
            Online VGU is the digital-learning arm of Vivekananda Global University, a NAAC A+ accredited, UGC-entitled university. Every degree pairs an industry-linked curriculum with real placement support, so it counts with employers, not just on a certificate.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SELLING_POINTS.map((point) => (
              <div
                key={point.label}
                className="flex flex-col items-center gap-2 text-center rounded-xl px-3 py-4 bg-white/60 border border-vgu-red-dark/10"
              >
                <point.Icon size={20} className="text-vgu-red-dark flex-none" stroke={1.75} />
                <span className="text-[12px] font-heading font-semibold text-neutral-800 leading-tight">
                  {point.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
