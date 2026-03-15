'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import AuthButton from '@/components/auth/AuthButton'
import ClientOnly from '@/components/providers/ClientOnly'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-40 border-b-[3px] border-white bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 flex items-center justify-center border-2 border-white group-hover:rotate-6 transition-transform duration-150"
            style={{ background: '#C84B31' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <rect x="1" y="1" width="6" height="6" />
              <rect x="9" y="1" width="6" height="6" />
              <rect x="1" y="9" width="14" height="6" />
            </svg>
          </div>
          <span
            className="text-2xl text-white tracking-wide"
            style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em' }}
          >
            MANGAFLOW
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How it works
          </a>
          <a href="#demo" className="hover:text-white transition-colors">
            Demo
          </a>
        </div>

        {/* Auth area */}
        <div className="flex items-center gap-4">
          <ClientOnly>
            {session && (
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById('uploader-section')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="hidden md:block text-sm font-bold hover:opacity-75 transition-opacity"
                style={{ color: '#C84B31' }}
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