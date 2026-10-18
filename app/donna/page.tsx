import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactLink } from '@/components/contact-link'
import { Noise } from '@/components/noise'
import { Parallax } from '@/components/parallax'
import { RevealItem, RevealList } from '@/components/reveal'
import { ScrollProgress } from '@/components/scroll-progress'
import { DONNA } from '@/lib/content'

const title = 'Donna — Sahil’s AI assistant'
const description =
  'Donna is the AI assistant Sahil built. She makes his calls, books tables, sends reminders and reports back on Telegram.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/donna' },
  openGraph: { type: 'website', url: '/donna', siteName: 'Sahil Shah', title, description, locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title, description },
}

const sectionHeading = 'text-[clamp(2.5rem,12vw,5rem)] leading-none tracking-tighter font-bold'

export default function DonnaPage() {
  return (
    <div className="relative overflow-x-clip bg-white font-mono text-black">
      <ScrollProgress />
      <Noise />

      <header className="absolute top-6 left-6 z-40 md:left-8">
        <Link href="/" className="text-sm tracking-widest underline-offset-4 hover:underline md:text-base">
          ← SAHILSHAH.IN
        </Link>
      </header>

      <main>
        {/* HERO */}
        <section className="relative flex min-h-svh flex-col items-center justify-center px-4 md:px-8">
          <Parallax speed={0.5}>
            <h1 className="mb-8 text-center text-[clamp(3rem,19vw,14rem)] leading-none font-bold tracking-tighter">
              HI, I&apos;M
              <br />
              DONNA.
            </h1>
            <p className="text-center text-[clamp(1.5rem,7vw,3.5rem)] leading-tight tracking-tight">
              SAHIL&apos;S ASSISTANT.
              <br />
              I MAKE THE CALLS.
              <br />
              HE TAKES THE CREDIT.
            </p>
          </Parallax>
        </section>

        {/* WHO */}
        <section className="relative flex min-h-[70vh] items-center justify-center px-6 py-32 md:px-32">
          <Parallax speed={0.3} className="max-w-5xl space-y-10">
            <p className="text-[clamp(1.75rem,6vw,3rem)] leading-[1.1] font-bold tracking-tight">
              I&apos;M AN AI. SAHIL BUILT ME BECAUSE HE&apos;D RATHER WRITE CODE THAN MAKE PHONE CALLS.
            </p>
            <p className="text-[1.25rem] leading-[1.4] tracking-tight opacity-70 md:text-[1.75rem]">
              he texts me on telegram. i call the people, get the answer and text him back.
              <br />
              i always say i&apos;m calling on his behalf. i don&apos;t pretend to be him.
            </p>
          </Parallax>
        </section>

        {/* WHAT I DO */}
        <section className="relative px-6 py-32 md:px-32">
          <h2 className={`${sectionHeading} mb-24`}>WHAT I DO</h2>
          <RevealList className="max-w-6xl space-y-6">
            {DONNA.jobs.map((job) => (
              <RevealItem
                key={job.title}
                className="grid grid-cols-1 gap-4 border-l-8 border-black bg-white p-6 transition-colors duration-300 hover:bg-gray-50 md:grid-cols-3 md:gap-12 md:p-8"
              >
                <h3 className="text-[1.5rem] font-bold tracking-tight md:text-[2.25rem]">{job.title}</h3>
                <p className="text-[1.125rem] tracking-tight opacity-70 md:col-span-2 md:text-[1.5rem]">{job.desc}</p>
              </RevealItem>
            ))}
          </RevealList>
        </section>

        {/* HOW I WORK */}
        <section className="bg-black px-6 py-32 text-white md:px-32">
          <h2 className={`${sectionHeading} mb-24`}>HOW I WORK</h2>
          <ol className="max-w-5xl space-y-12">
            {DONNA.steps.map((step, i) => (
              <li key={step} className="flex gap-6 md:gap-10">
                <span className="text-[1.5rem] font-bold opacity-50 md:text-[2rem]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[1.25rem] leading-[1.3] tracking-tight md:text-[2rem]">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-24 max-w-5xl text-[1rem] tracking-widest opacity-60 md:text-[1.25rem]">
            BUILT WITH: {DONNA.stack}
          </p>
        </section>

        {/* REACH ME */}
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 md:px-8">
          <div className="w-full max-w-4xl">
            <h2 className={`${sectionHeading} mb-8`}>REACH ME.</h2>
            <p className="mb-12 text-[1.25rem] tracking-tight opacity-70 md:mb-16 md:text-[1.75rem]">
              scheduling, intros, anything for sahil.
            </p>
            <ContactLink label="EMAIL" value={DONNA.email} href={`mailto:${DONNA.email}`} />
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-black px-6 py-16 md:px-32">
        <p className="text-[0.875rem] tracking-tight opacity-70 md:text-[1rem]">
          DONNA IS A <Link href="/#projects" className="underline underline-offset-4">SAHIL SHAH</Link> PROJECT.
          SHE KNOWS EVERYTHING. IT&apos;S IN THE CALL LOGS.
        </p>
      </footer>
    </div>
  )
}
