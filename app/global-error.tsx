'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something went wrong - Online VGU</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { -webkit-font-smoothing: antialiased; }
          body {
            font-family: 'Lato', system-ui, sans-serif;
            min-height: 100vh;
            min-height: 100dvh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: linear-gradient(135deg, #C04036 0%, #821a12 100%);
            overflow: hidden;
          }
          .ghost {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            user-select: none;
            overflow: hidden;
          }
          .ghost-text {
            font-family: 'Nunito', system-ui, sans-serif;
            font-weight: 900;
            font-size: clamp(160px, 35vw, 360px);
            color: rgba(255,255,255,0.06);
            line-height: 1;
            white-space: nowrap;
          }
          .dots {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0.06;
            background-image: radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px);
            background-size: 28px 28px;
          }
          .card {
            position: relative;
            z-index: 10;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 24px;
            padding: 48px 40px;
            max-width: 560px;
            width: 100%;
            text-align: center;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
          @media (max-width: 480px) { .card { padding: 36px 24px; border-radius: 20px; } }
          .eyebrow {
            display: inline-block;
            font-family: 'Lato', system-ui, sans-serif;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.45);
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 9999px;
            padding: 6px 14px;
            margin-bottom: 20px;
          }
          h1 {
            font-family: 'Nunito', system-ui, sans-serif;
            font-weight: 900;
            font-size: clamp(30px, 6vw, 52px);
            line-height: 1.05;
            letter-spacing: -2px;
            color: white;
            margin-bottom: 16px;
          }
          .yellow { color: #FFA412; }
          p {
            font-size: 15px;
            line-height: 1.75;
            color: rgba(255,255,255,0.60);
            margin-bottom: 32px;
            max-width: 380px;
            margin-left: auto;
            margin-right: auto;
          }
          .actions {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 0;
          }
          .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #FFA412;
            color: #111827;
            border: none;
            border-radius: 9999px;
            padding: 13px 28px;
            font-family: 'Nunito', system-ui, sans-serif;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: opacity 150ms, transform 150ms;
            box-shadow: 0 6px 24px rgba(255,164,18,0.35);
          }
          .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
          .btn-ghost {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: transparent;
            border: 2px solid rgba(255,255,255,0.30);
            border-radius: 9999px;
            padding: 11px 28px;
            font-family: 'Nunito', system-ui, sans-serif;
            font-size: 15px;
            font-weight: 700;
            color: white;
            text-decoration: none;
            cursor: pointer;
            transition: background 150ms, border-color 150ms, transform 150ms;
          }
          .btn-ghost:hover { background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.50); transform: translateY(-1px); }
          .digest {
            margin-top: 24px;
            font-size: 11px;
            color: rgba(255,255,255,0.22);
          }
          .logo {
            display: block;
            font-family: 'Nunito', system-ui, sans-serif;
            font-weight: 900;
            font-size: 18px;
            color: white;
            letter-spacing: -0.5px;
            margin-bottom: 28px;
            opacity: 0.85;
          }
        `}</style>
      </head>
      <body>
        <div className="dots" aria-hidden="true" />
        <div className="ghost" aria-hidden="true">
          <span className="ghost-text">500</span>
        </div>

        <div className="card">
          <span className="logo">Online VGU</span>
          <span className="eyebrow">Unexpected Error</span>
          <h1>
            Something<br />
            <span className="yellow">went wrong.</span>
          </h1>
          <p>
            Our team has been notified. Try refreshing the page - it usually resolves things in seconds.
          </p>
          <div className="actions">
            <button className="btn-primary" onClick={reset}>
              Try again
            </button>
            <a className="btn-ghost" href="/">
              Go to Home
            </a>
          </div>
          {error.digest && (
            <p className="digest">Error ref: {error.digest}</p>
          )}
        </div>
      </body>
    </html>
  )
}
