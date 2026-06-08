import { z } from 'zod'

// Only digits, spaces, +, -, (, ) — no letters or special chars
const phoneRegex = /^[+]?\d[\d\s\-().]{8,14}$/

// Block HTML tags, script injection, and common XSS vectors
const UNSAFE_RE = /<[^>]*>|javascript\s*:|data\s*:|on\w+\s*=/i

function noScript(msg: string) {
  return (v: string) => !UNSAFE_RE.test(v) || msg
}

export const LeadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .trim()
    .refine(noScript('Name contains invalid content')),
  email: z
    .string()
    .email('Enter a valid email address')
    .max(254)
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .regex(phoneRegex, 'Enter a valid 10-digit mobile number')
    .trim(),
  programInterest: z
    .string()
    .min(1, 'Please select a programme')
    .max(100)
    .trim()
    .refine(noScript('Invalid programme value')),
  source:      z.string().optional(),
  intake:      z.string().optional(),
  utmSource:   z.string().optional(),
  utmMedium:   z.string().optional(),
  utmCampaign: z.string().optional(),
})

export type LeadInput = z.infer<typeof LeadSchema>

// ── Brochure request ──────────────────────────────────────────

export const BrochureSchema = z.object({
  name:            z.string().min(2).max(100).trim(),
  email:           z.string().email().trim().toLowerCase(),
  phone:           z.string().regex(phoneRegex).trim(),
  programInterest: z.string().min(1).max(100),
})

export type BrochureInput = z.infer<typeof BrochureSchema>

// ── Contact form ──────────────────────────────────────────────

export const ContactSchema = z.object({
  name:    z.string().min(2).max(100).trim(),
  email:   z.string().email().trim().toLowerCase(),
  subject: z.string().min(4).max(200).trim(),
  message: z.string().min(10).max(2000).trim(),
})

export type ContactInput = z.infer<typeof ContactSchema>

// ── Apply Now modal ───────────────────────────────────────────
// Separate from leads — Apply Now captures formal application intent
// with programme level, intake timing, and explicit consent.

export const ApplicationSchema = z.object({
  name:      z.string().min(2, 'Name must be at least 2 characters').max(100).trim().refine(noScript('Name contains invalid content')),
  email:     z.string().email('Enter a valid email address').max(254).trim().toLowerCase(),
  phone:     z.string().regex(phoneRegex, 'Enter a valid mobile number').trim(),
  level:     z.enum(['ug', 'pg']),
  programme: z.string().min(1, 'Please select a programme').max(100).trim().refine(noScript('Invalid programme value')),
  intake:    z.string().min(1, 'Please select an intake').max(50).trim(),
  consent:   z.boolean().refine(v => v === true, { message: 'You must agree to be contacted' }),
  source:    z.string().optional(),
})

export type ApplicationInput = z.infer<typeof ApplicationSchema>
