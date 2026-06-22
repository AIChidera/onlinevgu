'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * On cross-page navigation via Next's <Link href="/#some-id"> the App Router
 * changes the URL but does not scroll the target element into view, so users
 * have to click the link twice. This component re-scrolls on every pathname
 * change when the URL carries a hash, with a small retry loop to wait for
 * lazy/dynamic sections to render before scrolling.
 */
export default function HashScroller() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const id = decodeURIComponent(hash.slice(1))
    if (!id) return

    let cancelled = false
    let attempts = 0

    const tryScroll = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attempts < 30) {
        attempts++
        setTimeout(tryScroll, 50)
      }
    }

    const initial = setTimeout(tryScroll, 50)
    return () => {
      cancelled = true
      clearTimeout(initial)
    }
  }, [pathname])

  return null
}
