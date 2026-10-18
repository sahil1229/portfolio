'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Drifts its children upward as the element scrolls through the viewport.
 * Measured against the element itself, so it behaves the same at any page height.
 */
export function Parallax({
  speed = 0.3,
  className,
  children,
}: {
  speed?: number
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [75 * speed, -75 * speed])

  return (
    <motion.div ref={ref} className={className} style={{ position: 'relative', zIndex: 2, y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  )
}
