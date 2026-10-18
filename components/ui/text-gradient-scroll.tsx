'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

type Range = [number, number]

/**
 * Fills text in letter by letter as it scrolls through the middle of the screen.
 * Screen readers get the plain sentence; the per-letter spans are visual only.
 */
export function TextGradientScroll({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={cn('relative m-0', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="flex flex-wrap">
        {reduce
          ? text
          : words.map((word, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {word}
              </Word>
            ))}
      </span>
    </p>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: Range }) {
  const step = (range[1] - range[0]) / children.length
  return (
    <span className="relative me-2 mt-2">
      {children.split('').map((char, i) => (
        <Char key={i} progress={progress} range={[range[0] + i * step, range[0] + (i + 1) * step]}>
          {char}
        </Char>
      ))}
    </span>
  )
}

function Char({ children, progress, range }: { children: string; progress: MotionValue<number>; range: Range }) {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span>
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}
