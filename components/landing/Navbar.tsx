'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import AuthButton from '@/components/auth/AuthButton'
import ClientOnly from '@/components/providers/ClientOnly'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav
      className="sticky top-0 z-40 border-b"
      style={{ background: '#EDE8E3', borderBottomColor: 'rgba(42,36,32,0.12)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 flex items-center justify-center rounded-lg group-hover:rotate-6 transition-transform duration-200"
            style={{ background: '#7AB648' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <rect x="1" y="1" width="6" height="6" />
              <rect x="9" y="1" width="6" height="6" />
              <rect x="1" y="9" width="14" height="6" />
            </svg>
          </div>
          <span
            className="text-2xl tracking-wide"
            style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em', color: '#2a2420' }}
          >
            MANGAFLOW
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: '#6b5e56' }}>
          <a href="#how-it-works" className="hover:text-[#2a2420] transition-colors">How it works</a>
          <a href="#demo" className="hover:text-[#2a2420] transition-colors">Demo</a>
        </div>

        {/* Auth area */}
        <div className="flex items-center gap-4">
          <ClientOnly>
            {session && (
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('uploader-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="hidden md:block text-sm font-bold hover:opacity-75 transition-opacity"
                style={{ color: '#7AB648' }}
              >
                My Workspace ↗
              </Link>
            )}
          </ClientOnly>
          <AuthButton variant="nav" />
        </div>
      </div>
    </nav>
  )
}