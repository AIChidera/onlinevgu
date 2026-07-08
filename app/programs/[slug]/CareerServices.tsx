import { IconUserCheck, IconFileText, IconMessages, IconUsersGroup } from '@tabler/icons-react'

interface Service { title: string; detail: string }

const ICONS = [IconUserCheck, IconFileText, IconMessages, IconUsersGroup] as const

export default function CareerServices({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 lg:gap-y-0 lg:divide-x lg:divide-neutral-200">
      {services.map((s, i) => {
        const Icon = ICONS[i % ICONS.length]
        return (
          <div
            key={s.title}
            data-animate="fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
            className="lg:px-6 first:lg:pl-0 last:lg:pr-0"
          >
            <Icon size={22} stroke={1.75} className="text-vgu-red mb-3" />
            <p className="font-heading font-bold text-[17px] tracking-[-0.2px] text-neutral-900 mb-1.5 leading-snug">{s.title}</p>
            <p className="font-body text-[16px] text-neutral-600 leading-[1.65]">{s.detail}</p>
          </div>
        )
      })}
    </div>
  )
}
