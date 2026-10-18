export const SITE_URL = 'https://sahilshah.in'

export const SECTIONS = [
  { id: 'top', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'dsa', label: 'DSA' },
  { id: 'photos', label: 'Photography' },
  { id: 'side-quests', label: 'Side quests' },
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

export type Project = {
  name: string
  lines: [string, string]
  status: string
  footnote: string
  /** Live demo or repo. Rendered as a link when present. */
  href?: string
}

export const PROJECTS: Project[] = [
  {
    name: 'VYAPAAR.AI',
    lines: ['sap hackfest 2025 winner.', 'my most polished startup-level build.'],
    status: 'shipped. somehow.',
    footnote: "built in a timeline that should've been illegal.",
  },
  {
    name: 'OAKEN',
    lines: ["the cleanest ui i've ever made.", 'a mindful productivity tool with ai superpowers.'],
    status: 'live-ish.',
    footnote: 'ui so calm it reduces cortisol.',
  },
  {
    name: 'RESUME CRITIQUE',
    lines: ['an ai resume enhancer i built at an age where', 'people still fight hover effects.'],
    status: 'functional. surprisingly.',
    footnote: 'not responsible for any job rejections.',
  },
]

export const SKILLS = [
  { skill: 'UI/UX', desc: "i design like i'm allergic to ugly." },
  { skill: 'FULL-STACK', desc: 'react, next.js, typescript, firebase, shadcn.' },
  { skill: 'AI', desc: 'llms, ocr, generative ai, openai, gemini.' },
  { skill: 'DATABASES', desc: 'mysql, postgres, mongodb, firestore.' },
  { skill: 'TOOLS', desc: 'git, docker, figma, cloud, caffeine.' },
  { skill: 'DSA', desc: '300+ leetcode questions. 30% remembered.' },
]

export const PHOTOS = [
  { id: '1536', alt: 'Sunset over dark water, clouds lit orange at the horizon', portrait: true },
  { id: '7830', alt: 'A catamaran pulled up on a beach at dusk', portrait: false },
  { id: '1539', alt: 'A shaded terrace looking out over a pool and garden', portrait: true },
  { id: '1544', alt: 'Floor-to-ceiling stained glass windows glowing in a dark cathedral', portrait: true },
  { id: '1537', alt: 'Two rhinos grazing on a green plain beneath low hills', portrait: true },
  { id: '1543', alt: 'People lining a cliffside promenade in golden evening light', portrait: true },
  { id: '1541', alt: 'A white yacht on the sea with a mountain silhouette at dusk', portrait: true },
  { id: '1542', alt: 'A crowded, wood-panelled pub lit by warm lamps', portrait: false },
  { id: '6142', alt: 'Cloud spilling over a mountain above a city', portrait: true },
]

export const SIDE_QUESTS = [
  {
    title: 'SAP HACKFEST 2025 — 1ST PLACE',
    desc: '5000+ teams. 26000+ students.\nvyapaar.ai — we built it. we shipped it. we won it.',
  },
  {
    title: 'SPEEDRUN: 48-HOUR MVP',
    desc: 'shipped a product in 2 days that looked like a 2-month build.',
  },
  { title: 'OPEN-SOURCE', desc: "i drop utilities online when i'm bored and brave." },
  { title: 'FAILED EXPERIMENTS', desc: 'experiment-omega — deleted 2000 lines. became stronger.' },
  {
    title: 'PHONE PHOTOGRAPHY — ISSUE 01',
    desc: 'grain. light. harsh shadows. taste > pricey gear.',
  },
  {
    title: 'MICRO PRODUCTS',
    desc: 'cli-tool. chrome extension. resume enhancer.\nsmall builds. big dopamine hits.',
  },
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
