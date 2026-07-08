'use client'

import { IconTrendingUp, IconCash, IconBriefcase, IconAward } from '@tabler/icons-react'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'

interface PlacementStats {
  rate:    string
  avgPkg:  string
  hirers:  string
  highest: string
}

const PLACEMENT_DATA: Record<string, PlacementStats> = {
  mba:      { rate: '94%', avgPkg: '₹10-18 LPA', hirers: '500+', highest: '₹28 LPA' },
  'mba-if': { rate: '92%', avgPkg: '₹12-22 LPA', hirers: '240+', highest: '₹46 LPA' },
  mca:      { rate: '93%', avgPkg: '₹8-16 LPA',  hirers: '420+', highest: '₹22 LPA' },
  bca:      { rate: '91%', avgPkg: '₹4-9 LPA',   hirers: '380+', highest: '₹14 LPA' },
  bba:      { rate: '90%', avgPkg: '₹4-8 LPA',   hirers: '360+', highest: '₹12 LPA' },
  ba:       { rate: '86%', avgPkg: '₹3-6 LPA',   hirers: '220+', highest: '₹10 LPA' },
  ma:       { rate: '87%', avgPkg: '₹4-8 LPA',   hirers: '180+', highest: '₹12 LPA' },
  msc:      { rate: '89%', avgPkg: '₹5-10 LPA',  hirers: '200+', highest: '₹18 LPA' },
  majmc:    { rate: '88%', avgPkg: '₹4-9 LPA',   hirers: '220+', highest: '₹14 LPA' },
}

const DEFAULT_STATS: PlacementStats = { rate: '88%', avgPkg: '₹4-10 LPA', hirers: '300+', highest: '₹14 LPA' }

export default function PlacementStatsStrip({ slug }: { slug: string }) {
  const stats = PLACEMENT_DATA[slug] ?? DEFAULT_STATS

  const CELLS = [
    { Icon: IconTrendingUp, value: stats.rate,    label: 'Placement rate'  },
    { Icon: IconCash,       value: stats.avgPkg,  label: 'Average package' },
    { Icon: IconBriefcase,  value: stats.hirers,  label: 'Hiring partners' },
    { Icon: IconAward,      value: stats.highest, label: 'Highest offer'   },
  ]

  return (
    <div className="sketch-hover-group relative overflow-hidden bg-vgu-red border-b border-vgu-red-dark">
      <SketchFlourish shape="arc" color="white" opacity={0.06} strokeWidth={20} trigger="in-view" />
      <div className="mx-auto max-w-[1280px] grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-white/15">
        {CELLS.map(({ Icon, value, label }, i) => (
          <div
            key={label}
            data-animate="fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
            className="flex items-center gap-2.5 px-3.5 py-3 md:gap-3 md:px-6 md:py-5 lg:px-8"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-none bg-white/15 border border-white/20">
              <Icon size={16} stroke={1.5} className="md:hidden text-vgu-yellow" />
              <Icon size={18} stroke={1.5} className="hidden md:block text-vgu-yellow" />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-black text-[17px] md:text-[22px] leading-tight text-white">{value}</p>
              <p className="text-[11px] font-body text-white/70 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
