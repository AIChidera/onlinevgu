import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => {
    const inputId = id ?? `input-${props.name}`

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="font-heading text-[13px] font-semibold text-neutral-900"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-vgu-red" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'h-12 w-full rounded-sm border px-3.5 font-body text-[15px] text-neutral-900',
            'bg-white placeholder:text-neutral-400',
            'transition-[border-color,box-shadow] duration-150',
            'focus:outline-none focus:border-vgu-red focus:ring-[3px] focus:ring-vgu-red/15',
            error
              ? 'border-vgu-red'
              : 'border-neutral-200 hover:border-neutral-400',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {error && (
          <p className="flex items-center gap-1 text-xs font-semibold text-vgu-red font-heading">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-neutral-600">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
