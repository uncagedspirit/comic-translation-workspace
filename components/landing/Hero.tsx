'use client'

import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import ClientOnly from '@/components/providers/ClientOnly'

const ChapterUploader = dynamic(() => import('@/components/upload/ChapterUploader'), { ssr: false })

export default function Hero() {
  const { data: session } = useSession()
  const [showUploader, setShowUploader] = useState(false)

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b"
      style={{ background: '#EDE8E3', borderBottomColor: 'rgba(42,36,32,0.12)' }}
    >

      {/* ── Layer 1: Deep blobs — large, slow atmosphere ── */}
      <div className="absolute top-[-120px] right-[-160px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: '#7AB648', filter: 'blur(100px)', opacity: 0.28 }} />
      <div className="absolute bottom-[-80px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: '#F2967E', filter: 'blur(90px)', opacity: 0.26 }} />
      <div className="absolute top-[30%] left-[5%] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: '#F7D9B0', filter: 'blur(75px)', opacity: 0.45 }} />
      <div className="absolute bottom-[10%] right-[5%] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: '#F2967E', filter: 'blur(80px)', opacity: 0.18 }} />

      {/* ── Layer 2: Manga panel grid (faint rounded rects) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* top-left panel */}
        <div className="absolute rounded-3xl" style={{ top: '6%', left: '2%', width: '22%', height: '38%', border: '1.5px solid rgba(42,36,32,0.07)', background: 'rgba(122,182,72,0.04)' }} />
        {/* top-right panel */}
        <div className="absolute rounded-3xl" style={{ top: '4%', right: '3%', width: '18%', height: '28%', border: '1.5px solid rgba(42,36,32,0.06)', background: 'rgba(242,150,126,0.05)' }} />
        {/* mid-right tall panel */}
        <div className="absolute rounded-3xl" style={{ top: '28%', right: '1%', width: '14%', height: '50%', border: '1.5px solid rgba(42,36,32,0.055)', background: 'rgba(247,217,176,0.06)' }} />
        {/* bottom-left panel */}
        <div className="absolute rounded-3xl" style={{ bottom: '5%', left: '1%', width: '20%', height: '30%', border: '1.5px solid rgba(42,36,32,0.06)', background: 'rgba(242,150,126,0.04)' }} />
        {/* bottom-center-right panel */}
        <div className="absolute rounded-3xl" style={{ bottom: '3%', right: '20%', width: '16%', height: '22%', border: '1.5px solid rgba(42,36,32,0.05)', background: 'rgba(122,182,72,0.03)' }} />
      </div>

      {/* ── Layer 3: Dot grid ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(42,36,32,0.09) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 1 }} />

      {/* ── Layer 4: Impact words — the real star of this layer ── */}

      {/* ZOOM! — top left, large, green */}
      <div className="absolute select-none pointer-events-none" style={{
        fontFamily: 'var(--font-bangers)', top: '8%', left: '3%',
        fontSize: 'clamp(4rem, 8vw, 7.5rem)',
        transform: 'rotate(-14deg)',
        color: '#7AB648',
        opacity: 0.13,
        letterSpacing: '0.05em',
        lineHeight: 1,
      }}>ZOOM!</div>

      {/* POW! — top right, medium, coral */}
      <div className="absolute select-none pointer-events-none" style={{
        fontFamily: 'var(--font-bangers)', top: '12%', right: '4%',
        fontSize: 'clamp(2.5rem, 5vw, 5rem)',
        transform: 'rotate(11deg)',
        color: '#F2967E',
        opacity: 0.18,
        letterSpacing: '0.05em',
        lineHeight: 1,
      }}>POW!</div>

      {/* WHAM! — bottom right, large, ink */}
      <div className="absolute select-none pointer-events-none" style={{
        fontFamily: 'var(--font-bangers)', bottom: '12%', right: '3%',
        fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
        transform: 'rotate(-8deg)',
        color: '#2a2420',
        opacity: 0.07,
        letterSpacing: '0.05em',
        lineHeight: 1,
      }}>WHAM!</div>

      {/* BAM! — bottom left, medium, peach */}
      <div className="absolute select-none pointer-events-none" style={{
        fontFamily: 'var(--font-bangers)', bottom: '18%', left: '2%',
        fontSize: 'clamp(2rem, 4.5vw, 4rem)',
        transform: 'rotate(9deg)',
        color: '#F2967E',
        opacity: 0.2,
        letterSpacing: '0.05em',
        lineHeight: 1,
      }}>BAM!</div>

      {/* BANG! — mid left, small, green */}
      <div className="absolute select-none pointer-events-none" style={{
        fontFamily: 'var(--font-bangers)', top: '45%', left: '1%',
        fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
        transform: 'rotate(-5deg)',
        color: '#7AB648',
        opacity: 0.15,
        letterSpacing: '0.05em',
        lineHeight: 1,
      }}>BANG!</div>

      {/* ── Layer 5: Floating colour chip accents ── */}
      <div className="absolute pointer-events-none rounded-xl" style={{ top: '22%', left: '7%', width: 40, height: 40, background: '#7AB648', opacity: 0.2, transform: 'rotate(18deg)' }} />
      <div className="absolute pointer-events-none rounded-lg" style={{ top: '15%', right: '14%', width: 24, height: 24, background: '#F2967E', opacity: 0.3, transform: 'rotate(-12deg)' }} />
      <div className="absolute pointer-events-none rounded-xl" style={{ bottom: '22%', right: '12%', width: 36, height: 36, background: '#F7D9B0', opacity: 0.5, transform: 'rotate(25deg)', border: '2px solid rgba(42,36,32,0.1)' }} />
      <div className="absolute pointer-events-none rounded-lg" style={{ bottom: '30%', left: '9%', width: 20, height: 20, background: '#F2967E', opacity: 0.25, transform: 'rotate(-20deg)' }} />
      <div className="absolute pointer-events-none rounded-full" style={{ top: '60%', right: '7%', width: 14, height: 14, background: '#7AB648', opacity: 0.3 }} />

      {/* ── Layer 6: Sparkle / star accents (SVG) ── */}
      <svg className="absolute pointer-events-none" style={{ top: '18%', left: '20%', opacity: 0.2 }} width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 2 L17.8 13.2 L29 16 L17.8 18.8 L16 30 L14.2 18.8 L3 16 L14.2 13.2 Z" fill="#F2967E"/>
      </svg>
      <svg className="absolute pointer-events-none" style={{ bottom: '25%', right: '18%', opacity: 0.18 }} width="24" height="24" viewBox="0 0 32 32" fill="none">
        <path d="M16 2 L17.8 13.2 L29 16 L17.8 18.8 L16 30 L14.2 18.8 L3 16 L14.2 13.2 Z" fill="#7AB648"/>
      </svg>
      <svg className="absolute pointer-events-none" style={{ top: '55%', left: '14%', opacity: 0.15 }} width="18" height="18" viewBox="0 0 32 32" fill="none">
        <path d="M16 2 L17.8 13.2 L29 16 L17.8 18.8 L16 30 L14.2 18.8 L3 16 L14.2 13.2 Z" fill="#2a2420"/>
      </svg>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-20">

        {/* Open Beta badge */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(122,182,72,0.35)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(122,182,72,0.12)' }}
          >
            <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ background: '#7AB648' }} />
            <span className="text-sm font-black tracking-[0.2em] uppercase" style={{ color: '#5d9130' }}>Open Beta</span>
            <span className="h-3.5 w-px" style={{ background: 'rgba(122,182,72,0.3)' }} />
            <span className="text-sm font-medium" style={{ color: '#6b5e56' }}>Free to Use</span>
          </div>
        </div>

        {/* Main headline */}
        <h1
          className="leading-[0.92] mb-6"
          style={{
            fontFamily: 'var(--font-bangers)',
            letterSpacing: '0.04em',
            fontSize: 'clamp(4.5rem, 13vw, 11rem)',
            color: '#2a2420',
          }}
        >
          TRANSLATE
          <br />
          {/* MANGA with highlight swatch behind it */}
          <span className="relative inline-block">
            <span
              className="absolute inset-x-0 bottom-[8%] pointer-events-none rounded-lg"
              style={{ height: '38%', background: '#7AB648', opacity: 0.22, transform: 'skewX(-3deg)' }}
            />
            <span className="relative" style={{ color: '#7AB648' }}>MANGA</span>
          </span>
          <br />
          FASTER.
        </h1>

        {/* Format strip */}
        <div className="flex items-center justify-center gap-0 mb-7 flex-wrap">
          {['Manga', 'Manhua', 'Manhwa', 'Comics', 'Webtoons'].map((f, i) => (
            <span key={f} className="flex items-center">
              <span className="text-sm font-bold tracking-widest uppercase px-3 py-1 transition-colors hover:text-[#2a2420]"
                style={{ color: '#6b5e56', opacity: 0.75 }}>
                {f}
              </span>
              {i < 4 && <span className="text-base font-black" style={{ color: '#F2967E', opacity: 0.7 }}>·</span>}
            </span>
          ))}
        </div>

        {/* Body copy — in a soft card */}
        <div className="max-w-lg mx-auto mb-10 px-6 py-4 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(6px)', border: '1px solid rgba(42,36,32,0.08)' }}>
          <p className="text-lg leading-relaxed" style={{ color: '#6b5e56' }}>
            Draw speech bubbles directly on your pages, type translations,
            and export a finished chapter — all in one browser tab.{' '}
            <span style={{ color: '#2a2420', fontWeight: 600 }}>No Photoshop needed.</span>
          </p>
        </div>

        {/* CTAs */}
        <div id="uploader-section" className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <ClientOnly
            fallback={
              <button onClick={() => signIn('google')}
                className="flex items-center gap-3 font-black text-xl px-12 py-5 rounded-2xl transition-all duration-150"
                style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em', background: '#2a2420', color: '#EDE8E3', boxShadow: '4px 4px 0 #7AB648' }}>
                SIGN IN TO START
              </button>
            }
          >
            {session ? (
              <button onClick={() => setShowUploader(true)}
                className="font-black text-xl px-12 py-5 rounded-2xl transition-all duration-150 hover:scale-[1.02] active:scale-[0.99]"
                style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.12em', background: '#7AB648', color: '#fff', boxShadow: '0 6px 24px rgba(122,182,72,0.4), 4px 4px 0 rgba(42,36,32,0.2)' }}>
                START TRANSLATING ▶
              </button>
            ) : (
              <button onClick={() => signIn('google')}
                className="flex items-center gap-3 font-black text-xl px-12 py-5 rounded-2xl transition-all duration-150 hover:scale-[1.02] active:scale-[0.99]"
                style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em', background: '#2a2420', color: '#EDE8E3', boxShadow: '0 6px 24px rgba(42,36,32,0.25), 4px 4px 0 #7AB648' }}>
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                SIGN IN TO START
              </button>
            )}
          </ClientOnly>

          <a href="#demo" className="text-sm underline underline-offset-4 transition-opacity hover:opacity-100"
            style={{ color: '#6b5e56', opacity: 0.65 }}>
            See how it works →
          </a>
        </div>

        {/* Social proof micro-line */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex -space-x-2">
            {['#7AB648', '#F2967E', '#F7D9B0', '#2a2420'].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-black text-white"
                style={{ background: c, borderColor: '#EDE8E3', zIndex: 4 - i }}>
                {['Δ', '漫', '웹', 'M'][i]}
              </div>
            ))}
          </div>
          <p className="text-xs" style={{ color: '#6b5e56', opacity: 0.7 }}>
            Join translators working on manga, manhua & webtoons
          </p>
        </div>

      </div>

      {/* Upload modal */}
      {showUploader && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowUploader(false)}>
          <div className="w-full max-w-xl p-8 rounded-3xl"
            style={{ background: '#EDE8E3', boxShadow: '0 24px 60px rgba(42,36,32,0.2), 8px 8px 0 #7AB648', border: '2px solid rgba(42,36,32,0.1)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em', color: '#2a2420' }}>
                UPLOAD CHAPTER
              </h2>
              <button onClick={() => setShowUploader(false)} className="hover:opacity-60 transition-opacity text-2xl leading-none" style={{ color: '#2a2420' }}>×</button>
            </div>
            <ChapterUploader />
          </div>
        </div>
      )}
    </section>
  )
}