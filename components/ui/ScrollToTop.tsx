'use client'
import { useState, useEffect } from 'react'
import { IconChevronUp } from '@tabler/icons-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', toggle, { passive: true })
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-40 lg:bottom-6 w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-[0_4px_16px_rgba(17,24,39,0.12)] flex items-center justify-center text-neutral-500 hover:text-vgu-red hover:border-vgu-red/30 hover:shadow-[0_6px_20px_rgba(192,64,54,0.15)] transition-all duration-200 hover:-translate-y-0.5"
    >
      <IconChevronUp size={18} />
    </button>
  )
}
