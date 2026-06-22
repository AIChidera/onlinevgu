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
    const currentFlag = COUNTRY_CODES.find(c => c.dial === dialCode)?.flag ?? '🌐'

    return (
      <div
        className={[
          'flex rounded-xl border bg-neutral-50 overflow-hidden transition-all',
          'focus-within:border-vgu-red focus-within:ring-2 focus-within:ring-vgu-red/10 focus-within:bg-white',
          error ? 'border-red-400' : 'border-neutral-200',
        ].join(' ')}
      >
        <div className="relative flex-none flex items-center border-r border-neutral-200">
          <span
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[18px] leading-none"
          >
            {currentFlag}
          </span>
          <select
            value={dialCode}
            onChange={e => onDialChange(e.target.value)}
            aria-label="Country code"
            className="bg-transparent pl-10 pr-2 py-3 text-[16px] font-body font-semibold text-neutral-600 focus:outline-none appearance-none cursor-pointer"
          >
            {COUNTRY_CODES.map(c => (
              <option key={c.code} value={c.dial}>
                {c.flag} {c.dial}
              </option>
            ))}
          </select>
        </div>
        <input
          ref={ref}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          {...inputProps}
          className="flex-1 px-3 py-3 text-[16px] font-body text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none"
        />
      </div>
    )
  }
)

PhoneField.displayName = 'PhoneField'
export default PhoneField
