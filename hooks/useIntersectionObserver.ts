'use client'

import { useEffect, useRef, useState } from 'react'

interface Options extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const { threshold = 0.1, root = null, rootMargin = '0px', freezeOnceVisible = true } = options
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)
        if (visible && freezeOnceVisible) observer.unobserve(el)
      },
      { threshold, root, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, root, rootMargin, freezeOnceVisible])

  return { ref, isVisible }
}
