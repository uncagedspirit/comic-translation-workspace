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

// Realistic manga page SVG — white page, black panel borders, actual manga-style art
function MangaPageSVG() {
  // Speed lines for panel 1 radiating from center (166, 176)
  const speedLines = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2
    const cx = 166, cy = 176
    const r = 290
    return (
      <line
        key={`sl-${i}`}
        x1={cx} y1={cy}
        x2={cx + Math.cos(angle) * r}
        y2={cy + Math.sin(angle) * r}
        stroke={i % 5 === 0 ? '#aaa' : '#d8d8d8'}
        strokeWidth={i % 5 === 0 ? '1.8' : '0.8'}
      />
    )
  })

  // Screentone dots for panel 2 background
  const screentone = Array.from({ length: 22 }, (_, row) =>
    Array.from({ length: 13 }, (_, col) => (
      <circle
        key={`st-${row}-${col}`}
        cx={336 + col * 14 + (row % 2 === 0 ? 0 : 7)}
        cy={8 + row * 14}
        r="1.8"
        fill="#e0e0e0"
      />
    ))
  ).flat()

  // Horizontal motion lines for panel 3
  const motionLines = Array.from({ length: 12 }, (_, i) => (
    <line
      key={`ml-${i}`}
      x1="8"
      y1={374 + i * 26}
      x2="162"
      y2={374 + i * 26 + (i % 2 === 0 ? 8 : -4)}
      stroke={i % 3 === 0 ? '#b0b0b0' : '#d4d4d4'}
      strokeWidth={i % 3 === 0 ? '2' : '1.2'}
    />
  ))

  return (
    <svg
      viewBox="0 0 520 720"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'white' }}
    >
      {/* ── PANEL 1: Large action scene (top-left) ── */}
      <clipPath id="clip1"><rect x="8" y="8" width="316" height="336"/></clipPath>
      <rect x="6" y="6" width="320" height="340" fill="white" stroke="black" strokeWidth="5"/>
      <g clipPath="url(#clip1)">
        {speedLines}
        {/* Starburst impact ring */}
        <ellipse cx="166" cy="176" rx="72" ry="80" fill="none" stroke="black" strokeWidth="2.5" strokeDasharray="10,5"/>
        {/* Dramatic figure silhouette */}
        <ellipse cx="166" cy="128" rx="34" ry="40" fill="#111"/>
        <rect x="138" y="164" width="56" height="112" rx="10" fill="#111"/>
        {/* Left arm raised — punch */}
        <path d="M138,178 Q105,145 82,118" stroke="#111" strokeWidth="26" fill="none" strokeLinecap="round"/>
        <ellipse cx="78" cy="114" rx="18" ry="16" fill="#111"/>
        {/* Right arm down */}
        <path d="M194,178 Q220,210 230,240" stroke="#111" strokeWidth="24" fill="none" strokeLinecap="round"/>
        {/* Legs */}
        <path d="M155,276 Q148,310 142,340" stroke="#111" strokeWidth="22" fill="none" strokeLinecap="round"/>
        <path d="M177,276 Q184,310 196,340" stroke="#111" strokeWidth="22" fill="none" strokeLinecap="round"/>
      </g>

      {/* ── PANEL 2: Face close-up (top-right) ── */}
      <clipPath id="clip2"><rect x="336" y="8" width="176" height="336"/></clipPath>
      <rect x="334" y="6" width="180" height="340" fill="white" stroke="black" strokeWidth="5"/>
      <g clipPath="url(#clip2)">
        {screentone}
        {/* Face oval */}
        <ellipse cx="424" cy="175" rx="72" ry="88" fill="white"/>
        {/* Left eye */}
        <ellipse cx="396" cy="148" rx="24" ry="32" fill="white" stroke="black" strokeWidth="3.5"/>
        <ellipse cx="396" cy="150" rx="15" ry="20" fill="#111"/>
        <ellipse cx="396" cy="145" rx="9" ry="12" fill="#1a1a1a"/>
        <circle cx="388" cy="137" r="5.5" fill="white"/>
        <circle cx="400" cy="154" r="3" fill="white" opacity="0.65"/>
        {/* Right eye */}
        <ellipse cx="452" cy="148" rx="24" ry="32" fill="white" stroke="black" strokeWidth="3.5"/>
        <ellipse cx="452" cy="150" rx="15" ry="20" fill="#111"/>
        <ellipse cx="452" cy="145" rx="9" ry="12" fill="#1a1a1a"/>
        <circle cx="444" cy="137" r="5.5" fill="white"/>
        <circle cx="456" cy="154" r="3" fill="white" opacity="0.65"/>
        {/* Eyebrows — sharp */}
        <path d="M372,106 Q396,90 420,100" stroke="black" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <path d="M428,100 Q452,90 476,106" stroke="black" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        {/* Nose */}
        <path d="M420,200 Q425,218 430,224 L424,226" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Mouth — slight smirk */}
        <path d="M402,262 Q424,280 448,262" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Hair — flowing strands */}
        <path d="M334,8 Q362,90 346,205 Q350,260 338,320" stroke="black" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M352,6 Q378,75 362,185" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M514,8 Q488,88 506,200 Q512,258 502,330" stroke="black" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M500,6 Q478,72 494,172" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round"/>
      </g>

      {/* ── PANEL 3: Small action — running figure (bottom-left) ── */}
      <clipPath id="clip3"><rect x="8" y="356" width="156" height="356"/></clipPath>
      <rect x="6" y="354" width="160" height="360" fill="white" stroke="black" strokeWidth="5"/>
      <g clipPath="url(#clip3)">
        {motionLines}
        {/* Running figure */}
        <circle cx="86" cy="432" r="22" fill="none" stroke="black" strokeWidth="4"/>
        <line x1="86" y1="454" x2="82" y2="548" stroke="black" strokeWidth="6" strokeLinecap="round"/>
        {/* Arms pumping */}
        <path d="M82,476 Q52,508 42,530" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M82,476 Q118,456 130,438" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Legs stride */}
        <path d="M82,548 Q60,592 52,628" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M82,548 Q112,582 124,614" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Trail lines */}
        <line x1="8" y1="465" x2="56" y2="468" stroke="#888" strokeWidth="2.5"/>
        <line x1="8" y1="478" x2="50" y2="481" stroke="#aaa" strokeWidth="2"/>
        <line x1="8" y1="491" x2="46" y2="494" stroke="#bbb" strokeWidth="1.5"/>
        <line x1="8" y1="504" x2="42" y2="505" stroke="#ccc" strokeWidth="1"/>
      </g>

      {/* ── PANEL 4: Dialog scene — draw your bubbles here! (bottom-right) ── */}
      <clipPath id="clip4"><rect x="176" y="356" width="336" height="356"/></clipPath>
      <rect x="174" y="354" width="340" height="360" fill="white" stroke="black" strokeWidth="5"/>
      <g clipPath="url(#clip4)">
        <rect x="176" y="356" width="336" height="356" fill="#f7f7f7"/>
        {/* Character 1 — dark uniform */}
        <ellipse cx="254" cy="462" rx="28" ry="35" fill="#1a1a1a"/>
        <rect x="226" y="494" width="56" height="100" rx="12" fill="#1a1a1a"/>
        <path d="M226,510 Q186,545 176,565" stroke="#1a1a1a" strokeWidth="24" fill="none" strokeLinecap="round"/>
        <path d="M282,510 Q278,552 280,582" stroke="#1a1a1a" strokeWidth="22" fill="none" strokeLinecap="round"/>
        <path d="M235,594 Q218,646 210,706" stroke="#1a1a1a" strokeWidth="20" fill="none" strokeLinecap="round"/>
        <path d="M273,594 Q262,646 258,706" stroke="#1a1a1a" strokeWidth="20" fill="none" strokeLinecap="round"/>
        {/* Character 2 — lighter */}
        <ellipse cx="432" cy="462" rx="28" ry="35" fill="#444"/>
        <rect x="404" y="494" width="56" height="100" rx="12" fill="#444"/>
        <path d="M460,510 Q500,540 510,560" stroke="#444" strokeWidth="24" fill="none" strokeLinecap="round"/>
        <path d="M404,510 Q408,552 406,582" stroke="#444" strokeWidth="22" fill="none" strokeLinecap="round"/>
        <path d="M451,594 Q468,646 476,706" stroke="#444" strokeWidth="20" fill="none" strokeLinecap="round"/>
        <path d="M413,594 Q424,646 428,706" stroke="#444" strokeWidth="20" fill="none" strokeLinecap="round"/>
        {/* Dashed placeholder speech bubbles — prompting user to draw here */}
        <ellipse cx="315" cy="406" rx="68" ry="34" fill="white" stroke="#b0b0b0" strokeWidth="1.8" strokeDasharray="6,4"/>
        <path d="M288,440 L268,464" stroke="#b0b0b0" strokeWidth="1.8" strokeDasharray="5,4" fill="none"/>
        <text x="315" y="410" textAnchor="middle" fontSize="11" fill="#b0b0b0" fontFamily="sans-serif">your bubble</text>
        <ellipse cx="376" cy="392" rx="58" ry="30" fill="white" stroke="#b0b0b0" strokeWidth="1.8" strokeDasharray="6,4"/>
        <path d="M394,422 L416,458" stroke="#b0b0b0" strokeWidth="1.8" strokeDasharray="5,4" fill="none"/>
        <text x="376" y="395" textAnchor="middle" fontSize="11" fill="#b0b0b0" fontFamily="sans-serif">your bubble</text>
      </g>

      {/* Outer page border */}
      <rect x="2" y="2" width="516" height="716" fill="none" stroke="black" strokeWidth="3"/>
    </svg>
  )
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
      {/* Section header — same style as other sections */}
      <div className="border-b-[3px] border-white px-6 py-6 flex items-center justify-between bg-[#111]">
        <div>
          <p className="text-xs font-black tracking-[0.3em] uppercase text-gray-600 mb-1">Chapter 2</p>
          <h2
            className="text-5xl md:text-6xl text-white"
            style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.06em' }}
          >
            TRY IT NOW
          </h2>
        </div>
        <p className="text-sm text-gray-500 max-w-xs text-right hidden md:block">
          A live preview of the workspace. Draw a bubble, type a translation.
        </p>
      </div>

      {/* ─── WORKSPACE SHELL — 80% wide centered box ─── */}
      <div className="bg-[#0a0a0a] py-10 px-6">
      <div
        className="mx-auto overflow-hidden border-[3px] border-white"
        style={{ width: '80%' }}
      >

        {/* Workspace header — same as WorkspaceLayout */}
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

            {/* Toolbar — same as real Toolbar component */}
            <div className="h-11 bg-gray-900 border-b border-gray-800 flex items-center gap-2 px-4 shrink-0 flex-wrap">
              <span className="text-xs text-gray-500 mr-1">Tool:</span>
              <button
                onClick={() => setActiveTool('select')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  activeTool === 'select'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                ↖ Select Bubble
              </button>
              <button
                onClick={() => setActiveTool('draw')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  activeTool === 'draw'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                ▭ Draw Bubble
              </button>

              <span className="text-gray-700 mx-1">|</span>
              <span className="text-xs text-gray-500 mr-1">Shape:</span>
              <button
                onClick={() => setActiveBubbleShape('rect')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  activeBubbleShape === 'rect'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                ▭ Rect
              </button>
              <button
                onClick={() => setActiveBubbleShape('ellipse')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  activeBubbleShape === 'ellipse'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
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
                  : 'Click a bubble to select it. Drag to move.'}
              </span>
            </div>

            {/* Canvas — same as PageCanvas: bg-gray-950, scroll, page in center */}
            <div
              className="flex-1 overflow-auto bg-[#030712] flex items-start justify-center p-6"
              style={{ cursor: activeTool === 'draw' ? 'crosshair' : 'default' }}
            >
              {/* Manga page container — white page like a real uploaded image */}
              <div
                ref={canvasRef}
                className="relative shrink-0 select-none"
                style={{
                  width: '310px',
                  height: '430px',
                  boxShadow: '0 4px 40px rgba(0,0,0,0.9)',
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={() => { if (drawing) { setDrawing(false); setPreview(null) } }}
              >
                {/* The actual manga page SVG */}
                <MangaPageSVG />

                {/* Hint overlay when no bubbles drawn */}
                {bubbles.length === 0 && activeTool === 'select' && (
                  <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none">
                    <div className="bg-black/70 text-white text-xs px-4 py-2.5 rounded text-center leading-relaxed border border-gray-700">
                      Click <span className="text-indigo-400 font-bold">▭ Draw Bubble</span> in the toolbar,
                      <br />then drag on the page to place a bubble
                    </div>
                  </div>
                )}
                {activeTool === 'draw' && bubbles.length === 0 && (
                  <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none">
                    <div className="bg-indigo-900/80 text-indigo-200 text-xs px-4 py-2.5 rounded text-center animate-pulse border border-indigo-700">
                      Click &amp; drag anywhere on the page
                    </div>
                  </div>
                )}

                {/* Rendered bubbles — same look as BubbleRect + TextOverlay */}
                {bubbles.map(b => {
                  const isSelected = b.id === selectedId
                  const isEllipse = b.shape === 'ellipse'
                  return (
                    <div
                      key={b.id}
                      className={`absolute flex items-center justify-center cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-indigo-400 bg-indigo-950/30'
                          : 'border-indigo-600/60 bg-indigo-950/10 hover:border-indigo-400'
                      }`}
                      style={{
                        left: b.x, top: b.y, width: b.w, height: b.h,
                        border: '2px solid',
                        borderRadius: isEllipse ? '50%' : '3px',
                        borderColor: isSelected ? '#818cf8' : 'rgba(99,102,241,0.6)',
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
                        <span className="text-indigo-400/50 text-xs pointer-events-none">click to type</span>
                      )}
                    </div>
                  )
                })}

                {/* Draw preview rectangle */}
                {preview && preview.w > 4 && (
                  <div
                    className="absolute border-2 border-dashed border-indigo-400 bg-indigo-950/20 pointer-events-none"
                    style={{
                      left: preview.x, top: preview.y,
                      width: preview.w, height: preview.h,
                      borderRadius: activeBubbleShape === 'ellipse' ? '50%' : '3px',
                    }}
                  />
                )}
              </div>
            </div>

            {/* Page Navigator — same as PageNavigator */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-t border-gray-800 overflow-x-auto shrink-0">
              <span className="text-xs text-gray-500 shrink-0">Page 1 / 3</span>
              <div className="flex gap-2 ml-2">
                {[true, false, false].map((active, i) => (
                  <div
                    key={i}
                    className={`shrink-0 w-10 h-14 rounded overflow-hidden border-2 transition-colors ${
                      active ? 'border-indigo-400' : 'border-gray-700 opacity-40 cursor-default'
                    }`}
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

          {/* Translation Panel — same as TranslationPanel + BubbleTranslationRow */}
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
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Switch to Draw mode →
                  </button>
                </div>
              ) : (
                bubbles.map((b, i) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedId(b.id)}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      b.id === selectedId
                        ? 'border-indigo-500 bg-indigo-950/40'
                        : 'border-gray-700 bg-gray-800/40 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-400">Bubble {i + 1}</span>
                      {!b.text && <span className="text-xs text-amber-500/70">empty</span>}
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
                      className="w-full bg-gray-900 text-gray-100 text-sm rounded px-2 py-1.5 border border-gray-700 focus:border-indigo-500/50 outline-none resize-none placeholder:text-gray-600 transition-colors"
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