'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.77, 0, 0.18, 1] as const

/** A heading that a solid bar wipes across, leaving the text behind. */
export function WipeHeading({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null)
  // Observe the heading itself: the clipped text inside reports zero visible area.
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()

  if (reduce) return <h2 id={id} className={className}>{children}</h2>

  return (
    <h2 ref={ref} id={id} className={`relative w-fit ${className ?? ''}`}>
      <motion.span
        className="block"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : undefined}
        transition={{ duration: 0.5, delay: 0.35, ease }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 bg-current"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: [0, 1, 1, 0], originX: [0, 0, 1, 1] } : undefined}
        transition={{ duration: 0.9, times: [0, 0.4, 0.5, 1], ease }}
      />
    </h2>
  )
}
