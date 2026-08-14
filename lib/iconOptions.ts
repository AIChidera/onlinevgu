// Plain-data list of every icon a CMS field is allowed to pick, with no
// import of React or the icon components themselves - safe to import from
// Sanity schema files (Studio bundle) as well as from lib/iconMap.tsx (Next
// app, where the values are resolved to actual icon components). Keeping
// this the single source of truth avoids the schema's dropdown and the
// component's lookup table drifting out of sync.
export const ICON_OPTIONS = [
  { title: 'Clipboard (register/apply)',   value: 'clipboardList'   },
  { title: 'Graduation cap (program)',     value: 'school'          },
  { title: 'Credit card (payment)',        value: 'creditCard'      },
  { title: 'Laptop (learning)',            value: 'deviceLaptop'    },
  { title: 'Bank building (institution)',  value: 'buildingBank'    },
  { title: 'Award / medal (achievement)',  value: 'award'           },
  { title: 'People / group (community)',   value: 'users'           },
  { title: 'Globe (international/reach)',  value: 'globe'           },
  { title: 'Certificate (credential)',     value: 'certificate'     },
  { title: 'Trending up (growth/outcome)', value: 'trendingUp'      },
  { title: 'Brain (expertise/research)',   value: 'brain'           },
  { title: 'Video camera (video content)', value: 'video'           },
  { title: 'Broadcast (live class)',       value: 'broadcast'       },
  { title: 'Play button (recordings)',     value: 'playerPlay'      },
  { title: 'Clipboard check (assessment)', value: 'clipboardCheck'  },
  { title: 'Chat bubbles (discussion)',    value: 'messages'        },
  { title: 'Microphone (guest talk)',      value: 'microphone2'     },
  { title: 'Briefcase (career/jobs)',      value: 'briefcase'       },
  { title: 'Lightning bolt (speed)',       value: 'bolt'            },
  { title: 'Check circle (confirmation)',  value: 'circleCheck'     },
  { title: 'Clock (hours/time)',           value: 'clock'           },
  { title: 'Phone (call)',                 value: 'phone'           },
  { title: 'Headset (support)',            value: 'headset'         },
  { title: 'WhatsApp (chat)',              value: 'brandWhatsapp'   },
  { title: 'Mail (email)',                 value: 'mail'            },
  { title: 'Lifebuoy (student support)',   value: 'lifebuoy'        },
] as const

export type IconOptionValue = (typeof ICON_OPTIONS)[number]['value']
