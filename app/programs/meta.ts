import {
  IconBriefcase,
  IconCode,
  IconBook2,
  IconFlask,
  IconTrendingUp,
  IconDeviceLaptop,
  IconBuildingBank,
  IconStar,
  IconPackage,
  IconUsers,
  IconClipboardList,
  IconCoins,
  IconCloud,
  IconShieldCheck,
  IconBraces,
  IconDatabase,
  IconChartBar,
  IconBrain,
  IconNews,
  IconSpeakerphone,
  IconMovie,
  IconChartHistogram,
} from '@tabler/icons-react'

export interface ProgramMeta {
  Icon:     React.ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  iconBg:   string
  badge?:   string
  outcome?: string
}

export const PROGRAM_META: Record<string, ProgramMeta> = {
  // Management
  bba: {
    Icon:    IconBriefcase,
    iconBg:  'linear-gradient(135deg,#1d4ed8,#1e3a8a)',
    outcome: 'For school-leavers wanting a business career fast.',
  },
  mba: {
    Icon:    IconTrendingUp,
    iconBg:  'linear-gradient(135deg,#C04036,#821a12)',
    badge:   'Most popular',
    outcome: 'For working professionals aiming at senior management.',
  },
  'mba-if': {
    Icon:    IconBuildingBank,
    iconBg:  'linear-gradient(135deg,#1d4ed8,#1e3a8a)',
    outcome: 'For finance pros targeting ACCA, CMA, or CFO roles.',
  },
  'mba-dfaa': {
    Icon:    IconChartHistogram,
    iconBg:  'linear-gradient(135deg,#0891b2,#155e75)',
    badge:   'New',
    outcome: 'For finance and accounting pros moving into digital and analytics-driven roles.',
  },
  'bba-aaft': {
    Icon:    IconMovie,
    iconBg:  'linear-gradient(135deg,#be185d,#9d174d)',
    badge:   'New',
    outcome: 'For students entering film, television, and digital entertainment careers.',
  },

  // Information Technology
  bca: {
    Icon:    IconCode,
    iconBg:  'linear-gradient(135deg,#7c3aed,#4c1d95)',
    badge:   'High demand',
    outcome: 'For school-leavers entering software, data, or product roles.',
  },
  mca: {
    Icon:    IconDeviceLaptop,
    iconBg:  'linear-gradient(135deg,#0891b2,#155e75)',
    outcome: 'For developers ready to move into lead or architect roles.',
  },

  // Commerce
  bcom: {
    Icon:    IconBuildingBank,
    iconBg:  'linear-gradient(135deg,#C04036,#821a12)',
    outcome: 'For commerce students building toward CA, banking, or audit careers.',
  },
  mcom: {
    Icon:    IconBuildingBank,
    iconBg:  'linear-gradient(135deg,#C04036,#821a12)',
    outcome: 'For finance and accounting pros levelling up to senior commerce roles.',
  },

  // Arts
  ba: {
    Icon:    IconBook2,
    iconBg:  'linear-gradient(135deg,#0891b2,#155e75)',
    outcome: 'For graduates building toward policy, journalism, or grad school.',
  },
  ma: {
    Icon:    IconBook2,
    iconBg:  'linear-gradient(135deg,#7c3aed,#4c1d95)',
    outcome: 'For aspiring teachers, writers, and content professionals.',
  },

  // Science
  msc: {
    Icon:    IconFlask,
    iconBg:  'linear-gradient(135deg,#059669,#065f46)',
    outcome: 'For analysts, actuaries, and academic careers in mathematics.',
  },

  // Media & Journalism
  majmc: {
    Icon:    IconNews,
    iconBg:  'linear-gradient(135deg,#be185d,#9d174d)',
    outcome: 'For storytellers entering newsrooms, PR, and digital media.',
  },

  // Management - Certificates
  'pg-cert-digital-marketing': { Icon: IconStar,          iconBg: 'linear-gradient(135deg,#d97706,#b45309)', badge: 'Hot' },
  'pg-cert-supply-chain':      { Icon: IconPackage,        iconBg: 'linear-gradient(135deg,#0891b2,#0e7490)'  },
  'pg-cert-hr':                { Icon: IconUsers,          iconBg: 'linear-gradient(135deg,#059669,#065f46)'  },
  'pg-cert-project-mgmt':      { Icon: IconClipboardList,  iconBg: 'linear-gradient(135deg,#7c3aed,#6d28d9)'  },
  'pg-cert-finance':           { Icon: IconCoins,          iconBg: 'linear-gradient(135deg,#C04036,#821a12)'  },

  // Information Technology - Certificates
  'pg-cert-cloud':             { Icon: IconCloud,          iconBg: 'linear-gradient(135deg,#0284c7,#075985)'  },
  'pg-cert-cybersecurity':     { Icon: IconShieldCheck,    iconBg: 'linear-gradient(135deg,#475569,#1e293b)', badge: 'In demand' },
  'pg-cert-fullstack':         { Icon: IconBraces,         iconBg: 'linear-gradient(135deg,#7c3aed,#4c1d95)'  },

  // Data Science - Certificates
  'pg-cert-data-science':      { Icon: IconDatabase,       iconBg: 'linear-gradient(135deg,#1d4ed8,#1e3a8a)', badge: 'High demand' },
  'pg-cert-business-analytics':{ Icon: IconChartBar,       iconBg: 'linear-gradient(135deg,#0891b2,#155e75)'  },
  'pg-cert-ml-ai':             { Icon: IconBrain,          iconBg: 'linear-gradient(135deg,#6d28d9,#4c1d95)', badge: 'Trending' },

  // Media & Journalism - Certificates
  'pg-cert-media':             { Icon: IconNews,           iconBg: 'linear-gradient(135deg,#be185d,#9d174d)'  },
  'pg-cert-digital-comms':     { Icon: IconSpeakerphone,   iconBg: 'linear-gradient(135deg,#0891b2,#0e7490)'  },
}
