'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface ExportFeedbackModalProps {
  onClose: () => void
}

export default function ExportFeedbackModal({ onClose }: ExportFeedbackModalProps) {
  const { data: session } = useSession()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const resolvedName = form.name || session?.user?.name || ''
  const resolvedEmail = form.email || session?.user?.email || ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resolvedEmail || !form.message) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resolvedName,
          email: resolvedEmail,
          message: form.message,
          rating,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unknown error')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-[#111] border-4 border-white w-full max-w-lg relative"
        style={{ boxShadow: '10px 10px 0 #285A71' }}
      >
        {/* Header */}
        <div
          className="border-b-4 border-white px-6 py-5"
          style={{ background: '#285A71' }}
        >
          <p className="text-xs font-black tracking-[0.25em] uppercase mb-1" style={{ color: '#CFDA5A' }}>
            Chapter exported! 🎉
          </p>
          <h2
            className="text-3xl text-white"
            style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em' }}
          >
            HOW WAS YOUR EXPERIENCE?
          </h2>
          <p className="text-sm mt-1" style={{ color: '#FCE4C0', opacity: 0.8 }}>
            You just exported your first chapter — we&apos;d love to know what you think.
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close feedback"
          className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl leading-none transition-colors"
        >
          ×
        </button>

        {/* Body */}
        <div className="px-6 py-6">
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center gap-5 py-6">
              <div
                className="w-16 h-16 flex items-center justify-center text-3xl border-4 border-white"
                style={{ background: '#285A71', boxShadow: '4px 4px 0 #CFDA5A' }}
              >
                ✓
              </div>
              <div>
                <h3
                  className="text-2xl text-white mb-1"
                  style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em' }}
                >
                  THANK YOU!
                </h3>
                <p className="text-gray-400 text-sm">
                  Your feedback helps us make MangaFlow better for everyone.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-sm font-bold px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-black tracking-widest uppercase text-gray-500 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder={session?.user?.name ?? 'Your name'}
                  value={resolvedName}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-[#0a0a0a] text-white border-2 border-gray-700 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-700"
                  onFocus={e => e.target.style.borderColor = '#285A71'}
                  onBlur={e => e.target.style.borderColor = ''}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-black tracking-widest uppercase text-gray-500 mb-1.5">
                  Email <span style={{ color: '#CFDA5A' }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={session?.user?.email ?? 'you@example.com'}
                  value={resolvedEmail}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full bg-[#0a0a0a] text-white border-2 border-gray-700 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-700"
                  onFocus={e => e.target.style.borderColor = '#285A71'}
                  onBlur={e => e.target.style.borderColor = ''}
                />
              </div>

              {/* Star rating */}
              <div>
                <label className="block text-xs font-black tracking-widest uppercase text-gray-500 mb-1.5">
                  Rating
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl transition-transform hover:scale-110 active:scale-95"
                    >
                      <span
                        className={
                          (hoverRating || rating) >= star
                            ? 'text-yellow-400'
                            : 'text-gray-700'
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-black tracking-widest uppercase text-gray-500 mb-1.5">
                  Message <span style={{ color: '#CFDA5A' }}>*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="What worked well? What was confusing? Any features you wish existed?"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full bg-[#0a0a0a] text-white border-2 border-gray-700 px-4 py-2.5 text-sm outline-none resize-none transition-colors placeholder:text-gray-700"
                  onFocus={e => e.target.style.borderColor = '#285A71'}
                  onBlur={e => e.target.style.borderColor = ''}
                />
              </div>

              {errorMsg && (
                <p className="text-sm border px-3 py-2" style={{ color: '#CFDA5A', borderColor: 'rgba(207,218,90,0.4)', background: 'rgba(207,218,90,0.1)' }}>
                  {errorMsg}
                </p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex-1 disabled:opacity-50 text-[#0a0a0a] font-black text-base py-3 border-2 border-white transition-all duration-150 hover:bg-white hover:text-[#285A71] shadow-[4px_4px_0_white] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                  style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.1em', background: '#CFDA5A' }}
                >
                  {status === 'loading' ? 'SENDING...' : 'SEND FEEDBACK ▶'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 border-2 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 text-sm font-medium transition-colors"
                >
                  Skip
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}