import FacultyCarousel from './FacultyCarousel'
import type { FacultyMember } from './FacultyCarousel'
import { getFacultyByProgram, type SanityFaculty } from '@/lib/sanity'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'

// Brand-only 3-gradient cycle. All Sanity colour keys collapse into the brand palette.
const GRAD_RED   = 'linear-gradient(160deg,#C04036 0%,#821a12 100%)'
const GRAD_AMBER = 'linear-gradient(160deg,#FFA412 0%,#C04036 100%)'
const GRAD_DEEP  = 'linear-gradient(160deg,#821a12 0%,#3b0d09 100%)'

const GRAD: Record<string, string> = {
  red:    GRAD_RED,
  blue:   GRAD_DEEP,
  purple: GRAD_AMBER,
  amber:  GRAD_AMBER,
  green:  GRAD_DEEP,
}

function fromSanity(f: SanityFaculty): FacultyMember {
  return {
    initials:   f.initials || f.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    photoGrad:  GRAD[f.avatarColor] ?? GRAD.red,
    photo:      f.photoUrl ?? undefined,
    name:       f.name,
    title:      f.title,
    credential: f.credential,
    slug:       f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }
}

// Faculty card photo-area gradients: 6 aliases mapped to brand 3-cycle.
const R = GRAD_RED   // red
const B = GRAD_AMBER // yellow → red
const V = GRAD_DEEP  // deep red
const A = GRAD_RED
const G = GRAD_AMBER
const S = GRAD_DEEP

const M1 = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop&crop=faces'
const M2 = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop&crop=faces'
const M3 = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop&crop=faces'
const M4 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=faces'
const M5 = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80&auto=format&fit=crop&crop=faces'
const M6 = 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&q=80&auto=format&fit=crop&crop=faces'
const M7 = 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=80&auto=format&fit=crop&crop=faces'
const M8 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=faces'

const F1 = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&auto=format&fit=crop&crop=faces'
const F2 = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop&crop=faces'
const F3 = 'https://images.unsplash.com/photo-1573165850883-9b0e18c44bd2?w=400&q=80&auto=format&fit=crop&crop=faces'
const F4 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&crop=faces'
const F5 = 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80&auto=format&fit=crop&crop=faces'
const F6 = 'https://images.unsplash.com/photo-1637589267610-6c66fc2a086b?w=400&q=80&auto=format&fit=crop&crop=faces'
const F7 = 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80&auto=format&fit=crop&crop=faces'
const F8 = 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=400&q=80&auto=format&fit=crop&crop=faces'

// Fallback faculty per program slug. Sanity overrides at runtime; this list shows
// until an admin populates the CMS. All 9 real programs are covered.
const FACULTY_DATA: Record<string, FacultyMember[]> = {
  mba: [
    { initials: 'RK',  photoGrad: R, photo: M1, slug: 'rajesh-kumar',      name: 'Dr. Rajesh Kumar',       title: 'Professor, Strategic Management',        credential: 'PhD, IIM Ahmedabad · 22 yrs exp'       },
    { initials: 'PS',  photoGrad: B, photo: F1, slug: 'priya-sharma',      name: 'Prof. Priya Sharma',     title: 'Associate Professor, Finance',           credential: 'MBA, XLRI · CFA Charterholder'         },
    { initials: 'AM',  photoGrad: V, photo: M2, slug: 'ankit-mehta',       name: 'Dr. Ankit Mehta',        title: 'Industry Faculty, Marketing',            credential: 'Ex-CMO, Hindustan Unilever · 18 yrs'   },
    { initials: 'ST',  photoGrad: A, photo: F2, slug: 'sunita-tiwari',     name: 'Prof. Sunita Tiwari',    title: 'Associate Professor, HR & OB',           credential: 'PhD, Symbiosis · SHRM Certified'        },
    { initials: 'VN',  photoGrad: G, photo: M3, slug: 'vikram-nair',       name: 'Dr. Vikram Nair',        title: 'Professor, International Business',      credential: 'PhD, IIFT Delhi · 16 yrs exp'          },
    { initials: 'AB',  photoGrad: S, photo: F3, slug: 'arunima-bose',      name: 'Prof. Arunima Bose',     title: 'Associate Professor, Business Analytics', credential: 'MS Analytics, ISB · 12 yrs exp'       },
    { initials: 'RKp', photoGrad: B, photo: M4, slug: 'rohit-kapoor',      name: 'Dr. Rohit Kapoor',       title: 'Faculty, Entrepreneurship',              credential: 'PhD, SRCC · Serial entrepreneur'       },
    { initials: 'MI',  photoGrad: R, photo: F4, slug: 'meenakshi-iyer',    name: 'Prof. Meenakshi Iyer',   title: 'Industry Faculty, Operations',           credential: 'Ex-VP Ops, Infosys · 20 yrs exp'       },
  ],
  'mba-if': [
    { initials: 'VK',  photoGrad: R, photo: M1, slug: 'vivek-kapoor',          name: 'Dr. Vivek Kapoor',          title: 'Professor, International Finance',      credential: 'PhD, LBS London · 20 yrs exp'              },
    { initials: 'RKr', photoGrad: B, photo: F1, slug: 'reena-krishnamurthy',   name: 'Prof. Reena Krishnamurthy', title: 'Associate Professor, Forex Markets',    credential: 'MBA Finance, ISB · 15 yrs exp'             },
    { initials: 'ABh', photoGrad: V, photo: M2, slug: 'aditya-bhargava',       name: 'Dr. Aditya Bhargava',       title: 'Industry Faculty, Global Banking',      credential: 'Ex-MD, Goldman Sachs India · 22 yrs'       },
    { initials: 'SnM', photoGrad: A, photo: F2, slug: 'sneha-malhotra',        name: 'Prof. Sneha Malhotra',      title: 'Associate Professor, ACCA Track',       credential: 'FCCA · CA · 14 yrs exp'                    },
    { initials: 'KBh', photoGrad: G, photo: M3, slug: 'karan-bhatia',          name: 'Dr. Karan Bhatia',          title: 'Professor, Investment Strategy',        credential: 'PhD, Wharton · 18 yrs exp'                 },
    { initials: 'LVe', photoGrad: S, photo: F3, slug: 'lakshmi-venkatesan',    name: 'Prof. Lakshmi Venkatesan',  title: 'Industry Faculty, CMA Track',           credential: 'CMA · CPA · 16 yrs exp'                    },
    { initials: 'RSu', photoGrad: B, photo: M4, slug: 'rohan-subramanian',     name: 'Dr. Rohan Subramanian',     title: 'Associate Professor, Financial Risk',   credential: 'PhD, IIM Bangalore · 13 yrs exp'           },
    { initials: 'MKr', photoGrad: R, photo: F4, slug: 'meera-krishnan-mba-if', name: 'Prof. Meera Krishnan',      title: 'Assistant Professor, Cross-Border Inv', credential: 'CFA · 12 yrs exp'                          },
  ],
  mca: [
    { initials: 'SG',  photoGrad: R, photo: M1, slug: 'sanjay-gupta',      name: 'Dr. Sanjay Gupta',       title: 'Professor, Algorithms & Systems',        credential: 'PhD, IIT Delhi · 17 yrs exp'           },
    { initials: 'NR',  photoGrad: B, photo: F1, slug: 'neha-rastogi',      name: 'Prof. Neha Rastogi',     title: 'Associate Professor, Data Science',      credential: 'MS, Georgia Tech · Google-certified'   },
    { initials: 'KP',  photoGrad: V, photo: M2, slug: 'kiran-pillai',      name: 'Dr. Kiran Pillai',       title: 'Industry Faculty, Cloud & DevOps',       credential: 'Ex-Principal Eng, Microsoft · AWS SAA' },
    { initials: 'MJ',  photoGrad: A, photo: M3, slug: 'manish-joshi',      name: 'Prof. Manish Joshi',     title: 'Associate Professor, Cybersecurity',     credential: 'CISSP · CEH · 15 yrs exp'              },
    { initials: 'DA',  photoGrad: G, photo: F2, slug: 'deepti-agarwal',    name: 'Dr. Deepti Agarwal',     title: 'Assistant Professor, AI & ML',           credential: 'PhD, IIT Kanpur · 14 yrs exp'          },
    { initials: 'RM',  photoGrad: S, photo: M4, slug: 'rahul-mishra',      name: 'Prof. Rahul Mishra',     title: 'Industry Faculty, Full-Stack Dev',       credential: 'Ex-SDE II, Google · 11 yrs exp'        },
    { initials: 'PV',  photoGrad: B, photo: F3, slug: 'priya-verma',       name: 'Dr. Priya Verma',        title: 'Assistant Professor, Computer Vision',   credential: 'PhD, IISc Bangalore · 9 yrs exp'       },
    { initials: 'SK',  photoGrad: R, photo: M5, slug: 'suresh-kumar',      name: 'Prof. Suresh Kumar',     title: 'Industry Faculty, Distributed Systems',  credential: 'Ex-Principal Eng, Flipkart · 15 yrs'  },
  ],
  bca: [
    { initials: 'DV',  photoGrad: R, photo: M6, slug: 'deepak-verma',      name: 'Prof. Deepak Verma',     title: 'Assistant Professor, Programming',       credential: 'MCA, NIT Jaipur · 10 yrs exp'          },
    { initials: 'SR',  photoGrad: B, photo: F4, slug: 'shweta-reddy',      name: 'Dr. Shweta Reddy',       title: 'Assistant Professor, Web Dev',           credential: 'PhD, BITS Pilani · Full-stack dev'     },
    { initials: 'AK',  photoGrad: V, photo: M7, slug: 'alok-kumar',        name: 'Prof. Alok Kumar',       title: 'Industry Faculty, Software Eng',         credential: 'Ex-SDE, Amazon · 12 yrs exp'           },
    { initials: 'KSi', photoGrad: A, photo: F5, slug: 'kavita-singh',      name: 'Dr. Kavita Singh',       title: 'Assistant Professor, Database Systems',  credential: 'PhD, NIT Trichy · 13 yrs exp'          },
    { initials: 'RSh', photoGrad: G, photo: M8, slug: 'ritesh-sharma',     name: 'Prof. Ritesh Sharma',    title: 'Industry Faculty, Mobile Development',   credential: 'Ex-Android Engineer, Paytm · 10 yrs'   },
    { initials: 'AP',  photoGrad: S, photo: F6, slug: 'aarti-patel',       name: 'Dr. Aarti Patel',        title: 'Assistant Professor, Networks',          credential: 'PhD, IIT Roorkee · 11 yrs exp'         },
    { initials: 'SJ',  photoGrad: B, photo: M1, slug: 'siddharth-jain',    name: 'Prof. Siddharth Jain',   title: 'Industry Faculty, UI/UX Design',         credential: 'Ex-Senior Designer, Swiggy · 9 yrs'    },
    { initials: 'NG',  photoGrad: R, photo: F7, slug: 'nisha-gupta',       name: 'Dr. Nisha Gupta',        title: 'Assistant Professor, Algorithms',        credential: 'PhD, IIT Madras · 12 yrs exp'          },
  ],
  bba: [
    { initials: 'PD',  photoGrad: R, photo: M2, slug: 'pradeep-dubey',     name: 'Prof. Pradeep Dubey',    title: 'Assistant Professor, Management',        credential: 'MBA, MDI Gurgaon · 11 yrs exp'         },
    { initials: 'KSa', photoGrad: B, photo: F8, slug: 'kavita-saxena',     name: 'Dr. Kavita Saxena',      title: 'Assistant Professor, Marketing',         credential: 'PhD, University of Delhi · 14 yrs'     },
    { initials: 'VB',  photoGrad: A, photo: M3, slug: 'varun-bajaj',       name: 'Prof. Varun Bajaj',      title: 'Industry Faculty, Entrepreneurship',     credential: 'Founder, 3 startups · Angel investor'  },
    { initials: 'SN',  photoGrad: V, photo: F1, slug: 'supriya-nair',      name: 'Dr. Supriya Nair',       title: 'Associate Professor, Finance & Banking', credential: 'PhD, IIM Kozhikode · 13 yrs'           },
    { initials: 'AR',  photoGrad: G, photo: M4, slug: 'anil-rao',          name: 'Prof. Anil Rao',         title: 'Faculty, Business Law',                  credential: 'LLB + MBA, Symbiosis · 16 yrs exp'    },
    { initials: 'NT',  photoGrad: S, photo: F2, slug: 'neelima-tripathi',  name: 'Dr. Neelima Tripathi',   title: 'Associate Professor, Consumer Behaviour', credential: 'PhD, FMS Delhi · 12 yrs exp'         },
    { initials: 'HV',  photoGrad: B, photo: M5, slug: 'harsh-vardhan',     name: 'Prof. Harsh Vardhan',    title: 'Industry Faculty, Digital Marketing',    credential: 'Ex-Marketing Head, Myntra · 11 yrs'    },
    { initials: 'SJo', photoGrad: R, photo: F3, slug: 'sunita-joshi',      name: 'Dr. Sunita Joshi',       title: 'Associate Professor, Business Ethics',   credential: 'PhD, TISS Mumbai · 15 yrs exp'         },
  ],
  ba: [
    { initials: 'IM',  photoGrad: R, photo: F4, slug: 'indira-mishra',     name: 'Dr. Indira Mishra',      title: 'Professor, Political Science',           credential: 'PhD, JNU Delhi · 19 yrs exp'           },
    { initials: 'RT',  photoGrad: B, photo: M6, slug: 'rohit-tripathi',    name: 'Prof. Rohit Tripathi',   title: 'Associate Professor, English Lit',       credential: 'MA, Oxford · 13 yrs exp'               },
    { initials: 'DC',  photoGrad: V, photo: F5, slug: 'devika-chakraborty',name: 'Dr. Devika Chakraborty', title: 'Assistant Professor, Economics',         credential: 'PhD, Presidency Univ · 11 yrs exp'     },
    { initials: 'SRa', photoGrad: A, photo: F6, slug: 'suniti-rao',        name: 'Dr. Suniti Rao',         title: 'Associate Professor, Sociology',         credential: 'PhD, Hyderabad Central Univ · 15 yrs'  },
    { initials: 'VSi', photoGrad: G, photo: M7, slug: 'vikrant-singh',     name: 'Prof. Vikrant Singh',    title: 'Faculty, History & Public Admin',        credential: 'MA, Delhi Univ · NET/JRF · 11 yrs'    },
    { initials: 'PSh', photoGrad: S, photo: F7, slug: 'pallavi-sharma',    name: 'Dr. Pallavi Sharma',     title: 'Assistant Professor, Philosophy',        credential: 'PhD, BHU Varanasi · 14 yrs exp'        },
    { initials: 'MJo', photoGrad: B, photo: F8, slug: 'meena-joshi',       name: 'Prof. Meena Joshi',      title: 'Faculty, Media & Communication',         credential: 'MA, AJK-MCRC Jamia · 12 yrs exp'      },
    { initials: 'RGu', photoGrad: R, photo: M8, slug: 'rajiv-gupta',       name: 'Dr. Rajiv Gupta',        title: 'Associate Professor, Dev Economics',     credential: 'PhD, IGIDR Mumbai · 16 yrs exp'        },
  ],
  ma: [
    { initials: 'GS',  photoGrad: R, photo: F1, slug: 'geeta-srinivasan',  name: 'Prof. Geeta Srinivasan', title: 'Professor, English Literature',          credential: 'PhD, Hyderabad Central · 21 yrs'       },
    { initials: 'BN',  photoGrad: B, photo: M1, slug: 'bhupesh-naik',      name: 'Dr. Bhupesh Naik',       title: 'Associate Professor, Sociology',         credential: 'PhD, TISS Mumbai · 15 yrs exp'         },
    { initials: 'LV',  photoGrad: V, photo: F2, slug: 'lakshmi-varma',     name: 'Prof. Lakshmi Varma',    title: 'Assistant Professor, Economics',         credential: 'MA Economics, DSE Delhi · NET/JRF'     },
    { initials: 'AT',  photoGrad: A, photo: M2, slug: 'abhinav-tiwari',    name: 'Dr. Abhinav Tiwari',     title: 'Associate Professor, Political Theory',  credential: 'PhD, JNU Delhi · NET · 14 yrs exp'     },
    { initials: 'SI',  photoGrad: G, photo: F3, slug: 'sandhya-iyer',      name: 'Prof. Sandhya Iyer',     title: 'Assistant Professor, Comp Literature',   credential: 'PhD, EFLU Hyderabad · 12 yrs exp'      },
    { initials: 'ARo', photoGrad: S, photo: M3, slug: 'anupam-roy',        name: 'Dr. Anupam Roy',         title: 'Assistant Professor, Economic Policy',   credential: 'PhD, IGIDR Mumbai · 11 yrs exp'        },
    { initials: 'MKn', photoGrad: B, photo: F4, slug: 'madhu-krishnan',    name: 'Prof. Madhu Krishnan',   title: 'Faculty, Gender Studies & Sociology',    credential: 'PhD, TISS Mumbai · 16 yrs exp'         },
    { initials: 'SBo', photoGrad: R, photo: M4, slug: 'suresh-bose',       name: 'Dr. Suresh Bose',        title: 'Associate Professor, Applied Linguistics', credential: 'PhD, BHU · TESOL certified'         },
  ],
  msc: [
    { initials: 'TS',  photoGrad: R, photo: M5, slug: 'tarun-saxena',         name: 'Dr. Tarun Saxena',          title: 'Professor, Advanced Mathematics',         credential: 'PhD, IIT Bombay · 14 yrs exp'            },
    { initials: 'PC',  photoGrad: B, photo: F5, slug: 'pooja-chauhan',        name: 'Prof. Pooja Chauhan',       title: 'Assistant Professor, Math Statistics',    credential: 'M.Sc, BITS Pilani · Google ML cert'      },
    { initials: 'KaN', photoGrad: G, photo: M6, slug: 'kartik-nambiar',       name: 'Dr. Kartik Nambiar',        title: 'Associate Professor, Algebra & Topology', credential: 'PhD, IISc Bangalore · 12 yrs exp'        },
    { initials: 'SPa', photoGrad: V, photo: F6, slug: 'sameera-patel',        name: 'Dr. Sameera Patel',         title: 'Assistant Professor, Applied Maths',      credential: 'PhD, Pune Univ · 13 yrs exp'             },
    { initials: 'RDe', photoGrad: A, photo: M7, slug: 'rahul-desai-msc',      name: 'Prof. Rahul Desai',         title: 'Industry Faculty, Quantitative Analysis', credential: 'Ex-Quant Analyst, Edelweiss · 10 yrs'    },
    { initials: 'AKy', photoGrad: S, photo: F7, slug: 'anita-krishnamurthy',  name: 'Dr. Anita Krishnamurthy',   title: 'Associate Professor, Number Theory',      credential: 'PhD, IISc Bangalore · 15 yrs exp'        },
    { initials: 'SSh', photoGrad: B, photo: M8, slug: 'sunil-sharma',         name: 'Prof. Sunil Sharma',        title: 'Assistant Professor, Probability',        credential: 'PhD, ISI Kolkata · 14 yrs exp'           },
    { initials: 'NSm', photoGrad: R, photo: F8, slug: 'neetu-singh-msc',      name: 'Dr. Neetu Singh',           title: 'Assistant Professor, Operations Research',credential: 'PhD, IIT Madras · 11 yrs exp'            },
  ],
  majmc: [
    { initials: 'ViS', photoGrad: R, photo: M1, slug: 'vinay-singh',          name: 'Dr. Vinay Singh',           title: 'Professor, Digital Journalism',           credential: 'PhD, AJK MCRC Jamia · 20 yrs exp'        },
    { initials: 'AnB', photoGrad: B, photo: F1, slug: 'anjali-bose',          name: 'Prof. Anjali Bose',         title: 'Associate Professor, Broadcast Media',    credential: 'MA, Cardiff Univ · Ex-NDTV · 14 yrs'     },
    { initials: 'RKh', photoGrad: V, photo: M2, slug: 'rajesh-khanna-pr',     name: 'Dr. Rajesh Khanna',         title: 'Industry Faculty, Public Relations',      credential: 'Ex-Chief PR Officer, Tata Group · 22 yrs'},
    { initials: 'NSm', photoGrad: A, photo: F2, slug: 'neha-sharma-mjmc',     name: 'Prof. Neha Sharma',         title: 'Associate Professor, Multimedia Journ',   credential: 'MA, IIMC Delhi · 12 yrs exp'             },
    { initials: 'AdK', photoGrad: G, photo: M3, slug: 'aditya-kapoor-mjmc',   name: 'Dr. Aditya Kapoor',         title: 'Professor, Media Studies',                credential: 'PhD, JNU Delhi · 18 yrs exp'             },
    { initials: 'KaI', photoGrad: S, photo: F3, slug: 'kavitha-iyer',         name: 'Prof. Kavitha Iyer',        title: 'Industry Faculty, Corporate Comms',       credential: 'Ex-Communications Head, Wipro · 15 yrs'  },
    { initials: 'SaR', photoGrad: B, photo: M4, slug: 'sandeep-reddy',        name: 'Dr. Sandeep Reddy',         title: 'Associate Professor, Investigative Journ',credential: 'PhD, IIMC Delhi · 13 yrs exp'            },
    { initials: 'TaM', photoGrad: R, photo: F4, slug: 'tara-menon',           name: 'Prof. Tara Menon',          title: 'Industry Faculty, Documentary Film',      credential: 'Filmmaker · National Award · 11 yrs'     },
  ],
}

export default async function FacultySection({ slug }: { slug: string }) {
  const sanityFaculty = await getFacultyByProgram(slug)
  const faculty = sanityFaculty.length > 0
    ? sanityFaculty.map(fromSanity)
    : (FACULTY_DATA[slug] ?? [])
  if (!faculty || faculty.length === 0) return null

  return (
    <section className="sketch-hover-group relative bg-neutral-900 py-16 overflow-hidden">
      <SketchFlourish shape="swoop" color="yellow" opacity={0.06} strokeWidth={20} trigger="hover" />
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">

        {/* Header row */}
        <div className="flex items-end justify-between gap-5 mb-10 md:mb-8">
          <div>
            <p className="text-[12px] font-heading font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-3">
              Your Faculty
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] text-white lg:text-[32px]">
              The people teaching this programme
            </h2>
            <p className="mt-2 text-[16px] font-body text-white/65 max-w-[440px]">
              Working professionals and academics who lead live sessions, mentor students and assess coursework.
            </p>
          </div>
          <p className="text-[13px] font-body text-white/30 flex-none pb-1 hidden sm:block">
            Use arrows or swipe &rarr;
          </p>
        </div>

      </div>

      <FacultyCarousel faculty={faculty} />
    </section>
  )
}
