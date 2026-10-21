'use client'

import { useState } from 'react'

export function ContactLink({ label, value, href }: { label: string; value: string; href: string }) {
  const isEmail = href.startsWith('mailto:')
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the mailto link still works.
    }
  }

  return (
    <div className="flex flex-col gap-1 text-[clamp(0.9rem,4.4vw,1.125rem)] sm:flex-row sm:items-baseline sm:gap-3 md:text-xl">
      <span className="font-bold opacity-60">{label}:</span>
      <a
        href={href}
        {...(isEmail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        className="[overflow-wrap:anywhere] underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        {value}
      </a>
      {isEmail && (
        <button
          type="button"
          onClick={copy}
          className="self-start border border-black px-2 py-0.5 text-xs tracking-widest uppercase transition-colors hover:bg-black hover:text-paper sm:self-auto"
        >
          {copied ? 'copied!' : 'copy'}
        </button>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied' : ''}
      </span>
    </div>
  )
}
