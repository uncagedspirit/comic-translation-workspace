'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function FeedbackSection() {
  const { data: session } = useSession()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const name = form.name || session?.user?.name || ''
  const email = form.email || session?.user?.email || ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !form.message) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: form.message, rating }),
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
    <section id="feedback" className="border-b-[3px] border-white">
      {/* Header */}
      <div className="border-b-[3px] border-white px-6 py-6 bg-[#111]">
        <p className="text-xs font-black tracking-[0.3em] uppercase mb-1" style={{ color: '#CFDA5A' }}>Chapter 3</p>
        <h2 className="text-5xl md:text-6xl text-white" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.06em' }}>
          TELL US WHAT YOU THINK
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left — context */}
        <div className="border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-white p-8 md:p-12 flex flex-col justify-between gap-8">
          <div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              MangaFlow is in open beta. Every piece of feedback shapes what we build next.
              Found a bug? Have a feature idea? Just want to say hi? We read everything.
            </p>
            <div className="space-y-4">
              {[
                { icon: '🐛', label: 'Bug reports', desc: 'Tell us what broke so we can fix it' },
                { icon: '✨', label: 'Feature requests', desc: 'What would make your workflow smoother?' },
                { icon: '🗣️', label: 'General feedback', desc: 'Anything — we want to hear it' },
              ].map(item => (
                <div key={item.label} className="flex gap-4 items-start border border-gray-800 p-4 hover:border-gray-600 transition-colors">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-white font-bold text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Beta badge */}
          <div className="border-2 p-4 inline-block" style={{ borderColor: '#285A71' }}>
            <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: '#CFDA5A' }}>Currently in Beta</p>
            <p className="text-gray-400 text-sm">No payment, no waitlist. Sign in and start translating right now.</p>
          </div>
        </div>

        {/* Right — form */}
        <div className="p-8 md:p-12">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-12">
              <div className="w-20 h-20 border-4 border-white flex items-center justify-center text-4xl shadow-[6px_6px_0_white]" style={{ background: '#285A71' }}>
                ✓
              </div>
              <div>
                <h3 className="text-3xl text-white mb-2" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em' }}>
                  THANK YOU!
                </h3>
                <p className="text-gray-400">Your feedback means a lot. We&apos;ll be in touch.</p>
              </div>
              <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); setRating(0) }}
                className="text-sm text-gray-500 hover:text-white underline underline-offset-4 transition-colors">
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-black tracking-widest uppercase text-gray-500 mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder={session?.user?.name ?? 'Tanjiro Kamado'}
                  value={form.name || session?.user?.name || ''}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-[#0a0a0a] text-white border-2 border-gray-700 px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-700"
                  style={{ '--tw-ring-color': '#285A71' } as React.CSSProperties}
                  onFocus={e => e.target.style.borderColor = '#285A71'}
                  onBlur={e => e.target.style.borderColor = ''}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-black tracking-widest uppercase text-gray-500 mb-2">
                  Email <span style={{ color: '#CFDA5A' }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={session?.user?.email ?? 'you@example.com'}
                  value={form.email || session?.user?.email || ''}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-[#0a0a0a] text-white border-2 border-gray-700 px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-700"
                  onFocus={e => e.target.style.borderColor = '#285A71'}
                  onBlur={e => e.target.style.borderColor = ''}
                />
              </div>

              {/* Star rating */}
              <div>
                <label className="block text-xs font-black tracking-widest uppercase text-gray-500 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-3xl transition-transform hover:scale-110 active:scale-95"
                    >
                      <span className={(hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-700'}>★</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-black tracking-widest uppercase text-gray-500 mb-2">
                  Message <span style={{ color: '#CFDA5A' }}>*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="What do you think? What's missing? What's great?"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full bg-[#0a0a0a] text-white border-2 border-gray-700 px-4 py-3 text-sm outline-none resize-none transition-colors placeholder:text-gray-700"
                  onFocus={e => e.target.style.borderColor = '#285A71'}
                  onBlur={e => e.target.style.borderColor = ''}
                />
              </div>

              {errorMsg && (
                <p className="text-sm border px-3 py-2" style={{ color: '#CFDA5A', borderColor: 'rgba(207,218,90,0.4)', background: 'rgba(207,218,90,0.1)' }}>{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full disabled:opacity-50 text-[#0a0a0a] font-black text-lg py-4 border-2 border-white transition-all duration-150 hover:bg-white hover:text-[#285A71] shadow-[4px_4px_0_white] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.12em', background: '#CFDA5A' }}
              >
                {status === 'loading' ? 'SENDING...' : 'SEND FEEDBACK ▶'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}