// Forces an actual "Save As" download instead of navigating to/opening the
// file - a plain <a href download> is unreliable across browsers for
// cross-origin URLs (Sanity's CDN is a different origin), so fetch the
// bytes and download from a local blob URL instead.
export async function downloadFile(url: string, filename: string) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`fetch failed: ${res.status}`)
    const blob = await res.blob()
    const objectUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(objectUrl)
  } catch (err) {
    console.error('[downloadFile] failed, falling back to opening the URL:', err)
    window.open(url, '_blank', 'noopener')
  }
}
