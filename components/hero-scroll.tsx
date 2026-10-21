'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Hero exit on scroll, without scaling (scaling pushed the last line off the bottom):
 * the two title lines part sideways, the tagline lifts and blurs away.
 */
export function HeroScroll({ id, top, bottom }: { id?: string; top: [ReactNode, ReactNode]; bottom: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const left = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])
  const right = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const y = useTransform(scrollYProgress, [0, 1], [0, -60])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 0.6], ['blur(0px)', 'blur(6px)'])

  const line = 'block text-center text-[clamp(3rem,19vw,14rem)] leading-none font-bold tracking-tighter'

  return (
    <section ref={ref} id={id} className="relative flex min-h-svh flex-col items-center justify-center overflow-x-clip px-4 md:px-8">
      <h1 className="mb-8">
        <motion.span className={line} style={reduce ? undefined : { x: left }}>
          {top[0]}
        </motion.span>
        <motion.span className={line} style={reduce ? undefined : { x: right }}>
          {top[1]}
        </motion.span>
      </h1>
      <motion.div style={reduce ? undefined : { y, opacity: fade, filter: blur }}>{bottom}</motion.div>
    </section>
  )
}
