import { IconFileText } from '@tabler/icons-react'

interface Doc { name: string; note: string; level?: 'ug' | 'pg'; optional?: boolean }

interface Props {
  programLevel: 'ug' | 'pg'
  documents:    Doc[]
}

export default function RequiredDocuments({ programLevel, documents }: Props) {
  const visible = documents.filter(d => !d.level || d.level === programLevel)

  return (
    <section className="bg-neutral-50 border-t border-neutral-100 py-16 px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1080px]">
        <div data-animate="fade-up" className="mb-8 text-center">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Have these ready
          </p>
          <h2 className="font-heading font-bold text-[24px] lg:text-[28px] tracking-[-0.5px] text-neutral-900 mb-3">
            Documents you&apos;ll need at application
          </h2>
          <p className="text-[15px] font-body leading-[1.65] text-neutral-500 max-w-[520px] mx-auto">
            Scan or photograph each one. Upload happens entirely inside the application form.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {visible.map((d, i) => (
            <div
              key={d.name}
              data-animate="fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
              className="group/d flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 hover:border-vgu-red/30 transition-colors duration-200"
            >
              <div className="flex-none w-9 h-9 rounded-lg bg-vgu-red/8 border border-vgu-red/15 flex items-center justify-center mt-0.5">
                <IconFileText size={16} stroke={1.75} className="text-vgu-red" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="font-heading font-semibold text-[14.5px] text-neutral-900">{d.name}</p>
                  {d.optional && (
                    <span className="rounded-full bg-neutral-100 text-neutral-500 text-[10px] font-heading font-bold uppercase tracking-[0.06em] px-2 py-0.5">
                      Optional
                    </span>
                  )}
                </div>
                <p className="text-[13px] font-body text-neutral-500 leading-[1.5]">{d.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
