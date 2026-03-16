import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { hasUserExported, markUserExported } from '@/lib/appwrite-server'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ hasExported: false })

    const result = await hasUserExported(session.user.email)
    return NextResponse.json({ hasExported: result })
  } catch {
    return NextResponse.json({ hasExported: false })
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ ok: false }, { status: 401 })
    }

    await markUserExported(session.user.email)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}