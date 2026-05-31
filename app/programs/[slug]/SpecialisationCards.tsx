import {
  IconBriefcase, IconCode, IconBook2, IconTrendingUp, IconChartBar,
  IconWorld, IconDatabase, IconCloud, IconCpu, IconUsers, IconSettings,
  IconCalculator, IconBuilding, IconLeaf, IconShieldCheck, IconHeartRateMonitor,
  IconFlask, IconStar,
} from '@tabler/icons-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = React.ComponentType<any>

const SPEC_MAP: Record<string, { Icon: AnyIcon; grad: string }> = {
  'Finance':               { Icon: IconTrendingUp,       grad: 'linear-gradient(135deg,#C04036,#821a12)' },
  'Marketing':             { Icon: IconStar,             grad: 'linear-gradient(135deg,#d97706,#92400e)' },
  'Human Resources':       { Icon: IconUsers,            grad: 'linear-gradient(135deg,#7c3aed,#4c1d95)' },
  'Operations Management': { Icon: IconSettings,         grad: 'linear-gradient(135deg,#475569,#1e293b)' },
  'Business Analytics':    { Icon: IconChartBar,         grad: 'linear-gradient(135deg,#2563eb,#1d4ed8)' },
  'International Business':{ Icon: IconWorld,            grad: 'linear-gradient(135deg,#0891b2,#155e75)' },
  'Data Science':          { Icon: IconDatabase,         grad: 'linear-gradient(135deg,#2563eb,#1d4ed8)' },
  'Cloud Computing':       { Icon: IconCloud,            grad: 'linear-gradient(135deg,#0891b2,#155e75)' },
  'AI & Machine Learning': { Icon: IconCpu,              grad: 'linear-gradient(135deg,#4f46e5,#3730a3)' },
  'Cybersecurity':         { Icon: IconShieldCheck,      grad: 'linear-gradient(135deg,#C04036,#821a12)' },
  'Software Engineering':  { Icon: IconCode,             grad: 'linear-gradient(135deg,#7c3aed,#4c1d95)' },
  'Accounting & Finance':  { Icon: IconCalculator,       grad: 'linear-gradient(135deg,#C04036,#821a12)' },
  'Accounting & Taxation': { Icon: IconCalculator,       grad: 'linear-gradient(135deg,#C04036,#821a12)' },
  'Business Management':   { Icon: IconBriefcase,        grad: 'linear-gradient(135deg,#d97706,#92400e)' },
  'Taxation':              { Icon: IconCalculator,       grad: 'linear-gradient(135deg,#475569,#1e293b)' },
  'English':               { Icon: IconBook2,            grad: 'linear-gradient(135deg,#0891b2,#155e75)' },
  'Economics':             { Icon: IconTrendingUp,       grad: 'linear-gradient(135deg,#059669,#065f46)' },
  'Political Science':     { Icon: IconBuilding,         grad: 'linear-gradient(135deg,#1d4ed8,#1e3a8a)' },
  'Sociology':             { Icon: IconUsers,            grad: 'linear-gradient(135deg,#7c3aed,#4c1d95)' },
  'Computer Science':      { Icon: IconCode,             grad: 'linear-gradient(135deg,#2563eb,#1d4ed8)' },
  'Mathematics':           { Icon: IconChartBar,         grad: 'linear-gradient(135deg,#C04036,#821a12)' },
  'Environmental Science': { Icon: IconLeaf,             grad: 'linear-gradient(135deg,#059669,#065f46)' },
  'Hospital Administration':{ Icon: IconBuilding,        grad: 'linear-gradient(135deg,#2563eb,#1d4ed8)' },
  'Healthcare Operations': { Icon: IconHeartRateMonitor, grad: 'linear-gradient(135deg,#059669,#065f46)' },
  'Pharma Management':     { Icon: IconFlask,            grad: 'linear-gradient(135deg,#7c3aed,#4c1d95)' },
  'Health Insurance':      { Icon: IconShieldCheck,      grad: 'linear-gradient(135deg,#d97706,#92400e)' },
}

const FALLBACK_GRADS = [
  'linear-gradient(135deg,#C04036,#821a12)',
  'linear-gradient(135deg,#2563eb,#1d4ed8)',
  'linear-gradient(135deg,#7c3aed,#4c1d95)',
  'linear-gradient(135deg,#d97706,#92400e)',
]

function SpecCard({ s, si }: { s: string; si: number }) {
  const specMeta = SPEC_MAP[s] ?? { Icon: IconBriefcase, grad: FALLBACK_GRADS[si % FALLBACK_GRADS.length] }
  return (
    <div
      className="group/spec flex items-center gap-4 rounded-2xl bg-white border border-neutral-200 p-5 cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_0_0_2px_#FFA412,0_10px_40px_rgba(0,0,0,0.10)] h-full"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-none shadow-sm transition-transform duration-300 group-hover/spec:scale-110 group-hover/spec:rotate-3"
        style={{ background: specMeta.grad }}
      >
        <specMeta.Icon size={22} stroke={1.5} className="text-white" />
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
        style={{ scrollbarWidth: 'none' }}
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
