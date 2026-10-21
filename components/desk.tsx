'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    mountDesk?: (el: HTMLElement) => { size: () => void }
    gsap?: unknown
  }
}

/**
 * The interactive pixel desk from the Brix site: decks play the set on the monitor, the screen opens a terminal,
 * the badge, the diary of paintings, the lamp, the coffee lab and the brick. The scene itself lives in
 * /public/desk/desk.js (plain canvas code); this component only provides its markup and mounts it.
 */
export function Desk({ children }: { children?: React.ReactNode }) {
  const fig = useRef<HTMLDivElement>(null)

  const mount = () => {
    if (fig.current && window.mountDesk && window.gsap) window.mountDesk(fig.current)
  }

  // Already loaded (client-side navigation back to the page).
  useEffect(mount, [])

  return (
    <>
      {/* Plain stylesheet for the plain-JS scene; React hoists it into <head>. */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/desk/desk.css" precedence="default" />
      <Script src="/desk/gsap.min.js" strategy="afterInteractive" onReady={mount} />
      <Script src="/desk/desk.js" strategy="afterInteractive" onReady={mount} />

      <div className="np mono off" id="np">
        <span className="eq" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="npT">
          Now playing · <b>After Cape Town, Vol. II</b>
        </span>
        <button type="button" className="npSound" aria-pressed="false">
          Mute
        </button>
        <a href="https://youtu.be/UDR8EI9j8PM" target="_blank" rel="noopener noreferrer">
          <span className="lg">Watch on </span>YouTube ↗
        </a>
        <button type="button" className="npStop">
          Stop
        </button>
      </div>
      <div className="disco" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      {children}

      <div
        ref={fig}
        className="deskFig mx-auto w-full max-w-[1400px] md:[aspect-ratio:1.5/1]"
        id="deskFig"
        data-no-cursor
        role="img"
        aria-label="An isometric drawing of Sahil's desk: a monitor, speakers, DJ decks, keyboard, a diary, a lamp, an iced coffee, a work badge, a clay brick and a plant. Each object opens something."
      >
        <div className="cam">
          <canvas />
          <div className="hots" id="hots" />
        </div>
        <span className="hl bl mono">Fig. 01 · My desk · click anything</span>
      </div>
      <div className="dock mono" id="deskDock" aria-label="Desk objects" />
    </>
  )
}
