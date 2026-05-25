import SectionWrapper from '@/components/layout/SectionWrapper'

export const metadata = {
  title: 'About VGU — Vivekananda Global University Online',
  description:
    'Learn about Vivekananda Global University — NAAC A+, UGC-entitled, and committed to accessible quality education since 1998.',
}

const MILESTONES = [
  { year: '1998', event: 'University established in Jaipur, Rajasthan' },
  { year: '2008', event: 'NAAC first accreditation' },
  { year: '2015', event: 'Launch of online division under UGC-DEB' },
  { year: '2018', event: 'NAAC A grade — first cycle' },
  { year: '2021', event: 'NAAC A+ reaccreditation' },
  { year: '2022', event: 'Coursera partnership launched' },
  { year: '2023', event: '50,000+ online learners milestone' },
  { year: '2024', event: 'WES Canada recognition for online programs' },
]

const ACCREDITATIONS = [
  { name: 'UGC', full: 'University Grants Commission', detail: 'Distance Education Bureau entitlement' },
  { name: 'NAAC A+', full: 'National Assessment and Accreditation Council', detail: 'Highest grade — 3.52 / 4.0 CGPA' },
  { name: 'AICTE', full: 'All India Council for Technical Education', detail: 'Approved programs in Technology and Management' },
  { name: 'NIRF', full: 'National Institutional Ranking Framework', detail: 'Ranked in University and Management categories' },
  { name: 'AIU', full: 'Association of Indian Universities', detail: 'Member institution' },
  { name: 'WES', full: 'World Education Services, Canada', detail: 'International degree recognition' },
]

export default function AboutPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#FBF1E6] to-white pt-[72px]">
        <div className="mx-auto max-w-content px-12 py-16 md:px-5 md:py-12">
          <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
            About us
          </p>
          <h1 className="font-heading text-[52px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[36px]">
            Vivekananda<br />Global University
          </h1>
          <p className="mt-4 text-[18px] text-neutral-600 max-w-[560px] leading-relaxed">
            Founded in 1998 in Jaipur, VGU has grown into one of India&apos;s most respected universities —
            now bringing that same quality education online to learners in 40+ countries.
          </p>
        </div>
      </div>

      <SectionWrapper id="accreditation" bg="white">
        <h2 className="font-heading text-[32px] font-extrabold text-neutral-900 mb-3">
          Accreditations & recognition
        </h2>
        <p className="text-[16px] text-neutral-600 mb-10 max-w-[520px]">
          Our credentials are recognised by Indian and international bodies — giving your degree global credibility.
        </p>
        <div className="grid grid-cols-3 gap-5 lg:grid-cols-2 md:grid-cols-1">
          {ACCREDITATIONS.map((a) => (
            <div key={a.name} className="rounded-xl border border-neutral-200 bg-white p-6">
              <div className="font-heading text-[22px] font-black text-vgu-red mb-1">{a.name}</div>
              <div className="font-heading text-[14px] font-semibold text-neutral-800 mb-2">{a.full}</div>
              <div className="text-[13px] text-neutral-500">{a.detail}</div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="history" bg="light">
        <div className="grid grid-cols-2 gap-16 lg:grid-cols-1">
          <div>
            <h2 className="font-heading text-[32px] font-extrabold text-neutral-900 mb-4">
              Our journey
            </h2>
            <p className="text-[16px] text-neutral-600 leading-relaxed">
              From a single campus in Jaipur to a globally accessible online university — 25+ years of
              commitment to making quality education reachable for every serious learner.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {MILESTONES.map((m) => (
              <div key={m.year} className="flex items-start gap-5">
                <div className="flex-none w-12 font-heading text-[15px] font-black text-vgu-red">{m.year}</div>
                <div className="flex-1 text-[15px] text-neutral-700 border-l border-neutral-200 pl-5 pb-4 last:pb-0">
                  {m.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
