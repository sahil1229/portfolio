'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PHOTOS } from '@/lib/content'
import { useMedia } from '@/lib/use-media'

type Photo = (typeof PHOTOS)[number]

/** Where each print lands on the desktop "table": left %, top px, tilt deg, tape or not. */
const PILE = [
  { x: 3, y: 40, r: -6, tape: true },
  { x: 25, y: 0, r: 4, tape: false },
  { x: 49, y: 70, r: -3, tape: true },
  { x: 73, y: 10, r: 7, tape: false },
  { x: 9, y: 430, r: 5, tape: false },
  { x: 35, y: 390, r: -7, tape: true },
  { x: 62, y: 450, r: 3, tape: false },
  { x: 18, y: 790, r: -4, tape: true },
  { x: 52, y: 810, r: 6, tape: false },
]

export function Polaroids() {
  const table = useRef<HTMLDivElement>(null)
  const desktop = useMedia('(min-width: 768px)')
  const [open, setOpen] = useState<number | null>(null)
  const [top, setTop] = useState<number[]>(() => PHOTOS.map((_, i) => i))

  const raise = (i: number) => setTop((order) => [...order.filter((n) => n !== i), i])

  return (
    <section id="photos" aria-labelledby="photos-heading" className="relative overflow-hidden bg-black px-6 py-32 text-paper md:px-16">
      <div className="mb-20 text-center md:mb-24">
        <h2 id="photos-heading" className="mb-4 text-[2.5rem] leading-[1.1] font-bold tracking-tight md:text-[3.5rem]">
          I TAKE PHOTOS.
          <br />
          GOOD ONES.
        </h2>
        <p className="text-[1.5rem] leading-[1.1] tracking-tight opacity-70 md:text-[2rem]">USUALLY WITH A PHONE.</p>
        <p className="mt-6 hidden text-xs tracking-widest opacity-40 md:block">DRAG THEM AROUND. CLICK ONE TO LOOK CLOSER.</p>
      </div>

      <div ref={table} className="relative mx-auto flex max-w-6xl flex-col gap-10 md:block md:h-[1180px]">
        {PHOTOS.map((photo, i) => {
          const spot = PILE[i % PILE.length]
          return (
            <Print
              key={photo.id}
              photo={photo}
              rotate={spot.r}
              tape={spot.tape}
              zIndex={top.indexOf(i) + 1}
              drag={desktop}
              constraints={table}
              className={i % 2 ? 'self-end' : 'self-start'}
              style={desktop ? { position: 'absolute', left: `${spot.x}%`, top: spot.y } : undefined}
              onRaise={() => raise(i)}
              onOpen={() => setOpen(i)}
            />
          )
        })}
      </div>

      <Lightbox index={open} onClose={() => setOpen(null)} onStep={(d) => setOpen((i) => (i === null ? i : (i + d + PHOTOS.length) % PHOTOS.length))} />
    </section>
  )
}

function Print({
  photo,
  rotate,
  tape,
  zIndex,
  drag,
  constraints,
  className,
  style,
  onRaise,
  onOpen,
}: {
  photo: Photo
  rotate: number
  tape: boolean
  zIndex: number
  drag: boolean
  constraints: React.RefObject<HTMLDivElement | null>
  className?: string
  style?: CSSProperties
  onRaise: () => void
  onOpen: () => void
}) {
  const reduce = useReducedMotion()

  return (
    <motion.button
      type="button"
      aria-label={`Open photo: ${photo.caption}`}
      className={`group w-[min(78vw,300px)] cursor-pointer touch-pan-y bg-[#f6f4ef] p-3 pb-14 text-left text-black shadow-[0_18px_40px_rgba(0,0,0,0.55)] md:w-[min(24vw,290px)] md:cursor-grab md:active:cursor-grabbing ${className ?? ''}`}
      style={{ ...style, zIndex }}
      initial={{ rotate, y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      whileHover={{ rotate: 0, scale: 1.04 }}
      whileDrag={{ scale: 1.08, rotate: 0 }}
      drag={drag}
      dragConstraints={constraints}
      dragElastic={0.15}
      dragMomentum={false}
      onPointerDown={onRaise}
      onTap={onOpen}
    >
      {tape && (
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 bg-[#e9e2cf]/80 shadow-sm"
        />
      )}
      <span className="block aspect-square overflow-hidden bg-neutral-900">
        <motion.img
          src={`/images/img-${photo.id}-640.webp`}
          alt={photo.alt}
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
          // Develops like instant film: washed out and warm, then settles into the real exposure.
          initial={reduce ? false : { filter: 'brightness(1.9) contrast(0.55) sepia(0.6) blur(2px)' }}
          whileInView={{ filter: 'brightness(1) contrast(1) sepia(0) blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2.4, ease: 'easeOut', delay: 0.2 }}
        />
      </span>
      <span className="mt-4 block px-1 text-sm tracking-tight opacity-80">{photo.caption}</span>
    </motion.button>
  )
}

function Lightbox({ index, onClose, onStep }: { index: number | null; onClose: () => void; onStep: (d: number) => void }) {
  const close = useRef<HTMLButtonElement>(null)

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    },
    [onClose, onStep],
  )

  useEffect(() => {
    if (index === null) return
    window.addEventListener('keydown', onKey)
    close.current?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [index, onKey])

  const photo = index === null ? null : PHOTOS[index]

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.figure
            key={photo.id}
            className="bg-[#f6f4ef] p-4 pb-16 text-black shadow-2xl md:p-5 md:pb-20"
            initial={{ scale: 0.9, rotate: -3, y: 20 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/img-${photo.id}-1200.webp`}
              alt={photo.alt}
              className="max-h-[70svh] w-auto max-w-[88vw] object-contain"
            />
            <figcaption className="mt-5 flex items-baseline justify-between gap-6 text-sm md:text-base">
              <span>{photo.caption}</span>
              <span className="opacity-50">
                {String(index! + 1).padStart(2, '0')} / {String(PHOTOS.length).padStart(2, '0')}
              </span>
            </figcaption>
          </motion.figure>

          <div className="absolute right-0 bottom-6 left-0 flex justify-center gap-3 text-xs tracking-widest text-paper">
            <button type="button" className="border border-paper px-3 py-2 hover:bg-paper hover:text-black" onClick={(e) => { e.stopPropagation(); onStep(-1) }}>
              ← PREV
            </button>
            <button ref={close} type="button" className="border border-paper px-3 py-2 hover:bg-paper hover:text-black" onClick={onClose}>
              CLOSE
            </button>
            <button type="button" className="border border-paper px-3 py-2 hover:bg-paper hover:text-black" onClick={(e) => { e.stopPropagation(); onStep(1) }}>
              NEXT →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
