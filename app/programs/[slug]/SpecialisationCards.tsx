import { SPEC_DETAILS } from './specialisationDetails'

export default function SpecialisationCards({ specialisations }: { specialisations: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
      {specialisations.map((name, i) => {
        const detail = SPEC_DETAILS[name]
        return (
          <div
            key={name}
            data-animate="fade-up"
            style={{ animationDelay: `${i * 50}ms` }}
            className="flex gap-4"
          >
            {/* Thin red accent bar */}
            <div className="flex-none w-0.5 bg-vgu-red rounded-full" />

            <div>
              <h3 className="font-heading font-bold text-[16px] text-neutral-900 mb-1">{name}</h3>
              {detail?.summary && (
                <p className="font-body text-[14px] leading-[1.65] text-neutral-500 mb-2">
                  {detail.summary}
                </p>
              )}
              {detail?.roles && detail.roles.length > 0 && (
                <p className="font-body text-[13px] text-neutral-400">
                  {detail.roles.join(' · ')}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
