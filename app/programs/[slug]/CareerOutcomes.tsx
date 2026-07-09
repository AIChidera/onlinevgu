'use client'
import { useState } from 'react'
import {
  IconBriefcase,
  IconChartBar,
  IconTrendingUp,
  IconUsers,
  IconSettings,
  IconHeart,
  IconCode,
  IconGlobe,
  IconChevronDown,
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

const INITIAL_VISIBLE = 5

export default function CareerOutcomes({ roles }: { roles: (string | RoleRow)[] }) {
  const safe: RoleRow[] = (Array.isArray(roles) ? roles : []).map(r =>
    typeof r === 'string' ? { role: r } : r
  )
  const [showAll, setShowAll] = useState(false)
  if (!safe.length) return null

  const needsToggle = safe.length > INITIAL_VISIBLE
  const visible = showAll || !needsToggle ? safe : safe.slice(0, INITIAL_VISIBLE)

  return (
    <div>
      <div className="divide-y divide-neutral-200">
        {visible.map((r) => {
          const Icon = getRoleIcon(r.role)
          return (
            <div
              key={r.role}
              className="flex items-start gap-3 py-3.5 md:py-4 first:pt-0 last:pb-0"
            >
              <div className="flex-none pt-0.5">
                <Icon size={20} stroke={1.75} className="text-vgu-red" />
              </div>
              <div className="flex-1 min-w-0">
                {/* Line 1: role + salary inline */}
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-heading font-bold text-[16px] md:text-[17px] tracking-[-0.2px] text-neutral-900 leading-snug min-w-0 truncate">
                    {r.role}
                  </p>
                  {r.range && (
                    <p className="font-heading font-black text-[17px] md:text-[19px] text-vgu-yellow tabular-nums whitespace-nowrap flex-none leading-none">
                      {r.range}
                    </p>
                  )}
                </div>
                {/* Line 2: description (single-line truncation) */}
                {r.description && (
                  <p className="font-body text-[14px] md:text-[15px] text-neutral-500 leading-snug mt-1 line-clamp-1">
                    {r.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {needsToggle && (
        <button
          type="button"
          onClick={() => setShowAll(v => !v)}
          className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-heading font-semibold text-vgu-red hover:text-vgu-red-dark transition-colors duration-150 cursor-pointer select-none min-h-[44px]"
          aria-expanded={showAll}
        >
          {showAll ? 'Show fewer' : `Show all ${safe.length} roles`}
          <IconChevronDown
            size={14}
            stroke={2.25}
            className={`transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  )
}
