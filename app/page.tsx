import { ContactLink } from '@/components/contact-link'
import { Noise } from '@/components/noise'
import { Parallax } from '@/components/parallax'
import { RevealItem, RevealList } from '@/components/reveal'
import { ScrollProgress } from '@/components/scroll-progress'
import { WipeHeading } from '@/components/wipe-heading'
import { TextGradientScroll } from '@/components/ui/text-gradient-scroll'
import { HeroScroll } from '@/components/hero-scroll'
import { Polaroids } from '@/components/polaroids'
import { Projects } from '@/components/projects'
import { Desk } from '@/components/desk'
import { ASSISTANT, CONTACTS, EXPERIENCE, SIDE_QUESTS } from '@/lib/content'

const sectionHeading = 'text-[clamp(2.5rem,12vw,5rem)] leading-none tracking-tighter font-bold'

export default function Portfolio() {
  return (
    <div className="relative overflow-x-clip bg-paper font-mono text-black">
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


      <main>
        {/* HERO */}
        <HeroScroll
          id="top"
          top={["HI, I'M", 'SAHIL.']}
          bottom={
            <p className="text-center text-[clamp(1.5rem,7vw,3.5rem)] leading-tight tracking-tight">
              I BUILD THINGS.
              <br />
              THEY WORK.
              <br />
              USUALLY.
            </p>
          }
        />

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
            <WipeHeading className={`${sectionHeading} mb-24`}>EXPERIENCE</WipeHeading>
            <RevealList className="space-y-6">
              {EXPERIENCE.map((exp) => (
                <RevealItem
                  key={exp.title}
                  className="grid grid-cols-1 gap-6 border-l-8 border-black bg-paper p-6 transition-colors duration-300 hover:bg-[#e9e6df] md:grid-cols-5 md:gap-12 md:p-8"
                >
                  <div className="md:col-span-1">
                    <div className="inline-block bg-black px-4 py-2 text-[1.5rem] font-bold tracking-tight text-paper md:text-[2rem]">
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
        <Projects />

        {/* OFF THE CLOCK */}
        <section id="life" className="desk relative px-6 pb-24 md:px-16 lg:px-32">
          <Desk>
            <div className="relative z-[1] mx-auto mb-12 max-w-3xl text-center">
              <WipeHeading className={`${sectionHeading} mx-auto mb-6`}>OFF THE CLOCK</WipeHeading>
              <p className="font-serif text-[clamp(1.3rem,2.6vw,1.9rem)] leading-snug italic opacity-85">
                the code pays rent. this is everything else. poke at the desk: the decks play my set.
              </p>
            </div>
          </Desk>
        </section>

        {/* PHOTOGRAPHY */}
        <Polaroids />

        {/* SIDE QUESTS */}
        <section id="side-quests" className="relative min-h-screen px-6 py-32 md:px-32">
          <Parallax speed={0.3}>
            <WipeHeading className={`${sectionHeading} mb-24`}>SIDE QUESTS</WipeHeading>
            <RevealList className="max-w-5xl space-y-16">
              {SIDE_QUESTS.map((item) => (
                <RevealItem
                  key={item.title}
                  className="group border-l-4 border-black pl-6 transition-all duration-300 hover:pl-10 md:pl-8 md:hover:pl-12"
                >
                  <h3 className="mb-3 text-[1.75rem] font-bold tracking-tight md:text-[2.5rem]">
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="underline-offset-8 hover:underline">
                        {item.title} ↗
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
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
            <WipeHeading className={`${sectionHeading} mb-12 md:mb-16`}>CONTACT</WipeHeading>
            <div className="space-y-5 md:space-y-6">
              {CONTACTS.map((c) => (
                <ContactLink key={c.label} {...c} />
              ))}
            </div>
            <p className="mt-12 text-sm tracking-tight opacity-60 md:text-base">
              busy? my assistant {ASSISTANT.name} replies faster:{' '}
              <a href={`mailto:${ASSISTANT.email}`} className="underline underline-offset-4 hover:opacity-70">
                {ASSISTANT.email}
              </a>
            </p>
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
