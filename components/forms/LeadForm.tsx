'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { LeadSchema, type LeadInput } from '@/lib/validations'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import PhoneField from '@/components/ui/PhoneField'

// Hardcoded fallback - mirrors Sanity programs; used while API loads or if it fails
const PROGRAMS_FALLBACK = [
  'MBA', 'MBA in Healthcare Management', 'MCA', 'M.Com', 'MA',
  'M.Lib', 'BBA', 'BCA', 'B.Com', 'B.Sc', 'B.Lib',
  "I'm not sure yet",
]

interface LeadFormProps {
  onSuccess?: () => void
  source?: string
  compact?: boolean
}

export default function LeadForm({ onSuccess, source = 'website', compact = false }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [dialCode, setDialCode] = useState('+91')
  const [programs, setPrograms] = useState<string[]>(PROGRAMS_FALLBACK)

  useEffect(() => {
    fetch('/api/programs')
      .then(r => r.ok ? r.json() : null)
      .then((data: { name: string }[] | null) => {
        if (data && data.length > 0) {
          setPrograms([...data.map(p => p.name), "I'm not sure yet"])
        }
      })
      .catch(() => {})
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(LeadSchema),
    defaultValues: { source },
  })

  const onSubmit = async (data: LeadInput) => {
    setServerError('')
    try {
      const res = await fetch('/api/leads', {
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
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-600">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-heading text-[20px] font-bold text-neutral-900">All done!</h3>
        <p className="text-[15px] text-neutral-600 max-w-[300px]">
          A counsellor will call you within 2 hours. Check your inbox for a confirmation email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <input type="hidden" {...register('source')} />

      <Input
        label="Full name"
        placeholder="Rahul Sharma"
        error={errors.name?.message}
        required
        {...register('name')}
      />

      <Input
        label="Email address"
        type="email"
        placeholder="rahul@example.com"
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

      {!compact && (
        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-heading font-semibold text-neutral-700">
            Program interest
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
            {programs.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.programInterest && (
            <p className="text-[13px] text-red-500">{errors.programInterest.message}</p>
          )}
        </div>
      )}

      {serverError && (
        <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-[14px] text-red-600">
          {serverError}
        </p>
      )}

      <Button type="submit" loading={isSubmitting} fullWidth size="lg">
        {isSubmitting ? 'Sending…' : 'Get free counselling →'}
      </Button>

      <p className="text-[12px] text-neutral-400 text-center leading-relaxed">
        By submitting, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-neutral-600">privacy policy</a>
        . No spam, ever.
      </p>
    </form>
  )
}
