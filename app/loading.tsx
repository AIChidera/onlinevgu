// Instant skeleton shown while the home page server component renders.
// Appears immediately on any navigation to /, eliminating the blank-screen wait.
export default function HomeLoading() {
  return (
    <div className="overflow-hidden">

      {/* ── Hero skeleton ── */}
      <section className="relative overflow-hidden py-20 px-5 md:px-8 lg:px-12 lg:py-32"
        style={{ background: 'linear-gradient(135deg,#111827 0%,#1a1a2e 100%)' }}>
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 xl:grid-cols-[55fr_45fr] gap-16 items-center animate-pulse">

          {/* Left copy */}
          <div>
            <div className="h-2.5 w-48 rounded-full bg-vgu-red/50 mb-6" />
            <div className="h-14 w-[78%] max-w-[460px] rounded-xl bg-white/20 mb-3 md:h-16" />
            <div className="h-12 w-[55%] max-w-[340px] rounded-xl bg-white/15 mb-2 md:h-14" />
            <div className="h-10 w-[45%] max-w-[280px] rounded-xl bg-vgu-red/30 mb-6 md:h-12" />
            <div className="space-y-2.5 mb-9">
              <div className="h-4 w-full max-w-[480px] rounded bg-white/10" />
              <div className="h-4 w-[80%] max-w-[385px] rounded bg-white/10" />
              <div className="h-4 w-[55%] max-w-[265px] rounded bg-white/10" />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="h-12 w-36 rounded-full bg-vgu-red/60" />
              <div className="h-12 w-44 rounded-full bg-white/10 border border-white/15" />
            </div>
          </div>

          {/* Right badge cluster - desktop only */}
          <div className="hidden xl:block">
            <div className="relative w-full aspect-[4/3] animate-pulse">
              <div className="absolute -top-5 left-5 h-16 w-40 rounded-2xl bg-white/10" />
              <div className="absolute -top-3 right-5 h-12 w-44 rounded-2xl bg-white/10" />
              <div className="absolute -bottom-5 left-5 h-16 w-48 rounded-2xl bg-white/10" />
              <div className="absolute -bottom-3 right-5 h-14 w-36 rounded-2xl bg-white/10" />
            </div>
          </div>

        </div>
      </section>

      {/* ── Trust bar skeleton ── */}
      <div className="bg-white border-b border-neutral-200 py-5 px-5 md:px-8">
        <div className="mx-auto max-w-[1280px] flex items-center justify-center gap-8 md:gap-12 animate-pulse overflow-hidden">
          {[72, 56, 88, 64, 80].map((w, i) => (
            <div key={i} className="flex-none h-7 rounded bg-neutral-100" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>

      {/* ── Programs section skeleton ── */}
      <section className="bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1280px] animate-pulse">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="h-2.5 w-28 rounded-full bg-neutral-200 mx-auto mb-3" />
            <div className="h-9 w-64 rounded-xl bg-neutral-200 mx-auto mb-4 md:h-11" />
            <div className="h-4 w-80 rounded bg-neutral-100 mx-auto mb-8" />
            {/* Filter tabs */}
            <div className="flex gap-2 justify-center">
              {[100, 116, 120].map((w, i) => (
                <div key={i} className="h-10 rounded-full bg-neutral-200" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>
          {/* Card grid — desktop */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 overflow-hidden">
                <div className="h-[200px] bg-neutral-200" />
                <div className="p-5">
                  <div className="h-3 w-16 rounded-full bg-neutral-100 mb-3" />
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-[8px] bg-neutral-200 flex-none" />
                    <div className="flex-1">
                      <div className="h-4 w-16 rounded bg-neutral-200 mb-1" />
                      <div className="h-3 w-24 rounded bg-neutral-100" />
                    </div>
                  </div>
                  <div className="h-3 w-28 rounded bg-neutral-100 mb-4" />
                  <div className="pt-4 border-t border-neutral-100">
                    <div className="h-8 w-28 rounded-full bg-neutral-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Card row — mobile */}
          <div className="flex sm:hidden gap-3 overflow-hidden -mx-5 px-5">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex-none w-[75vw] max-w-[285px] rounded-[16px] border border-neutral-200 overflow-hidden">
                <div className="h-[200px] bg-neutral-200" />
                <div className="p-4">
                  <div className="h-4 w-20 rounded bg-neutral-200 mb-2" />
                  <div className="h-3 w-28 rounded bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip skeleton ── */}
      <section className="bg-neutral-50 py-16 px-5 md:px-8 lg:py-24 animate-pulse">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-12">
            <div className="h-2.5 w-24 rounded-full bg-neutral-200 mx-auto mb-3" />
            <div className="h-9 w-56 rounded-xl bg-neutral-200 mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-white border border-neutral-100 p-7 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="h-12 w-24 rounded-lg bg-neutral-200 mb-2" />
                <div className="h-4 w-20 rounded bg-neutral-100 mb-1" />
                <div className="h-3 w-28 rounded bg-neutral-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
