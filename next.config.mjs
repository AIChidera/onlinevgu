/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
  },
  webpack: (cfg) => {
    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      'react/compiler-runtime': 'react-compiler-runtime',
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
