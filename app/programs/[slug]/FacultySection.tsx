import FacultyCarousel from './FacultyCarousel'
import type { FacultyMember } from './FacultyCarousel'

const R = 'linear-gradient(160deg,#C04036 0%,#821a12 100%)'
const B = 'linear-gradient(160deg,#2563eb 0%,#1d4ed8 100%)'
const V = 'linear-gradient(160deg,#7c3aed 0%,#4c1d95 100%)'
const A = 'linear-gradient(160deg,#d97706 0%,#92400e 100%)'
const G = 'linear-gradient(160deg,#059669 0%,#065f46 100%)'
const S = 'linear-gradient(160deg,#475569 0%,#1e293b 100%)'

const M1 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=faces'
const M2 = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop&crop=faces'
const M3 = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop&crop=faces'
const M4 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=faces'
const M5 = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop&crop=faces'
const M6 = 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80&auto=format&fit=crop&crop=faces'
const M7 = 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80&auto=format&fit=crop&crop=faces'
const M8 = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop&crop=faces'

const F1 = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop&crop=faces'
const F2 = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop&crop=faces'
const F3 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&crop=faces'
const F4 = 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80&auto=format&fit=crop&crop=faces'
const F5 = 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&q=80&auto=format&fit=crop&crop=faces'
const F6 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop&crop=faces'
const F7 = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop&crop=faces'
const F8 = 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80&auto=format&fit=crop&crop=faces'

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
  'mba-healthcare': [
    { initials: 'VP',  photoGrad: R, photo: M5, slug: 'vinod-patel',       name: 'Dr. Vinod Patel',        title: 'Professor, Healthcare Management',       credential: 'MD + MBA, AIIMS · 26 yrs exp'          },
    { initials: 'RN',  photoGrad: B, photo: F5, slug: 'rekha-nair',        name: 'Prof. Rekha Nair',       title: 'Faculty, Health Policy & Economics',     credential: 'MPH, TISS · 14 yrs exp'                },
    { initials: 'AS',  photoGrad: G, photo: M6, slug: 'arvind-singh',      name: 'Dr. Arvind Singh',       title: 'Industry Faculty, Hospital Ops',         credential: 'Ex-COO, Fortis Healthcare · 19 yrs'    },
    { initials: 'MK',  photoGrad: V, photo: F6, slug: 'meera-krishnan',    name: 'Dr. Meera Krishnan',     title: 'Associate Professor, Pharma Mgmt',       credential: 'MBA Pharma, NMIMS · 17 yrs exp'        },
    { initials: 'SD',  photoGrad: A, photo: M7, slug: 'saurabh-desai',     name: 'Prof. Saurabh Desai',    title: 'Industry Faculty, Health Insurance',     credential: 'Ex-VP, Star Health Insurance · 15 yrs' },
    { initials: 'LS',  photoGrad: R, photo: F7, slug: 'lakshmi-sundaram',  name: 'Dr. Lakshmi Sundaram',   title: 'Professor, Medical Finance',             credential: 'MD + MBA, CMC Vellore · 22 yrs'        },
    { initials: 'FS',  photoGrad: B, photo: M8, slug: 'farhan-sheikh',     name: 'Prof. Farhan Sheikh',    title: 'Associate Professor, Health Analytics',  credential: 'MS Health Informatics, ISB · 12 yrs'   },
    { initials: 'PI',  photoGrad: G, photo: F8, slug: 'pooja-iyer',        name: 'Dr. Pooja Iyer',         title: 'Industry Faculty, Clinical Ops',         credential: 'Ex-Director Ops, Apollo · 18 yrs'      },
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
    { initials: 'SN',  photoGrad: V, photo: F1, slug: 'supriya-nair',      name: 'Dr. Supriya Nair',       title: 'Associate Professor, Finance & Banking', credential: 'PhD, IIM Kozhikode · 13 yrs'          },
    { initials: 'AR',  photoGrad: G, photo: M4, slug: 'anil-rao',          name: 'Prof. Anil Rao',         title: 'Faculty, Business Law',                  credential: 'LLB + MBA, Symbiosis · 16 yrs exp'    },
    { initials: 'NT',  photoGrad: S, photo: F2, slug: 'neelima-tripathi',  name: 'Dr. Neelima Tripathi',   title: 'Associate Professor, Consumer Behaviour', credential: 'PhD, FMS Delhi · 12 yrs exp'         },
    { initials: 'HV',  photoGrad: B, photo: M5, slug: 'harsh-vardhan',     name: 'Prof. Harsh Vardhan',    title: 'Industry Faculty, Digital Marketing',    credential: 'Ex-Marketing Head, Myntra · 11 yrs'    },
    { initials: 'SJo', photoGrad: R, photo: F3, slug: 'sunita-joshi',      name: 'Dr. Sunita Joshi',       title: 'Associate Professor, Business Ethics',   credential: 'PhD, TISS Mumbai · 15 yrs exp'         },
  ],
  bcom: [
    { initials: 'MR',  photoGrad: R, photo: F4, slug: 'meena-rawat',       name: 'Prof. Meena Rawat',      title: 'Assistant Professor, Accounting',        credential: 'M.Com, Delhi Univ · CA Inter · 9 yrs' },
    { initials: 'HJ',  photoGrad: B, photo: M6, slug: 'harish-jain',       name: 'Dr. Harish Jain',        title: 'Associate Professor, Taxation',          credential: 'PhD, Rajasthan Univ · CMA Certified'  },
    { initials: 'RP',  photoGrad: V, photo: F5, slug: 'ritu-pandey',       name: 'Prof. Ritu Pandey',      title: 'Assistant Professor, Finance',           credential: 'MBA Finance, ICFAI · 8 yrs exp'       },
    { initials: 'AG',  photoGrad: A, photo: M7, slug: 'arun-gupta',        name: 'Dr. Arun Gupta',         title: 'Associate Professor, Cost Accounting',   credential: 'PhD, Rajasthan Univ · ICAI Fellow'    },
    { initials: 'SM',  photoGrad: G, photo: F6, slug: 'shalini-mehta',     name: 'Prof. Shalini Mehta',    title: 'Assistant Professor, Banking & Insurance', credential: 'MBA Finance, ICFAI · 12 yrs exp'    },
    { initials: 'RY',  photoGrad: S, photo: M8, slug: 'ramesh-yadav',      name: 'Dr. Ramesh Yadav',       title: 'Associate Professor, Business Econ',     credential: 'PhD, DSE Delhi · 14 yrs exp'          },
    { initials: 'DS',  photoGrad: B, photo: F7, slug: 'deepika-singh',     name: 'Prof. Deepika Singh',    title: 'Faculty, Commercial Law',                credential: 'LLB + M.Com, Rajasthan Univ · 10 yrs'},
    { initials: 'PKu', photoGrad: R, photo: M1, slug: 'prashant-kumar',    name: 'Dr. Prashant Kumar',     title: 'Associate Professor, Corporate Finance', credential: 'PhD, IIM Lucknow · 16 yrs exp'       },
  ],
  mcom: [
    { initials: 'AY',  photoGrad: R, photo: M2, slug: 'anand-yadav',       name: 'Dr. Anand Yadav',        title: 'Associate Professor, Advanced Acctg',   credential: 'PhD, Lucknow Univ · FCA'              },
    { initials: 'SB',  photoGrad: B, photo: F8, slug: 'sonal-bhatia',      name: 'Prof. Sonal Bhatia',     title: 'Assistant Professor, Financial Mktg',   credential: 'MBA, IIM Indore · CFA Level II'       },
    { initials: 'NK',  photoGrad: A, photo: M3, slug: 'nilesh-kale',       name: 'Dr. Nilesh Kale',        title: 'Associate Professor, Corporate Law',     credential: 'LLB + PhD, Pune Univ · 16 yrs exp'   },
    { initials: 'RS',  photoGrad: V, photo: F1, slug: 'reema-saxena',      name: 'Dr. Reema Saxena',       title: 'Associate Professor, Advanced Tax',      credential: 'PhD, Allahabad Univ · FCA · 18 yrs'  },
    { initials: 'JS',  photoGrad: G, photo: M4, slug: 'jayesh-shah',       name: 'Prof. Jayesh Shah',      title: 'Industry Faculty, Capital Markets',      credential: 'MBA Finance, IIM Calcutta · 15 yrs'  },
    { initials: 'VM',  photoGrad: S, photo: F2, slug: 'vandana-mishra',    name: 'Dr. Vandana Mishra',     title: 'Associate Professor, Intl Finance',      credential: 'PhD, JNU Delhi · 13 yrs exp'          },
    { initials: 'CP',  photoGrad: B, photo: M5, slug: 'chirag-patel',      name: 'Prof. Chirag Patel',     title: 'Faculty, Management Accounting',         credential: 'CMA + M.Com, VGU · 14 yrs exp'       },
    { initials: 'GB',  photoGrad: R, photo: F3, slug: 'geeta-bhatt',       name: 'Dr. Geeta Bhatt',        title: 'Assistant Professor, Financial Reporting', credential: 'PhD, Gujarat Univ · IFRS certified'},
  ],
  ba: [
    { initials: 'IM',  photoGrad: R, photo: F4, slug: 'indira-mishra',     name: 'Dr. Indira Mishra',      title: 'Professor, Political Science',           credential: 'PhD, JNU Delhi · 19 yrs exp'          },
    { initials: 'RT',  photoGrad: B, photo: M6, slug: 'rohit-tripathi',    name: 'Prof. Rohit Tripathi',   title: 'Associate Professor, English Lit',       credential: 'MA, Oxford · 13 yrs exp'              },
    { initials: 'DC',  photoGrad: V, photo: F5, slug: 'devika-chakraborty',name: 'Dr. Devika Chakraborty', title: 'Assistant Professor, Economics',         credential: 'PhD, Presidency Univ · 11 yrs exp'    },
    { initials: 'SR',  photoGrad: A, photo: F6, slug: 'suniti-rao',        name: 'Dr. Suniti Rao',         title: 'Associate Professor, Sociology',         credential: 'PhD, Hyderabad Central Univ · 15 yrs' },
    { initials: 'VS',  photoGrad: G, photo: M7, slug: 'vikrant-singh',     name: 'Prof. Vikrant Singh',    title: 'Faculty, History & Public Admin',        credential: 'MA, Delhi Univ · NET/JRF · 11 yrs'   },
    { initials: 'PSh', photoGrad: S, photo: F7, slug: 'pallavi-sharma',    name: 'Dr. Pallavi Sharma',     title: 'Assistant Professor, Philosophy',        credential: 'PhD, BHU Varanasi · 14 yrs exp'       },
    { initials: 'MJ',  photoGrad: B, photo: F8, slug: 'meena-joshi',       name: 'Prof. Meena Joshi',      title: 'Faculty, Media & Communication',         credential: 'MA, AJK-MCRC Jamia · 12 yrs exp'     },
    { initials: 'RGu', photoGrad: R, photo: M8, slug: 'rajiv-gupta',       name: 'Dr. Rajiv Gupta',        title: 'Associate Professor, Dev Economics',     credential: 'PhD, IGIDR Mumbai · 16 yrs exp'       },
  ],
  ma: [
    { initials: 'GS',  photoGrad: R, photo: F1, slug: 'geeta-srinivasan',  name: 'Prof. Geeta Srinivasan', title: 'Professor, English Literature',          credential: 'PhD, Hyderabad Central · 21 yrs'      },
    { initials: 'BN',  photoGrad: B, photo: M1, slug: 'bhupesh-naik',      name: 'Dr. Bhupesh Naik',       title: 'Associate Professor, Sociology',         credential: 'PhD, TISS Mumbai · 15 yrs exp'        },
    { initials: 'LV',  photoGrad: V, photo: F2, slug: 'lakshmi-varma',     name: 'Prof. Lakshmi Varma',    title: 'Assistant Professor, Economics',         credential: 'MA Economics, DSE Delhi · NET/JRF'    },
    { initials: 'AT',  photoGrad: A, photo: M2, slug: 'abhinav-tiwari',    name: 'Dr. Abhinav Tiwari',     title: 'Associate Professor, Political Theory',  credential: 'PhD, JNU Delhi · NET · 14 yrs exp'    },
    { initials: 'SI',  photoGrad: G, photo: F3, slug: 'sandhya-iyer',      name: 'Prof. Sandhya Iyer',     title: 'Assistant Professor, Comp Literature',   credential: 'PhD, EFLU Hyderabad · 12 yrs exp'     },
    { initials: 'ARo', photoGrad: S, photo: M3, slug: 'anupam-roy',        name: 'Dr. Anupam Roy',         title: 'Assistant Professor, Economic Policy',   credential: 'PhD, IGIDR Mumbai · 11 yrs exp'       },
    { initials: 'MKr', photoGrad: B, photo: F4, slug: 'madhu-krishnan',    name: 'Prof. Madhu Krishnan',   title: 'Faculty, Gender Studies & Sociology',    credential: 'PhD, TISS Mumbai · 16 yrs exp'        },
    { initials: 'SBo', photoGrad: R, photo: M4, slug: 'suresh-bose',       name: 'Dr. Suresh Bose',        title: 'Associate Professor, Applied Linguistics', credential: 'PhD, BHU · TESOL certified'        },
  ],
  bsc: [
    { initials: 'TS',  photoGrad: R, photo: M5, slug: 'tarun-saxena',      name: 'Dr. Tarun Saxena',       title: 'Associate Professor, Mathematics',       credential: 'PhD, IIT Bombay · 14 yrs exp'         },
    { initials: 'PC',  photoGrad: B, photo: F5, slug: 'pooja-chauhan',     name: 'Prof. Pooja Chauhan',    title: 'Assistant Professor, CS & Statistics',   credential: 'M.Sc CS, BITS Pilani · Google ML cert'},
    { initials: 'KN',  photoGrad: G, photo: M6, slug: 'kartik-nambiar',    name: 'Dr. Kartik Nambiar',     title: 'Associate Professor, Env. Science',      credential: 'PhD, IISc Bangalore · 12 yrs exp'     },
    { initials: 'SPa', photoGrad: V, photo: F6, slug: 'sameera-patel',     name: 'Dr. Sameera Patel',      title: 'Assistant Professor, Applied Maths',     credential: 'PhD, Pune Univ · 13 yrs exp'          },
    { initials: 'RDe', photoGrad: A, photo: M7, slug: 'rahul-desai',       name: 'Prof. Rahul Desai',      title: 'Industry Faculty, Data Science',         credential: 'Ex-Data Engineer, Zomato · 10 yrs'    },
    { initials: 'AKr', photoGrad: S, photo: F7, slug: 'anita-krishnamurthy',name: 'Dr. Anita Krishnamurthy',title: 'Associate Professor, Comp Biology',     credential: 'PhD, IISc Bangalore · 15 yrs exp'     },
    { initials: 'SSh', photoGrad: B, photo: M8, slug: 'sunil-sharma',      name: 'Prof. Sunil Sharma',     title: 'Assistant Professor, Probability & Stats', credential: 'PhD, ISI Kolkata · 14 yrs exp'    },
    { initials: 'NSi', photoGrad: R, photo: F8, slug: 'neetu-singh',       name: 'Dr. Neetu Singh',        title: 'Assistant Professor, Env. Policy',       credential: 'PhD, TERI Univ Delhi · 11 yrs exp'   },
  ],
  mlib: [
    { initials: 'SKS',  photoGrad: R, photo: M1, slug: 'sk-sharma',        name: 'Dr. S.K. Sharma',        title: 'Professor, Library Systems',             credential: 'PhD, Delhi School of LIS · 21 yrs'    },
    { initials: 'AD',   photoGrad: B, photo: F1, slug: 'anita-desai',      name: 'Prof. Anita Desai',      title: 'Associate Professor, Digital Archives',  credential: 'MLib · NLAI Fellow · 15 yrs exp'      },
    { initials: 'RPi',  photoGrad: V, photo: M2, slug: 'ramesh-pillai',    name: 'Dr. Ramesh Pillai',      title: 'Professor, Information Retrieval',       credential: 'PhD, DRTC Bangalore · 18 yrs exp'     },
    { initials: 'SRa',  photoGrad: A, photo: F2, slug: 'suhasini-rao',     name: 'Prof. Suhasini Rao',     title: 'Associate Professor, Knowledge Mgmt',    credential: 'MLibI.Sc, IGNOU · 14 yrs exp'         },
    { initials: 'KMa',  photoGrad: G, photo: F3, slug: 'kiran-malhotra',   name: 'Dr. Kiran Malhotra',     title: 'Associate Professor, Archival Science',  credential: 'PhD, AMU Aligarh · 16 yrs exp'        },
    { initials: 'VI',   photoGrad: S, photo: M3, slug: 'venkat-iyer',      name: 'Prof. Venkat Iyer',      title: 'Faculty, Library Networking',            credential: 'MSc LIS, BHU · INFLIBNET certified'   },
    { initials: 'PrSi', photoGrad: B, photo: F4, slug: 'priti-singh',      name: 'Dr. Priti Singh',        title: 'Assistant Professor, Research Methods',  credential: 'PhD, DU School of LIS · 13 yrs exp'   },
    { initials: 'SC',   photoGrad: R, photo: M4, slug: 'suresh-chandra',   name: 'Prof. Suresh Chandra',   title: 'Visiting Faculty, Library Management',   credential: 'Ex-Director, National Library · 25 yrs'},
  ],
  blib: [
    { initials: 'MKG',  photoGrad: R, photo: M5, slug: 'mk-gupta',         name: 'Prof. M.K. Gupta',       title: 'Assistant Professor, Library Basics',    credential: 'MLib, IGNOU · 12 yrs exp'             },
    { initials: 'SRao', photoGrad: B, photo: F5, slug: 'seema-rao',        name: 'Dr. Seema Rao',          title: 'Assistant Professor, Cataloguing',       credential: 'PhD, Rajasthan Univ · 10 yrs exp'     },
    { initials: 'NSi',  photoGrad: V, photo: M6, slug: 'narender-singh',   name: 'Prof. Narender Singh',   title: 'Faculty, Digital Libraries',             credential: 'MSc LIS, BHU · 9 yrs exp'            },
    { initials: 'PrVe', photoGrad: A, photo: F6, slug: 'priya-verma-lib',  name: 'Dr. Priya Verma',        title: 'Assistant Professor, Library Admin',     credential: 'MLib, Baroda Univ · 11 yrs exp'       },
    { initials: 'AnSh', photoGrad: G, photo: F7, slug: 'anjali-sharma',    name: 'Prof. Anjali Sharma',    title: 'Faculty, Information Science',           credential: 'M.Lib, Lucknow Univ · NET/JRF'       },
    { initials: 'KNa',  photoGrad: S, photo: M7, slug: 'kamal-nair',       name: 'Dr. Kamal Nair',         title: 'Associate Professor, Archival Methods',  credential: 'PhD, Kerala Univ · 13 yrs exp'        },
    { initials: 'ShMa', photoGrad: B, photo: F8, slug: 'shikha-malhotra',  name: 'Prof. Shikha Malhotra',  title: 'Faculty, School Library Mgmt',           credential: 'MLib, Lucknow Univ · 7 yrs exp'       },
    { initials: 'SaDu', photoGrad: R, photo: M8, slug: 'santosh-dubey',    name: 'Dr. Santosh Dubey',      title: 'Assistant Professor, Reference Services', credential: 'PhD, Nagpur Univ · 10 yrs exp'       },
  ],
}

export default function FacultySection({ slug }: { slug: string }) {
  const faculty = FACULTY_DATA[slug]
  if (!faculty || faculty.length === 0) return null

  return (
    <section className="bg-neutral-900 py-16 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">

        {/* Header row */}
        <div className="flex items-end justify-between gap-5 mb-10 md:mb-8">
          <div>
            <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-3">
              Meet the Faculty
            </p>
            <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-white lg:text-[32px]">
              Learn from Practitioners
            </h2>
            <p className="mt-2 text-[15px] font-body text-white/50 max-w-[440px]">
              Industry veterans and research academics who bring real context to every session.
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
