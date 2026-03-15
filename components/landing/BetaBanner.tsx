'use client'

import { useState } from 'react'

export default function BetaBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="relative z-50 bg-[#e11d1d] text-white">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 justify-center">
          <span className="text-xs font-black tracking-[0.25em] uppercase bg-white text-[#e11d1d] px-2 py-0.5">
            BETA
          </span>
          <p className="text-sm font-medium">
            MangaFlow is in open beta — features are being added weekly.{' '}
            <a
              href="#feedback"
              className="underline underline-offset-2 font-bold hover:no-underline"
            >
              Share your feedback ↓
            </a>
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="shrink-0 opacity-70 hover:opacity-100 transition-opacity text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}