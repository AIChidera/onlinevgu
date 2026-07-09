'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { IconChevronDown } from '@tabler/icons-react'

interface LinkItem { label: string; href: string; applyTrigger?: boolean; brochureTrigger?: boolean }

export default function FooterLinkGroup({ title, links, delay = 0 }: { title: string; links: LinkItem[]; delay?: number }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div data-animate="fade-up" style={{ animationDelay: `${delay}ms` }} className="border-b border-white/10 lg:border-none">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full min-h-[44px] items-center justify-between py-3 lg:pointer-events-none lg:min-h-0 lg:py-0 lg:mb-4"
      >
        <h5 className="font-heading text-[12px] font-semibold uppercase tracking-[0.08em] text-white">
          {title}
        </h5>
        <IconChevronDown
          size={16}
          stroke={2}
          aria-hidden="true"
          className={`text-white/40 transition-transform duration-200 lg:hidden ${open ? 'rotate-180 text-vgu-yellow' : ''}`}
        />
      </button>
      <div
        id={panelId}
        className={`overflow-hidden transition-all duration-300 ease-out lg:max-h-none lg:!opacity-100 ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="flex flex-col pb-2 lg:gap-2.5 lg:pb-0">
          {links.map((l) => (
            <li key={l.label}>
              {l.brochureTrigger ? (
                <button
                  data-brochure-trigger="true"
                  className="flex min-h-[44px] w-full items-center text-[13px] font-body text-white/60 hover:text-white transition-colors duration-150 text-left lg:min-h-0"
                >
                  {l.label}
                </button>
              ) : (
                <Link
                  href={l.href}
                  {...(l.applyTrigger ? { 'data-apply-trigger': 'true' } : {})}
                  className="flex min-h-[44px] items-center text-[13px] font-body text-white/60 hover:text-white transition-colors duration-150 lg:min-h-0"
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
