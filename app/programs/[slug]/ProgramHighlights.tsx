'use client'

import { IconCheck } from '@tabler/icons-react'

// Brand-only 3-gradient cycle. Visual variety stays inside vgu-red / vgu-yellow / vgu-red-dark.
const PALETTE = [
  { grad: 'linear-gradient(135deg,#C04036,#821a12)', hex: '#C04036' },  // red → dark red
  { grad: 'linear-gradient(135deg,#FFA412,#C04036)', hex: '#FFA412' },  // yellow → red
  { grad: 'linear-gradient(135deg,#821a12,#3b0d09)', hex: '#821a12' },  // deep red flow
]

export default function ProgramHighlights({ highlights }: { highlights: string[] }) {
  const safe = Array.isArray(highlights) ? highlights : []
  if (!safe.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {safe.map((h, i) => {
        const p = PALETTE[i % PALETTE.length]
        const num = String(i + 1).padStart(2, '0')
        return (
          <div
            key={h}
            data-animate="materialize"
            style={{ animationDelay: `${i * 60}ms` }}
            className="h-full"
          >
            <div
              className="group/card relative flex items-stretch rounded-2xl bg-white border overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_0_0_2px_#FFA412,0_10px_40px_rgba(0,0,0,0.10)] h-full"
              style={{ borderColor: `${p.hex}28` }}
            >
              <div className="w-1.5 flex-none" style={{ background: p.grad }} />
              <div className="flex items-start gap-4 p-5 flex-1 relative overflow-hidden">
                <span
                  className="absolute -top-4 right-2 font-heading font-black leading-none select-none pointer-events-none text-[96px]"
                  style={{ color: p.hex, opacity: 0.055 }}
                  aria-hidden="true"
                >
                  {num}
                </span>
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-none shadow-sm mt-0.5 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-3"
                  style={{ background: p.grad }}
                >
                  <IconCheck size={18} stroke={2.5} className="text-white" />
                </span>
                <p className="text-[14px] font-body font-medium leading-snug text-neutral-800 relative z-10 pt-1.5 pr-8">
                  {h}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
