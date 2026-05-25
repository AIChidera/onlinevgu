const PARTNERS = [
  { name: 'UGC', logo: '/assets/trust/ugc.svg', label: 'UGC Entitled' },
  { name: 'NAAC', logo: '/assets/trust/naac.svg', label: 'NAAC A+' },
  { name: 'AICTE', logo: '/assets/trust/aicte.svg', label: 'AICTE Approved' },
  { name: 'NIRF', logo: '/assets/trust/nirf.svg', label: 'NIRF Ranked' },
  { name: 'WES', logo: '/assets/trust/wes.svg', label: 'WES Canada Recognised' },
  { name: 'AIU', logo: '/assets/trust/aiu.svg', label: 'AIU Member' },
]

export default function TrustBar() {
  return (
    <div className="border-y border-neutral-200 bg-white py-4">
      <div className="mx-auto max-w-content px-12 md:px-5">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
          <span className="flex-none text-[12px] font-heading font-semibold uppercase tracking-widest text-neutral-400 pr-4 whitespace-nowrap">
            Recognised by
          </span>
          <div className="flex items-center gap-8 md:gap-6">
            {PARTNERS.map((p) => (
              <div key={p.name} className="flex flex-none flex-col items-center gap-1">
                <div className="relative h-8 w-20">
                  {/* Fallback text badge when logo unavailable */}
                  <div className="flex h-8 items-center justify-center rounded bg-neutral-100 px-2.5">
                    <span className="font-heading text-[11px] font-bold text-neutral-500 tracking-wide whitespace-nowrap">
                      {p.name}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-400 whitespace-nowrap">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
