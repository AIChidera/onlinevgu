'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { IconCheck, IconSend } from '@tabler/icons-react'
import { ContactSchema, type ContactInput } from '@/lib/validations'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
        <p className="text-[15px] font-body text-neutral-500 max-w-[280px] leading-[1.7]">
          We&apos;ll reply to your email within 24 hours.
        </p>
      </div>
    )
  }

  const inputClass = (hasError?: boolean) =>
    [
      'w-full rounded-xl border px-4 py-3 text-[15px] font-body text-neutral-900 placeholder-neutral-400',
      'bg-white outline-none transition-colors duration-150',
      'focus:bg-white focus:ring-2',
      hasError
        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/15'
        : 'border-neutral-200 focus:border-vgu-red focus:ring-vgu-red/10',
    ].join(' ')

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-heading font-semibold text-neutral-700">
            Full name <span className="text-vgu-red">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Rahul Sharma"
            className={inputClass(!!errors.name)}
          />
          {errors.name && <p className="text-[12px] text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-heading font-semibold text-neutral-700">
            Email address <span className="text-vgu-red">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="rahul@example.com"
            className={inputClass(!!errors.email)}
          />
          {errors.email && <p className="text-[12px] text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-heading font-semibold text-neutral-700">
          Subject <span className="text-vgu-red">*</span>
        </label>
        <input
          {...register('subject')}
          type="text"
          placeholder="e.g. MBA admissions enquiry"
          className={inputClass(!!errors.subject)}
        />
        {errors.subject && <p className="text-[12px] text-red-500">{errors.subject.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-heading font-semibold text-neutral-700">
          Message <span className="text-vgu-red">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us how we can help…"
          className={[inputClass(!!errors.message), 'resize-none'].join(' ')}
        />
        {errors.message && <p className="text-[12px] text-red-500">{errors.message.message}</p>}
      </div>

      {serverError && (
        <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-[14px] font-body text-red-600">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white py-3.5 px-8 text-[15px] font-semibold font-heading transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(192,64,54,0.28)] hover:shadow-[0_6px_24px_rgba(192,64,54,0.38)] hover:-translate-y-0.5"
      >
        {isSubmitting ? 'Sending…' : (<>Send Message <IconSend size={16} /></>)}
      </button>

      <p className="text-[12px] font-body text-neutral-400">
        We&apos;ll reply within 24 hours. For urgent queries, call 1800 123 456 (toll-free).
      </p>
    </form>
  )
}
