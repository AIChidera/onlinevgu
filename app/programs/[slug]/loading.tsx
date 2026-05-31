export default function ProgramPageLoading() {
  return (
    <div className="pb-16 lg:pb-0">

      {/* Hero - correct gradient so there's no color flash when the real page arrives */}
      <div
        className="min-h-[320px] md:min-h-[460px]"
        style={{ background: 'linear-gradient(135deg, #C04036 0%, #821a12 100%)' }}
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 py-12 md:py-14 lg:py-20 animate-pulse">
          <div className="h-3 w-36 rounded-full bg-white/15 mb-6" />
          <div className="flex gap-2 mb-5">
            <div className="h-6 w-24 rounded-full bg-white/20" />
          </div>
          <div className="h-16 w-64 rounded-xl bg-white/20 mb-3 md:h-11 md:w-44" />
          <div className="h-4 w-48 rounded-full bg-white/15 mb-4" />
          <div className="space-y-2.5 mb-7">
            <div className="h-4 w-full max-w-[480px] rounded bg-white/12" />
            <div className="h-4 w-[75%] max-w-[360px] rounded bg-white/12" />
            <div className="h-4 w-[55%] max-w-[264px] rounded bg-white/12" />
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {[110, 96, 88, 128, 120].map((w, i) => (
              <div
                key={i}
                className="h-9 rounded-full bg-white/15"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Activity ticker placeholder */}
      <div className="h-11 bg-neutral-900" />

      {/* Placement stats strip placeholder */}
      <div className="h-24 bg-neutral-50 border-y border-neutral-200" />

      {/* Main content skeleton */}
      <section className="bg-white py-12 px-5 md:px-8 lg:px-12 md:py-16">
        <div className="mx-auto max-w-[1280px] animate-pulse">

          <div className="h-4 w-28 rounded-full bg-neutral-100 mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">

            {/* Left column */}
            <div className="flex flex-col gap-14">

              {/* Highlights block */}
              <div>
                <div className="h-3 w-20 rounded-full bg-neutral-100 mb-3" />
                <div className="h-8 w-56 rounded-lg bg-neutral-100 mb-8" />
                <div className="grid sm:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[88px] rounded-2xl bg-neutral-100" />
                  ))}
                </div>
              </div>

              {/* Specialisations block */}
              <div>
                <div className="h-3 w-24 rounded-full bg-neutral-100 mb-3" />
                <div className="h-8 w-44 rounded-lg bg-neutral-100 mb-6" />
                <div className="flex flex-wrap gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-[88px] w-full rounded-2xl bg-neutral-100 sm:w-[calc(50%-6px)]" />
                  ))}
                </div>
              </div>

            </div>

            {/* Right column - enrollment card */}
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-neutral-100 overflow-hidden">
                <div className="h-52 bg-neutral-200" />
                <div className="p-6 space-y-3.5">
                  <div className="h-16 rounded-2xl bg-neutral-100" />
                  <div className="h-16 rounded-2xl bg-neutral-100" />
                  <div className="h-12 rounded-full bg-neutral-200" />
                  <div className="h-10 rounded-full bg-neutral-100" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
