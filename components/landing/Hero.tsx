'use client'

import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import ClientOnly from '@/components/providers/ClientOnly'

const ChapterUploader = dynamic(
  () => import('@/components/upload/ChapterUploader'),
  { ssr: false }
)

export default function Hero() {
  const { data: session } = useSession()
  const [showUploader, setShowUploader] = useState(false)

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b-[3px] border-white">

      {/* Speed lines */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 4.5deg,
            rgba(255,255,255,0.045) 4.5deg,
            rgba(255,255,255,0.045) 5deg
          )`,
          opacity: 0.55,
        }}
      />

      {/* Halftone dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.9) 1.2px, transparent 1.2px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Bengara radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,75,49,0.15)_0%,transparent_65%)]" />

      {/* Floating impact words */}
      <div
        className="absolute top-14 left-6 select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-bangers)',
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          transform: 'rotate(-14deg)',
          opacity: 0.15,
          letterSpacing: '0.06em',
          color: '#C84B31',
          WebkitTextStroke: '2px #C84B31',
        }}
      >
        ZOOM!
      </div>
      <div
        className="absolute top-20 right-8 text-white select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-bangers)',
          fontSize: 'clamp(2rem, 5vw, 4.5rem)',
          transform: 'rotate(9deg)',
          opacity: 0.08,
          letterSpacing: '0.06em',
        }}
      >
        POW!
      </div>
      <div
        className="absolute bottom-24 right-14 select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-bangers)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          transform: 'rotate(-6deg)',
          opacity: 0.11,
          letterSpacing: '0.04em',
          color: '#C84B31',
        }}
      >
        WHAM!
      </div>
      <div
        className="absolute bottom-32 left-10 text-white select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-bangers)',
          fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
          transform: 'rotate(12deg)',
          opacity: 0.07,
          letterSpacing: '0.05em',
        }}
      >
        BANG!
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Open Beta badge — prominent, above headline */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5"
            style={{
              background: 'rgba(200, 75, 49, 0.12)',
              border: '1.5px solid rgba(200, 75, 49, 0.5)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0 animate-pulse"
              style={{ background: '#C84B31' }}
            />
            <span
              className="text-sm font-black tracking-[0.22em] uppercase"
              style={{ color: '#C84B31' }}
            >
              Open Beta
            </span>
            <span
              className="h-3.5 w-px opacity-40"
              style={{ background: '#C84B31' }}
            />
            <span className="text-sm font-medium text-white/60 tracking-wide">
              Free to Use
            </span>
          </div>
        </div>

        {/* Main headline */}
        <h1
          className="leading-none text-white mb-4"
          style={{
            fontFamily: 'var(--font-bangers)',
            letterSpacing: '0.04em',
            fontSize: 'clamp(4.5rem, 13vw, 11rem)',
          }}
        >
          TRANSLATE
          <br />
          <span style={{ color: '#C84B31', WebkitTextStroke: '2px white' }}>
            MANGA
          </span>
          <br />
          FASTER.
        </h1>

        {/* Supported formats strip */}
        <div className="flex items-center justify-center gap-0 mb-8 flex-wrap">
          {['Manga', 'Manhua', 'Manhwa', 'Comics', 'Webtoons'].map((f, i) => (
            <span key={f} className="flex items-center gap-0">
              <span className="text-gray-400 text-sm font-bold tracking-widest uppercase px-3 py-1 hover:text-white transition-colors">
                {f}
              </span>
              {i < 4 && (
                <span className="text-lg font-black" style={{ color: '#C84B31' }}>·</span>
              )}
            </span>
          ))}
        </div>

        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Draw speech bubbles directly on your pages, type translations,
          and export a finished chapter — all in one browser tab.{' '}
          <span className="text-white font-semibold">No Photoshop needed.</span>
        </p>

        {/* CTAs */}
        <div id="uploader-section" className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-5">
          <ClientOnly
            fallback={
              <button
                onClick={() => signIn('google')}
                className="flex items-center gap-3 bg-white text-gray-900 font-black text-xl px-12 py-5 border-4 border-white transition-all duration-150"
                style={{
                  fontFamily: 'var(--font-bangers)',
                  letterSpacing: '0.08em',
                  boxShadow: '6px 6px 0 #C84B31',
                }}
              >
                SIGN IN TO START
              </button>
            }
          >
            {session ? (
              <button
                onClick={() => setShowUploader(true)}
                className="text-white font-black text-xl px-12 py-5 border-4 border-white transition-all duration-150"
                style={{
                  fontFamily: 'var(--font-bangers)',
                  letterSpacing: '0.12em',
                  background: '#C84B31',
                  boxShadow: '6px 6px 0 white',
                }}
              >
                START TRANSLATING ▶
              </button>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="flex items-center gap-3 bg-white text-gray-900 font-black text-xl px-12 py-5 border-4 border-white transition-all duration-150"
                style={{
                  fontFamily: 'var(--font-bangers)',
                  letterSpacing: '0.08em',
                  boxShadow: '6px 6px 0 #C84B31',
                }}
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
          </ClientOnly>

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
          <div
            className="bg-[#111] border-4 border-white p-8 w-full max-w-xl"
            style={{ boxShadow: '12px 12px 0 #C84B31' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-3xl text-white"
                style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em' }}
              >
                UPLOAD CHAPTER
              </h2>
              <button
                onClick={() => setShowUploader(false)}
                className="text-gray-500 hover:text-white hover:cursor-pointer text-2xl leading-none transition-colors"
              >
                X
              </button>
            </div>
            <ChapterUploader />
          </div>
        </div>
      )}
    </section>
  )
}