import Link from 'next/link'
import SectionWrapper from '@/components/layout/SectionWrapper'

export const metadata = {
  title: 'Blog — VGU Online',
  description: 'Career advice, online education tips, and program guides from VGU.',
}

const POSTS = [
  {
    slug: 'is-online-mba-worth-it',
    title: 'Is an online MBA worth it in 2025? A frank guide',
    excerpt: 'We look at salary data, recruiter surveys, and alumni outcomes to answer the question every working professional is asking.',
    category: 'Career',
    date: 'May 2025',
    readTime: '6 min read',
  },
  {
    slug: 'ugc-entitled-vs-distance-degree',
    title: 'UGC-entitled vs distance degree — what\'s the difference?',
    excerpt: 'Many people confuse the two. The distinction matters enormously for government jobs, further studies, and overseas recognition.',
    category: 'Education',
    date: 'April 2025',
    readTime: '4 min read',
  },
  {
    slug: 'mba-vs-mca-after-btech',
    title: 'MBA or MCA after B.Tech — which path is right for you?',
    excerpt: 'If you have a technical background and want to grow beyond coding, here\'s how to think about the MBA vs MCA decision.',
    category: 'Career',
    date: 'March 2025',
    readTime: '5 min read',
  },
  {
    slug: 'online-degree-government-jobs',
    title: 'Are online degrees valid for government jobs and UPSC?',
    excerpt: 'The short answer is yes — if the university is UGC-recognised and the program is UGC-DEB entitled. Here\'s exactly what to look for.',
    category: 'Education',
    date: 'February 2025',
    readTime: '5 min read',
  },
]

export default function BlogPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#FBF1E6] to-white pt-[72px]">
        <div className="mx-auto max-w-content px-12 py-16 md:px-5 md:py-12">
          <h1 className="font-heading text-[52px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[36px]">
            Blog
          </h1>
          <p className="mt-3 text-[18px] text-neutral-600 max-w-[440px] leading-relaxed">
            Career insights, education guides, and program deep-dives.
          </p>
        </div>
      </div>

      <SectionWrapper bg="white">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-neutral-200 p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-transparent"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-vgu-beige px-3 py-0.5 text-[12px] font-heading font-semibold text-vgu-red">
                  {post.category}
                </span>
                <span className="text-[12px] text-neutral-400">{post.date} · {post.readTime}</span>
              </div>
              <h2 className="font-heading text-[20px] font-bold text-neutral-900 leading-snug group-hover:text-vgu-red transition-colors">
                {post.title}
              </h2>
              <p className="text-[15px] text-neutral-600 leading-relaxed">{post.excerpt}</p>
              <span className="mt-auto text-[14px] font-heading font-semibold text-vgu-red group-hover:underline underline-offset-2">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
