'use client'

import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const ChapterUploader = dynamic(
  () => import('@/components/upload/ChapterUploader'),
  { ssr: false }
)

export default function Hero() {
  const { data: session } = useSession()
  const [showUploader, setShowUploader] = useState(false)

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b-[3px] border-white">
      {/* Speed lines background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 5.2deg,
            rgba(255,255,255,0.035) 5.2deg,
            rgba(255,255,255,0.035) 5.8deg
          )`,
        }}
      />
      {/* Halftone overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Red vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(225,29,29,0.12)_0%,_transparent_70%)]" />

      {/* Floating impact words */}
      <div className="absolute top-16 left-8 text-[#e11d1d] opacity-20 select-none pointer-events-none"
        style={{ fontFamily: 'var(--font-bangers)', fontSize: '5rem', transform: 'rotate(-15deg)' }}>
        ZOOM!
      </div>
      <div className="absolute bottom-20 right-10 text-[#e11d1d] opacity-15 select-none pointer-events-none"
        style={{ fontFamily: 'var(--font-bangers)', fontSize: '4rem', transform: 'rotate(8deg)' }}>
        POW!
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 border-2 border-[#e11d1d] px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-[#e11d1d] animate-pulse" />
          <span className="text-[#e11d1d] text-xs font-black tracking-[0.3em] uppercase">
            Open Beta — Free to Use
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-[clamp(4rem,12vw,10rem)] leading-none text-white mb-6"
          style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.04em' }}
        >
          TRANSLATE
          <br />
          <span className="text-[#e11d1d] [-webkit-text-stroke:2px_white]">MANGA</span>
          <br />
          FASTER.
        </h1>

        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed">
          Draw speech bubbles directly on your pages, type translations,
          and export a finished chapter — all in one browser tab.{' '}
          <span className="text-white font-semibold">No Photoshop needed.</span>
        </p>

        {/* CTAs */}
        <div id="uploader-section" className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {session ? (
            <button
              onClick={() => setShowUploader(true)}
              className="group bg-[#e11d1d] text-white font-black text-xl px-12 py-5 border-4 border-white hover:bg-white hover:text-[#e11d1d] transition-all duration-150 shadow-[6px_6px_0_white] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5"
              style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.12em' }}
            >
              START TRANSLATING ▶
            </button>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="group flex items-center gap-3 bg-white text-gray-900 font-black text-xl px-12 py-5 border-4 border-white hover:bg-[#e11d1d] hover:text-white hover:border-white transition-all duration-150 shadow-[6px_6px_0_#e11d1d] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5"
              style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em' }}
            >
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="currentColor"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
              </svg>
              SIGN IN TO START
            </button>
          )}
          <a
            href="#demo"
            className="text-gray-400 hover:text-white text-sm underline underline-offset-4 transition-colors"
          >
            See how it works →
          </a>
        </div>
      </div>

      {/* Upload modal */}
      {showUploader && (
        <div
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowUploader(false)}
        >
          <div className="bg-[#111] border-4 border-white p-8 w-full max-w-xl shadow-[12px_12px_0_#e11d1d]">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-3xl text-white"
                style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em' }}
              >
                UPLOAD CHAPTER
              </h2>
              <button
                onClick={() => setShowUploader(false)}
                className="text-gray-500 hover:text-white text-2xl leading-none transition-colors"
              >
                ×
              </button>
            </div>
            <ChapterUploader />
          </div>
        </div>
      )}
    </section>
  )
}