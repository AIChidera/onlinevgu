'use client'

// In-memory (module-scope) draft store for page-level forms that unmount on
// client-side navigation (ContactForm, LeadForm, BrochureForm). Deliberately
// NOT sessionStorage/localStorage - those survive a hard refresh, and the
// requirement is that drafts are wiped by one. A plain JS module variable
// is cleared whenever the page actually reloads, which is exactly the line
// we want.

type DraftData = Record<string, unknown>
type Store = Record<string, DraftData>

const store: Store = {}

export function getDraft<T extends DraftData>(formId: string): T | undefined {
  return store[formId] as T | undefined
}

export function updateDraft(formId: string, patch: DraftData) {
  store[formId] = { ...(store[formId] ?? {}), ...patch }
}

export function clearDraft(formId: string) {
  delete store[formId]
}
