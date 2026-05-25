type Variant = 'red' | 'yellow' | 'gold' | 'beige' | 'neutral'

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant
  className?: string
}

const variants: Record<Variant, string> = {
  red:     'bg-vgu-red/10 text-vgu-red',
  yellow:  'bg-vgu-yellow/15 text-amber-700',
  gold:    'bg-vgu-gold text-vgu-red-dark',
  beige:   'bg-vgu-beige text-vgu-red-dark',
  neutral: 'bg-neutral-50 text-neutral-600 border border-neutral-200',
}

export default function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5',
        'font-heading text-[11px] font-semibold tracking-[0.06em] uppercase',
        'px-2.5 py-1 rounded-sm',
        variants[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
