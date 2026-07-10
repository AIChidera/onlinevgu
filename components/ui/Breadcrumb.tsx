import Link from 'next/link'
import { IconChevronRight } from '@tabler/icons-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const all: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items]

  return (
    <nav aria-label="Breadcrumb" className="bg-neutral-50 border-b border-neutral-200 px-5 md:px-8 lg:px-12">
      <ol className="mx-auto max-w-[1280px] flex items-center gap-1.5 min-w-0">
        {all.map((item, i) => {
          const isLast = i === all.length - 1
          return (
            <li key={i} className={`flex items-center gap-1.5 ${isLast ? 'min-w-0 flex-1' : 'flex-none'}`}>
              {i > 0 && (
                <IconChevronRight size={12} stroke={2} className="text-neutral-300 flex-none" aria-hidden="true" />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex items-center min-h-[44px] text-[13px] font-body text-neutral-500 hover:text-vgu-red transition-colors duration-150 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center min-h-[44px] text-[13px] font-body font-semibold text-neutral-800 truncate min-w-0" aria-current="page">
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
