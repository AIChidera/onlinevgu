'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { BrochureSchema, type BrochureInput } from '@/lib/validations'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import PhoneField from '@/components/ui/PhoneField'

const PROGRAMS = [
  'Online MBA',
  'MBA in Healthcare',
  'Online MCA',
  'Online M.Com',
  'Online MA',
  'Online M.Lib',
  'Online BBA',
  'Online BCA',
  'Online B.Com',
  'Online B.Sc',
  'Online B.Lib',
]

interface BrochureFormProps {
  onSuccess?: () => void
  program?: string
}

export default function BrochureForm({ onSuccess, program }: BrochureFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [dialCode, setDialCode] = useState('+91')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrochureInput>({
    resolver: zodResolver(BrochureSchema),
    defaultValues: { programInterest: program || '' },
  })

  const onSubmit = async (data: BrochureInput) => {
    setServerError('')
    try {
      const res = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, phone: dialCode + data.phone }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Something went wrong. Please try again.')
      }
      setSubmitted(true)
      onSuccess?.()
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-600">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-heading text-[18px] font-bold text-neutral-900">Brochure sent!</h3>
        <p className="text-[14px] text-neutral-600 max-w-[260px]">
          Check your inbox - the brochure is on its way. Also check your spam folder.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input
        label="Full name"
        placeholder="Your name"
        error={errors.name?.message}
        required
        {...register('name')}
      />

      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        required
        {...register('email')}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-[14px] font-heading font-semibold text-neutral-700">
          Mobile number <span className="text-red-500">*</span>
        </label>
        <PhoneField
          placeholder="98765 43210"
          error={errors.phone?.message}
          required
          dialCode={dialCode}
          onDialChange={setDialCode}
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-[13px] text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[14px] font-heading font-semibold text-neutral-700">
          Program <span className="text-red-500">*</span>
        </label>
        <select
          {...register('programInterest')}
          className={[
            'w-full rounded-lg border px-4 py-3 text-base text-neutral-900',
            'bg-white outline-none transition-colors duration-150',
            'focus:border-vgu-red focus:ring-2 focus:ring-vgu-red/15',
            errors.programInterest
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/15'
              : 'border-neutral-300',
          ].join(' ')}
        >
          <option value="">Select a program</option>
          {PROGRAMS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {errors.programInterest && (
          <p className="text-[13px] text-red-500">{errors.programInterest.message}</p>
        )}
      </div>

      {serverError && (
        <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-[14px] text-red-600">
          {serverError}
        </p>
      )}

      <Button type="submit" loading={isSubmitting} fullWidth>
        {isSubmitting ? 'Sending…' : 'Send me the brochure →'}
      </Button>

      <p className="text-[12px] text-neutral-400 text-center">
        Free. No spam. Unsubscribe anytime.
      </p>
    </form>
  )
}
