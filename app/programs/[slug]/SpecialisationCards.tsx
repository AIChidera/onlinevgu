import { SPEC_DETAILS } from './specialisationDetails'

export default function SpecialisationCards({ specialisations }: { specialisations: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
      {specialisations.map((name, i) => {
        const detail = SPEC_DETAILS[name]
        return (
          <div
            key={name}
            data-animate="fade-up"
            style={{ animationDelay: `${i * 50}ms` }}
            className="flex gap-4"
          >
            <div className="flex-none w-0.5 bg-vgu-red rounded-full self-stretch" />

            <div>
              <h3 className="font-heading font-bold text-[17px] tracking-[-0.2px] text-neutral-900 mb-1.5">{name}</h3>
              {detail?.summary && (
                <p className="font-body text-[14px] leading-[1.65] text-neutral-600 mb-2">
                  {detail.summary}
                </p>
              )}
              {detail?.roles && detail.roles.length > 0 && (
                <p className="font-body text-[13px] text-neutral-500">
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
