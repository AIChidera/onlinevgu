'use client'

import dynamicImport from 'next/dynamic'
import config from '@/sanity.config'

// Force dynamic rendering - never statically cache the studio page
export const dynamic = 'force-dynamic'

// Disable SSR entirely for the studio. Sanity Studio is a pure client-side
// app that uses styled-components and browser-only APIs. SSR + hydration
// causes a mismatch crash ("structure tool crashed") in React 19.
const Studio = dynamicImport(
  () => import('next-sanity/studio').then(m => ({ default: m.NextStudio })),
  {
    ssr: false,
    loading: () => (
      <div style={{ position: 'fixed', inset: 0, background: '#1a1a1a' }} />
    ),
  }
)

export default function StudioPage() {
  return <Studio config={config} />
}
