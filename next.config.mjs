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
      // Next.js 14 ships React 18.3-canary at next/dist/compiled/react and
      // webpack resolves node_modules packages (like Sanity) to that copy.
      // React 18 canary does not have useEffectEvent, so Sanity's compiled
      // form components crash. Force all client-side modules to the project's
      // React 19 to ensure a single consistent React instance with useEffectEvent.
      cfg.resolve.alias = {
        ...cfg.resolve.alias,
        // Force all client-side modules (including Sanity) to use the project's
        // React 19. Without this, webpack resolves node_modules imports to
        // Next.js's bundled React 18 canary (next/dist/compiled/react) which
        // lacks useEffectEvent, crashing Sanity's compiled form components.
        react: path.resolve(__dirname, 'node_modules/react'),
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
