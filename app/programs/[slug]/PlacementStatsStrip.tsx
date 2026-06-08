'use client'

import { IconTrendingUp, IconUsers, IconBriefcase, IconBook2 } from '@tabler/icons-react'

interface PlacementStats { rate: string; avgPkg: string; hirers: string; coursera: string }

const PLACEMENT_DATA: Record<string, PlacementStats> = {
  mba:            { rate: '97%', avgPkg: '₹10-18 LPA', hirers: '500+', coursera: '7,000+' },
  'mba-healthcare':{ rate: '95%', avgPkg: '₹8-14 LPA', hirers: '400+', coursera: '7,000+' },
  mca:            { rate: '94%', avgPkg: '₹6-14 LPA', hirers: '400+', coursera: '7,000+' },
  bca:            { rate: '93%', avgPkg: '₹10-15 LPA', hirers: '350+', coursera: '7,000+' },
  bba:            { rate: '92%', avgPkg: '₹4-8 LPA',  hirers: '350+', coursera: '7,000+' },
  bcom:           { rate: '91%', avgPkg: '₹3-7 LPA',  hirers: '300+', coursera: '7,000+' },
  mcom:           { rate: '90%', avgPkg: '₹5-10 LPA', hirers: '300+', coursera: '7,000+' },
  ma:             { rate: '89%', avgPkg: '₹4-8 LPA',  hirers: '250+', coursera: '7,000+' },
  ba:             { rate: '88%', avgPkg: '₹3-6 LPA',  hirers: '250+', coursera: '7,000+' },
  bsc:            { rate: '90%', avgPkg: '₹3-7 LPA',  hirers: '280+', coursera: '7,000+' },
  mlib:           { rate: '87%', avgPkg: '₹4-7 LPA',  hirers: '200+', coursera: '7,000+' },
  blib:           { rate: '85%', avgPkg: '₹2.5-5 LPA',hirers: '180+', coursera: '7,000+' },
}

const DEFAULT_STATS: PlacementStats = { rate: '90%', avgPkg: '₹4-10 LPA', hirers: '300+', coursera: '7,000+' }

export default function PlacementStatsStrip({ slug }: { slug: string }) {
  const stats = PLACEMENT_DATA[slug] ?? DEFAULT_STATS

  const CELLS = [
    { Icon: IconTrendingUp, value: stats.rate,     label: 'Placement rate',      color: '#C04036' },
    { Icon: IconUsers,      value: stats.avgPkg,   label: 'Average package',     color: '#2563eb' },
    { Icon: IconBriefcase,  value: stats.hirers,   label: 'Hiring partners',     color: '#7c3aed' },
    { Icon: IconBook2,      value: stats.coursera, label: 'Coursera courses',    color: '#d97706' },
  ]

  return (
    <div className="bg-neutral-900 border-b border-neutral-800">
      <div className="mx-auto max-w-[1280px] grid grid-cols-2 lg:grid-cols-4 divide-x divide-neutral-800">
        {CELLS.map(({ Icon, value, label, color }, i) => (
          <div
            key={label}
            data-animate="fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
            className="flex items-center gap-3 px-4 py-4 md:px-6 md:py-5 lg:px-8"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
              style={{ background: color + '22', border: `1px solid ${color}40` }}
            >
              <Icon size={18} stroke={1.5} style={{ color }} />
            </div>
            <div>
              <p className="font-heading font-black text-[22px] leading-none text-white">{value}</p>
              <p className="text-[11px] font-body text-neutral-400 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
