// Studio layout — bare passthrough so NextStudio controls its own viewport.
// VGU root layout (nav, footer) will still wrap this, but NextStudio renders
// in fixed-position mode so the studio UI covers the full viewport.
export const metadata = { title: 'VGU Studio' }

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
