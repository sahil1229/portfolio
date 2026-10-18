'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export function RevealList({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}

export function FadeUp({
  className,
  delay = 0,
  children,
}: {
  className?: string
  delay?: number
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
