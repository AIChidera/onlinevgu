import { NextResponse } from 'next/server'
import { getAllPrograms } from '@/lib/sanity'

export const revalidate = 3600

export async function GET() {
  try {
    const programs = await getAllPrograms()
    return NextResponse.json(
      programs.map(p => ({ name: p.name, slug: p.slug, level: p.level })),
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } }
    )
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
