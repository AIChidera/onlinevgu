import {
  IconBriefcase,
  IconChartBar,
  IconTrendingUp,
  IconUsers,
  IconSettings,
  IconHeart,
  IconCode,
  IconGlobe,
} from '@tabler/icons-react'

interface RoleRow { role: string; range?: string; description?: string }

function getRoleIcon(role: string) {
  const r = role.toLowerCase()
  if (r.includes('finance') || r.includes('cfo') || r.includes('treasury') || r.includes('investment') || r.includes('portfolio') || r.includes('forex') || r.includes('financial')) return IconChartBar
  if (r.includes('marketing') || r.includes('brand') || r.includes('digital')) return IconTrendingUp
  if (r.includes('hr') || r.includes('human resource') || r.includes('talent') || r.includes('people')) return IconUsers
  if (r.includes('health') || r.includes('hospital') || r.includes('pharma') || r.includes('medical') || r.includes('healthcare')) return IconHeart
  if (r.includes('it') || r.includes('software') || r.includes('developer') || r.includes('tech') || r.includes('cloud') || r.includes('data') || r.includes('ai') || r.includes('ml') || r.includes('cyber') || r.includes('devops') || r.includes('blockchain') || r.includes('web')) return IconCode
  if (r.includes('international') || r.includes('global') || r.includes('export') || r.includes('country')) return IconGlobe
  if (r.includes('operations') || r.includes('supply chain') || r.includes('logistics') || r.includes('process')) return IconSettings
  return IconBriefcase
}

export default function CareerOutcomes({ roles }: { roles: (string | RoleRow)[] }) {
  const safe: RoleRow[] = (Array.isArray(roles) ? roles : []).map(r =>
    typeof r === 'string' ? { role: r } : r
  )
  if (!safe.length) return null

  return (
    <div className="divide-y divide-neutral-200">
      {safe.map((r, ri) => {
        const Icon = getRoleIcon(r.role)
        return (
          <div
            key={r.role}
            data-animate="fade-up"
            style={{ animationDelay: `${ri * 40}ms` }}
            className="flex gap-4 py-5 first:pt-0 last:pb-0"
          >
            <div className="flex-none mt-0.5">
              <Icon size={20} stroke={1.75} className="text-vgu-red" />
            </div>
            <div className="flex-1 min-w-0 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-[17px] tracking-[-0.2px] text-neutral-900 leading-snug mb-1">{r.role}</p>
                {r.description && (
                  <p className="font-body text-[14px] leading-[1.65] text-neutral-600">{r.description}</p>
                )}
              </div>
              {r.range && (
                <p className="font-heading font-black text-[20px] text-vgu-yellow tabular-nums whitespace-nowrap flex-none leading-none pt-1">{r.range}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
