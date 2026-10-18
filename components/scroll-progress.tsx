'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 })

  return (
    <div aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 h-1 bg-gray-200">
      <motion.div className="h-full w-full origin-left bg-black" style={{ scaleX }} />
    </div>
  )
}
