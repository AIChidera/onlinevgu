import {
  IconBriefcase, IconCode, IconBook2, IconTrendingUp, IconChartBar,
  IconWorld, IconDatabase, IconCloud, IconCpu, IconUsers, IconSettings,
  IconCalculator, IconBuilding, IconLeaf, IconShieldCheck, IconHeartRateMonitor,
  IconFlask, IconStar,
} from '@tabler/icons-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = React.ComponentType<any>

// Brand-only 3-gradient cycle. Cards rotate by index, not by specialisation.
const PALETTE = [
  'linear-gradient(135deg,#C04036,#821a12)',  // red → dark red
  'linear-gradient(135deg,#FFA412,#C04036)',  // yellow → red
  'linear-gradient(135deg,#821a12,#3b0d09)',  // deep red flow
]

// Per-specialisation icon mapping (visual variety stays via icons, not palette).
const SPEC_ICONS: Record<string, AnyIcon> = {
  'Finance':                IconTrendingUp,
  'Marketing':              IconStar,
  'Human Resources':        IconUsers,
  'Operations Management':  IconSettings,
  'Business Analytics':     IconChartBar,
  'International Business': IconWorld,
  'Data Science':           IconDatabase,
  'Cloud Computing':        IconCloud,
  'AI & Machine Learning':  IconCpu,
  'Cybersecurity':          IconShieldCheck,
  'Software Engineering':   IconCode,
  'Accounting & Finance':   IconCalculator,
  'Accounting & Taxation':  IconCalculator,
  'Business Management':    IconBriefcase,
  'Taxation':               IconCalculator,
  'English':                IconBook2,
  'Economics':              IconTrendingUp,
  'Political Science':      IconBuilding,
  'Sociology':              IconUsers,
  'Computer Science':       IconCode,
  'Mathematics':            IconChartBar,
  'Environmental Science':  IconLeaf,
  'Hospital Administration':IconBuilding,
  'Healthcare Operations':  IconHeartRateMonitor,
  'Pharma Management':      IconFlask,
  'Health Insurance':       IconShieldCheck,
}

function SpecCard({ s, si }: { s: string; si: number }) {
  const Icon = SPEC_ICONS[s] ?? IconBriefcase
  const grad = PALETTE[si % PALETTE.length]
  return (
    <div
      className="group/spec flex items-center gap-4 rounded-2xl bg-white border border-neutral-200 p-5 cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_0_0_2px_#FFA412,0_10px_40px_rgba(0,0,0,0.10)] h-full"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-none shadow-sm transition-transform duration-300 group-hover/spec:scale-110 group-hover/spec:rotate-3"
        style={{ background: grad }}
      >
        <Icon size={22} stroke={1.5} className="text-white" />
      </div>
      <div>
        <p className="font-heading font-bold text-[16px] text-neutral-900 leading-snug">{s}</p>
        <p className="text-[12px] font-body text-neutral-400 mt-0.5">Specialisation</p>
      </div>
    </div>
  )
}

export default function SpecialisationCards({ specialisations }: { specialisations: string[] }) {
  return (
    <>
      {/* Mobile: horizontal snap scroll */}
      <div
        className="flex sm:hidden gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-3"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {specialisations.map((s, si) => (
          <div
            key={s}
            data-animate="fade-up"
            style={{ animationDelay: `${si * 70}ms` }}
            className="flex-none w-[260px] snap-start"
          >
            <SpecCard s={s} si={si} />
          </div>
        ))}
      </div>

      {/* Tablet+: 2-column grid */}
      <div className="hidden sm:grid sm:grid-cols-2 gap-4">
        {specialisations.map((s, si) => (
          <div
            key={s}
            data-animate="materialize"
            style={{ animationDelay: `${si * 70}ms` }}
          >
            <SpecCard s={s} si={si} />
          </div>
        ))}
      </div>
    </>
  )
}
