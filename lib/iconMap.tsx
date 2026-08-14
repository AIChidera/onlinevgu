import {
  IconClipboardList,
  IconSchool,
  IconCreditCard,
  IconDeviceLaptop,
} from '@tabler/icons-react'
import type { ComponentType } from 'react'
import { ICON_OPTIONS } from '@/lib/iconOptions'

// @tabler/icons-react doesn't export its IconProps/Icon types, only the icon
// components themselves - so the shared shape is defined locally, matching
// the minimal prop set every call site in this codebase actually uses.
export type IconComponent = ComponentType<{ size?: string | number; stroke?: string | number; className?: string }>

// Single source of truth for every CMS-picked icon across the site. A Sanity
// field can only offer a fixed dropdown (see lib/iconOptions.ts, reused by
// the schema files), never free text - so an admin can never save an icon
// name that fails to render. Add a new icon here (import + entry) and to
// ICON_OPTIONS in lib/iconOptions.ts whenever a new section needs one.
export const ICON_MAP: Record<string, IconComponent> = {
  clipboardList: IconClipboardList,
  school:        IconSchool,
  creditCard:    IconCreditCard,
  deviceLaptop:  IconDeviceLaptop,
}

export { ICON_OPTIONS }

// Resolves a CMS icon key to its component, with a safe fallback for a key
// that no longer exists in ICON_MAP (e.g. removed from the list after content
// was already saved) - never throws, never renders nothing silently confusing.
export function getIcon(key: string | null | undefined, fallback: IconComponent = IconSchool): IconComponent {
  if (!key) return fallback
  return ICON_MAP[key] ?? fallback
}
