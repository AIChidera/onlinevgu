import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

const POSTS: Record<string, {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  body: string
}> = {
  'is-online-mba-worth-it': {
    title: 'Is an online MBA worth it in 2025? A frank guide',
    excerpt: 'We look at salary data, recruiter surveys, and alumni outcomes to answer the question every working professional is asking.',
    category: 'Career',
    date: 'May 2025',
    readTime: '6 min read',
    body: `
Over the past decade, the online MBA has gone from a resume asterisk to a mainstream credential. But is it worth the time and money in 2025?

**The short answer: yes, with caveats.**

For working professionals who can't or won't take 2 years off campus, an online MBA from a UGC-recognised, NAAC-accredited university is a legitimate, employer-recognised qualification.

## What the data says

Our 2024 alumni survey tracked outcomes 12 months after graduation:
- **78%** of MBA graduates reported a salary increase
- The median salary increase was **34%**
- **91%** said their degree was "valued" or "highly valued" by their employer

## When an online MBA makes sense

1. **You're already employed** - the ROI is clearest when you keep earning while studying
2. **You want a management role** - recruiters at senior levels still use the MBA as a filter
3. **You need the credential, not the campus** - networking happens online now

## When it might not

If your goal is a top-10 IIM or an Ivy League brand, you'll need the on-campus route. The prestige premium exists. But for most career transitions and senior-track moves in Indian industry, a UGC-entitled online MBA from a NAAC A+ university is more than sufficient.
    `,
  },
  'ugc-entitled-vs-distance-degree': {
    title: 'UGC-entitled vs distance degree - what\'s the difference?',
    excerpt: 'Many people confuse the two. The distinction matters enormously for government jobs, further studies, and overseas recognition.',
    category: 'Education',
    date: 'April 2025',
    readTime: '4 min read',
    body: `
The terms "online degree," "distance degree," and "UGC-entitled degree" are often used interchangeably - but they're not the same thing, and the difference can affect your career.

## UGC-entitled online degrees

A UGC-entitled online degree is issued by a university that has been:
1. Recognised by the UGC
2. Approved by the UGC's Distance Education Bureau (DEB) to offer online programs

These degrees are explicitly valid for:
- Government jobs (central and state) where a regular degree is required
- Further studies (M.Phil, Ph.D, competitive exams)
- International recognition (subject to country-specific rules)

**VGU's online programs are UGC-entitled under DEB approval.**

## "Distance" degrees without DEB recognition

Some private institutes offer "distance learning" certificates or degrees without UGC-DEB recognition. These are NOT equivalent to regular degrees and are not accepted for most government roles or higher studies.

## How to verify

Check the UGC-DEB website (ugcdeb.ac.in) to verify any university's online program approval status before enrolling.
    `,
  },
}

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const post = POSTS[params.slug]
  if (!post) return { title: 'Post not found' }
  return {
    title: `${post.title} - VGU Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = POSTS[params.slug]
  if (!post) notFound()

  const paragraphs = post.body.trim().split('\n\n')

  return (
    <div>
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
      <div className="bg-gradient-to-b from-[#FBF1E6] to-white">
        <div className="mx-auto max-w-[720px] px-12 py-14 md:px-5 md:py-10">
          <Link
            href="/blog"
            className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-neutral-500 hover:text-vgu-red transition-colors"
          >
            ← Back to blog
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="rounded-full bg-vgu-beige px-3 py-0.5 text-[12px] font-heading font-semibold text-vgu-red">
              {post.category}
            </span>
            <span className="text-[12px] text-neutral-400">{post.date} · {post.readTime}</span>
          </div>
          <h1 className="font-heading text-[28px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[40px]">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-[720px] px-12 py-10 md:px-5">
        <div className="prose prose-neutral max-w-none">
          {paragraphs.map((p, i) => {
            if (p.startsWith('## ')) {
              return (
                <h2 key={i} className="font-heading text-[24px] font-extrabold text-neutral-900 mt-8 mb-3">
                  {p.slice(3)}
                </h2>
              )
            }
            if (p.startsWith('**') && p.endsWith('**')) {
              return (
                <p key={i} className="font-semibold text-neutral-800 text-[16px] leading-relaxed mb-4">
                  {p.slice(2, -2)}
                </p>
              )
            }
            return (
              <p key={i} className="text-[16px] text-neutral-700 leading-relaxed mb-4">
                {p}
              </p>
            )
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-vgu-beige border border-vgu-red/10 p-8 text-center">
          <h3 className="font-heading text-[22px] font-extrabold text-neutral-900 mb-2">
            Ready to explore VGU programs?
          </h3>
          <p className="text-[15px] text-neutral-600 mb-5">
            Talk to a free counsellor - they&apos;ll help you find the right program.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-lg bg-vgu-red px-6 py-3 font-heading font-semibold text-white hover:bg-vgu-red-dark transition-colors"
          >
            Apply now →
          </Link>
        </div>
      </div>
    </div>
  )
}
