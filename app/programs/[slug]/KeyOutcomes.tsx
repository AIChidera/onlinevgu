import { IconCheck } from '@tabler/icons-react'

export default function KeyOutcomes({ outcomes }: { outcomes: string[] }) {
  const safe = (Array.isArray(outcomes) ? outcomes : []).map(o => o.replace(/—/g, '-').replace(/–/g, '-'))
  if (!safe.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5">
      {safe.map((o, i) => (
        <div
          key={o}
          data-animate="fade-up"
          style={{ animationDelay: `${i * 60}ms` }}
          className="flex items-start gap-3"
        >
          <IconCheck size={16} stroke={2.5} className="flex-none text-vgu-red mt-0.5 shrink-0" />
          <p className="font-body text-[16px] lg:text-[17px] leading-[1.65] text-neutral-800">{o}</p>
        </div>
      ))}
    </div>
  )
}
