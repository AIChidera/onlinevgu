'use client'

const EVENTS = [
  { name: 'Priya',    city: 'Mumbai',     action: 'applied for MBA',              ago: '2 min ago'  },
  { name: 'Rahul',   city: 'Bangalore',  action: 'enrolled in BCA',              ago: 'just now'   },
  { name: 'Sneha',   city: 'Delhi',      action: 'requested a brochure',         ago: '5 min ago'  },
  { name: 'Arjun',   city: 'Hyderabad',  action: 'applied for MCA',              ago: '7 min ago'  },
  { name: 'Meera',   city: 'Chennai',    action: 'enrolled in MBA',              ago: '11 min ago' },
  { name: 'Vikram',  city: 'Pune',       action: 'applied for BBA',              ago: '14 min ago' },
  { name: 'Ananya',  city: 'Jaipur',     action: 'spoke to a counsellor',        ago: '3 min ago'  },
  { name: 'Rohan',   city: 'Kolkata',    action: 'enrolled in B.Com',            ago: '18 min ago' },
  { name: 'Divya',   city: 'Ahmedabad',  action: 'applied for MCA',              ago: '21 min ago' },
  { name: 'Karan',   city: 'Lucknow',    action: 'enrolled in MBA',              ago: '9 min ago'  },
  { name: 'Pooja',   city: 'Surat',      action: 'applied for BCA',              ago: '26 min ago' },
  { name: 'Suresh',  city: 'Nagpur',     action: 'requested a brochure',         ago: '31 min ago' },
  { name: 'Lakshmi', city: 'Kochi',      action: 'enrolled in M.Com',            ago: '38 min ago' },
  { name: 'Deepak',  city: 'Chandigarh', action: 'applied for MBA - Healthcare', ago: '43 min ago' },
]

export default function ActivityTicker() {
  return (
    <div className="relative bg-neutral-900 py-3 overflow-hidden">
      {/* Left fade */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #111827, transparent)' }}
      />
      {/* Right fade */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #111827, transparent)' }}
      />

      <div className="flex animate-ticker-scroll" aria-hidden="true">
        {[...EVENTS, ...EVENTS].map((e, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 flex-none px-6 border-r border-white/10"
          >
            <span className="relative flex h-2 w-2 flex-none">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-[13px] font-body text-white/55 whitespace-nowrap">
              <span className="text-white font-semibold">{e.name}</span>
              {' from '}
              <span className="text-white/80">{e.city}</span>
              {' '}{e.action}{' '}
              <span className="text-white/30">· {e.ago}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
