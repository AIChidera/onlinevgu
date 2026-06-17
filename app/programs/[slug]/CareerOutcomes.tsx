'use client'
import {
  IconBriefcase, IconCode, IconChartBar,
  IconUsers, IconBuilding, IconDatabase, IconCloud,
  IconShieldCheck, IconFlask, IconBook2, IconGlobe,
  IconSettings, IconCalculator, IconStar, IconAward,
  IconTrendingUp, IconArrowRight,
} from '@tabler/icons-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = React.ComponentType<any>

function getRoleIcon(role: string): AnyIcon {
  const r = role.toLowerCase()
  if (r.includes('software') || r.includes('developer') || r.includes('full-stack') || r.includes('frontend') || r.includes('backend') || r.includes('devops')) return IconCode
  if (r.includes('data') || r.includes('analyst') || r.includes('database') || r.includes('statistician')) return IconDatabase
  if (r.includes('cloud') || r.includes('architect')) return IconCloud
  if (r.includes('security') || r.includes('cyber')) return IconShieldCheck
  if (r.includes('marketing') || r.includes('brand')) return IconStar
  if (r.includes('product') || r.includes('entrepreneur') || r.includes('startup') || r.includes('founder')) return IconAward
  if (r.includes('finance') || r.includes('invest') || r.includes('banking') || r.includes('tax') || r.includes('accoun') || r.includes('audit') || r.includes('ca article')) return IconCalculator
  if (r.includes('hr') || r.includes('human resource')) return IconUsers
  if (r.includes('hospital') || r.includes('healthcare') || r.includes('clinical') || r.includes('pharma') || r.includes('medical')) return IconFlask
  if (r.includes('professor') || r.includes('teacher') || r.includes('journalist') || r.includes('writer') || r.includes('librarian') || r.includes('archivist') || r.includes('research')) return IconBook2
  if (r.includes('civil') || r.includes('policy') || r.includes('government') || r.includes('administrator') || r.includes('public')) return IconBuilding
  if (r.includes('operations') || r.includes('supply') || r.includes('logistics')) return IconSettings
  if (r.includes('international') || r.includes('global')) return IconGlobe
  if (r.includes('strategy') || r.includes('consulting') || r.includes('consultant') || r.includes('analytics')) return IconChartBar
  if (r.includes('manager') || r.includes('head') || r.includes('director') || r.includes('lead')) return IconTrendingUp
  return IconBriefcase
}

// Brand-only 3-gradient cycle.
const PALETTE = [
  { grad: 'linear-gradient(135deg,#C04036,#821a12)', hex: '#C04036' },  // red → dark red
  { grad: 'linear-gradient(135deg,#FFA412,#C04036)', hex: '#FFA412' },  // yellow → red
  { grad: 'linear-gradient(135deg,#821a12,#3b0d09)', hex: '#821a12' },  // deep red flow
]

export default function CareerOutcomes({ roles }: { roles: string[] }) {
  const safe = Array.isArray(roles) ? roles : []
  if (!safe.length) return null

  return (
    <>
      <style>{`
        .co-card-0:hover { box-shadow: 0 0 0 2px #C04036, 0 10px 40px rgba(0,0,0,0.10); }
        .co-card-1:hover { box-shadow: 0 0 0 2px #FFA412, 0 10px 40px rgba(0,0,0,0.10); }
        .co-card-2:hover { box-shadow: 0 0 0 2px #821a12, 0 10px 40px rgba(0,0,0,0.10); }
      `}</style>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {safe.map((role, ri) => {
          const p   = PALETTE[ri % PALETTE.length]
          const ci  = ri % PALETTE.length
          const Icon = getRoleIcon(role)
          return (
            <div
              key={role}
              data-animate="materialize"
              style={{ animationDelay: `${ri * 55}ms` }}
            >
              <div
                className={`co-card-${ci} group/card relative flex items-stretch rounded-2xl bg-white border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-transparent`}
                style={{ borderColor: `${p.hex}28` }}
              >
                <div className="w-2 flex-none" style={{ background: p.grad }} />
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 right-3 font-heading font-black leading-none select-none pointer-events-none"
                  style={{ fontSize: '72px', color: p.hex, opacity: 0.07 }}
                >
                  {ri + 1}
                </div>
                <div className="flex items-center gap-4 px-4 py-4 flex-1 min-w-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-none shadow-sm transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-3"
                    style={{ background: p.grad }}
                  >
                    <Icon size={20} stroke={1.5} className="text-white" />
                  </div>
                  <p className="font-heading font-bold text-[15px] text-neutral-900 leading-snug truncate flex-1 min-w-0">{role}</p>
                  <IconArrowRight
                    size={16}
                    stroke={2}
                    className="flex-none text-neutral-300 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 mr-1"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
