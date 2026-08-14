// Plain-data list of every icon a CMS field is allowed to pick, with no
// import of React or the icon components themselves - safe to import from
// Sanity schema files (Studio bundle) as well as from lib/iconMap.tsx (Next
// app, where the values are resolved to actual icon components). Keeping
// this the single source of truth avoids the schema's dropdown and the
// component's lookup table drifting out of sync.
export const ICON_OPTIONS = [
  { title: 'Clipboard (register/apply)', value: 'clipboardList' },
  { title: 'Graduation cap (program)',   value: 'school'        },
  { title: 'Credit card (payment)',      value: 'creditCard'    },
  { title: 'Laptop (learning)',          value: 'deviceLaptop'  },
] as const

export type IconOptionValue = (typeof ICON_OPTIONS)[number]['value']
