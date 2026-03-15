import { NextRequest, NextResponse } from 'next/server'

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

    // Only attempt Appwrite save if all required env vars are present
    const appwriteConfigured =
      process.env.APPWRITE_PROJECT_ID &&
      process.env.APPWRITE_API_KEY &&
      process.env.APPWRITE_DATABASE_ID &&
      process.env.APPWRITE_FEEDBACK_COLLECTION_ID

    if (appwriteConfigured) {
      try {
        const { saveFeedback } = await import('@/lib/appwrite-server')
        await saveFeedback({
          name: name?.trim() ?? '',
          email: email.trim(),
          message: message.trim(),
          rating: rating ?? 5,
        })
      } catch (appwriteErr) {
        // Log but don't fail the request — feedback is received even if storage fails
        console.error('[Feedback API] Appwrite save failed:', appwriteErr)
      }
    } else {
      // Log feedback to console as fallback when Appwrite is not configured
      console.log('[Feedback received]', {
        name: name?.trim() ?? '',
        email: email.trim(),
        message: message.trim(),
        rating: rating ?? 5,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Feedback API] Error:', err)
    return NextResponse.json(
      { error: 'Failed to submit feedback. Please try again.' },
      { status: 500 }
    )
  }
}