import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { hasUserExported, markUserExported } from '@/lib/appwrite-server'

// GET /api/user/export-flag
// Returns { hasExported: boolean } for the signed-in user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ hasExported: false })
    }

    const result = await hasUserExported(session.user.email)
    return NextResponse.json({ hasExported: result })
  } catch (err) {
    console.error('[export-flag GET]', err)
    // Fail open — never block the export
    return NextResponse.json({ hasExported: false })
  }
}

// POST /api/user/export-flag
// Marks the signed-in user as having exported at least once
export async function POST(req: NextRequest) {
  // Unused but typed to satisfy Next.js route signature
  void req

  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ ok: false, reason: 'unauthenticated' }, { status: 401 })
    }

    await markUserExported(session.user.email)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[export-flag POST]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}