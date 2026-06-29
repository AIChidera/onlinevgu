import { IconUserCheck, IconFileText, IconMessages, IconUsersGroup } from '@tabler/icons-react'

interface Service { title: string; detail: string }

const ICONS = [IconUserCheck, IconFileText, IconMessages, IconUsersGroup] as const

export default function CareerServices({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {services.map((s, i) => {
        const Icon = ICONS[i % ICONS.length]
        return (
          <div
            key={s.title}
            data-animate="fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
            className="rounded-xl border border-neutral-200 bg-white p-4 hover:border-vgu-red/30 transition-colors duration-200"
          >
            <div className="w-9 h-9 rounded-lg bg-vgu-red/8 border border-vgu-red/15 flex items-center justify-center mb-3">
              <Icon size={16} stroke={1.75} className="text-vgu-red" />
            </div>
            <p className="font-heading font-semibold text-[14px] text-neutral-900 mb-1 leading-snug">{s.title}</p>
            <p className="text-[12.5px] font-body text-neutral-500 leading-[1.55]">{s.detail}</p>
          </div>
        )
      })}
    </div>
  )
}
