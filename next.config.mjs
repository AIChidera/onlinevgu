import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
  },
  webpack: (cfg, { isServer }) => {
    if (!isServer) {
      // Next.js 14 bundles React 18.3-canary internally and webpack resolves
      // all bare 'react' imports (including Sanity's) to that copy.  React 18
      // canary lacks useEffectEvent, crashing Sanity's compiled form components.
      //
      // Aliasing 'react' to React 19 breaks the studio (React 19 + React-DOM 18
      // canary mismatch → black loading screen).  Instead, keep React 18 but
      // redirect 'react' through a shim that polyfills useEffectEvent onto the
      // same React 18 module instance.  Sub-path imports (react/jsx-runtime etc.)
      // continue to use their own Next.js aliases via the spread above.
      cfg.resolve.alias = {
        ...cfg.resolve.alias,
        // 'react$' uses webpack's exact-match syntax (trailing $) so that
        // bare 'react' imports go to the shim but sub-path imports such as
        // 'react/jsx-runtime' and 'react/jsx-dev-runtime' are NOT caught by
        // this alias and continue to use Next.js's own aliases or filesystem.
        'react$': path.resolve(__dirname, 'lib/react-18-shim.js'),
        // Redirect react/compiler-runtime to the third-party package so the
        // Sanity studio initialises correctly (native react/compiler-runtime
        // alone causes a load-time crash in the studio).
        'react/compiler-runtime': path.resolve(__dirname, 'node_modules/react-compiler-runtime'),
      }
    }

    // Sanity v5 ESM chunks do `import { useEffectEvent } from 'react'`.
    // Webpack 5 cannot statically verify this named export because React 19
    // uses a conditional `module.exports = require(cjs/...)` pattern that
    // hides its exports from webpack's static analyser.
    //
    // exportsPresence:       controls CJS require() named-export checking
    // importExportsPresence: controls ESM import {} named-export checking
    //
    // Setting both to false eliminates the build error without changing any
    // runtime behaviour — the exports ARE present in React 19 at runtime.
    if (!cfg.module) cfg.module = {}
    if (!cfg.module.parser) cfg.module.parser = {}
    if (!cfg.module.parser.javascript) cfg.module.parser.javascript = {}
    cfg.module.parser.javascript.exportsPresence = false
    cfg.module.parser.javascript.importExportsPresence = false

    return cfg
  },
}

export default config
