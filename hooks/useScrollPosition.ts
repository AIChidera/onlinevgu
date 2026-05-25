'use client'

import { useEffect, useState } from 'react'

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY
          setScrollY(y)
          setScrolled(y > 20)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrollY, scrolled }
}
