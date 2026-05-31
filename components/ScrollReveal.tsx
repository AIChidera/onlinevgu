'use client'

import { useEffect } from 'react'

const VARIANT_CLASS: Record<string, string> = {
  'fade-up':          'anim-fade-up',
  'materialize':      'anim-materialize',
  'slide-from-left':  'anim-slide-left',
  'slide-from-right': 'anim-slide-right',
}

function triggerAnim(el: HTMLElement) {
  el.classList.remove('sr-ready')
  const animClass = VARIANT_CLASS[el.dataset.animate ?? ''] ?? 'anim-fade-up'
  el.classList.add(animClass)
  // Remove after completion so fill-mode doesn't block subsequent opacity changes
  // (e.g. Testimonials story-switch uses opacity-0/opacity-100 classes directly).
  el.addEventListener('animationend', () => el.classList.remove(animClass), { once: true })
}

export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          triggerAnim(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
      el.classList.add('sr-ready')
      const { top, bottom } = el.getBoundingClientRect()
      if (top < window.innerHeight && bottom > 0) {
        // Element is in the initial viewport — animate after one rAF so the
        // browser paints the sr-ready (opacity:0) state before we trigger.
        // fill-mode:both keeps the element invisible during any animationDelay.
        requestAnimationFrame(() => triggerAnim(el))
      } else {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return null
}
