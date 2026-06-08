'use client'

import { forwardRef } from 'react'
import { COUNTRY_CODES } from '@/lib/country-codes'

interface PhoneFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  dialCode: string
  onDialChange: (dial: string) => void
  error?: string
}

const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(
  function PhoneField({ dialCode, onDialChange, error, ...inputProps }, ref) {
    return (
      <div
        className={[
          'flex rounded-xl border bg-neutral-50 overflow-hidden transition-all',
          'focus-within:border-vgu-red focus-within:ring-2 focus-within:ring-vgu-red/10 focus-within:bg-white',
          error ? 'border-red-400' : 'border-neutral-200',
        ].join(' ')}
      >
        <select
          value={dialCode}
          onChange={e => onDialChange(e.target.value)}
          aria-label="Country code"
          className="flex-none bg-transparent border-r border-neutral-200 pl-3 pr-1 py-3 text-[13px] font-body font-semibold text-neutral-600 focus:outline-none appearance-none cursor-pointer"
        >
          {COUNTRY_CODES.map(c => (
            <option key={c.code} value={c.dial}>
              {c.flag} {c.dial}
            </option>
          ))}
        </select>
        <input
          ref={ref}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          {...inputProps}
          className="flex-1 px-3 py-3 text-base font-body text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none"
        />
      </div>
    )
  }
)

PhoneField.displayName = 'PhoneField'
export default PhoneField
