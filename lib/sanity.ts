import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN, // only needed for mutations
})

// Image URL helper
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Typed fetch helper
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { tags, revalidate: 3600 }, // revalidate every hour
  })
}
