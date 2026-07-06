'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { IconX, IconZoomIn, IconShieldCheck } from '@tabler/icons-react'
import { FOUNDING_YEAR } from '@/lib/constants'

interface Props {
  programName:      string
  programFullName:  string
  sampleImageUrl?:  string  // When set, shows the uploaded Sanity image instead of the generated design
}

export default function CertificatePreview({ programName, programFullName, sampleImageUrl }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) return
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
  }, [open])

  useEffect(() => {
    if (!open) (document.activeElement as HTMLElement)?.blur()
  }, [open])

  return (
    <>
      <section className="relative bg-neutral-900 border-t border-white/[0.06] py-16 px-5 md:px-8 lg:px-12 overflow-hidden">
        {/* Dot texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        />
        <div className="relative mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <div data-animate="slide-from-left">
              <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-3">Your credential</p>
              <h2 className="font-heading font-bold text-[26px] tracking-[-0.5px] leading-[1.2] text-white mb-5 md:text-[36px]">
                Take a Look at Your Future Degree
              </h2>
              <p className="text-[16px] font-body leading-[1.7] text-white/65 mb-6">
                Your {programName} certificate is identical to the one given to on-campus graduates.
                Same design, same university seal - with no mention of &quot;online&quot; anywhere on the document.
              </p>
              <ul className="flex flex-col gap-4 mb-8">
                {[
                  'Printed on official VGU letterhead with embossed university seal',
                  'Carries NAAC A+ and UGC accreditation marks',
                  'Accepted by government and private employers across India',
                  'Valid for higher studies, civil services, and professional licensing',
                ].map(point => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md flex-none flex items-center justify-center bg-vgu-yellow/15 mt-0.5">
                      <IconShieldCheck size={13} className="text-vgu-yellow" />
                    </div>
                    <span className="text-[14px] font-body text-white/75 leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-md bg-vgu-red hover:brightness-90 text-white font-heading font-semibold text-[15px] px-8 py-3.5 transition-all duration-200 shadow-[0_4px_16px_rgba(192,64,54,0.28)]"
              >
                <IconZoomIn size={17} />
                View Sample Certificate
              </button>
            </div>

            {/* Right: certificate thumbnail */}
            <div data-animate="slide-from-right" className="flex justify-center">
              <button
                onClick={() => setOpen(true)}
                className="group relative w-full max-w-[480px] cursor-zoom-in rounded-2xl"
                aria-label="View sample certificate"
              >
                {sampleImageUrl ? (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(17,24,39,0.22)] border border-neutral-200">
                    <Image
                      src={sampleImageUrl}
                      fill
                      alt={`${programName} sample certificate`}
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 480px"
                    />
                  </div>
                ) : (
                  <Certificate programName={programName} programFullName={programFullName} />
                )}
                <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/15 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white rounded-full p-3.5 shadow-xl">
                    <IconZoomIn size={22} className="text-neutral-800" />
                  </div>
                </div>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox */}
      {open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-4">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-[760px]">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-5 -right-5 z-20 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-neutral-100 transition-colors duration-150"
              aria-label="Close certificate preview"
            >
              <IconX size={18} className="text-neutral-700" />
            </button>
            {sampleImageUrl ? (
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(17,24,39,0.35)]">
                <Image
                  src={sampleImageUrl}
                  fill
                  alt={`${programName} sample certificate`}
                  className="object-contain"
                  sizes="760px"
                />
              </div>
            ) : (
              <Certificate programName={programName} programFullName={programFullName} />
            )}
          </div>
        </div>
      )}
    </>
  )
}

function Certificate({ programName, programFullName }: { programName: string; programFullName: string }) {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#fdfaf6] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.55)] border-[6px] border-vgu-red-dark">

      {/* Inner decorative borders */}
      <div className="absolute inset-3 border border-vgu-red/25 rounded-xl pointer-events-none" />
      <div className="absolute inset-[18px] border border-vgu-red/12 rounded-[10px] pointer-events-none" />

      {/* Corner ornaments */}
      <div className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 border-vgu-red/40" />
      <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 border-vgu-red/40" />
      <div className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 border-vgu-red/40" />
      <div className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 border-vgu-red/40" />

      {/* SAMPLE watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-heading font-black text-[80px] tracking-[0.2em] text-vgu-red/[0.06] rotate-[-30deg]"
          aria-hidden="true"
        >
          SAMPLE
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center px-8 pt-6 pb-6">

        {/* Header: seal + university name */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-full flex-none flex items-center justify-center shadow-md"
            style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
          >
            <span className="font-heading font-black text-white text-[9px] text-center leading-tight tracking-tight">VGU</span>
          </div>
          <div className="text-left">
            <p className="font-heading font-black text-[11px] leading-tight text-vgu-red-dark tracking-tight">Vivekananda Global University</p>
            <p className="font-body text-[8.5px] text-neutral-500 mt-0.5">NAAC A+ Accredited · Established {FOUNDING_YEAR} · Jaipur, Rajasthan</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-vgu-red/35 to-transparent mb-3" />

        {/* Certificate title */}
        <p className="font-heading font-black text-[13px] uppercase tracking-[0.15em] text-vgu-red-dark mb-2">
          Certificate of Degree
        </p>

        {/* Certify text */}
        <p className="font-body text-[9px] uppercase tracking-[0.1em] text-neutral-500 mb-1">This is to certify that</p>

        {/* Name placeholder */}
        <div className="flex flex-col items-center gap-0.5 mb-3">
          <div className="w-40 h-[1.5px] bg-neutral-800" />
          <p className="font-body text-[8px] text-neutral-400 italic">Student Name</p>
        </div>

        {/* Degree awarded text */}
        <p className="font-body text-[9px] uppercase tracking-[0.08em] text-neutral-500 mb-1">has been awarded the degree of</p>
        <p className="font-heading font-black text-[18px] text-vgu-red-dark tracking-tight leading-tight text-center mb-0.5">
          {programName}
        </p>
        <p className="font-body text-[10px] text-neutral-600 text-center mb-3">{programFullName}</p>

        {/* Accreditation badges */}
        <div className="flex items-center gap-2 mb-0">
          {['UGC Recognised', 'NAAC A+', 'AICTE Approved'].map(label => (
            <span key={label} className="rounded-full border border-vgu-red/30 px-2 py-0.5 text-[7.5px] font-heading font-bold text-vgu-red">
              {label}
            </span>
          ))}
        </div>

        {/* Signatures - pushed to bottom */}
        <div className="w-full flex items-end justify-between mt-auto">

          {/* Signature 1 */}
          <div className="flex flex-col items-center">
            <svg width="70" height="20" viewBox="0 0 70 20" fill="none" aria-hidden="true">
              <path d="M4 15 Q14 3 24 9 Q34 15 44 7 Q54 1 66 13" stroke="#821a12" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
            <div className="w-20 h-px bg-neutral-300 mb-0.5" />
            <p className="font-heading font-bold text-[8.5px] text-neutral-700">Vice-Chancellor</p>
            <p className="font-body text-[7.5px] text-neutral-400">Vivekananda Global University</p>
          </div>

          {/* Official seal */}
          <div
            className="w-12 h-12 rounded-full flex-none flex flex-col items-center justify-center shadow-[0_2px_10px_rgba(130,26,18,0.3)] mb-1"
            style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
          >
            <span className="font-heading font-black text-white text-[8px] tracking-wider leading-none">VGU</span>
            <div className="w-6 h-px bg-white/50 my-0.5" />
            <span className="font-body text-white/70 text-[5px] tracking-tight">OFFICIAL SEAL</span>
          </div>

          {/* Signature 2 */}
          <div className="flex flex-col items-center">
            <svg width="70" height="20" viewBox="0 0 70 20" fill="none" aria-hidden="true">
              <path d="M4 13 Q16 1 28 7 Q42 15 52 5 Q60 0 66 11" stroke="#821a12" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
            <div className="w-20 h-px bg-neutral-300 mb-0.5" />
            <p className="font-heading font-bold text-[8.5px] text-neutral-700">Registrar</p>
            <p className="font-body text-[7.5px] text-neutral-400">Vivekananda Global University</p>
          </div>

        </div>
      </div>
    </div>
  )
}
