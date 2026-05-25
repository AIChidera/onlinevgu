import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'yellow'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  loading?: boolean
  as?: 'button' | 'a'
  href?: string
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler
}

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>

const base =
  'inline-flex items-center justify-center gap-2 font-heading font-semibold tracking-wide ' +
  'transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ' +
  'whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary:
    'bg-vgu-red text-white rounded-full hover:bg-vgu-red-dark ' +
    'hover:shadow-cta active:scale-[0.98]',
  secondary:
    'border-2 border-vgu-red text-vgu-red bg-white rounded-md ' +
    'hover:bg-vgu-red/5 hover:border-vgu-red-dark hover:text-vgu-red-dark',
  ghost:
    'bg-transparent text-neutral-900 rounded-md hover:bg-neutral-50',
  yellow:
    'bg-vgu-yellow text-neutral-900 rounded-full ' +
    'hover:brightness-95 hover:shadow-lg active:scale-[0.98]',
}

const sizes: Record<Size, string> = {
  sm: 'text-sm px-[22px] py-[10px]',
  md: 'text-[15px] px-8 py-[14px]',
  lg: 'text-base px-[38px] py-4',
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', fullWidth, loading, children, className = '', as: Tag = 'button', href, ...props },
    ref
  ) => {
    const classes = [base, variants[variant], sizes[size], fullWidth ? 'w-full' : '', className]
      .filter(Boolean)
      .join(' ')

    const inner = loading ? (
      <>
        <span
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
        <span>Loading…</span>
      </>
    ) : (
      children
    )

    if (Tag === 'a') {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {inner}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={loading || (props as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {inner}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
export type { ButtonProps }
