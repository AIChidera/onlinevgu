import type { MetadataRoute } from 'next'

// This is a marketing/recruitment site - the goal is to be found, including
// through AI-powered search and chat assistants prospective students use to
// research universities. So AI crawlers get the same open access as Google,
// listed explicitly rather than left to whatever a bot's own default is.
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      ...AI_CRAWLERS.map(userAgent => ({
        userAgent,
        allow: '/',
        disallow: ['/studio/', '/api/'],
      })),
    ],
    sitemap: 'https://onlinevgu.com/sitemap.xml',
  }
}
