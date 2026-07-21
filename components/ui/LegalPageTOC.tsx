'use client'

import { useEffect, useState } from 'react'

export interface TOCSection { id: string; num: string; title: string }

export default function LegalPageTOC({ sections }: { sections: TOCSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    const elements = sections
      .map(s => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    // Detection band starts just below the sticky header (matches each
    // section's own scroll-mt-24) and ends 65% down the viewport, so the
    // section the reader is actually looking at is the one that "wins".
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        )
        setActiveId(topMost.target.id)
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav>
      <ul className="flex flex-col gap-2.5">
        {sections.map((s) => {
          const active = activeId === s.id
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active ? 'true' : undefined}
                className={[
                  'group flex items-baseline gap-2.5 border-l-2 pl-3 text-[13px] font-body transition-colors duration-150',
                  active
                    ? 'border-vgu-red text-vgu-red font-semibold'
                    : 'border-transparent text-neutral-500 hover:text-vgu-red',
                ].join(' ')}
              >
                <span
                  className={[
                    'w-5 flex-none font-heading font-semibold text-[11px] transition-colors',
                    active ? 'text-vgu-red' : 'text-neutral-300 group-hover:text-vgu-red/70',
                  ].join(' ')}
                >
                  {s.num}
                </span>
                <span className="leading-[1.45]">{s.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
