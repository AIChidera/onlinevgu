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
      // Next.js 14 does NOT use cfg.resolve.alias for React — it uses a
      // NormalModuleReplacementPlugin that runs after webpack's alias phase
      // and replaces all 'react' imports with 'next/dist/compiled/react'
      // (React 18 canary).  Any change we make to cfg.resolve.alias is
      // therefore overridden before the module is loaded.
      //
      // Solution: push our own NormalModuleReplacementPlugin after Next.js's
      // plugins.  It intercepts the already-replaced 'next/dist/compiled/react'
      // path and redirects it to our shim, which re-exports that same React 18
      // module but with useEffectEvent polyfilled.  We skip the replacement
      // when the issuer IS the shim itself to avoid a circular import loop.
      const shimPath = path.resolve(__dirname, 'lib/react-18-shim.js')
      const compiledReactRe = /next[\\/]dist[\\/]compiled[\\/]react[\\/]?index\.js$|next[\\/]dist[\\/]compiled[\\/]react$/

      cfg.plugins.push({
        apply(compiler) {
          compiler.hooks.normalModuleFactory.tap('ReactShimPlugin', (factory) => {
            factory.hooks.afterResolve.tap('ReactShimPlugin', (resolveData) => {
              const res = resolveData.createData?.resource || ''
              const issuer = resolveData.contextInfo?.issuer || ''
              // Only redirect the bare React 18 canary entry-point, and
              // never when the shim itself is the importer (avoids circular).
              if (compiledReactRe.test(res) && !issuer.includes('react-18-shim')) {
                resolveData.createData.resource = shimPath
              }
            })
          })
        },
      })

      // Keep compiler-runtime redirect so Sanity studio initialises correctly.
      cfg.resolve.alias = {
        ...cfg.resolve.alias,
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
