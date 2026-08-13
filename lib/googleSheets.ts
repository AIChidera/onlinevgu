import { google } from 'googleapis'

// Server-to-server auth via a Google service account - no OAuth consent
// screen, no human login, works statelessly in a serverless function.
// Same shape as lib/resend.ts and lib/rateLimit.ts: missing credentials
// degrade to a silent no-op with a console warning rather than throwing,
// so a submission never fails just because Sheets isn't configured yet.
let sheetsClient: ReturnType<typeof google.sheets> | null = null

function getSheetsClient() {
  if (sheetsClient) return sheetsClient
  const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
  const key   = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !key) {
    console.warn('[googleSheets] GOOGLE_SHEETS_CLIENT_EMAIL/PRIVATE_KEY not set - rows will not be written')
    return null
  }
  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  sheetsClient = google.sheets({ version: 'v4', auth })
  return sheetsClient
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

// Tab names - must match the sheet's actual tab names exactly (case-sensitive).
export const SHEET_TABS = {
  LEADS:        'Leads',
  BROCHURE:     'Brochure Requests',
  CONTACT:      'Contact Messages',
  APPLICATIONS: 'Applications',
} as const

// Admin/sales are India-based - a plain UTC or epoch timestamp would need
// mental math on every row, so format directly in IST.
export function istTimestamp() {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

// Appends one row to the bottom of `tab`. `row` must already be in the same
// column order as that tab's header row (see each API route for the order).
export async function appendToSheet(tab: string, row: (string | number)[]) {
  const sheets = getSheetsClient()
  if (!sheets || !SPREADSHEET_ID) return
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${tab}!A:A`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  })
}
