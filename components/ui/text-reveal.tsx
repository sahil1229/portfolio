'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

/** Reveals text word by word on scroll. Screen readers get the plain sentence. */
export function TextRevealByWord({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref })
  const words = text.split(' ')

  return (
    <div ref={ref} className={cn('relative z-0 h-auto', className)}>
      <div className="mx-auto flex max-w-4xl items-center bg-transparent px-4 py-20">
        <p className="p-5 text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl">
          <span className="sr-only">{text}</span>
          <span aria-hidden="true" className="flex flex-wrap">
            {words.map((word, i) =>
              reduce ? (
                <span key={i} className="mx-1 text-black lg:mx-2.5">
                  {word}
                </span>
              ) : (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[Math.max(0, i / words.length - 0.1), Math.min(1, (i + 1) / words.length + 0.1)]}
                >
                  {word}
                </Word>
              ),
            )}
          </span>
        </p>
      </div>
    </div>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity }} className="text-black">{children}</motion.span>
    </span>
  )
}
