import {
  IconBriefcase, IconCode, IconBook2, IconTrendingUp, IconChartBar,
  IconWorld, IconDatabase, IconCloud, IconCpu, IconUsers, IconSettings,
  IconCalculator, IconBuilding, IconLeaf, IconShieldCheck, IconHeartRateMonitor,
  IconFlask, IconStar,
} from '@tabler/icons-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = React.ComponentType<any>

const PALETTE = [
  'linear-gradient(135deg,#C04036 0%,#821a12 100%)',
  'linear-gradient(135deg,#FFA412 0%,#C04036 100%)',
  'linear-gradient(135deg,#821a12 0%,#3b0d09 100%)',
]

const SPEC_ICONS: Record<string, AnyIcon> = {
  'Finance':                              IconTrendingUp,
  'Marketing':                            IconStar,
  'Human Resources':                      IconUsers,
  'Operations Management':                IconSettings,
  'Business Analytics':                   IconChartBar,
  'International Business':               IconWorld,
  'Data Science':                         IconDatabase,
  'Cloud Computing':                      IconCloud,
  'AI & Machine Learning':               IconCpu,
  'Cybersecurity':                        IconShieldCheck,
  'Software Engineering':                 IconCode,
  'Accounting & Finance':                 IconCalculator,
  'Accounting & Taxation':                IconCalculator,
  'Business Management':                  IconBriefcase,
  'Taxation':                             IconCalculator,
  'English':                              IconBook2,
  'Economics':                            IconTrendingUp,
  'Political Science':                    IconBuilding,
  'Sociology':                            IconUsers,
  'Computer Science':                     IconCode,
  'Mathematics':                          IconChartBar,
  'Environmental Science':                IconLeaf,
  'Hospital Administration':              IconBuilding,
  'Healthcare Operations':                IconHeartRateMonitor,
  'Pharma Management':                    IconFlask,
  'Health Insurance':                     IconShieldCheck,
  'General':                              IconBriefcase,
  'UX Design':                            IconStar,
  'Cloud Technology & Information Security': IconShieldCheck,
  'Blockchain Technology':                IconCode,
  'Artificial Intelligence':              IconCpu,
  'AI & Data Science':                    IconDatabase,
  'Cloud Tech & Cybersecurity':           IconShieldCheck,
  'Cloud Computing & Full Stack':         IconCloud,
  'General Management':                   IconBriefcase,
  'Digital Marketing':                    IconStar,
  'Retail Management':                    IconBuilding,
  'FinTech':                              IconCalculator,
  'ACCA Track':                           IconTrendingUp,
  'CMA Track':                            IconChartBar,
  'FM Track':                             IconCalculator,
  'Digital Journalism':                   IconWorld,
  'Broadcast Media':                      IconStar,
  'Public Relations & Corporate Communication': IconUsers,
  'Multimedia Journalism':                IconCode,
  'Public Policy & Development':          IconBuilding,
  'International Relations':              IconWorld,
  'History':                              IconBook2,
  'Psychology':                           IconUsers,
}

function SpecCard({ s, si }: { s: string; si: number }) {
  const Icon = SPEC_ICONS[s] ?? IconBriefcase
  const grad = PALETTE[si % PALETTE.length]
  const num  = String(si + 1).padStart(2, '0')

  return (
    <div
      className="group/spec relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.22)] h-full min-h-[148px] p-5"
      style={{ background: grad }}
    >
      {/* Dot texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      />

      {/* Ghost watermark number */}
      <span
        aria-hidden="true"
        className="absolute -bottom-3 right-2 font-heading font-black leading-none select-none pointer-events-none text-[80px] text-white"
        style={{ opacity: 0.12 }}
      >
        {num}
      </span>

      {/* Icon */}
      <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center flex-none bg-white/20 border border-white/30 shadow-sm transition-transform duration-300 group-hover/spec:scale-110 group-hover/spec:rotate-3">
        <Icon size={20} stroke={1.5} className="text-white" />
      </div>

      {/* Text anchored to bottom */}
      <div className="relative z-10 mt-4">
        <p className="font-heading font-bold text-[15px] text-white leading-snug">{s}</p>
        <p className="text-[11px] font-body text-white/60 mt-0.5 uppercase tracking-[0.06em]">Track {num}</p>
      </div>
    </div>
  )
}

export default function SpecialisationCards({ specialisations }: { specialisations: string[] }) {
  return (
    <div
      className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-3"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
    >
      {specialisations.map((s, si) => (
        <div
          key={s}
          data-animate="fade-up"
          style={{ animationDelay: `${si * 70}ms` }}
          className="flex-none w-[200px] snap-start"
        >
          <SpecCard s={s} si={si} />
        </div>
      ))}
    </div>
  )
}
