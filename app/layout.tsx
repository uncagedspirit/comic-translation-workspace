import type { Metadata } from 'next'
import { Bangers, Inter } from 'next/font/google'
import SessionProvider from '@/components/providers/SessionProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bangers',
})

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${bangers.variable} font-sans bg-[#0a0a0a] text-gray-100 min-h-screen`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}