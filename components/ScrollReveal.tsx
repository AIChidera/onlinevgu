'use client'

import { useEffect } from 'react'

// Reads the animationDelay inline style value so stagger delays set on
// individual elements via style={{ animationDelay: '80ms' }} still work —
// no need to rename them to transitionDelay across dozens of files.
function readDelayMs(el: HTMLElement): number {
  const raw = el.style.animationDelay || '0'
  if (raw.endsWith('ms')) return parseFloat(raw)
  if (raw.endsWith('s'))  return parseFloat(raw) * 1000
  return 0
}

function triggerAnim(el: HTMLElement) {
  const reveal = () => {
    el.classList.remove('sr-ready')
    // After the CSS transition completes, remove data-animate so the
    // element's hover transitions revert to their Tailwind defaults.
    function done(e: Event) {
      if ((e as TransitionEvent).propertyName !== 'opacity') return
      el.removeEventListener('transitionend', done)
      el.removeAttribute('data-animate')
    }
    el.addEventListener('transitionend', done)
  }

  const delay = readDelayMs(el)
  if (delay > 0) setTimeout(reveal, delay)
  else reveal()
}

export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const processed = new Set<HTMLElement>()

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

    function processEl(el: HTMLElement) {
      if (processed.has(el)) return
      processed.add(el)
      el.classList.add('sr-ready')
      const { top, bottom } = el.getBoundingClientRect()
      if (top < window.innerHeight && bottom > 0) {
        // Already visible on load — fire after one rAF so the browser
        // paints the sr-ready (opacity:0) state first.
        requestAnimationFrame(() => triggerAnim(el))
      } else {
        observer.observe(el)
      }
    }

    document.querySelectorAll<HTMLElement>('[data-animate]').forEach(processEl)

    // Pick up elements added later (dynamic imports, client-side navigation).
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return
          const el = node as HTMLElement
          if (el.dataset?.animate) processEl(el)
          el.querySelectorAll<HTMLElement>('[data-animate]').forEach(processEl)
        })
      })
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}
