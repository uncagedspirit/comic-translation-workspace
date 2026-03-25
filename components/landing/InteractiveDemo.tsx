'use client'

import { useState, useRef, useCallback } from 'react'

type Bubble = {
  id: number
  x: number
  y: number
  w: number
  h: number
  text: string
  shape: 'rect' | 'ellipse'
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
    setDrawing(true)
    setDrawStart(pos)
    setPreview({ x: pos.x, y: pos.y, w: 0, h: 0 })
  }, [activeTool])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!drawing) return
    const pos = getRelPos(e)
    setPreview({
      x: Math.min(pos.x, drawStart.x),
      y: Math.min(pos.y, drawStart.y),
      w: Math.abs(pos.x - drawStart.x),
      h: Math.abs(pos.y - drawStart.y),
    })
  }, [drawing, drawStart])

  const onMouseUp = useCallback(() => {
    if (!drawing || !preview) return
    setDrawing(false)
    if (preview.w > 20 && preview.h > 20) {
      const id = nextId.current++
      setBubbles(prev => [...prev, { id, ...preview, text: '', shape: activeBubbleShape }])
      setSelectedId(id)
      setActiveTool('select')
    }
    setPreview(null)
  }, [drawing, preview, activeBubbleShape])

  return (
    <section id="demo" className="border-b-[3px] border-white">
      {/* Section header */}
      <div className="border-b-[3px] border-white px-6 py-6 flex items-center justify-between" style={{ background: '#285A71' }}>
        <div>
          <p className="text-xs font-black tracking-[0.3em] uppercase mb-1" style={{ color: '#CFDA5A' }}>Chapter 2</p>
          <h2
            className="text-5xl md:text-6xl text-white"
            style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.06em' }}
          >
            TRY IT NOW
          </h2>
        </div>
        <p className="text-sm text-white max-w-xs text-right hidden md:block">
          A live preview of the workspace. Draw a bubble, type a translation.
        </p>
      </div>

      {/* Workspace shell */}
      <div className="bg-[#0a0a0a] py-10 px-6">
        <div
          className="mx-auto overflow-hidden border-[3px] border-white"
          style={{ width: '80%' }}
        >
          {/* Workspace header */}
          <div className="h-12 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-5 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs hover:text-gray-300 transition-colors cursor-default">← New chapter</span>
              <span className="text-gray-700">|</span>
              <span className="text-gray-200 text-xs font-semibold tracking-wide">Comic Translation Workspace</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">0/0 translated</span>
              <button
                disabled
                className="px-3 py-1.5 rounded text-xs font-medium bg-gray-700 text-gray-500 cursor-not-allowed"
              >
                ↓ Export ZIP
              </button>
            </div>
          </div>

          {/* Main workspace area */}
          <div className="flex" style={{ height: '520px' }}>

            {/* Canvas column */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">

              {/* Toolbar */}
              <div className="h-11 bg-gray-900 border-b border-gray-800 flex items-center gap-2 px-4 shrink-0 flex-wrap">
                <span className="text-xs text-gray-500 mr-1">Tool:</span>
                <button
                  onClick={() => setActiveTool('select')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    activeTool === 'select'
                      ? 'text-[#0a0a0a]'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                  }`}
                  style={activeTool === 'select' ? { background: '#CFDA5A' } : {}}
                >
                  ↖ Select Bubble
                </button>
                <button
                  onClick={() => setActiveTool('draw')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    activeTool === 'draw'
                      ? 'text-[#0a0a0a]'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                  }`}
                  style={activeTool === 'draw' ? { background: '#CFDA5A' } : {}}
                >
                  ▭ Draw Bubble
                </button>

                <span className="text-gray-700 mx-1">|</span>
                <span className="text-xs text-gray-500 mr-1">Shape:</span>
                <button
                  onClick={() => setActiveBubbleShape('rect')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    activeBubbleShape === 'rect'
                      ? 'text-[#0a0a0a]'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                  }`}
                  style={activeBubbleShape === 'rect' ? { background: '#CFDA5A' } : {}}
                >
                  ▭ Rect
                </button>
                <button
                  onClick={() => setActiveBubbleShape('ellipse')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    activeBubbleShape === 'ellipse'
                      ? 'text-[#0a0a0a]'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                  }`}
                  style={activeBubbleShape === 'ellipse' ? { background: '#CFDA5A' } : {}}
                >
                  ◯ Oval
                </button>

                {bubbles.length > 0 && (
                  <>
                    <span className="text-gray-700 mx-1">|</span>
                    <button
                      onClick={() => { setBubbles([]); setSelectedId(null) }}
                      className="px-3 py-1.5 rounded text-xs font-medium bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors"
                    >
                      ↺ Reset
                    </button>
                  </>
                )}

                <span className="text-gray-600 text-xs ml-3 hidden lg:block">
                  {activeTool === 'draw'
                    ? `Drawing ${activeBubbleShape === 'ellipse' ? 'oval' : 'rectangle'} bubbles. Switch to Select when done.`
                    : 'Click a bubble to select it.'}
                </span>
              </div>

              {/* Canvas scroll area */}
              <div
                className="flex-1 overflow-auto bg-[#030712] flex items-start justify-center p-6 relative"
                style={{ cursor: activeTool === 'draw' ? 'crosshair' : 'default' }}
              >
                {/* Floating hint */}
                {bubbles.length === 0 && activeTool === 'select' && (
                  <div className="sticky left-0 top-8 z-10 pointer-events-none shrink-0 self-start">
                    <div className="bg-black/80 text-white text-xs px-3 py-2.5 rounded-r-lg leading-relaxed border-y border-r border-gray-700" style={{ maxWidth: '130px' }}>
                      Click <span className="font-bold" style={{ color: '#CFDA5A' }}>▭ Draw Bubble</span> in the toolbar, then drag on the page
                    </div>
                  </div>
                )}
                {activeTool === 'draw' && bubbles.length === 0 && (
                  <div className="sticky left-0 top-8 z-10 pointer-events-none shrink-0 self-start">
                    <div className="text-xs px-3 py-2.5 rounded-r-lg animate-pulse border-y border-r" style={{ background: 'rgba(40,90,113,0.9)', color: '#FCE4C0', borderColor: '#285A71', maxWidth: '130px' }}>
                      Click &amp; drag anywhere on the page
                    </div>
                  </div>
                )}

                {/* Page container */}
                <div
                  ref={canvasRef}
                  className="relative shrink-0 select-none"
                  style={{
                    width: '310px',
                    boxShadow: '0 4px 40px rgba(0,0,0,0.9)',
                  }}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={() => { if (drawing) { setDrawing(false); setPreview(null) } }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/test.jpg"
                    alt="Manga page"
                    draggable={false}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Rendered bubbles */}
                  {bubbles.map(b => {
                    const isSelected = b.id === selectedId
                    const isEllipse = b.shape === 'ellipse'
                    return (
                      <div
                        key={b.id}
                        className={`absolute flex items-center justify-center cursor-pointer transition-colors`}
                        style={{
                          left: b.x, top: b.y, width: b.w, height: b.h,
                          border: '2px solid',
                          borderRadius: isEllipse ? '50%' : '3px',
                          borderColor: isSelected ? '#CFDA5A' : 'rgba(207,218,90,0.6)',
                          background: isSelected ? 'rgba(40,90,113,0.18)' : 'rgba(40,90,113,0.06)',
                        }}
                        onClick={() => { setSelectedId(b.id); setActiveTool('select') }}
                      >
                        {b.text ? (
                          <span
                            className="text-black text-center leading-tight overflow-hidden bg-white w-full h-full flex items-center justify-center"
                            style={{
                              fontFamily: 'var(--font-bangers)',
                              fontSize: `${Math.min(b.h / 3.5, 20)}px`,
                              borderRadius: isEllipse ? '50%' : '2px',
                              padding: '6px',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {b.text}
                          </span>
                        ) : (
                          <span style={{ color: 'rgba(207,218,90,0.5)' }} className="text-xs pointer-events-none">click to type</span>
                        )}
                      </div>
                    )
                  })}

                  {/* Draw preview */}
                  {preview && preview.w > 4 && (
                    <div
                      className="absolute border-2 border-dashed pointer-events-none"
                      style={{
                        left: preview.x, top: preview.y,
                        width: preview.w, height: preview.h,
                        borderRadius: activeBubbleShape === 'ellipse' ? '50%' : '3px',
                        borderColor: '#CFDA5A',
                        background: 'rgba(40,90,113,0.2)',
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Page Navigator */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-t border-gray-800 overflow-x-auto shrink-0">
                <span className="text-xs text-gray-500 shrink-0">Page 1 / 3</span>
                <div className="flex gap-2 ml-2">
                  {[true, false, false].map((active, i) => (
                    <div
                      key={i}
                      className={`shrink-0 w-10 h-14 rounded overflow-hidden border-2 transition-colors ${
                        active ? 'opacity-100' : 'border-gray-700 opacity-40 cursor-default'
                      }`}
                      style={active ? { borderColor: '#CFDA5A' } : {}}
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          background: active
                            ? 'repeating-linear-gradient(0deg, #e8e8e8 0px, #e8e8e8 1px, white 1px, white 4px)'
                            : '#374151',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Translation Panel */}
            <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col shrink-0">
              <div className="px-4 py-3 border-b border-gray-800 shrink-0">
                <h2 className="text-sm font-semibold text-gray-200">Translations</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Page 1 — {bubbles.length} bubble{bubbles.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
                {bubbles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-3">
                    <span className="text-3xl opacity-40">▭</span>
                    <p className="text-gray-500 text-sm">No bubbles on this page yet.</p>
                    <button
                      onClick={() => setActiveTool('draw')}
                      className="text-xs transition-colors hover:opacity-80"
                      style={{ color: '#CFDA5A' }}
                    >
                      Switch to Draw mode →
                    </button>
                  </div>
                ) : (
                  bubbles.map((b, i) => (
                    <div
                      key={b.id}
                      onClick={() => setSelectedId(b.id)}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer`}
                      style={b.id === selectedId
                        ? { borderColor: '#CFDA5A', background: 'rgba(40,90,113,0.2)' }
                        : { borderColor: '#374151', background: 'rgba(31,41,55,0.4)' }
                      }
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-400">Bubble {i + 1}</span>
                        {!b.text && <span className="text-xs" style={{ color: '#FCE4C0', opacity: 0.7 }}>empty</span>}
                        {b.text && <span className="text-xs text-green-500/70">✓</span>}
                      </div>
                      <textarea
                        value={b.text}
                        onChange={e =>
                          setBubbles(prev =>
                            prev.map(bb => (bb.id === b.id ? { ...bb, text: e.target.value } : bb))
                          )
                        }
                        onClick={e => {
                          e.stopPropagation()
                          setSelectedId(b.id)
                        }}
                        placeholder="Type translation here..."
                        rows={3}
                        className="w-full bg-gray-900 text-gray-100 text-sm rounded px-2 py-1.5 border border-gray-700 outline-none resize-none placeholder:text-gray-600 transition-colors"
                        style={b.id === selectedId ? { borderColor: 'rgba(207,218,90,0.5)' } : {}}
                      />
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