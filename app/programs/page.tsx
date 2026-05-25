import Link from 'next/link'
import SectionWrapper from '@/components/layout/SectionWrapper'

export const metadata = {
  title: 'Online Programs — VGU',
  description:
    'Explore all UGC-entitled online degree programs at Vivekananda Global University — MBA, MCA, BBA, BCA, M.Com and more.',
}

const UG_PROGRAMS = [
  { name: 'Online BBA', slug: 'online-bba', duration: '3 years', fee: '₹90,000', gradient: 'linear-gradient(135deg,#ea580c 0%,#7c2d12 100%)', icon: '🚀' },
  { name: 'Online BCA', slug: 'online-bca', duration: '3 years', fee: '₹85,000', gradient: 'linear-gradient(135deg,#4f46e5 0%,#312e81 100%)', icon: '⚡' },
  { name: 'Online B.Com', slug: 'online-bcom', duration: '3 years', fee: '₹75,000', gradient: 'linear-gradient(135deg,#059669 0%,#064e3b 100%)', icon: '💰' },
  { name: 'Online B.Sc', slug: 'online-bsc', duration: '3 years', fee: '₹75,000', gradient: 'linear-gradient(135deg,#0ea5e9 0%,#075985 100%)', icon: '🔬' },
  { name: 'Online B.Lib', slug: 'online-blib', duration: '1 year', fee: '₹45,000', gradient: 'linear-gradient(135deg,#d97706 0%,#92400e 100%)', icon: '📚' },
]

const PG_PROGRAMS = [
  { name: 'Online MBA', slug: 'online-mba', duration: '2 years', fee: '₹1,20,000', gradient: 'linear-gradient(135deg,#C04036 0%,#821a12 100%)', icon: '📈', badge: 'Most popular' },
  { name: 'MBA in Healthcare', slug: 'online-mba-healthcare', duration: '2 years', fee: '₹1,30,000', gradient: 'linear-gradient(135deg,#e11d48 0%,#9f1239 100%)', icon: '🏥' },
  { name: 'Online MCA', slug: 'online-mca', duration: '2 years', fee: '₹1,00,000', gradient: 'linear-gradient(135deg,#2563eb 0%,#1e3a8a 100%)', icon: '💻', badge: 'High demand' },
  { name: 'Online M.Com', slug: 'online-mcom', duration: '2 years', fee: '₹80,000', gradient: 'linear-gradient(135deg,#0d9488 0%,#134e4a 100%)', icon: '📊' },
  { name: 'Online MA', slug: 'online-ma', duration: '2 years', fee: '₹70,000', gradient: 'linear-gradient(135deg,#7c3aed 0%,#4c1d95 100%)', icon: '🎓' },
  { name: 'Online M.Lib', slug: 'online-mlib', duration: '1 year', fee: '₹55,000', gradient: 'linear-gradient(135deg,#d97706 0%,#92400e 100%)', icon: '📖' },
]

function ProgramGrid({ programs }: { programs: typeof PG_PROGRAMS }) {
  return (
    <div className="grid grid-cols-3 gap-5 lg:grid-cols-2 md:grid-cols-1">
      {programs.map((p) => (
        <Link
          key={p.slug}
          href={`/programs/${p.slug}`}
          className="group flex flex-col rounded-xl overflow-hidden border border-neutral-200 bg-white
                     transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-transparent"
        >
          <div
            className="relative flex h-[120px] items-end px-5 pb-4 overflow-hidden"
            style={{ background: p.gradient }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />
            <span className="relative z-10 text-[32px] leading-none">{p.icon}</span>
            {'badge' in p && p.badge && (
              <span className="absolute right-3 top-3 rounded-full bg-vgu-yellow px-2.5 py-0.5 text-[11px] font-heading font-bold text-neutral-900">
                {p.badge}
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-heading text-[16px] font-bold text-neutral-900">{p.name}</h3>
            <div className="mt-1 flex gap-3 text-[13px] text-neutral-500">
              <span>{p.duration}</span>
              <span>·</span>
              <span>{p.fee}</span>
            </div>
            <div className="mt-auto pt-3">
              <span className="text-sm font-heading font-semibold text-vgu-red group-hover:underline underline-offset-2">
                Explore →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function ProgramsPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#FBF1E6] to-white pt-[72px]">
        <div className="mx-auto max-w-content px-12 py-16 md:px-5 md:py-12">
          <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
            UGC-entitled degrees
          </p>
          <h1 className="font-heading text-[52px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[36px]">
            All online programs
          </h1>
          <p className="mt-3 text-[18px] text-neutral-600 max-w-[520px] leading-relaxed">
            Flexible degrees designed for real careers. No entrance exam required.
          </p>
        </div>
      </div>

      <SectionWrapper bg="white">
        <h2 className="font-heading text-[28px] font-extrabold text-neutral-900 mb-8">
          Postgraduate programs
        </h2>
        <ProgramGrid programs={PG_PROGRAMS} />

        <h2 className="font-heading text-[28px] font-extrabold text-neutral-900 mb-8 mt-16">
          Undergraduate programs
        </h2>
        <ProgramGrid programs={UG_PROGRAMS} />
      </SectionWrapper>
    </>
  )
}
