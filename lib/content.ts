export const SITE_URL = 'https://sahilshah.in'

export const SECTIONS = [
  { id: 'top', label: 'The Intro' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'The Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'life', label: 'Off the clock' },
  { id: 'photos', label: 'The Film Roll' },
  { id: 'side-quests', label: 'Side Quests' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export const EXPERIENCE = [
  {
    year: '2026',
    title: 'AMAZON — SDE 1',
    desc: 'full-time software development engineer. building systems at scale.',
  },
  {
    year: '2025',
    title: 'AFTERQUERY (YC-BACKED)',
    desc: 'worked as an sde on ai-led features and product polish. built fast. shipped faster.',
  },
  {
    year: '2024',
    title: 'FOUNDED TWENTYNINEHAIR',
    desc: 'premium hair mist brand. aesthetics included.',
  },
  {
    year: '2024',
    title: 'FRONT-END, AAROHI EMBEDDED',
    desc: "react. next.js. ui that doesn't hurt to look at.",
  },
  {
    year: '2024',
    title: 'DATABASE ENGINEERING, SYSTAMET INDIA',
    desc: 'sql sorcery. schema design. indexing my sanity.',
  },
]

export const PHOTOS = [
  { id: '1536', caption: 'last light.', alt: 'Sunset over dark water, clouds lit orange at the horizon', portrait: true },
  { id: '7830', caption: 'beached. catalyst 2.', alt: 'A catamaran pulled up on a beach at dusk', portrait: false },
  { id: '1539', caption: 'shade, finally.', alt: 'A shaded terrace looking out over a pool and garden', portrait: true },
  { id: '1544', caption: 'god tier lighting.', alt: 'Floor-to-ceiling stained glass windows glowing in a dark cathedral', portrait: true },
  { id: '1537', caption: 'two rhinos. zero zoom.', alt: 'Two rhinos grazing on a green plain beneath low hills', portrait: true },
  { id: '1543', caption: 'everyone watching the same sunset.', alt: 'People lining a cliffside promenade in golden evening light', portrait: true },
  { id: '1541', caption: 'not my yacht.', alt: 'A white yacht on the sea with a mountain silhouette at dusk', portrait: true },
  { id: '1542', caption: 'warm. loud. good.', alt: 'A crowded, wood-panelled pub lit by warm lamps', portrait: false },
  { id: '6142', caption: 'the mountain had a blanket.', alt: 'Cloud spilling over a mountain above a city', portrait: true },
]

export const SIDE_QUESTS: { title: string; desc: string; href?: string }[] = [
  {
    title: 'BUILD WHAT MOVES INDIA — TOP 250',
    desc: "openai × varun mayya. ai prototypes that make india's digital services simpler.\n13,000+ registrations. 250 shortlisted. one of them was mine.",
  },
  {
    title: 'SAP HACKFEST 2025 — 1ST PLACE',
    desc: '5000+ teams. 26000+ students.\nvyapaar.ai — we built it. we shipped it. we won it.',
  },
  { title: 'THE DECKS', desc: 'i mix music. latest set: after cape town, vol. ii.', href: 'https://youtu.be/UDR8EI9j8PM' },
  { title: 'THE COFFEE LAB', desc: "iced coffee experiments. some work. some don't." },
  { title: 'PICKLEBALL', desc: 'any day. ask me for a game.' },
  { title: 'PAINTING', desc: 'mostly when i should be sleeping.' },
  { title: 'PHONE PHOTOGRAPHY — ISSUE 01', desc: 'grain. light. harsh shadows. taste > pricey gear.' },
]

export const CONTACTS = [
  { label: 'EMAIL', value: 'sahilshah.3142@gmail.com', href: 'mailto:sahilshah.3142@gmail.com' },
  { label: 'GITHUB', value: 'github.com/sahil1229', href: 'https://github.com/sahil1229' },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/sahilshah1229',
    href: 'https://www.linkedin.com/in/sahilshah1229/',
  },
  {
    label: 'INSTAGRAM',
    value: 'instagram.com/sahil1229.__',
    href: 'https://www.instagram.com/sahil1229.__/',
  },
  {
    label: 'LEETCODE',
    value: 'leetcode.com/u/sahilshah1229',
    href: 'https://leetcode.com/u/sahilshah1229/',
  },
]

export const SET_URL = 'https://youtu.be/UDR8EI9j8PM'

export const ASSISTANT = { name: 'donna', email: 'donnapaulson@sahilshah.in' }

export type ProjectItem = { name: string; what: string; year?: string; href?: string; ai?: boolean; tags: string[] }

/** AI work first, then everything else. */
export const PROJECT_LIST: ProjectItem[] = [
  { name: 'Vyapaar.ai', what: 'sap hackfest 2025 winner. my most polished startup-level build.', year: '2025', ai: true, tags: ['AI', 'OCR', 'Full-stack'] },
  {
    name: 'CrimeSaathi',
    what: "india's cyber crime portal, reimagined. it asks what happened and prepares the report while you're on the 1930 call.",
    year: '2026',
    href: 'https://cyber-saathi-zeta.vercel.app',
    ai: true,
    tags: ['Next.js', 'OpenAI'],
  },
  { name: 'Neomi', what: "finance dashboard for a kids' stem school. students, payments, seven reports, ai built in.", year: '2026', ai: true, tags: ['Next.js', 'Claude'] },
  { name: 'Resume Critique', what: 'an ai resume enhancer. not responsible for any job rejections.', ai: true, tags: ['LLMs'] },
  { name: 'Oaken', what: 'a mindful productivity tool with ai superpowers. ui so calm it reduces cortisol.', ai: true, tags: ['AI', 'UI'] },
  { name: 'Threshold', what: 'offline phone app for flat move-in and move-out records. ai optional, nothing leaves the phone.', year: '2026', ai: true, tags: ['TypeScript', 'PWA'] },
  { name: 'Dad Paid', what: 'a stupidly simple family travel expense tracker. because on every trip, dad paid.', year: '2026', href: 'https://dadpaid.vercel.app', tags: ['React', 'Supabase'] },
  { name: 'Python tools', what: 'a web scraper, a news email digest, a to-do app. where it started.', year: '2024', tags: ['Python'] },
]
