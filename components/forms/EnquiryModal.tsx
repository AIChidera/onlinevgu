'use client'

import { useEffect } from 'react'
import LeadForm from './LeadForm'

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.documentElement.scrollTop = scrollY
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center sm:justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm animate-fade-in" aria-hidden="true" />

      {/* Panel - flex column: header pinned, form scrolls */}
      <div
        className="relative z-10 w-full max-w-[460px] animate-rise-in rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[90vh] sm:h-auto sm:max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header - pinned, never scrolls */}
        <div className="flex-none bg-gradient-to-r from-vgu-red to-vgu-red-dark px-6 py-5">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-[30] flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className="flex items-center gap-2.5 mb-1">
            <span className="relative flex h-2.5 w-2.5 flex-none">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            <span className="text-[13px] font-medium text-white/80">Counsellors available now</span>
          </div>
          <h2 className="font-heading text-[22px] font-extrabold text-white leading-snug">
            Talk to a free counsellor
          </h2>
          <p className="mt-1 text-[14px] text-white/75">
            We&apos;ll call you within 2 hours. No sales pressure.
          </p>
        </div>

        {/* Form - this section scrolls */}
        <div
          className="flex-1 min-h-0 overflow-y-auto bg-white p-6"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y', overscrollBehaviorY: 'contain' }}
        >
          <LeadForm onSuccess={onClose} source="modal" />
        </div>
      </div>
    </div>
  )
}
