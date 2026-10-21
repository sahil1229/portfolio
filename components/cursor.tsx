'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/** A square that trails the mouse and inverts whatever it is over. Mouse/trackpad only. */
export function Cursor() {
  const reduce = useReducedMotion()
  const finePointer = useSyncExternalStore(
    () => () => {},
    () => window.matchMedia('(pointer: fine)').matches,
    () => false,
  )
  const enabled = finePointer && !reduce
  const [big, setBig] = useState(false)
  const [hidden, setHidden] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    if (!enabled) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as Element | null
      setHidden(!!t?.closest('[data-no-cursor]'))
      setBig(!!t?.closest('a, button'))
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[10001] bg-white mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: big ? 56 : 16, height: big ? 56 : 16, opacity: hidden ? 0 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    />
  )
}
