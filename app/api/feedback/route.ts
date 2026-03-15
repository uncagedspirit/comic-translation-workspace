import { NextRequest, NextResponse } from 'next/server'
import { saveFeedback } from '@/lib/appwrite-server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message, rating } = body as {
      name?: string
      email?: string
      message?: string
      rating?: number
    }

    if (!email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Email and message are required.' },
        { status: 400 }
      )
    }

    await saveFeedback({
      name: name?.trim() ?? '',
      email: email.trim(),
      message: message.trim(),
      rating: rating ?? 5,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Feedback API] Error:', err)
    return NextResponse.json(
      { error: 'Failed to submit feedback. Please try again.' },
      { status: 500 }
    )
  }
}