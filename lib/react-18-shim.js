'use strict'
// Load Next.js 14's bundled React 18 via a direct path so webpack does
// not re-enter the 'react' alias and create a circular loop.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const React = require('next/dist/compiled/react')

// Sanity v5's compiled form components call useEffectEvent (a React 19 API).
// Next.js 14 ships React 18 canary which does not export it.  Polyfill it
// here so the export exists at runtime without changing which React version
// is in use (keeping React 18 / React-DOM 18 aligned).
if (!React.useEffectEvent) {
  React.useEffectEvent = function useEffectEvent(callback) {
    const ref = React.useRef(callback)
    // Keep ref current so the stable wrapper always calls the latest fn.
    React.useLayoutEffect(function () { ref.current = callback })
    return React.useCallback(function () {
      return ref.current.apply(this, arguments)
    }, [])
  }
}

module.exports = React
