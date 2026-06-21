'use client'
import { useState, useEffect, useRef } from 'react'
import { IconChevronUp } from '@tabler/icons-react'

const HIDE_DELAY_MS = 1500
const MIN_SCROLL_Y  = 500

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const clearHideTimer = () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current)
        hideTimer.current = null
      }
    }
    const scheduleHide = () => {
      clearHideTimer()
      hideTimer.current = setTimeout(() => setVisible(false), HIDE_DELAY_MS)
    }
    const onScroll = () => {
      if (window.scrollY > MIN_SCROLL_Y) {
        setVisible(true)
        scheduleHide()
      } else {
        clearHideTimer()
        setVisible(false)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearHideTimer()
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={[
        'lg:hidden fixed right-6 z-40 w-11 h-11 rounded-full bg-white border border-neutral-200',
        'shadow-[0_4px_16px_rgba(17,24,39,0.12)] flex items-center justify-center text-neutral-600',
        'hover:text-vgu-red hover:border-vgu-red/30 hover:shadow-[0_6px_20px_rgba(192,64,54,0.18)]',
        'transition-[opacity,transform] duration-300 ease-out',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-2 pointer-events-none',
      ].join(' ')}
      style={{
        bottom: 'calc(max(1.5rem, env(safe-area-inset-bottom) + 8px) + 64px)',
      }}
    >
      <IconChevronUp size={18} stroke={2.25} />
    </button>
  )
}
