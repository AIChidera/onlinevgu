'use client'

import { useEffect, useRef } from 'react'
import LeadForm from './LeadForm'

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
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
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm animate-fade-in" />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[460px] animate-rise-in rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-vgu-red to-vgu-red-dark px-6 py-5">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
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

        {/* Form */}
        <div className="p-6">
          <LeadForm onSuccess={onClose} source="modal" />
        </div>
      </div>
    </div>
  )
}
