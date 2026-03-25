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
    setStatus('loading'); setErrorMsg('')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
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

  const inputStyle = {
    width: '100%', background: '#fff', color: '#2a2420',
    border: '1.5px solid rgba(42,36,32,0.15)',
    borderRadius: '12px', padding: '10px 16px', fontSize: '14px', outline: 'none',
  }

  return (
    <section id="feedback" className="border-b" style={{ borderBottomColor: 'rgba(42,36,32,0.12)' }}>
      <div className="px-6 py-8 border-b" style={{ background: '#F7D9B0', borderBottomColor: 'rgba(42,36,32,0.12)' }}>
        <p className="text-xs font-black tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(42,36,32,0.5)' }}>Chapter 3</p>
        <h2 className="text-5xl md:text-6xl" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.06em', color: '#2a2420' }}>
          TELL US WHAT YOU THINK
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b lg:border-b-0 lg:border-r p-8 md:p-12 flex flex-col justify-between gap-8" style={{ borderColor: 'rgba(42,36,32,0.1)', background: '#EDE8E3' }}>
          <div>
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#6b5e56' }}>
              MangaFlow is in open beta. Every piece of feedback shapes what we build next. Found a bug? Have a feature idea? We read everything.
            </p>
            <div className="space-y-3">
              {[
                { icon: '🐛', label: 'Bug reports', desc: 'Tell us what broke so we can fix it' },
                { icon: '✨', label: 'Feature requests', desc: 'What would make your workflow smoother?' },
                { icon: '🗣️', label: 'General feedback', desc: 'Anything — we want to hear it' },
              ].map(item => (
                <div key={item.label} className="flex gap-4 items-start p-4 rounded-xl border transition-colors" style={{ background: '#fff', borderColor: 'rgba(42,36,32,0.1)' }}>
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#2a2420' }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#6b5e56' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl border-2" style={{ borderColor: '#7AB648', background: 'rgba(122,182,72,0.06)' }}>
            <p className="text-xs font-black tracking-widest uppercase mb-1" style={{ color: '#5d9130' }}>Currently in Beta</p>
            <p className="text-sm" style={{ color: '#6b5e56' }}>No payment, no waitlist. Sign in and start translating right now.</p>
          </div>
        </div>

        <div className="p-8 md:p-12" style={{ background: '#fff' }}>
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-12">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style={{ background: '#7AB648', boxShadow: '4px 4px 0 rgba(122,182,72,0.3)' }}>✓</div>
              <div>
                <h3 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em', color: '#2a2420' }}>THANK YOU!</h3>
                <p style={{ color: '#6b5e56' }}>Your feedback means a lot. We&apos;ll be in touch.</p>
              </div>
              <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); setRating(0) }}
                className="text-sm underline underline-offset-4 transition-colors" style={{ color: '#6b5e56' }}>
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black tracking-widest uppercase mb-2" style={{ color: '#6b5e56' }}>Your Name</label>
                <input type="text" placeholder={session?.user?.name ?? 'Tanjiro Kamado'}
                  value={form.name || session?.user?.name || ''}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#7AB648')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(42,36,32,0.15)')} />
              </div>
              <div>
                <label className="block text-xs font-black tracking-widest uppercase mb-2" style={{ color: '#6b5e56' }}>
                  Email <span style={{ color: '#F2967E' }}>*</span>
                </label>
                <input type="email" required placeholder={session?.user?.email ?? 'you@example.com'}
                  value={form.email || session?.user?.email || ''}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#7AB648')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(42,36,32,0.15)')} />
              </div>
              <div>
                <label className="block text-xs font-black tracking-widest uppercase mb-2" style={{ color: '#6b5e56' }}>Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button" onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                      className="text-3xl transition-transform hover:scale-110 active:scale-95">
                      <span className={(hoverRating || rating) >= star ? 'text-yellow-400' : ''} style={(hoverRating || rating) < star ? { color: 'rgba(42,36,32,0.2)' } : {}}>★</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-black tracking-widest uppercase mb-2" style={{ color: '#6b5e56' }}>
                  Message <span style={{ color: '#F2967E' }}>*</span>
                </label>
                <textarea required rows={5} placeholder="What do you think? What's missing? What's great?"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => (e.target.style.borderColor = '#7AB648')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(42,36,32,0.15)')} />
              </div>
              {errorMsg && (
                <p className="text-sm rounded-xl px-3 py-2" style={{ color: '#F2967E', background: 'rgba(242,150,126,0.1)', border: '1px solid rgba(242,150,126,0.3)' }}>{errorMsg}</p>
              )}
              <button type="submit" disabled={status === 'loading'}
                className="w-full disabled:opacity-50 text-white font-black text-lg py-4 rounded-xl transition-all duration-150 hover:scale-[1.01]"
                style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.12em', background: '#7AB648', boxShadow: '0 4px 16px rgba(122,182,72,0.3)' }}>
                {status === 'loading' ? 'SENDING...' : 'SEND FEEDBACK ▶'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}