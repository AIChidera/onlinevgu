type BgVariant = 'white' | 'light' | 'beige' | 'dark'

interface SectionWrapperProps {
  children: React.ReactNode
  bg?: BgVariant
  id?: string
  className?: string
}

const bgMap: Record<BgVariant, string> = {
  white: 'bg-white',
  light: 'bg-neutral-50',
  beige: 'bg-vgu-beige',
  dark:  'bg-vgu-red-dark text-white',
}

export default function SectionWrapper({
  children,
  bg = 'white',
  id,
  className = '',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={[bgMap[bg], 'py-24 md:py-16', className].join(' ')}
    >
      <div className="mx-auto w-full max-w-content px-12 md:px-5">
        {children}
      </div>
    </section>
  )
}
