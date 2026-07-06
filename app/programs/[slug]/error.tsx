'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { IconRefresh, IconArrowLeft } from '@tabler/icons-react'

export default function ProgramSlugError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Aborted navigations (user pressed ESC mid-load) aren't real errors - reset silently.
    if (error.name === 'AbortError' || error.message?.toLowerCase().includes('abort')) {
      reset()
      return
    }
    console.error(error)
  }, [error, reset])

  return (
    <section className="py-24 px-5 md:px-8 lg:px-12 text-center bg-white">
      <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-4">
        Something went wrong
      </p>
      <h1 className="font-heading font-bold text-[28px] tracking-[-0.5px] text-neutral-900 mb-4">
        This program page couldn&apos;t load
      </h1>
      <p className="text-[15px] font-body text-neutral-500 mb-8 max-w-[400px] mx-auto">
        A quick retry usually fixes this.
      </p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-md bg-vgu-red hover:bg-vgu-red-dark text-white font-heading font-semibold text-[15px] px-7 py-3.5 transition-all duration-200"
        >
          <IconRefresh size={16} />
          Try again
        </button>
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 rounded-md border-2 border-neutral-200 hover:border-vgu-red text-neutral-600 hover:text-vgu-red font-heading font-semibold text-[15px] px-7 py-3.5 transition-all duration-200"
        >
          <IconArrowLeft size={16} />
          All programs
        </Link>
      </div>
    </section>
  )
}
