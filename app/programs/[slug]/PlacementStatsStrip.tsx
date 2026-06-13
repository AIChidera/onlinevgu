'use client'

import { IconTrendingUp, IconCash, IconBriefcase, IconAward } from '@tabler/icons-react'

interface PlacementStats {
  rate:    string
  avgPkg:  string
  hirers:  string
  topRole: string
}

const PLACEMENT_DATA: Record<string, PlacementStats> = {
  mba:      { rate: '97%', avgPkg: '₹10-18 LPA', hirers: '500+', topRole: 'Senior Manager'      },
  'mba-if': { rate: '95%', avgPkg: '₹12-22 LPA', hirers: '350+', topRole: 'Investment Analyst' },
  mca:      { rate: '94%', avgPkg: '₹8-16 LPA',  hirers: '400+', topRole: 'Cloud Architect'    },
  bca:      { rate: '93%', avgPkg: '₹4-9 LPA',   hirers: '350+', topRole: 'Full-stack Engineer'},
  bba:      { rate: '92%', avgPkg: '₹4-8 LPA',   hirers: '350+', topRole: 'Business Manager'   },
  ba:       { rate: '88%', avgPkg: '₹3-6 LPA',   hirers: '250+', topRole: 'Policy Analyst'     },
  ma:       { rate: '89%', avgPkg: '₹4-8 LPA',   hirers: '250+', topRole: 'Content Editor'     },
  msc:      { rate: '90%', avgPkg: '₹5-10 LPA',  hirers: '280+', topRole: 'Data Analyst'       },
  majmc:    { rate: '89%', avgPkg: '₹4-9 LPA',   hirers: '220+', topRole: 'Digital Producer'   },
}

const DEFAULT_STATS: PlacementStats = { rate: '90%', avgPkg: '₹4-10 LPA', hirers: '300+', topRole: 'Specialist' }

export default function PlacementStatsStrip({ slug }: { slug: string }) {
  const stats = PLACEMENT_DATA[slug] ?? DEFAULT_STATS

  const CELLS = [
    { Icon: IconTrendingUp, value: stats.rate,    label: 'Placement rate'  },
    { Icon: IconCash,       value: stats.avgPkg,  label: 'Average package' },
    { Icon: IconBriefcase,  value: stats.hirers,  label: 'Hiring partners' },
    { Icon: IconAward,      value: stats.topRole, label: 'Top role'        },
  ]

  return (
    <div className="bg-vgu-red border-b border-vgu-red-dark">
      <div className="mx-auto max-w-[1280px] grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-white/15">
        {CELLS.map(({ Icon, value, label }, i) => (
          <div
            key={label}
            data-animate="fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
            className="flex items-center gap-3 px-4 py-4 md:px-6 md:py-5 lg:px-8"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-none bg-white/15 border border-white/20">
              <Icon size={18} stroke={1.5} className="text-vgu-yellow" />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-black text-[19px] md:text-[22px] leading-tight text-white truncate">{value}</p>
              <p className="text-[11px] font-body text-white/70 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
