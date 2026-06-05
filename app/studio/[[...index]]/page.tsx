'use client'

import React from 'react'
import dynamicImport from 'next/dynamic'
import config from '@/sanity.config'

// Sanity v5 compiled form components call useEffectEvent (React 19 API).
// Next.js 14 vendors React 18 canary which lacks this export. Patch it
// onto the shared React module here — this file evaluates on the client
// before the Sanity dynamic import resolves, so the polyfill is in place
// when Sanity's code first accesses a.useEffectEvent at render time.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(React as any).useEffectEvent) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(React as any).useEffectEvent = function useEffectEvent(fn: (...args: unknown[]) => unknown) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = React.useRef(fn)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useLayoutEffect(() => { ref.current = fn })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useCallback(function (this: unknown, ...args: unknown[]) {
      return ref.current.apply(this, args)
    }, [])
  }
}

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
