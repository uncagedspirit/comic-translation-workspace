'use client'

import { useState, useRef, useCallback } from 'react'

type Bubble = {
  id: number
  x: number
  y: number
  w: number
  h: number
  text: string
}

const PANEL_CONTENT = [
  { label: 'action', lines: 15 },
  { label: 'dialog', lines: 8 },
  { label: 'reaction', lines: 5 },
]

export default function InteractiveDemo() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [drawing, setDrawing] = useState(false)
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 })
  const [preview, setPreview] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const [activeTool, setActiveTool] = useState<'draw' | 'select'>('select')
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
      setBubbles(prev => [...prev, { id, ...preview, text: '' }])
      setSelectedId(id)
      setActiveTool('select')
    }
    setPreview(null)
  }, [drawing, preview])

  const selected = bubbles.find(b => b.id === selectedId)

  return (
    <section id="demo" className="border-b-[3px] border-white">
      {/* Header */}
      <div className="border-b-[3px] border-white px-6 py-6 flex items-center justify-between bg-[#111]">
        <div>
          <p className="text-xs font-black tracking-[0.3em] uppercase text-gray-600 mb-1">Chapter 2</p>
          <h2 className="text-5xl md:text-6xl text-white" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.06em' }}>
            TRY IT NOW
          </h2>
        </div>
        <p className="text-sm text-gray-500 max-w-xs text-right hidden md:block">
          This is a live demo. Draw a bubble, type a translation.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[560px]">
        {/* Toolbar strip */}
        <div className="border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-white bg-[#0f0f0f] p-4 flex lg:flex-col gap-3 shrink-0">
          <button
            onClick={() => setActiveTool('select')}
            title="Select (S)"
            className={`p-3 border-2 text-xs font-black tracking-wider flex flex-col items-center gap-1 transition-all ${activeTool === 'select' ? 'bg-white text-black border-white' : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
          >
            <span className="text-lg">↖</span>
            <span>SELECT</span>
          </button>
          <button
            onClick={() => setActiveTool('draw')}
            title="Draw (D)"
            className={`p-3 border-2 text-xs font-black tracking-wider flex flex-col items-center gap-1 transition-all ${activeTool === 'draw' ? 'bg-[#e11d1d] text-white border-[#e11d1d]' : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
          >
            <span className="text-lg">▭</span>
            <span>DRAW</span>
          </button>
          {bubbles.length > 0 && (
            <button
              onClick={() => { setBubbles([]); setSelectedId(null) }}
              className="p-3 border-2 border-gray-800 text-xs font-black tracking-wider text-gray-600 hover:border-gray-600 hover:text-gray-400 transition-all flex flex-col items-center gap-1"
            >
              <span className="text-lg">↺</span>
              <span>RESET</span>
            </button>
          )}
        </div>

        {/* Manga canvas */}
        <div
          ref={canvasRef}
          className="relative flex-1 bg-[#1a1a1a] overflow-hidden select-none"
          style={{ cursor: activeTool === 'draw' ? 'crosshair' : 'default', minHeight: '400px' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => { if (drawing) { setDrawing(false); setPreview(null) } }}
        >
          {/* Fake manga panels */}
          <div className="absolute inset-4 grid grid-cols-3 grid-rows-2 gap-2 pointer-events-none">
            <div className="col-span-2 bg-gray-800 border-2 border-gray-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ background: `repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 8px)` }} />
              <div className="absolute bottom-2 left-2 text-gray-600 text-xs font-bold">PANEL 1</div>
            </div>
            <div className="bg-gray-800 border-2 border-gray-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '12px 12px' }} />
              <div className="absolute bottom-2 left-2 text-gray-600 text-xs font-bold">PANEL 2</div>
            </div>
            <div className="bg-gray-800 border-2 border-gray-600 relative overflow-hidden">
              <div className="absolute bottom-2 left-2 text-gray-600 text-xs font-bold">PANEL 3</div>
            </div>
            <div className="col-span-2 bg-gray-800 border-2 border-gray-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-8" style={{ background: `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 8deg, rgba(255,255,255,0.05) 8deg, rgba(255,255,255,0.05) 9deg)` }} />
              <div className="absolute bottom-2 left-2 text-gray-600 text-xs font-bold">PANEL 4</div>
            </div>
          </div>

          {/* Hint text */}
          {bubbles.length === 0 && activeTool === 'select' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Click <span className="text-[#e11d1d] font-bold">DRAW</span> in the toolbar,</p>
                <p className="text-gray-600 text-sm">then drag on a panel to place a bubble</p>
              </div>
            </div>
          )}
          {activeTool === 'draw' && bubbles.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-[#e11d1d] text-sm font-bold animate-pulse">Click & drag to draw a speech bubble</p>
            </div>
          )}

          {/* Drawn bubbles */}
          {bubbles.map(b => (
            <div
              key={b.id}
              className={`absolute border-2 flex items-center justify-center cursor-pointer transition-all ${b.id === selectedId ? 'border-indigo-400 bg-indigo-950/30' : 'border-indigo-600/60 bg-indigo-950/10 hover:border-indigo-400'}`}
              style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
              onClick={() => { setSelectedId(b.id); setActiveTool('select') }}
            >
              {b.text ? (
                <span className="text-black text-center p-1 text-xs leading-tight font-bold bg-white w-full h-full flex items-center justify-center"
                  style={{ fontFamily: 'var(--font-bangers)', fontSize: `${Math.min(b.h / 3, 22)}px` }}>
                  {b.text}
                </span>
              ) : (
                <span className="text-indigo-400/50 text-xs">click to type</span>
              )}
            </div>
          ))}

          {/* Draw preview */}
          {preview && preview.w > 4 && (
            <div
              className="absolute border-2 border-dashed border-indigo-400 bg-indigo-950/20 pointer-events-none"
              style={{ left: preview.x, top: preview.y, width: preview.w, height: preview.h }}
            />
          )}
        </div>

        {/* Translation panel */}
        <div className="w-full lg:w-72 border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-white bg-[#0f0f0f] flex flex-col">
          <div className="border-b-[3px] border-white px-4 py-3">
            <p className="text-xs font-black tracking-widest uppercase text-gray-500">Translations</p>
            <p className="text-white text-sm mt-0.5">{bubbles.length} bubble{bubbles.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {bubbles.length === 0 ? (
              <p className="text-gray-600 text-xs text-center mt-8">Bubbles you draw will appear here</p>
            ) : (
              bubbles.map((b, i) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedId(b.id)}
                  className={`p-3 border-2 cursor-pointer transition-colors ${b.id === selectedId ? 'border-indigo-500 bg-indigo-950/40' : 'border-gray-800 hover:border-gray-600'}`}
                >
                  <p className="text-xs text-gray-500 mb-2 font-bold">BUBBLE {i + 1}</p>
                  <textarea
                    value={b.text}
                    onChange={e => setBubbles(prev => prev.map(bb => bb.id === b.id ? { ...bb, text: e.target.value } : bb))}
                    onClick={e => e.stopPropagation()}
                    placeholder="Type translation..."
                    rows={2}
                    className="w-full bg-gray-900 text-gray-100 text-sm px-2 py-1.5 border border-gray-700 focus:border-indigo-500 outline-none resize-none placeholder:text-gray-600 transition-colors"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}