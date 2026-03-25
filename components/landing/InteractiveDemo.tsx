'use client'

import { useState, useRef, useCallback } from 'react'

type Bubble = {
  id: number; x: number; y: number; w: number; h: number
  text: string; shape: 'rect' | 'ellipse'
}

export default function InteractiveDemo() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [drawing, setDrawing] = useState(false)
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 })
  const [preview, setPreview] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const [activeTool, setActiveTool] = useState<'draw' | 'select'>('select')
  const [activeBubbleShape, setActiveBubbleShape] = useState<'rect' | 'ellipse'>('rect')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  const getRelPos = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (activeTool !== 'draw') return
    const pos = getRelPos(e)
    setDrawing(true); setDrawStart(pos)
    setPreview({ x: pos.x, y: pos.y, w: 0, h: 0 })
  }, [activeTool])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!drawing) return
    const pos = getRelPos(e)
    setPreview({ x: Math.min(pos.x, drawStart.x), y: Math.min(pos.y, drawStart.y), w: Math.abs(pos.x - drawStart.x), h: Math.abs(pos.y - drawStart.y) })
  }, [drawing, drawStart])

  const onMouseUp = useCallback(() => {
    if (!drawing || !preview) return
    setDrawing(false)
    if (preview.w > 20 && preview.h > 20) {
      const id = nextId.current++
      setBubbles(prev => [...prev, { id, ...preview, text: '', shape: activeBubbleShape }])
      setSelectedId(id); setActiveTool('select')
    }
    setPreview(null)
  }, [drawing, preview, activeBubbleShape])

  const activeBtn = { background: '#7AB648', color: '#fff' }
  const inactiveBtn = { background: '#ddd6ce', color: '#6b5e56' }

  return (
    <section id="demo" className="border-b" style={{ borderBottomColor: 'rgba(42,36,32,0.12)' }}>
      {/* Header */}
      <div className="px-6 py-8 flex items-center justify-between border-b" style={{ background: '#F2967E', borderBottomColor: 'rgba(42,36,32,0.12)' }}>
        <div>
          <p className="text-xs font-black tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.75)' }}>Chapter 2</p>
          <h2 className="text-5xl md:text-6xl text-white" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.06em' }}>TRY IT NOW</h2>
        </div>
        <p className="text-sm text-white/80 max-w-xs text-right hidden md:block">
          A live preview of the workspace. Draw a bubble, type a translation.
        </p>
      </div>

      {/* Workspace */}
      <div className="py-10 px-6" style={{ background: '#EDE8E3' }}>
        <div className="mx-auto overflow-hidden rounded-2xl border" style={{ width: '80%', borderColor: 'rgba(42,36,32,0.15)', boxShadow: '0 8px 32px rgba(42,36,32,0.1)' }}>
          {/* Header bar */}
          <div className="h-12 flex items-center justify-between px-5 shrink-0 border-b" style={{ background: '#fff', borderBottomColor: 'rgba(42,36,32,0.1)' }}>
            <div className="flex items-center gap-3">
              <span className="text-xs transition-colors cursor-default" style={{ color: '#6b5e56' }}>← New chapter</span>
              <span style={{ color: 'rgba(42,36,32,0.2)' }}>|</span>
              <span className="text-xs font-semibold tracking-wide" style={{ color: '#2a2420' }}>Comic Translation Workspace</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: '#6b5e56' }}>0/0 translated</span>
              <button disabled className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-not-allowed" style={{ background: '#ddd6ce', color: '#6b5e56' }}>↓ Export ZIP</button>
            </div>
          </div>

          <div className="flex" style={{ height: '520px' }}>
            {/* Canvas column */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
              {/* Toolbar */}
              <div className="h-11 flex items-center gap-2 px-4 shrink-0 flex-wrap border-b" style={{ background: '#f5f1ee', borderBottomColor: 'rgba(42,36,32,0.1)' }}>
                <span className="text-xs mr-1" style={{ color: '#6b5e56' }}>Tool:</span>
                {['select', 'draw'].map(tool => (
                  <button key={tool} onClick={() => setActiveTool(tool as 'select' | 'draw')}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={activeTool === tool ? activeBtn : inactiveBtn}>
                    {tool === 'select' ? '↖ Select Bubble' : '▭ Draw Bubble'}
                  </button>
                ))}
                <span style={{ color: 'rgba(42,36,32,0.2)' }} className="mx-1">|</span>
                <span className="text-xs mr-1" style={{ color: activeTool === 'select' ? 'rgba(42,36,32,0.3)' : '#6b5e56' }}>Shape:</span>
                {['rect', 'ellipse'].map(shape => (
                  <button key={shape} onClick={() => setActiveBubbleShape(shape as 'rect' | 'ellipse')} disabled={activeTool === 'select'}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={activeTool === 'select' ? { background: 'rgba(221,214,206,0.4)', color: 'rgba(42,36,32,0.3)', cursor: 'not-allowed' } : activeBubbleShape === shape ? activeBtn : inactiveBtn}>
                    {shape === 'rect' ? '▭ Rect' : '◯ Oval'}
                  </button>
                ))}
                {bubbles.length > 0 && (
                  <button onClick={() => { setBubbles([]); setSelectedId(null) }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ml-1"
                    style={inactiveBtn}>↺ Reset</button>
                )}
              </div>

              {/* Canvas */}
              <div className="flex-1 overflow-auto flex items-start justify-center p-6 relative" style={{ background: '#f0ebe6', cursor: activeTool === 'draw' ? 'crosshair' : 'default' }}>
                {bubbles.length === 0 && activeTool === 'select' && (
                  <div className="sticky left-0 top-8 z-10 pointer-events-none shrink-0 self-start">
                    <div className="text-xs px-3 py-2.5 rounded-r-xl leading-relaxed" style={{ background: 'rgba(255,255,255,0.9)', color: '#2a2420', maxWidth: '130px', border: '1px solid rgba(42,36,32,0.1)' }}>
                      Click <span className="font-bold" style={{ color: '#7AB648' }}>▭ Draw Bubble</span> in the toolbar, then drag on the page
                    </div>
                  </div>
                )}

                <div ref={canvasRef} className="relative shrink-0 select-none rounded-lg overflow-hidden"
                  style={{ width: '310px', boxShadow: '0 8px 32px rgba(42,36,32,0.2)' }}
                  onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
                  onMouseLeave={() => { if (drawing) { setDrawing(false); setPreview(null) } }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/test.jpg" alt="Manga page" draggable={false}
                    style={{ display: 'block', width: '100%', height: 'auto', userSelect: 'none', pointerEvents: 'none' }} />

                  {bubbles.map(b => {
                    const isSelected = b.id === selectedId
                    const isEllipse = b.shape === 'ellipse'
                    return (
                      <div key={b.id} className="absolute flex items-center justify-center cursor-pointer"
                        style={{
                          left: b.x, top: b.y, width: b.w, height: b.h,
                          border: '2px solid',
                          borderRadius: isEllipse ? '50%' : '6px',
                          borderColor: isSelected ? '#7AB648' : 'rgba(122,182,72,0.5)',
                          background: isSelected ? 'rgba(122,182,72,0.12)' : 'rgba(122,182,72,0.05)',
                        }}
                        onClick={() => { setSelectedId(b.id); setActiveTool('select') }}>
                        {b.text ? (
                          <span className="text-center leading-tight overflow-hidden w-full h-full flex items-center justify-center"
                            style={{ fontFamily: 'var(--font-bangers)', fontSize: `${Math.min(b.h / 3.5, 20)}px`, borderRadius: isEllipse ? '50%' : '4px', padding: '6px', letterSpacing: '0.04em', background: '#fff', color: '#2a2420' }}>
                            {b.text}
                          </span>
                        ) : (
                          <span className="text-xs pointer-events-none" style={{ color: 'rgba(122,182,72,0.6)' }}>click to type</span>
                        )}
                      </div>
                    )
                  })}

                  {preview && preview.w > 4 && (
                    <div className="absolute border-2 border-dashed pointer-events-none"
                      style={{ left: preview.x, top: preview.y, width: preview.w, height: preview.h, borderRadius: activeBubbleShape === 'ellipse' ? '50%' : '6px', borderColor: '#7AB648', background: 'rgba(122,182,72,0.1)' }} />
                  )}
                </div>
              </div>

              {/* Page nav */}
              <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto shrink-0 border-t" style={{ background: '#f5f1ee', borderTopColor: 'rgba(42,36,32,0.1)' }}>
                <span className="text-xs shrink-0" style={{ color: '#6b5e56' }}>Page 1 / 3</span>
                <div className="flex gap-2 ml-2">
                  {[true, false, false].map((active, i) => (
                    <div key={i} className="shrink-0 w-10 h-14 rounded-lg overflow-hidden border-2 transition-colors"
                      style={{ borderColor: active ? '#7AB648' : 'rgba(42,36,32,0.15)', opacity: active ? 1 : 0.4 }}>
                      <div className="w-full h-full" style={{ background: active ? 'repeating-linear-gradient(0deg, #e8e8e8 0px, #e8e8e8 1px, white 1px, white 4px)' : '#ddd6ce' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Translation panel */}
            <div className="w-80 flex flex-col shrink-0 border-l" style={{ background: '#fff', borderLeftColor: 'rgba(42,36,32,0.1)' }}>
              <div className="px-4 py-3 border-b shrink-0" style={{ borderBottomColor: 'rgba(42,36,32,0.1)' }}>
                <h2 className="text-sm font-semibold" style={{ color: '#2a2420' }}>Translations</h2>
                <p className="text-xs mt-0.5" style={{ color: '#6b5e56' }}>Page 1 — {bubbles.length} bubble{bubbles.length !== 1 ? 's' : ''}</p>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
                {bubbles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-3">
                    <span className="text-3xl opacity-30">▭</span>
                    <p className="text-sm" style={{ color: '#6b5e56' }}>No bubbles on this page yet.</p>
                    <button onClick={() => setActiveTool('draw')} className="text-xs transition-colors" style={{ color: '#7AB648' }}>Switch to Draw mode →</button>
                  </div>
                ) : (
                  bubbles.map((b, i) => (
                    <div key={b.id} onClick={() => setSelectedId(b.id)}
                      className="p-3 rounded-xl border transition-colors cursor-pointer"
                      style={b.id === selectedId
                        ? { borderColor: '#7AB648', background: 'rgba(122,182,72,0.08)' }
                        : { borderColor: 'rgba(42,36,32,0.1)', background: '#f5f1ee' }
                      }>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium" style={{ color: '#6b5e56' }}>Bubble {i + 1}</span>
                        {!b.text && <span className="text-xs" style={{ color: '#F2967E' }}>empty</span>}
                        {b.text && <span className="text-xs" style={{ color: '#7AB648' }}>✓</span>}
                      </div>
                      <textarea value={b.text}
                        onChange={e => setBubbles(prev => prev.map(bb => bb.id === b.id ? { ...bb, text: e.target.value } : bb))}
                        onClick={e => { e.stopPropagation(); setSelectedId(b.id) }}
                        placeholder="Type translation here..."
                        rows={3}
                        className="w-full text-sm rounded-lg px-2 py-1.5 border outline-none resize-none transition-colors placeholder:text-[#6b5e56] placeholder:opacity-50"
                        style={{ background: '#fff', color: '#2a2420', borderColor: b.id === selectedId ? 'rgba(122,182,72,0.4)' : 'rgba(42,36,32,0.15)' }} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}