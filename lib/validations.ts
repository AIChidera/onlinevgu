import { z } from 'zod'

const phoneRegex = /^[+]?[\d\s\-().]{10,15}$/

export const LeadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .trim(),
  email: z
    .string()
    .email('Enter a valid email address')
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .regex(phoneRegex, 'Enter a valid 10-digit mobile number')
    .trim(),
  programInterest: z
    .string()
    .min(1, 'Please select a programme')
    .max(100),
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

// ── Multi-step application form ───────────────────────────────

export const ApplicationStep1Schema = LeadSchema

export const ApplicationStep2Schema = z.object({
  qualification: z.enum(['12th', 'diploma', 'ug', 'pg']),
  workExp:       z.enum(['fresher', '0-2', '3-5', '6+']),
})

export const ApplicationStep3Schema = z.object({
  state:    z.string().min(1, 'Please select your state'),
  timeline: z.enum(['immediately', '3months', '6months', 'exploring']),
  notes:    z.string().max(500).optional(),
  consent:  z.literal(true, 'You must agree to be contacted'),
})
