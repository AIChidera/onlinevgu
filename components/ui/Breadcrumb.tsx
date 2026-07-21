import Link from 'next/link'
import { IconChevronRight } from '@tabler/icons-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
  // 'default' - its own light strip above the page content (the usual case).
  // 'overlay' - no background of its own; sits directly on a dark hero image,
  // soft translucent white text instead of neutral grays. Caller supplies its
  // own positioning/spacing - this just renders the crumb row itself.
  variant?: 'default' | 'overlay'
}

export default function Breadcrumb({ items, variant = 'default' }: Props) {
  const all: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items]
  const overlay = variant === 'overlay'

  return (
    <nav
      aria-label="Breadcrumb"
      className={overlay ? undefined : 'bg-neutral-50 border-b border-neutral-200 px-5 md:px-8 lg:px-12'}
    >
      <ol className={['flex items-center gap-1.5 min-w-0', overlay ? '' : 'mx-auto max-w-[1280px]'].join(' ')}>
        {all.map((item, i) => {
          const isLast = i === all.length - 1
          return (
            <li key={i} className={`flex items-center gap-1.5 ${isLast ? 'min-w-0 flex-1' : 'flex-none'}`}>
              {i > 0 && (
                <IconChevronRight
                  size={12}
                  stroke={2}
                  className={overlay ? 'text-white/30 flex-none' : 'text-neutral-300 flex-none'}
                  aria-hidden="true"
                />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className={[
                    'flex items-center min-h-[44px] text-[13px] font-body transition-colors duration-150 whitespace-nowrap',
                    overlay
                      ? 'text-white/60 hover:text-vgu-yellow'
                      : 'text-neutral-500 hover:text-vgu-red',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={[
                    'flex items-center min-h-[44px] text-[13px] font-body font-semibold truncate min-w-0',
                    overlay ? 'text-white' : 'text-neutral-800',
                  ].join(' ')}
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
