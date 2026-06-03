/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
  },
  webpack: (cfg) => {
    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      'react/compiler-runtime': 'react-compiler-runtime',
    }

    // Sanity v5 ESM chunks import { useEffectEvent } from 'react'.
    // Webpack 5's static analyser cannot see this named export through
    // React 19's CJS-conditional index.js, so it hard-errors.
    // Downgrading exportsPresence to 'warn' lets the build succeed;
    // the export IS present at runtime (React 19.2+).
    cfg.module = cfg.module ?? {}
    cfg.module.parser = cfg.module.parser ?? {}
    cfg.module.parser.javascript = cfg.module.parser.javascript ?? {}
    cfg.module.parser.javascript.exportsPresence = 'warn'

    return cfg
  },
}

export default config
