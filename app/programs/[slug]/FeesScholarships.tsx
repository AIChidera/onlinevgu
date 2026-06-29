import { IconCash, IconStarFilled } from '@tabler/icons-react'
import type { FeeBreakdown } from './programExtras'

interface Tier { criteria: string; benefit: string }

interface Props {
  totalFee:         string
  duration:         string
  feeBreakdown:     FeeBreakdown
  scholarshipTiers: Tier[]
}

export default function FeesScholarships({ totalFee, duration, feeBreakdown, scholarshipTiers }: Props) {
  return (
    <section className="bg-white py-12 lg:py-16 px-5 md:px-8 lg:px-12 border-t border-neutral-100">
      <div className="mx-auto max-w-[1280px]">

        <div data-animate="fade-up" className="mb-10 max-w-[640px]">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Fees & scholarships
          </p>
          <h2 className="font-heading font-bold text-[28px] lg:text-[34px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-4">
            Transparent. With real merit support.
          </h2>
          <p className="text-[16px] lg:text-[17px] font-body leading-[1.7] text-neutral-600">
            Pay in full or split into no-cost EMIs. Merit, sports and defence scholarships stack up to 100% of tuition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* Fee breakdown */}
          <div data-animate="fade-up" className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-vgu-red/8 border border-vgu-red/15 flex items-center justify-center flex-none">
                <IconCash size={16} stroke={1.75} className="text-vgu-red" />
              </div>
              <div>
                <p className="font-heading font-bold text-[15px] text-neutral-900">Fee breakdown</p>
                <p className="text-[12px] font-body text-neutral-500">Per academic year</p>
              </div>
            </div>
            <div className="divide-y divide-neutral-100">
              <FeeRow label="Tuition fee"           value={feeBreakdown.tuition} />
              <FeeRow label="Exam fee"              value={feeBreakdown.exam} />
              <FeeRow label="LMS & tech access"     value={feeBreakdown.tech} />
              <div className="flex items-center justify-between px-6 py-4 bg-neutral-50">
                <p className="font-heading font-bold text-[14px] text-neutral-900 uppercase tracking-[0.06em]">Total per year</p>
                <p className="font-heading font-black text-[20px] text-neutral-900 tabular-nums">{feeBreakdown.total}</p>
              </div>
              <FeeRow label="One-time admission fee" value={feeBreakdown.oneTime} note="Charged once at enrollment" />
            </div>
            <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/40">
              <p className="text-[13px] font-body text-neutral-600 leading-[1.6]">
                <span className="font-heading font-semibold text-neutral-900">{duration} programme.</span> Total programme cost <span className="font-heading font-bold text-neutral-900">{totalFee}</span>. No-cost EMI options available - speak to a counsellor for your eligibility.
              </p>
            </div>
          </div>

          {/* Scholarship tiers */}
          <div data-animate="fade-up" style={{ animationDelay: '80ms' }} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-vgu-yellow/15 border border-vgu-yellow/30 flex items-center justify-center flex-none">
                <IconStarFilled size={14} className="text-vgu-yellow" />
              </div>
              <div>
                <p className="font-heading font-bold text-[15px] text-neutral-900">Scholarships</p>
                <p className="text-[12px] font-body text-neutral-500">Apply during admission. Stackable up to 100% of tuition.</p>
              </div>
            </div>
            <div className="divide-y divide-neutral-100">
              {scholarshipTiers.map(t => (
                <div key={t.criteria} className="flex items-start gap-4 px-6 py-3.5">
                  <p className="flex-1 text-[14px] font-body text-neutral-700 leading-[1.5]">{t.criteria}</p>
                  <span className="flex-none rounded-full bg-vgu-yellow/15 border border-vgu-yellow/30 px-3 py-1 text-[12px] font-heading font-bold text-vgu-red whitespace-nowrap">
                    {t.benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function FeeRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-3.5">
      <div>
        <p className="text-[14px] font-body text-neutral-700">{label}</p>
        {note && <p className="text-[12px] font-body text-neutral-400 mt-0.5">{note}</p>}
      </div>
      <p className="font-heading font-semibold text-[15px] text-neutral-900 tabular-nums">{value}</p>
    </div>
  )
}
