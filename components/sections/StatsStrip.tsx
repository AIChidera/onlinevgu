const STATS = [
  { value: '50,000+', label: 'Learners enrolled'      },
  { value: '40+',     label: 'Countries represented'  },
  { value: '95%',     label: 'Placement rate'         },
  { value: '30+',     label: 'Programs offered'       },
]

export default function StatsStrip() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">

        <h2 className="text-center font-heading text-[28px] md:text-[36px] lg:text-[40px] font-bold tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-10 lg:mb-16">
          Numbers that speak for themselves
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-animate="materialize"
              className="flex flex-col items-center text-center rounded-[16px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="font-heading text-[40px] md:text-[48px] font-bold leading-none text-vgu-gold">
                {s.value}
              </div>
              <div className="mt-3 text-[15px] font-body font-medium text-neutral-600 leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
