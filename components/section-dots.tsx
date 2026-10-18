'use client'

import { useEffect, useState } from 'react'
import { SECTIONS, type SectionId } from '@/lib/content'

export function SectionDots() {
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        }
      },
      // A section is "active" once it crosses the middle of the viewport.
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <nav aria-label="Sections" className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 md:block">
      <ul className="space-y-3">
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={label}
              aria-current={active === id ? 'location' : undefined}
              title={label}
              className="group flex h-4 w-4 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <span
                className={`block h-2 w-2 rounded-full transition-all duration-300 ${
                  active === id ? 'scale-150 bg-black' : 'bg-gray-300 group-hover:bg-gray-500'
                }`}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
