'use client'

import { IconCheck } from '@tabler/icons-react'

const PALETTE = [
  { grad: 'linear-gradient(135deg,#C04036,#821a12)', hex: '#C04036' },
  { grad: 'linear-gradient(135deg,#FFA412,#C04036)', hex: '#FFA412' },
  { grad: 'linear-gradient(135deg,#821a12,#3b0d09)', hex: '#821a12' },
]

export default function ProgramHighlights({ highlights }: { highlights: string[] }) {
  const safe = Array.isArray(highlights) ? highlights : []
  if (!safe.length) return null

  return (
    <>
      <style>{`
        .hl-card-0:hover { box-shadow: 0 0 0 2px #C04036, 0 10px 40px rgba(0,0,0,0.10); }
        .hl-card-1:hover { box-shadow: 0 0 0 2px #FFA412, 0 10px 40px rgba(0,0,0,0.10); }
        .hl-card-2:hover { box-shadow: 0 0 0 2px #821a12, 0 10px 40px rgba(0,0,0,0.10); }
      `}</style>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {safe.map((h, i) => {
          const p   = PALETTE[i % PALETTE.length]
          const num = String(i + 1).padStart(2, '0')
          return (
            <div
              key={h}
              data-animate="materialize"
              style={{ animationDelay: `${i * 60}ms` }}
              className="h-full"
            >
              <div
                className={`hl-card-${i % 3} group/card relative flex items-stretch rounded-2xl border overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-transparent h-full`}
                style={{
                  borderColor: `${p.hex}40`,
                  background: `linear-gradient(135deg, #ffffff 55%, ${p.hex}0f 100%)`,
                }}
              >
                <div className="w-3 flex-none" style={{ background: p.grad }} />
                <div className="flex items-start gap-4 p-5 flex-1 relative overflow-hidden">
                  <span
                    className="absolute -top-4 right-2 font-heading font-black leading-none select-none pointer-events-none text-[96px]"
                    style={{ color: p.hex, opacity: 0.12 }}
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
                  <p className="text-[16px] font-body leading-[1.55] text-neutral-800 relative z-10 pt-1.5 pr-8">
                    {h}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
