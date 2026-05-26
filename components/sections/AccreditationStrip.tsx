export default function AccreditationStrip() {
  return (
    <section
      id="accreditation"
      className="bg-white border-t-[3px] py-14 px-12 lg:px-8 md:px-5"
      style={{ borderTopColor: '#eecf63' }}
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-2">
            Recognised By
          </p>
          <h2 className="font-heading font-extrabold text-[26px] tracking-tight text-gray-900">
            Every regulator that matters in Indian higher education
          </h2>
        </div>

        {/* Badge row */}
        <div className="grid grid-cols-4 sm:grid-cols-2 divide-x divide-gray-200 sm:divide-x-0 sm:gap-y-6">
          {/* UGC */}
          <div className="flex flex-col items-center justify-center gap-3 px-8 py-4 sm:px-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
            >
              <span className="font-heading font-black text-white text-[18px] tracking-tight">UGC</span>
            </div>
            <div className="text-center">
              <p className="font-heading font-bold text-[15px] text-gray-900">UGC Entitled</p>
              <p className="text-[12px] font-body text-gray-500 mt-0.5">Distance Education Bureau</p>
            </div>
            <span className="rounded-full bg-red-50 border border-red-100 px-3 py-0.5 text-[11px] font-body font-semibold text-vgu-red">
              Govt. of India
            </span>
          </div>

          {/* NAAC A+ */}
          <div className="flex flex-col items-center justify-center gap-3 px-8 py-4 sm:px-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #FFA412, #e08800)' }}
            >
              <span className="font-heading font-black text-white text-[20px] tracking-tight">A+</span>
            </div>
            <div className="text-center">
              <p className="font-heading font-bold text-[15px] text-gray-900">NAAC A+</p>
              <p className="text-[12px] font-body text-gray-500 mt-0.5">Accredited University</p>
            </div>
            <span className="rounded-full bg-amber-50 border border-amber-100 px-3 py-0.5 text-[11px] font-body font-semibold text-amber-700">
              Highest Grade
            </span>
          </div>

          {/* AICTE */}
          <div className="flex flex-col items-center justify-center gap-3 px-8 py-4 sm:px-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f1e33)' }}
            >
              <span className="font-heading font-black text-white text-[13px] tracking-tight text-center leading-none">AICTE</span>
            </div>
            <div className="text-center">
              <p className="font-heading font-bold text-[15px] text-gray-900">AICTE Approved</p>
              <p className="text-[12px] font-body text-gray-500 mt-0.5">Technical Programmes</p>
            </div>
            <span className="rounded-full bg-slate-50 border border-slate-200 px-3 py-0.5 text-[11px] font-body font-semibold text-slate-700">
              Govt. of India
            </span>
          </div>

          {/* Coursera */}
          <div className="flex flex-col items-center justify-center gap-3 px-8 py-4 sm:px-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #0056D2, #003a8c)' }}
            >
              <span className="font-heading font-black text-white text-[22px]">C</span>
            </div>
            <div className="text-center">
              <p className="font-heading font-bold text-[15px] text-gray-900">Coursera Partner</p>
              <p className="text-[12px] font-body text-gray-500 mt-0.5">7,000+ courses included</p>
            </div>
            <span className="rounded-full bg-blue-50 border border-blue-100 px-3 py-0.5 text-[11px] font-body font-semibold text-blue-700">
              Free with degree
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
