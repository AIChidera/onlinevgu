'use client'

import { useEffect } from 'react'

/**
 * Global scroll-reveal observer.
 * Targets every `section[id]` except #hero (which is above the fold).
 * Sections already in viewport on load are made visible instantly.
 * Sections below the fold start hidden (sr-ready) and animate in (sr-visible).
 */
export default function ScrollReveal() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[id]:not(#hero), [data-reveal]')
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sr-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '-20px 0px' }
    )

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0

      if (alreadyVisible) {
        // Already in view on load — no animation needed
        section.classList.add('sr-visible')
      } else {
        // Below fold — start hidden, animate in on scroll
        section.classList.add('sr-ready')
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [])

  return null
}
