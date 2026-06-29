// Per-specialisation detail: summary line, skills, and sample roles.
// Keyed by canonical specialisation name so multiple programs can share entries.
// Falls back to a name-only render when an entry is missing.

export interface SpecDetail {
  summary: string     // single line, ~80-130 chars
  skills:  string[]   // 4 key skills/tools
  roles:   string[]   // 3 sample roles
}

export const SPEC_DETAILS: Record<string, SpecDetail> = {

  // ── MBA tracks ─────────────────────────────────────
  'Operations Management': {
    summary: 'Supply chain, process optimisation and quality management for production-heavy businesses.',
    skills:  ['Supply chain', 'Lean & Six Sigma', 'Vendor management', 'Process design'],
    roles:   ['Operations Manager', 'Supply Chain Lead', 'COO'],
  },
  'Business Analytics': {
    summary: 'Data-driven decision-making using statistical analysis, visualisation and forecasting tools.',
    skills:  ['SQL / Python', 'Data visualisation', 'Statistical modelling', 'Business reporting'],
    roles:   ['Business Analyst', 'Analytics Manager', 'Strategy Consultant'],
  },
  'Healthcare Management': {
    summary: 'Hospital administration, healthcare operations and policy for medical and life-sciences orgs.',
    skills:  ['Hospital ops', 'Healthcare policy', 'Quality systems', 'Insurance'],
    roles:   ['Hospital Administrator', 'Healthcare Consultant', 'Insurance Manager'],
  },
  'Pharma Management': {
    summary: 'Pharmaceutical business operations, regulatory affairs and healthcare supply chains.',
    skills:  ['Pharma supply chain', 'Regulatory affairs', 'Medical sales', 'Compliance'],
    roles:   ['Medical Sales Rep', 'Pharma Operations Lead', 'Regulatory Analyst'],
  },
  'Hospital Administration': {
    summary: 'Hospital administration, healthcare operations and policy for medical and life-sciences orgs.',
    skills:  ['Hospital ops', 'Healthcare policy', 'Quality systems', 'Insurance'],
    roles:   ['Hospital Administrator', 'Healthcare Consultant', 'Insurance Manager'],
  },
  'Marketing': {
    summary: 'Brand strategy, consumer behaviour and digital marketing for product and service businesses.',
    skills:  ['Brand strategy', 'Consumer research', 'Digital marketing', 'Go-to-market'],
    roles:   ['Brand Manager', 'Product Marketing Manager', 'Marketing Director'],
  },
  'Human Resources': {
    summary: 'Talent acquisition, performance management and organisational design for modern workforces.',
    skills:  ['Talent acquisition', 'Performance mgmt', 'Learning & development', 'OD design'],
    roles:   ['HR Business Partner', 'Talent Acquisition Lead', 'CHRO'],
  },
  'Human Resource Management': {
    summary: 'Talent acquisition, performance management and organisational design for modern workforces.',
    skills:  ['Talent acquisition', 'Performance mgmt', 'Learning & development', 'OD design'],
    roles:   ['HR Business Partner', 'Talent Acquisition Lead', 'CHRO'],
  },
  'Finance': {
    summary: 'Financial analysis, valuation and corporate finance for strategic decision-making.',
    skills:  ['Financial modelling', 'Valuation', 'Risk analysis', 'Capital allocation'],
    roles:   ['Finance Manager', 'Investment Analyst', 'CFO'],
  },
  'Operations': {
    summary: 'Supply chain, process optimisation and quality management for production-heavy businesses.',
    skills:  ['Supply chain', 'Lean & Six Sigma', 'Vendor management', 'Process design'],
    roles:   ['Operations Manager', 'Supply Chain Lead', 'COO'],
  },
  'Healthcare': {
    summary: 'Hospital administration, healthcare operations and policy for medical and life-sciences orgs.',
    skills:  ['Hospital ops', 'Healthcare policy', 'Quality systems', 'Insurance'],
    roles:   ['Hospital Administrator', 'Healthcare Consultant', 'Insurance Manager'],
  },
  'Agri-Business': {
    summary: 'Agribusiness operations, commodities and rural marketing for the Indian agri sector.',
    skills:  ['Agri supply chain', 'Rural marketing', 'Commodities', 'Farm finance'],
    roles:   ['Agri Sales Manager', 'Procurement Lead', 'Agri Consultant'],
  },
  'IT Management': {
    summary: 'Technology strategy, digital transformation and IT operations for enterprise contexts.',
    skills:  ['Tech strategy', 'IT operations', 'Digital transformation', 'Vendor mgmt'],
    roles:   ['IT Manager', 'Solutions Architect', 'CIO'],
  },
  'International Business': {
    summary: 'Cross-border trade, global strategy and international finance for export-led businesses.',
    skills:  ['Global trade', 'Forex hedging', 'Cross-border M&A', 'Trade compliance'],
    roles:   ['Export Manager', 'Country Manager', 'Global Trade Lead'],
  },

  // ── MBA-IF tracks ──────────────────────────────────
  'ACCA Track': {
    summary: 'Embedded Association of Chartered Certified Accountants foundation papers within your MBA.',
    skills:  ['IFRS', 'Audit & assurance', 'Tax planning', 'Financial reporting'],
    roles:   ['Audit Associate', 'Finance Controller', 'Chartered Accountant'],
  },
  'CMA Track': {
    summary: 'Cost Management Accountant foundation modules covering cost accounting and management decisions.',
    skills:  ['Cost accounting', 'Strategic mgmt', 'Performance mgmt', 'Decision analysis'],
    roles:   ['Cost Accountant', 'Financial Planner', 'Management Accountant'],
  },
  'FM Track': {
    summary: 'Foundation-level Financial Management covering treasury, capital markets and investments.',
    skills:  ['Treasury ops', 'Capital markets', 'Investment analysis', 'Portfolio mgmt'],
    roles:   ['Treasury Analyst', 'Investment Manager', 'FP&A Lead'],
  },

  // ── MCA tracks ─────────────────────────────────────
  'AI & Data Science': {
    summary: 'Machine learning, deep learning and big data analytics for production AI systems.',
    skills:  ['Python', 'TensorFlow', 'Deep learning', 'MLOps'],
    roles:   ['ML Engineer', 'Data Scientist', 'AI Solutions Architect'],
  },
  'Cloud Tech & Cybersecurity': {
    summary: 'Cloud-native architecture and security for enterprise and SaaS environments.',
    skills:  ['AWS / Azure', 'Cloud security', 'Penetration testing', 'IAM'],
    roles:   ['Cloud Architect', 'Security Engineer', 'DevSecOps Lead'],
  },
  'Cloud Computing & Full Stack': {
    summary: 'End-to-end web application development on cloud-native platforms.',
    skills:  ['React / Node', 'AWS / GCP', 'Docker / K8s', 'CI/CD'],
    roles:   ['Full-stack Developer', 'Cloud Engineer', 'DevOps Engineer'],
  },

  // ── BBA tracks ─────────────────────────────────────
  'General Management': {
    summary: 'Broad management foundation across strategy, finance, marketing and operations.',
    skills:  ['Business strategy', 'Financial literacy', 'Marketing basics', 'Operations'],
    roles:   ['Management Trainee', 'Business Analyst', 'Operations Coordinator'],
  },
  'Digital Marketing': {
    summary: 'SEO, paid media, social and analytics for performance-driven digital brands.',
    skills:  ['SEO / SEM', 'Paid social', 'Analytics', 'Content strategy'],
    roles:   ['Digital Marketing Exec', 'SEO Specialist', 'Performance Marketer'],
  },
  'Retail Management': {
    summary: 'Store operations, merchandising and category management for retail businesses.',
    skills:  ['Store ops', 'Merchandising', 'Inventory mgmt', 'Customer experience'],
    roles:   ['Store Manager', 'Category Manager', 'Retail Ops Lead'],
  },
  'FinTech': {
    summary: 'Modern financial technology covering payments, lending and digital banking.',
    skills:  ['Payments', 'Digital lending', 'Compliance', 'Product mgmt'],
    roles:   ['FinTech Associate', 'Product Analyst', 'Compliance Officer'],
  },

  // ── BCA tracks ─────────────────────────────────────
  'General': {
    summary: 'Strong programming foundation with electives across the BCA curriculum.',
    skills:  ['C / C++ / Java', 'Data structures', 'DBMS', 'Web fundamentals'],
    roles:   ['Software Developer', 'Database Admin', 'IT Analyst'],
  },
  'UX Design': {
    summary: 'User research, interaction design and prototyping for digital products.',
    skills:  ['User research', 'Wireframing', 'Figma', 'Usability testing'],
    roles:   ['UX Designer', 'Product Designer', 'UX Researcher'],
  },
  'Data Science': {
    summary: 'Statistics, analytics and machine learning for data-driven decision-making.',
    skills:  ['Python', 'SQL', 'Statistics', 'Machine learning'],
    roles:   ['Data Analyst', 'Junior Data Scientist', 'BI Developer'],
  },
  'Cloud Technology & Information Security': {
    summary: 'Cloud infrastructure and information security for enterprise environments.',
    skills:  ['AWS basics', 'Network security', 'Cryptography', 'IAM'],
    roles:   ['Cloud Engineer', 'Security Analyst', 'SysOps Admin'],
  },
  'Blockchain Technology': {
    summary: 'Distributed ledgers, smart contracts and decentralised application development.',
    skills:  ['Solidity', 'Ethereum', 'Smart contracts', 'Web3'],
    roles:   ['Blockchain Developer', 'Smart Contract Engineer', 'Web3 Analyst'],
  },
  'Artificial Intelligence': {
    summary: 'Practical machine learning, neural networks and AI model development.',
    skills:  ['Python', 'Scikit-learn', 'Neural networks', 'NLP basics'],
    roles:   ['AI Developer', 'ML Engineer', 'Data Scientist'],
  },

  // ── BA streams ─────────────────────────────────────
  'Economics': {
    summary: 'Micro, macro and Indian economy with a strong analytical foundation.',
    skills:  ['Economic analysis', 'Statistics', 'Policy reading', 'Forecasting'],
    roles:   ['Economic Analyst', 'Policy Researcher', 'ESG Analyst'],
  },
  'Political Science': {
    summary: 'Political theory, Indian politics and IR for civil services and policy careers.',
    skills:  ['Political analysis', 'Policy writing', 'Constitutional law', 'IR theory'],
    roles:   ['Civil Services aspirant', 'Policy Analyst', 'Journalist'],
  },
  'Public Policy & Development': {
    summary: 'Public administration, governance and development economics for policy professionals.',
    skills:  ['Public admin', 'Policy analysis', 'Programme evaluation', 'Governance'],
    roles:   ['Policy Analyst', 'Programme Manager', 'NGO Lead'],
  },
  'International Relations': {
    summary: 'Foreign policy, diplomacy and global affairs for international careers.',
    skills:  ['Diplomacy', 'Geopolitics', 'IR theory', 'Foreign policy'],
    roles:   ['IR Analyst', 'Diplomatic Service aspirant', 'Think Tank Researcher'],
  },
  'English Literature': {
    summary: 'British, American and Indian writing in English with literary theory foundations.',
    skills:  ['Literary analysis', 'Critical theory', 'Academic writing', 'Research'],
    roles:   ['Content Strategist', 'Editor', 'Academic'],
  },
  'History': {
    summary: 'Indian and world history with focus on analytical historiography.',
    skills:  ['Historical research', 'Source analysis', 'Academic writing', 'Heritage studies'],
    roles:   ['Historian', 'Archivist', 'Civil Services aspirant'],
  },
  'Computer Applications': {
    summary: 'Office productivity tools and computing fundamentals as a BA elective.',
    skills:  ['MS Office', 'Visual design', 'Basic programming', 'Database basics'],
    roles:   ['Office Administrator', 'Junior Analyst', 'Documentation Lead'],
  },
  'Psychology': {
    summary: 'Cognitive, social and developmental psychology with applied case work.',
    skills:  ['Behavioural analysis', 'Counselling basics', 'Research methods', 'Statistics'],
    roles:   ['Counsellor', 'HR Analyst', 'Researcher'],
  },

  // ── MAJMC tracks ───────────────────────────────────
  'Digital Journalism': {
    summary: 'Online news, multimedia storytelling and digital-first reporting.',
    skills:  ['Digital reporting', 'Multimedia storytelling', 'SEO writing', 'Social journalism'],
    roles:   ['Digital Reporter', 'Multimedia Journalist', 'Content Lead'],
  },
  'Broadcast Media': {
    summary: 'Television and radio production, anchoring and broadcast journalism.',
    skills:  ['Anchoring', 'Voice modulation', 'Production', 'Live reporting'],
    roles:   ['News Anchor', 'TV Producer', 'Radio Jockey'],
  },
  'Public Relations & Corporate Communication': {
    summary: 'PR strategy, corporate communications and stakeholder management for brands.',
    skills:  ['PR strategy', 'Media relations', 'Crisis comms', 'Corporate writing'],
    roles:   ['PR Manager', 'Corp Comms Lead', 'Brand Strategist'],
  },
  'Multimedia Journalism': {
    summary: 'Cross-platform storytelling combining video, audio, text and interactive media.',
    skills:  ['Video editing', 'Photo journalism', 'Audio production', 'Cross-platform storytelling'],
    roles:   ['Multimedia Journalist', 'Video Producer', 'Podcast Creator'],
  },
}
