import { RevealItem, RevealList } from '@/components/reveal'
import { WipeHeading } from '@/components/wipe-heading'
import { PROJECT_LIST, type ProjectItem } from '@/lib/content'

function Row({ p, i }: { p: ProjectItem; i: number }) {
  const name = p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className="underline-offset-8 group-hover:underline">
      {p.name} ↗
    </a>
  ) : (
    p.name
  )

  return (
    <RevealItem className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-3 border-b-2 border-black py-8 transition-colors hover:bg-black hover:text-paper md:grid-cols-[3.5rem_16rem_1fr_auto] md:items-baseline md:gap-x-8 md:px-4">
      <span className="text-sm opacity-50">{String(i + 1).padStart(2, '0')}</span>
      <h3 className="text-[clamp(1.6rem,4vw,2.25rem)] leading-tight font-bold tracking-tight">{name}</h3>
      <p className="col-start-2 text-[1.05rem] leading-relaxed opacity-75 md:col-start-auto md:text-[1.2rem]">{p.what}</p>
      <div className="col-start-2 flex flex-wrap items-center gap-2 md:col-start-auto md:justify-end">
        {p.tags.map((t) => (
          <span key={t} className="border border-current px-2 py-0.5 text-xs">
            {t}
          </span>
        ))}
        {p.year && <span className="ml-1 text-sm opacity-50">{p.year}</span>}
      </div>
    </RevealItem>
  )
}

export function Projects() {
  const ai = PROJECT_LIST.filter((p) => p.ai)
  const rest = PROJECT_LIST.filter((p) => !p.ai)

  return (
    <section id="projects" className="relative px-6 py-32 md:px-16 lg:px-32">
      <WipeHeading className="mb-6 text-[clamp(2.5rem,12vw,5rem)] leading-none font-bold tracking-tighter">PROJECTS</WipeHeading>
      <p className="mb-20 max-w-xl text-sm opacity-60">things i built outside the day job. most of them work.</p>

      <h4 className="mb-2 text-xs tracking-widest opacity-60">WITH AI</h4>
      <RevealList className="mb-20 border-t-2 border-black">
        {ai.map((p, i) => (
          <Row key={p.name} p={p} i={i} />
        ))}
      </RevealList>

      <h4 className="mb-2 text-xs tracking-widest opacity-60">EVERYTHING ELSE</h4>
      <RevealList className="border-t-2 border-black">
        {rest.map((p, i) => (
          <Row key={p.name} p={p} i={ai.length + i} />
        ))}
      </RevealList>
    </section>
  )
}
