'use client'

import { useState, useCallback } from 'react'
import {
  IconBrandX,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconLink,
  IconCheck,
} from '@tabler/icons-react'

interface Props {
  url:        string
  title:      string
  hasDivider: boolean
}

export default function ShareStrip({ url, title, hasDivider }: Props) {
  const [copied, setCopied] = useState(false)

  const encodedUrl   = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const socials = [
    {
      key:    'x',
      label:  'Share on X',
      href:   `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      Icon:   IconBrandX,
      hover:  'hover:bg-black hover:border-black',
      shadow: 'hover:shadow-[0_8px_20px_rgba(0,0,0,0.30)]',
    },
    {
      key:    'linkedin',
      label:  'Share on LinkedIn',
      href:   `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon:   IconBrandLinkedin,
      hover:  'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
      shadow: 'hover:shadow-[0_8px_20px_rgba(10,102,194,0.35)]',
    },
    {
      key:    'facebook',
      label:  'Share on Facebook',
      href:   `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon:   IconBrandFacebook,
      hover:  'hover:bg-[#1877F2] hover:border-[#1877F2]',
      shadow: 'hover:shadow-[0_8px_20px_rgba(24,119,242,0.35)]',
    },
    {
      key:    'whatsapp',
      label:  'Share on WhatsApp',
      href:   `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      Icon:   IconBrandWhatsapp,
      hover:  'hover:bg-[#25D366] hover:border-[#25D366]',
      shadow: 'hover:shadow-[0_8px_20px_rgba(37,211,102,0.35)]',
    },
  ] as const

  const handleCopy = useCallback(async () => {
    const flash = () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(url); flash(); return } catch {}
    }
    try {
      const ta = document.createElement('textarea')
      ta.value = url
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity  = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      flash()
    } catch {}
  }, [url])

  return (
    <div className={hasDivider ? 'mt-8 pt-8 border-t border-neutral-100' : ''}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-[11px] md:text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red">
          Share this story
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {socials.map(({ key, label, href, Icon, hover, shadow }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className={[
                'group inline-flex items-center justify-center w-11 h-11 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:text-white hover:-translate-y-0.5 transition-all duration-200',
                hover,
                shadow,
              ].join(' ')}
            >
              <Icon size={18} stroke={1.75} className="transition-transform duration-200 group-hover:scale-110" />
            </a>
          ))}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Link copied to clipboard' : 'Copy link to clipboard'}
            aria-live="polite"
            className={[
              'inline-flex items-center gap-2 h-11 px-4 rounded-full border font-heading font-semibold text-[14px] transition-all duration-200 hover:-translate-y-0.5',
              copied
                ? 'bg-vgu-red border-vgu-red text-white shadow-[0_8px_20px_rgba(192,64,54,0.35)]'
                : 'border-vgu-red/30 bg-white text-vgu-red hover:bg-vgu-red hover:text-white hover:border-vgu-red hover:shadow-[0_8px_20px_rgba(192,64,54,0.30)]',
            ].join(' ')}
          >
            {copied
              ? <IconCheck size={16} stroke={2.5} />
              : <IconLink size={16} stroke={2} />}
            <span>{copied ? 'Copied!' : 'Copy link'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
