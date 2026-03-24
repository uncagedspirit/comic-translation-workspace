import type { Metadata } from 'next'
import {
  Bangers,
  Inter,
  Permanent_Marker,
  Boogaloo,
  Chewy,
  Caveat,
  Patrick_Hand,
  Comic_Neue,
} from 'next/font/google'
import SessionProvider from '@/components/providers/SessionProvider'
import './globals.css'

const inter           = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bangers         = Bangers({ weight: '400', subsets: ['latin'], variable: '--font-bangers' })
const permanentMarker = Permanent_Marker({ weight: '400', subsets: ['latin'], variable: '--font-permanent-marker' })
const boogaloo        = Boogaloo({ weight: '400', subsets: ['latin'], variable: '--font-boogaloo' })
const chewy           = Chewy({ weight: '400', subsets: ['latin'], variable: '--font-chewy' })
const caveat          = Caveat({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-caveat' })
const patrickHand     = Patrick_Hand({ weight: '400', subsets: ['latin'], variable: '--font-patrick-hand' })
const comicNeue       = Comic_Neue({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-comic-neue' })

export const metadata: Metadata = {
  title: 'MangaFlow — Comic Translation Workspace',
  description:
    'Draw speech bubbles on your manga, manhua, manhwa, or comic pages, type translations, and export a finished chapter. No Photoshop needed.',
  openGraph: {
    title: 'MangaFlow — Translate Comics Faster',
    description: 'Purpose-built comic translation tool for manga, manhua, manhwa & more. Open beta.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    inter.variable,
    bangers.variable,
    permanentMarker.variable,
    boogaloo.variable,
    chewy.variable,
    caveat.variable,
    patrickHand.variable,
    comicNeue.variable,
  ].join(' ')

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${fontVars} font-sans bg-[#0a0a0a] text-gray-100 min-h-screen`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}