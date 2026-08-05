export function extractYouTubeId(url?: string | null): string | undefined {
  if (!url) return undefined
  const match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)
  return match?.[1] ?? undefined
}
