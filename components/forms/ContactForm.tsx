'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { IconCheck, IconSend, IconChevronDown } from '@tabler/icons-react'
import { ContactSchema, type ContactInput } from '@/lib/validations'
import PhoneField from '@/components/ui/PhoneField'

const SUBJECT_OPTIONS = [
  'General enquiry',
  'Admissions',
  'Programme details',
  'Fees & EMI',
  'Technical support',
  'Alumni',
  'Press / Partnership',
]

export default function ContactForm() {
  const [submitted, setSubmitted]     = useState(false)
  const [serverError, setServerError] = useState('')
  const [dialCode, setDialCode]       = useState('+91')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
  })

  const onSubmit = async (data: ContactInput) => {
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, phone: dialCode + data.phone }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Something went wrong. Please try again.')
      }
      setSubmitted(true)
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="relative inline-flex">
          <div className="absolute inset-0 rounded-full bg-green-200/50 animate-ping [animation-duration:2s]" />
          <div className="relative w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <IconCheck size={28} className="text-green-600" stroke={2.5} />
          </div>
        </div>
        <h3 className="font-heading font-bold text-[22px] text-neutral-900">Message sent!</h3>
        <p className="text-[15px] font-body text-neutral-500 max-w-[300px] leading-[1.7]">
          We&apos;ll reply within 24 hours. For urgent queries, call{' '}
          <a href="tel:+911800123456" className="font-semibold text-vgu-red underline underline-offset-2">
            1800 123 456
          </a>.
        </p>
      </div>
    )
  }

  const inputClass = (hasError?: boolean) =>
    [
      'w-full rounded-xl border px-4 py-3 text-[16px] font-body text-neutral-900 placeholder-neutral-400',
      'bg-neutral-50 outline-none transition-all duration-150',
      'focus:bg-white focus:ring-2',
      hasError
        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/15'
        : 'border-neutral-200 focus:border-vgu-red focus:ring-vgu-red/10',
    ].join(' ')

  const Label = ({ children, required, htmlFor }: { children: React.ReactNode; required?: boolean; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="text-[13px] font-heading font-semibold text-neutral-700">
      {children}
      {required && <span className="text-vgu-red" aria-hidden="true"> *</span>}
      {required && <span className="sr-only"> (required)</span>}
    </label>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label required htmlFor="cf-name">Full name</Label>
          <input
            id="cf-name"
            {...register('name')}
            type="text"
            placeholder="Rahul Sharma"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            className={inputClass(!!errors.name)}
          />
          {errors.name && <p id="cf-name-error" role="alert" className="text-[12px] text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label required htmlFor="cf-email">Email address</Label>
          <input
            id="cf-email"
            {...register('email')}
            type="email"
            placeholder="rahul@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            className={inputClass(!!errors.email)}
          />
          {errors.email && <p id="cf-email-error" role="alert" className="text-[12px] text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <Label required htmlFor="cf-phone">Mobile number</Label>
        <PhoneField
          id="cf-phone"
          placeholder="98765 43210"
          error={errors.phone?.message}
          required
          dialCode={dialCode}
          onDialChange={setDialCode}
          aria-required="true"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
          {...register('phone')}
        />
        {errors.phone && <p id="cf-phone-error" role="alert" className="text-[12px] text-red-500">{errors.phone.message}</p>}
      </div>

      {/* Subject (select) */}
      <div className="flex flex-col gap-1.5">
        <Label required htmlFor="cf-subject">What is this about?</Label>
        <div className="relative">
          <select
            id="cf-subject"
            {...register('subject')}
            defaultValue=""
            aria-required="true"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'cf-subject-error' : undefined}
            className={[
              inputClass(!!errors.subject),
              'appearance-none pr-10 cursor-pointer',
            ].join(' ')}
          >
            <option value="" disabled>Select a topic</option>
            {SUBJECT_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <IconChevronDown
            size={18}
            stroke={2}
            aria-hidden="true"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
          />
        </div>
        {errors.subject && <p id="cf-subject-error" role="alert" className="text-[12px] text-red-500">{errors.subject.message}</p>}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <Label required htmlFor="cf-message">Your message</Label>
        <textarea
          id="cf-message"
          {...register('message')}
          rows={5}
          placeholder="Tell us how we can help…"
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          className={[inputClass(!!errors.message), 'resize-none'].join(' ')}
        />
        {errors.message && <p id="cf-message-error" role="alert" className="text-[12px] text-red-500">{errors.message.message}</p>}
      </div>

      {serverError && (
        <p role="alert" className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-[14px] font-body text-red-600">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white py-3.5 px-8 text-[15px] font-semibold font-heading transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(192,64,54,0.28)] hover:shadow-[0_6px_24px_rgba(192,64,54,0.38)] hover:-translate-y-0.5 whitespace-nowrap"
      >
        {isSubmitting ? 'Sending…' : (<>Send Message <IconSend size={16} /></>)}
      </button>

      <p className="text-[12px] font-body text-neutral-400 leading-relaxed">
        We&apos;ll reply within 24 hours. For urgent queries, call{' '}
        <a href="tel:+911800123456" className="font-semibold text-vgu-red hover:underline">
          1800 123 456
        </a>{' '}
        (toll-free).
      </p>
    </form>
  )
}
