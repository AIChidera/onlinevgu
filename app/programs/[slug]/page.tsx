import { notFound } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const PROGRAM_DATA: Record<string, {
  name: string
  level: string
  duration: string
  fee: string
  gradient: string
  icon: string
  description: string
  eligibility: string
  highlights: string[]
  specialisations?: string[]
}> = {
  'online-mba': {
    name: 'Online MBA',
    level: 'Postgraduate',
    duration: '2 years (4 semesters)',
    fee: '₹1,20,000 total',
    gradient: 'linear-gradient(135deg,#C04036 0%,#821a12 100%)',
    icon: '📈',
    description: 'India\'s most flexible MBA, designed for working professionals who want a UGC-entitled degree without pausing their career.',
    eligibility: 'Any bachelor\'s degree with minimum 50% marks from a UGC-recognised university.',
    highlights: ['Live weekend sessions', '15 specialisations', 'Coursera bundle included', 'Dedicated career support', '500+ hiring partners'],
    specialisations: ['Marketing', 'Finance', 'Human Resources', 'Operations', 'Business Analytics', 'IT Management', 'Healthcare', 'Logistics', 'Banking & Insurance', 'Entrepreneurship'],
  },
  'online-mca': {
    name: 'Online MCA',
    level: 'Postgraduate',
    duration: '2 years (4 semesters)',
    fee: '₹1,00,000 total',
    gradient: 'linear-gradient(135deg,#2563eb 0%,#1e3a8a 100%)',
    icon: '💻',
    description: 'A rigorous, industry-oriented MCA that covers full-stack development, cloud computing, AI/ML, and cybersecurity.',
    eligibility: 'BCA, B.Sc (IT/CS), or any bachelor\'s degree with Mathematics at 10+2 level. Minimum 50%.',
    highlights: ['Python, Java, Cloud tracks', 'AWS certification prep', 'Hackathons every semester', 'Tech placement cell', 'Coding bootcamps'],
    specialisations: ['Artificial Intelligence', 'Cloud Computing', 'Cybersecurity', 'Full-Stack Development'],
  },
  'online-bba': {
    name: 'Online BBA',
    level: 'Undergraduate',
    duration: '3 years (6 semesters)',
    fee: '₹90,000 total',
    gradient: 'linear-gradient(135deg,#ea580c 0%,#7c2d12 100%)',
    icon: '🚀',
    description: 'A comprehensive undergraduate business degree that builds management fundamentals alongside practical entrepreneurial skills.',
    eligibility: '10+2 or equivalent from any recognised board, any stream. Minimum 50%.',
    highlights: ['Management core curriculum', 'Live startup projects', 'Industry mentors', 'Coursera certificates', 'Placement support'],
  },
  'online-bca': {
    name: 'Online BCA',
    level: 'Undergraduate',
    duration: '3 years (6 semesters)',
    fee: '₹85,000 total',
    gradient: 'linear-gradient(135deg,#4f46e5 0%,#312e81 100%)',
    icon: '⚡',
    description: 'Build a career in software development with hands-on coding, modern frameworks, and real-world project experience.',
    eligibility: '10+2 or equivalent with Mathematics/Computer Science. Minimum 50%.',
    highlights: ['Full-stack dev curriculum', 'Python, Java, React', 'Hackathons & capstone project', 'Open-source contributions', 'Tech internship support'],
  },
  'online-mba-healthcare': {
    name: 'MBA in Healthcare',
    level: 'Postgraduate',
    duration: '2 years (4 semesters)',
    fee: '₹1,30,000 total',
    gradient: 'linear-gradient(135deg,#e11d48 0%,#9f1239 100%)',
    icon: '🏥',
    description: 'An MBA built for healthcare professionals — combining core management with hospital administration, health policy, and medical finance.',
    eligibility: 'Any bachelor\'s degree with minimum 50%. Preferred: MBBS, BDS, BPT, B.Sc Nursing, BHMS or related healthcare background.',
    highlights: ['Hospital tie-ups for live cases', 'Health policy & economics', 'Medical finance modules', 'CMO-led sessions', 'Healthcare placement cell'],
  },
  'online-mcom': {
    name: 'Online M.Com',
    level: 'Postgraduate',
    duration: '2 years (4 semesters)',
    fee: '₹80,000 total',
    gradient: 'linear-gradient(135deg,#0d9488 0%,#134e4a 100%)',
    icon: '📊',
    description: 'A deep-dive into advanced accounting, taxation, financial markets, and corporate law for commerce graduates.',
    eligibility: 'B.Com or equivalent with minimum 50% from a UGC-recognised university.',
    highlights: ['Direct & indirect tax', 'Advanced accounting', 'CA/CMA prep support', 'Financial markets module', 'Industry case studies'],
  },
  'online-ma': {
    name: 'Online MA',
    level: 'Postgraduate',
    duration: '2 years (4 semesters)',
    fee: '₹70,000 total',
    gradient: 'linear-gradient(135deg,#7c3aed 0%,#4c1d95 100%)',
    icon: '🎓',
    description: 'A research-oriented postgraduate arts degree with specialisations in English, Economics, Political Science, History, Sociology, and Public Administration.',
    eligibility: 'Any bachelor\'s degree with minimum 50% from a UGC-recognised university.',
    highlights: ['6 specialisations', 'Research methodology training', 'NET/SLET exam prep', 'Academic publishing guidance'],
    specialisations: ['English', 'Economics', 'Political Science', 'History', 'Sociology', 'Public Administration'],
  },
  'online-bcom': {
    name: 'Online B.Com',
    level: 'Undergraduate',
    duration: '3 years (6 semesters)',
    fee: '₹75,000 total',
    gradient: 'linear-gradient(135deg,#059669 0%,#064e3b 100%)',
    icon: '💰',
    description: 'A solid foundation in accounting, finance, taxation, and business law for commerce students.',
    eligibility: '10+2 with Commerce or any stream. Minimum 50%.',
    highlights: ['Accounting & audit', 'Tally & ERP training', 'ICAI articleship prep', 'Finance & banking electives'],
  },
  'online-bsc': {
    name: 'Online B.Sc',
    level: 'Undergraduate',
    duration: '3 years (6 semesters)',
    fee: '₹75,000 total',
    gradient: 'linear-gradient(135deg,#0ea5e9 0%,#075985 100%)',
    icon: '🔬',
    description: 'A science degree focusing on Mathematics, Statistics, and Computer Science — ideal for students targeting data and analytics careers.',
    eligibility: '10+2 with Science/Maths. Minimum 50%.',
    highlights: ['Data science track', 'Statistics & probability', 'R and Python', 'Research project in final year'],
  },
  'online-blib': {
    name: 'Online B.Lib',
    level: 'Undergraduate',
    duration: '1 year',
    fee: '₹45,000 total',
    gradient: 'linear-gradient(135deg,#d97706 0%,#92400e 100%)',
    icon: '📚',
    description: 'A professional qualification for library and information science careers in schools, colleges, and public institutions.',
    eligibility: 'Any bachelor\'s degree with minimum 50%.',
    highlights: ['Library management systems', 'Digital cataloguing', 'School & college library focus'],
  },
  'online-mlib': {
    name: 'Online M.Lib',
    level: 'Postgraduate',
    duration: '1 year',
    fee: '₹55,000 total',
    gradient: 'linear-gradient(135deg,#d97706 0%,#92400e 100%)',
    icon: '📖',
    description: 'Advanced library and information science for professionals seeking senior roles in academic and public libraries.',
    eligibility: 'B.Lib or B.Lib.I.Sc from a UGC-recognised university with minimum 50%.',
    highlights: ['Digital library management', 'Research & archives', 'Information retrieval systems'],
  },
}

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return Object.keys(PROGRAM_DATA).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const p = PROGRAM_DATA[params.slug]
  if (!p) return { title: 'Program not found' }
  return {
    title: `${p.name} Online — VGU`,
    description: p.description,
  }
}

export default function ProgramPage({ params }: Props) {
  const p = PROGRAM_DATA[params.slug]
  if (!p) notFound()

  return (
    <>
      {/* Hero */}
      <div className="pt-[72px]">
        <div
          className="relative overflow-hidden py-16 md:py-12"
          style={{ background: p.gradient }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />
          <div className="relative z-10 mx-auto max-w-content px-12 md:px-5">
            <Link
              href="/programs"
              className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/75 hover:text-white transition-colors"
            >
              ← All programs
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[48px] leading-none">{p.icon}</span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-[12px] font-heading font-semibold uppercase tracking-widest text-white">
                {p.level}
              </span>
            </div>
            <h1 className="font-heading text-[52px] font-extrabold text-white leading-tight tracking-tight md:text-[36px]">
              {p.name}
            </h1>
            <p className="mt-3 text-[18px] text-white/80 max-w-[540px] leading-relaxed">{p.description}</p>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="rounded-xl bg-white/15 px-5 py-3 backdrop-blur-sm">
                <div className="text-[11px] font-heading font-semibold uppercase tracking-widest text-white/65 mb-0.5">Duration</div>
                <div className="font-heading font-bold text-white">{p.duration}</div>
              </div>
              <div className="rounded-xl bg-white/15 px-5 py-3 backdrop-blur-sm">
                <div className="text-[11px] font-heading font-semibold uppercase tracking-widest text-white/65 mb-0.5">Total fee</div>
                <div className="font-heading font-bold text-white">{p.fee}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="yellow" as="a" href="/apply">
                Apply now →
              </Button>
              <Button
                variant="ghost"
                as="a"
                href="/apply#brochure"
                className="text-white border-white/40 hover:bg-white/10"
              >
                Download brochure
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mx-auto max-w-content px-12 py-16 md:px-5 md:py-10">
        <div className="grid grid-cols-[2fr_1fr] gap-12 lg:grid-cols-1">
          <div>
            <h2 className="font-heading text-[26px] font-extrabold text-neutral-900 mb-5">
              Program highlights
            </h2>
            <ul className="flex flex-col gap-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-[16px] text-neutral-700">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-vgu-red/10">
                    <span className="h-2 w-2 rounded-full bg-vgu-red" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            {p.specialisations && (
              <div className="mt-10">
                <h2 className="font-heading text-[26px] font-extrabold text-neutral-900 mb-5">
                  Specialisations
                </h2>
                <div className="flex flex-wrap gap-2">
                  {p.specialisations.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-[14px] font-medium text-neutral-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 self-start sticky top-24 shadow-sm">
            <h3 className="font-heading text-[18px] font-bold text-neutral-900 mb-4">Eligibility</h3>
            <p className="text-[15px] text-neutral-600 leading-relaxed mb-6">{p.eligibility}</p>
            <Button as="a" href="/apply" fullWidth>
              Apply now →
            </Button>
            <Button variant="secondary" as="a" href="/apply#brochure" fullWidth className="mt-2">
              Download brochure
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
