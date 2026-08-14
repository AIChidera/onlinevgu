'use client'

import { useEffect } from 'react'

// Reads the animationDelay inline style value so stagger delays set on
// individual elements via style={{ animationDelay: '80ms' }} still work -
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

    // Split into a write phase (classList.add) and a read phase
    // (getBoundingClientRect) instead of interleaving them per-element - doing
    // both inside one loop forces the browser to recompute layout on every
    // single iteration ("layout thrashing"), which showed up as ~3.5s of pure
    // Style & Layout time in production Lighthouse runs on pages with dozens
    // of [data-animate] elements. Batching all writes before all reads lets
    // the browser coalesce that into effectively one layout pass.
    function markReady(el: HTMLElement): boolean {
      if (processed.has(el)) return false
      processed.add(el)
      el.classList.add('sr-ready')
      return true
    }

    function checkAndReveal(el: HTMLElement) {
      const { top, bottom } = el.getBoundingClientRect()
      if (top < window.innerHeight && bottom > 0) {
        // Two rAFs: the first lets the browser commit the .sr-ready (opacity:0)
        // paint; the second fires after that paint so the CSS transition has a
        // genuine "from" state to animate from.
        requestAnimationFrame(() => requestAnimationFrame(() => triggerAnim(el)))
      } else {
        observer.observe(el)
      }
    }

    const initialEls = Array.from(document.querySelectorAll<HTMLElement>('[data-animate]')).filter(markReady)
    initialEls.forEach(checkAndReveal)

    // Pick up elements added later (dynamic imports, client-side navigation).
    // These arrive one at a time, not as one big batch, so there's no
    // meaningful thrashing to split here.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return
          const el = node as HTMLElement
          if (el.dataset?.animate && markReady(el)) checkAndReveal(el)
          el.querySelectorAll<HTMLElement>('[data-animate]').forEach(child => {
            if (markReady(child)) checkAndReveal(child)
          })
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
