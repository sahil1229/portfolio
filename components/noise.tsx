'use client'

import { useEffect, useRef } from 'react'

/**
 * Film-grain overlay. One small noise tile is drawn once and shifted with a CSS
 * animation, instead of redrawing a full-screen canvas every frame.
 */
export function Noise({ size = 160, alpha = 15 }: { size?: number; alpha?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx || !ref.current) return
    const img = ctx.createImageData(size, size)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v
      img.data[i + 3] = alpha
    }
    ctx.putImageData(img, 0, 0)
    ref.current.style.backgroundImage = `url(${canvas.toDataURL()})`
  }, [size, alpha])

  return <div ref={ref} className="noise-overlay" aria-hidden="true" />
}
