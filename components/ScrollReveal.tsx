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
  // Remove after completion so fill-mode doesn't block subsequent opacity changes.
  el.addEventListener('animationend', () => el.classList.remove(animClass), { once: true })
}

export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Track processed elements so MutationObserver never double-processes.
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
        // Already in the initial viewport — fire after one rAF so the browser
        // paints the sr-ready (opacity:0) state before we trigger the animation.
        requestAnimationFrame(() => triggerAnim(el))
      } else {
        observer.observe(el)
      }
    }

    // Initial scan for all elements present at mount time.
    document.querySelectorAll<HTMLElement>('[data-animate]').forEach(processEl)

    // Watch for elements added later by dynamic (ssr:false) imports.
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
