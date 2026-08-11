// Shared rate-limit check for all form API routes. Fails open (allows the
// request) if Upstash env vars are missing OR if Upstash doesn't respond
// quickly - a slow/unreachable rate limiter must never hold up a real
// submission for seconds. Was previously duplicated per-route with no
// timeout, so a dead Upstash instance added ~4.4s to every single request.
export async function checkRateLimit(key: string): Promise<{ success: boolean }> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return { success: true }

  try {
    const { Ratelimit } = await import('@upstash/ratelimit')
    const { Redis } = await import('@upstash/redis')
    const redis = new Redis({ url, token })
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '10 m'),
      analytics: false,
    })
    return await Promise.race([
      ratelimit.limit(key),
      new Promise<{ success: boolean }>((_, reject) =>
        setTimeout(() => reject(new Error('rate limit check timed out')), 1200)
      ),
    ])
  } catch (err) {
    console.error(`[ratelimit] failed for "${key}", allowing request:`, (err as Error).message)
    return { success: true }
  }
}
