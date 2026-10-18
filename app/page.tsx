import Link from 'next/link'
import { ContactLink } from '@/components/contact-link'
import { Noise } from '@/components/noise'
import { Parallax } from '@/components/parallax'
import { FadeUp, RevealItem, RevealList } from '@/components/reveal'
import { ScrollProgress } from '@/components/scroll-progress'
import { SectionDots } from '@/components/section-dots'
import { TextGradientScroll } from '@/components/ui/text-gradient-scroll'
import { TextRevealByWord } from '@/components/ui/text-reveal'
import { CONTACTS, EXPERIENCE, PHOTOS, PROJECTS, SIDE_QUESTS, SKILLS } from '@/lib/content'

const sectionHeading = 'text-[clamp(2.5rem,12vw,5rem)] leading-none tracking-tighter font-bold'

export default function Portfolio() {
  return (
    <div className="relative overflow-x-clip bg-white font-mono text-black">
      <ScrollProgress />
      <Noise />

      {/* Easter eggs: decorative, desktop only so they never sit on top of text on a phone. */}
      <div aria-hidden="true" className="pointer-events-none hidden select-none md:block">
        <div className="fixed top-4 right-4 z-50 rotate-12 text-[0.5rem] opacity-20">
          if something looks broken, it&apos;s part of the aesthetic.
        </div>
        <div className="fixed bottom-20 left-4 z-50 -rotate-6 text-[0.5rem] opacity-15">
          minimalism isn&apos;t a design choice. it&apos;s a coping mechanism.
        </div>
        <div className="fixed top-1/2 right-12 z-50 rotate-90 text-[0.5rem] opacity-10">
          yes, everything is just text. cope.
        </div>
      </div>

      <SectionDots />

      <main>
        {/* HERO */}
        <section id="top" className="relative flex min-h-svh flex-col items-center justify-center px-4 md:px-8">
          <Parallax speed={0.5}>
            <h1 className="mb-8 text-center text-[clamp(3rem,19vw,14rem)] leading-none font-bold tracking-tighter">
              HI, I&apos;M
              <br />
              SAHIL.
            </h1>
            <p className="text-center text-[clamp(1.5rem,7vw,3.5rem)] leading-tight tracking-tight">
              I BUILD THINGS.
              <br />
              THEY WORK.
              <br />
              USUALLY.
            </p>
          </Parallax>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          aria-label="About"
          className="relative flex min-h-screen items-center justify-center px-6 py-32 md:px-32"
        >
          <Parallax speed={0.3}>
            <div className="max-w-5xl space-y-12">
              <TextGradientScroll
                text="I AM A CALCULATED CREATIVE WHO BUILDS FAST, DESIGNS CLEAN, AND SHIPS WORK THAT LOOKS BETTER THAN MY SLEEP PATTERNS."
                className="text-[2rem] leading-[1.1] font-bold tracking-tight md:text-[3rem]"
              />
              <p className="pt-16 text-[1.5rem] leading-[1.3] tracking-tight md:text-[2rem]">
                I CRAFT AESTHETIC UIs,
                <br />
                SOLVE PROBLEMS FAST,
                <br />
                AND THINK IN LAYOUTS BEFORE I THINK IN WORDS.
              </p>
              <div className="pt-16">
                <p className="text-[1.75rem] leading-[1.2] tracking-tight md:text-[2.5rem]">
                  I&apos;M GREAT AT SOLVING PROBLEMS I CREATED.
                </p>
                <p className="mt-2 text-[1.25rem] leading-[1.2] tracking-tight opacity-60 md:text-[1.75rem]">
                  (no, seriously.)
                </p>
              </div>
            </div>
          </Parallax>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="relative flex min-h-screen items-center px-6 py-32 md:px-32">
          <Parallax speed={0.4} className="w-full max-w-6xl">
            <h2 className={`${sectionHeading} mb-24`}>EXPERIENCE</h2>
            <RevealList className="space-y-6">
              {EXPERIENCE.map((exp) => (
                <RevealItem
                  key={exp.title}
                  className="grid grid-cols-1 gap-6 border-l-8 border-black bg-white p-6 transition-colors duration-300 hover:bg-gray-50 md:grid-cols-5 md:gap-12 md:p-8"
                >
                  <div className="md:col-span-1">
                    <div className="inline-block bg-black px-4 py-2 text-[1.5rem] font-bold tracking-tight text-white md:text-[2rem]">
                      {exp.year}
                    </div>
                  </div>
                  <div className="space-y-3 md:col-span-4">
                    <h3 className="text-[1.5rem] leading-tight font-bold tracking-tight md:text-[2rem]">
                      {exp.title}
                    </h3>
                    <p className="text-[1.125rem] leading-relaxed tracking-tight opacity-70 md:text-[1.375rem]">
                      {exp.desc}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealList>
          </Parallax>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="relative py-32">
          <Parallax speed={0.35} className="mb-24 px-6 md:px-32">
            <h2 className={sectionHeading}>PROJECTS</h2>
          </Parallax>

          {PROJECTS.map((project, i) => {
            const dark = i % 2 === 0
            return (
              <article
                key={project.name}
                className={`relative overflow-hidden px-6 py-24 transition-colors duration-500 md:px-32 md:py-32 ${
                  dark
                    ? 'bg-black text-white hover:bg-white hover:text-black'
                    : 'border-y-8 border-black bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                <div className="max-w-5xl">
                  <div className="mb-8 text-[1.25rem] tracking-widest opacity-60 md:text-[1.5rem]">
                    [ PROJECT {String(i + 1).padStart(2, '0')} ]
                  </div>
                  <h3 className="mb-8 text-[clamp(2.25rem,11vw,5rem)] leading-none font-bold tracking-tighter">
                    {project.href?.startsWith('/') ? (
                      <Link href={project.href} className="underline decoration-4 underline-offset-8 hover:opacity-70">
                        {project.name} →
                      </Link>
                    ) : project.href ? (
                      <a href={project.href} target="_blank" rel="noopener noreferrer" className="underline-offset-8 hover:underline">
                        {project.name} ↗
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="mb-12 text-[1.5rem] leading-[1.3] tracking-tight opacity-90 md:text-[2rem]">
                    {project.lines[0]}
                    <br />
                    {project.lines[1]}
                  </p>
                  <div className="space-y-4 text-[1.25rem] opacity-80 md:text-[1.5rem]">
                    <div>STATUS: {project.status}</div>
                    <div>FOOTNOTE: {project.footnote}</div>
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        {/* SKILLS */}
        <section id="skills" className="relative flex min-h-screen items-center px-6 py-32 md:px-32">
          <Parallax speed={0.3} className="w-full max-w-6xl">
            <h2 className={`${sectionHeading} mb-24`}>SKILLS</h2>
            <RevealList>
              {SKILLS.map((s) => (
                <RevealItem
                  key={s.skill}
                  className="group grid grid-cols-1 gap-4 border-l-8 border-black bg-white p-6 transition-colors duration-300 hover:bg-gray-50 md:grid-cols-3 md:gap-12 md:p-8"
                >
                  <h3 className="relative pb-2 text-[1.75rem] font-bold tracking-tight md:text-[2.5rem]">
                    {s.skill}
                    <span className="absolute bottom-0 left-0 h-1 w-0 bg-black transition-all duration-300 group-hover:w-full" />
                  </h3>
                  <p className="text-[1.25rem] tracking-tight opacity-70 transition-opacity group-hover:opacity-100 md:col-span-2 md:text-[1.75rem]">
                    {s.desc}
                  </p>
                </RevealItem>
              ))}
            </RevealList>
          </Parallax>
        </section>

        {/* DSA */}
        <section id="dsa" className="relative flex flex-col items-center justify-center px-6 py-24 text-center">
          <Parallax speed={0.4}>
            <h2 className="mb-8 text-[clamp(2rem,9vw,3.5rem)] leading-none font-bold tracking-tighter">
              DSA PROGRESS:
            </h2>
            <div className="mb-8 text-[clamp(1.75rem,8vw,5rem)] font-bold tracking-wider">
              <span aria-hidden="true">▮▮▮▮▮▮▮▯▯▯ </span>70%
            </div>
            <TextRevealByWord text="300+ QUESTIONS SOLVED. 300+ QUESTIONS FORGOTTEN. AND YES, I STILL USE TWO POINTERS." />
          </Parallax>
        </section>

        {/* PHOTOGRAPHY */}
        <section id="photos" aria-labelledby="photos-heading" className="min-h-screen bg-black px-6 py-32 text-white md:px-16">
          <div className="mb-32 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PHOTOS.map((photo, i) => (
              <FadeUp key={photo.id} delay={(i % 3) * 0.1} className="aspect-[4/3] overflow-hidden bg-neutral-900">
                {/* Pre-sized WebP with srcset; Vercel image optimisation isn't needed for 9 photos. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/img-${photo.id}-1200.webp`}
                  srcSet={`/images/img-${photo.id}-640.webp 640w, /images/img-${photo.id}-1200.webp 1200w`}
                  sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw"
                  width={photo.portrait ? 1200 : 1600}
                  height={photo.portrait ? 1600 : 1200}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </FadeUp>
            ))}
          </div>
          <div className="text-center">
            <h2 id="photos-heading" className="mb-4 text-[2.5rem] leading-[1.1] font-bold tracking-tight md:text-[3.5rem]">
              I TAKE PHOTOS.
              <br />
              GOOD ONES.
            </h2>
            <p className="text-[1.5rem] leading-[1.1] tracking-tight opacity-70 md:text-[2rem]">USUALLY WITH A PHONE.</p>
          </div>
        </section>

        {/* SIDE QUESTS */}
        <section id="side-quests" className="relative min-h-screen px-6 py-32 md:px-32">
          <Parallax speed={0.3}>
            <h2 className={`${sectionHeading} mb-24`}>SIDE QUESTS</h2>
            <RevealList className="max-w-5xl space-y-16">
              {SIDE_QUESTS.map((item) => (
                <RevealItem
                  key={item.title}
                  className="group border-l-4 border-black pl-6 transition-all duration-300 hover:pl-10 md:pl-8 md:hover:pl-12"
                >
                  <h3 className="mb-3 text-[1.75rem] font-bold tracking-tight md:text-[2.5rem]">{item.title}</h3>
                  <p className="text-[1.25rem] tracking-tight whitespace-pre-line opacity-70 transition-opacity group-hover:opacity-90 md:text-[1.75rem]">
                    {item.desc}
                  </p>
                </RevealItem>
              ))}
            </RevealList>
          </Parallax>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 md:px-8">
          <Parallax speed={0.25} className="w-full max-w-4xl">
            <h2 className={`${sectionHeading} mb-12 md:mb-16`}>CONTACT</h2>
            <div className="space-y-5 md:space-y-6">
              {CONTACTS.map((c) => (
                <ContactLink key={c.label} {...c} />
              ))}
            </div>
          </Parallax>
        </section>
      </main>

      <footer className="border-t-2 border-black px-6 py-16 md:px-32">
        <RevealList className="space-y-4 text-[0.875rem] tracking-tight opacity-70 md:text-[1rem]">
          <RevealItem>
            <p className="font-bold">THIS WEBSITE WAS MADE WITH:</p>
          </RevealItem>
          <RevealItem>
            <p>TEXT. INTENTION. AND A LITTLE BIT OF DELUSION.</p>
          </RevealItem>
          <RevealItem>
            <p className="pt-8 italic">I&apos;M GREAT AT SOLVING PROBLEMS I CREATED.</p>
          </RevealItem>
        </RevealList>
      </footer>
    </div>
  )
}
