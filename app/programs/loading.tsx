export default function ProgramsLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="relative overflow-hidden bg-neutral-800 py-14 px-5 md:px-8 lg:px-12 lg:py-20">
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto max-w-[1280px] animate-pulse">
          <div className="h-3 w-48 rounded-full bg-white/15 mb-5" />
          <div className="h-12 w-72 rounded-xl bg-white/20 mb-4 md:h-14 md:w-96" />
          <div className="space-y-2.5 mb-8">
            <div className="h-4 w-full max-w-[480px] rounded bg-white/12" />
            <div className="h-4 w-[70%] max-w-[340px] rounded bg-white/12" />
          </div>
          <div className="flex gap-8 mb-9">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-8 rounded bg-white/25 mb-1" />
                <div className="h-3 w-16 rounded bg-white/15" />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="h-12 w-40 rounded-full bg-vgu-red/80" />
            <div className="h-12 w-48 rounded-full bg-white/15 border border-neutral-200/20" />
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <section className="bg-neutral-50 py-12 px-5 md:px-8 lg:px-12 md:py-16">
        <div className="mx-auto max-w-[1280px] animate-pulse">

          {/* Header + filters */}
          <div className="flex flex-wrap items-end justify-between gap-5 mb-10 md:mb-12">
            <div>
              <div className="h-3 w-24 rounded-full bg-neutral-200 mb-2" />
              <div className="h-8 w-48 rounded-lg bg-neutral-200 mb-1" />
              <div className="h-3 w-36 rounded-full bg-neutral-100" />
            </div>
            <div className="flex gap-2">
              {[100, 88, 80, 96].map((w, i) => (
                <div key={i} className="h-10 rounded-full bg-neutral-200" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>

          {/* Discipline group */}
          <div className="space-y-14">
            {[...Array(3)].map((_, gi) => (
              <div key={gi}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 rounded-full bg-neutral-300" />
                  <div className="h-5 w-36 rounded bg-neutral-200" />
                  <div className="h-3 w-16 rounded bg-neutral-100" />
                </div>
                {/* Cards grid */}
                <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {[...Array(gi === 0 ? 4 : gi === 1 ? 3 : 2)].map((_, ci) => (
                    <div key={ci} className="rounded-2xl border border-neutral-200 overflow-hidden bg-white">
                      <div className="h-[148px] bg-neutral-200" />
                      <div className="p-4 lg:p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-neutral-200 flex-none" />
                          <div className="flex-1">
                            <div className="h-4 w-24 rounded bg-neutral-200 mb-1" />
                            <div className="h-3 w-32 rounded bg-neutral-100" />
                          </div>
                        </div>
                        <div className="h-3 w-28 rounded bg-neutral-100 mb-3" />
                        <div className="flex gap-1.5">
                          <div className="h-5 w-16 rounded-full bg-neutral-100" />
                          <div className="h-5 w-20 rounded-full bg-neutral-100" />
                        </div>
                      </div>
                      <div className="px-4 pb-4 flex gap-2">
                        <div className="flex-1 h-10 rounded-full bg-neutral-200" />
                        <div className="w-20 h-10 rounded-full bg-neutral-100" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mobile cards */}
                <div className="flex sm:hidden gap-4 overflow-hidden -mx-5 px-5">
                  {[...Array(2)].map((_, ci) => (
                    <div key={ci} className="flex-none w-[260px] rounded-2xl border border-neutral-200 overflow-hidden bg-white">
                      <div className="h-[148px] bg-neutral-200" />
                      <div className="p-4">
                        <div className="h-4 w-24 rounded bg-neutral-200 mb-2" />
                        <div className="h-3 w-32 rounded bg-neutral-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
