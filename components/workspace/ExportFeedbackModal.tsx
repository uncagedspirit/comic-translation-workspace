'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface Props { onClose: () => void }

export default function ExportFeedbackModal({ onClose }: Props) {
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
    setStatus('loading'); setErrorMsg('')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: resolvedName, email: resolvedEmail, message: form.message, rating }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unknown error')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const inputStyle = { width: '100%', background: '#f5f1ee', color: '#2a2420', border: '1.5px solid rgba(42,36,32,0.15)', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', outline: 'none' }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(42,36,32,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-lg relative rounded-3xl overflow-hidden" style={{ background: '#EDE8E3', boxShadow: '0 24px 64px rgba(42,36,32,0.25)' }}>
        <div className="px-6 py-5 border-b" style={{ background: '#7AB648', borderBottomColor: 'rgba(255,255,255,0.2)' }}>
          <p className="text-xs font-black tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Chapter exported! 🎉</p>
          <h2 className="text-3xl text-white" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em' }}>HOW WAS YOUR EXPERIENCE?</h2>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.8)' }}>You just exported your first chapter — we&apos;d love to know what you think.</p>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl leading-none transition-opacity hover:opacity-60" style={{ color: 'rgba(255,255,255,0.8)' }}>×</button>

        <div className="px-6 py-6">
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center gap-5 py-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: '#7AB648', boxShadow: '4px 4px 0 rgba(122,182,72,0.3)' }}>✓</div>
              <div>
                <h3 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.08em', color: '#2a2420' }}>THANK YOU!</h3>
                <p style={{ color: '#6b5e56', fontSize: '14px' }}>Your feedback helps us make MangaFlow better for everyone.</p>
              </div>
              <button onClick={onClose} className="text-sm font-bold px-6 py-2 rounded-xl border-2 transition-colors" style={{ borderColor: '#2a2420', color: '#2a2420' }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black tracking-widest uppercase mb-1.5" style={{ color: '#6b5e56' }}>Your Name</label>
                <input type="text" placeholder={session?.user?.name ?? 'Your name'} value={resolvedName} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#7AB648')} onBlur={e => (e.target.style.borderColor = 'rgba(42,36,32,0.15)')} />
              </div>
              <div>
                <label className="block text-xs font-black tracking-widest uppercase mb-1.5" style={{ color: '#6b5e56' }}>Email <span style={{ color: '#F2967E' }}>*</span></label>
                <input type="email" required placeholder={session?.user?.email ?? 'you@example.com'} value={resolvedEmail} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#7AB648')} onBlur={e => (e.target.style.borderColor = 'rgba(42,36,32,0.15)')} />
              </div>
              <div>
                <label className="block text-xs font-black tracking-widest uppercase mb-1.5" style={{ color: '#6b5e56' }}>Rating</label>
                <div className="flex gap-1.5">
                  {[1,2,3,4,5].map(star => (
                    <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="text-2xl transition-transform hover:scale-110">
                      <span style={{ color: (hoverRating || rating) >= star ? '#f59e0b' : 'rgba(42,36,32,0.2)' }}>★</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-black tracking-widest uppercase mb-1.5" style={{ color: '#6b5e56' }}>Message <span style={{ color: '#F2967E' }}>*</span></label>
                <textarea required rows={4} placeholder="What worked well? What was confusing?" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'none' }} onFocus={e => (e.target.style.borderColor = '#7AB648')} onBlur={e => (e.target.style.borderColor = 'rgba(42,36,32,0.15)')} />
              </div>
              {errorMsg && <p className="text-sm rounded-xl px-3 py-2" style={{ color: '#F2967E', background: 'rgba(242,150,126,0.1)', border: '1px solid rgba(242,150,126,0.3)' }}>{errorMsg}</p>}
              <div className="flex gap-3 pt-1">
                <button type="submit" disabled={status === 'loading'}
                  className="flex-1 disabled:opacity-50 text-white font-black text-base py-3 rounded-xl transition-all"
                  style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.1em', background: '#7AB648', boxShadow: '0 4px 16px rgba(122,182,72,0.3)' }}>
                  {status === 'loading' ? 'SENDING...' : 'SEND FEEDBACK ▶'}
                </button>
                <button type="button" onClick={onClose} className="px-4 py-3 rounded-xl border text-sm font-medium transition-colors"
                  style={{ borderColor: 'rgba(42,36,32,0.2)', color: '#6b5e56', background: 'transparent' }}>
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