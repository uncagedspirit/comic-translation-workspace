export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b" style={{ borderBottomColor: 'rgba(42,36,32,0.12)' }}>

      {/* ── Chapter header ── */}
      <div className="px-6 py-8 border-b flex items-end justify-between"
        style={{ background: '#7AB648', borderBottomColor: '#2a2420' }}>
        <div>
          <p className="text-xs font-black tracking-[0.35em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.65)' }}>Chapter 1</p>
          <h2 className="text-5xl md:text-6xl text-white leading-none" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.06em' }}>
            HOW IT WORKS
          </h2>
        </div>
        {/* Manga chapter tag */}
        <div className="hidden md:flex flex-col items-end gap-1">
          <div className="px-3 py-1 text-xs font-black tracking-widest uppercase rounded-full"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
            4-step process
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>read left → right</p>
        </div>
      </div>

      {/* ── Manga page spread ── */}
      <div className="relative" style={{ background: '#f5f0eb' }}>

        {/* Paper texture overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(42,36,32,0.04) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* ── PANEL GRID — manga layout ── */}
        {/*
          Layout (desktop):
          [ PANEL 1: tall left  ] [ PANEL 2: top-right        ]
          [ PANEL 1: continued  ] [ PANEL 3: bottom-right-left ] [ PANEL 4: bottom-right ]
        */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-0"
          style={{ border: '3px solid #2a2420', minHeight: '600px' }}>

          {/* ━━━━ PANEL 1 — UPLOAD ━━━━ */}
          <div className="relative md:col-span-4 md:row-span-2 border-b md:border-b-0 md:border-r overflow-hidden flex flex-col"
            style={{ borderColor: '#2a2420', background: '#EDE8E3', minHeight: '280px' }}>

            {/* Speed lines radiating from center */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
                {Array.from({ length: 20 }).map((_, i) => {
                  const angle = (i / 20) * Math.PI * 2
                  const x2 = 150 + Math.cos(angle) * 600
                  const y2 = 200 + Math.sin(angle) * 600
                  return <line key={i} x1="150" y1="200" x2={x2} y2={y2} stroke="rgba(122,182,72,0.06)" strokeWidth="1" />
                })}
              </svg>
            </div>

            {/* Panel number tag */}
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[25px] font-black tracking-widest px-2 py-0.5 rounded"
                style={{ background: '#fff', color: '#000' }}>1</span>
            </div>

            {/* Big icon — focal point */}
            <div className="flex-1 flex items-center justify-center p-8 pt-12">
              <div className="relative">
                {/* Burst / impact shape behind icon */}
                <svg className="absolute -inset-8" viewBox="0 0 120 120" fill="none">
                  <polygon points="60,4 67,42 98,18 78,50 116,52 82,68 104,96 68,82 64,118 52,82 16,96 38,68 4,52 42,50 22,18 53,42"
                    fill="#7AB648" opacity="0.15" />
                </svg>
                <div className="text-7xl relative z-10 select-none">📂</div>
              </div>
            </div>

            {/* Action word */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 select-none pointer-events-none"
              style={{ fontFamily: 'var(--font-bangers)', fontSize: '5rem', color: '#7AB648', opacity: 0.1, letterSpacing: '0.02em', lineHeight: 1, writingMode: 'vertical-rl' }}>
              UPLOAD
            </div>

            {/* Speech bubble — bottom */}
            <div className="relative z-10 m-4 mt-0">
              <div className="relative rounded-2xl rounded-tl-sm p-4"
                style={{ background: '#fff', border: '2.5px solid #2a2420', boxShadow: '3px 3px 0 #2a2420' }}>
                {/* Bubble tail */}
                <div className="absolute -top-3 left-6 w-0 h-0"
                  style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '12px solid #2a2420' }} />
                <div className="absolute -top-2 left-[26px] w-0 h-0"
                  style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '10px solid #fff' }} />
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
                    style={{ background: '#7AB648', color: '#fff' }}>UPLOAD</span>
                </div>
                <p className="text-xs leading-relaxed font-semibold" style={{ color: '#2a2420' }}>Drop your raw pages</p>
                <p className="text-xs leading-relaxed mt-1" style={{ color: '#6b5e56' }}>
                  JPG, PNG, WebP, any file format. Sorts automatically by file name.
                </p>
              </div>
            </div>
          </div>

          {/* ━━━━ PANEL 2 — DRAW ━━━━ */}
          <div className="relative md:col-span-8 md:row-span-1 border-b overflow-hidden flex"
            style={{ borderColor: '#2a2420', background: '#F7D9B0', minHeight: '280px' }}>

            {/* Halftone dots upper right */}
            <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(42,36,32,0.12) 1.5px, transparent 1.5px)', backgroundSize: '10px 10px' }} />

            {/* Panel number */}
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[25px] font-black tracking-widest px-2 py-0.5 rounded"
                style={{ background: '#fff', color: '#000' }}>2</span>
            </div>

            {/* Left: big action typography */}
            <div className="flex-1 flex flex-col justify-center pl-8 pr-4 pt-8">
              {/* Impact word diagonal */}
              <div className="mb-2 select-none" style={{ fontFamily: 'var(--font-bangers)', fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', color: '#2a2420', lineHeight: 0.9, letterSpacing: '0.03em' }}>
                <span style={{ color: '#F2967E' }}>DRAW</span><br />
                <span style={{ fontSize: '0.45em', color: '#6b5e56', letterSpacing: '0.05em' }}>THE BUBBLES</span>
              </div>

              {/* Emphasis lines (manga speed effect — horizontal) */}
              <div className="flex flex-col gap-0.5 mb-4">
                {[100, 85, 70, 55].map((w, i) => (
                  <div key={i} className="rounded-full" style={{ height: '2px', width: `${w}%`, background: '#2a2420', opacity: 0.12 + i * 0.04 }} />
                ))}
              </div>
            </div>

            {/* Right: mock draw UI panel */}
            <div className="relative flex items-center justify-center p-6 pr-8">
              {/* Mini canvas mock */}
              <div className="relative rounded-xl overflow-hidden"
                style={{ width: 130, height: 160, background: '#fff', border: '2.5px solid #2a2420', boxShadow: '4px 4px 0 #2a2420' }}>
                {/* Fake manga panel lines */}
                <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(42,36,32,0.06) 19px, rgba(42,36,32,0.06) 20px)' }} />
                {/* Drawn bubble rect */}
                <div className="absolute rounded-lg"
                  style={{ top: 24, left: 12, width: 70, height: 40, border: '2px dashed #F2967E', background: 'rgba(242,150,126,0.1)' }}>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full" style={{ background: '#F2967E' }} />
                </div>
                {/* Second bubble ellipse */}
                <div className="absolute rounded-full"
                  style={{ top: 80, left: 30, width: 80, height: 50, border: '2px dashed #7AB648', background: 'rgba(122,182,72,0.08)' }} />
                {/* Crosshair cursor */}
                <div className="absolute" style={{ top: 50, left: 90, width: 12, height: 12 }}>
                  <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: '#F2967E' }} />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: '#F2967E' }} />
                </div>
                {/* Toolbar hint */}
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-center"
                  style={{ background: 'rgba(42,36,32,0.07)', fontSize: '7px', color: '#6b5e56', fontWeight: 700, letterSpacing: '0.05em' }}>
                  ▭ DRAW MODE
                </div>
              </div>

              {/* ✏️ floating */}
              <div className="absolute top-4 right-4 text-3xl select-none" style={{ transform: 'rotate(20deg)' }}>✏️</div>
            </div>

            {/* Aside caption */}
            <div className="absolute bottom-3 left-8 right-4">
              <p className="text-xs" style={{ color: '#6b5e56' }}>
                Drag bubble over every speech balloon, any layout works.
              </p>
            </div>
          </div>

          {/* ━━━━ PANEL 3 — TRANSLATE ━━━━ */}
          <div className="relative md:col-span-5 border-r overflow-hidden flex flex-col"
            style={{ borderColor: '#2a2420', background: '#EDE8E3', minHeight: '280px' }}>

            {/* Diagonal stripe accent top-right */}
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none overflow-hidden">
              <div className="absolute" style={{ top: -16, right: -16, width: 80, height: 80, background: '#F2967E', opacity: 0.15, transform: 'rotate(45deg)' }} />
            </div>

            {/* Panel number */}
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[25px] font-black tracking-widest px-2 py-0.5 rounded"
                style={{ background: '#fff', color: '#000' }}>3</span>
            </div>

            {/* Main content */}
            <div className="flex-1 flex gap-4 p-6 pt-10 items-start">
              {/* Big emoji */}
              <div className="text-5xl select-none shrink-0 mt-1">💬</div>

              <div className="flex-1">
                <div style={{ fontFamily: 'var(--font-bangers)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2a2420', letterSpacing: '0.04em', lineHeight: 1 }}>
                  TRANSLATE
                </div>
                <p className="text-xs leading-relaxed mt-2" style={{ color: '#6b5e56' }}>
                  Click any bubble, type your translation. Font auto-fits inside the balloon.
                </p>

                {/* Mock translation rows */}
                <div className="mt-3 space-y-1.5">
                  {[
                    { orig: '行くぞ！', trans: "Let's go!", done: true },
                    { orig: '待って…', trans: 'Wait…', done: true },
                    { orig: '何？', trans: '', done: false },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
                      style={{ background: row.done ? 'rgba(122,182,72,0.1)' : 'rgba(242,150,126,0.1)', border: `1.5px solid ${row.done ? 'rgba(122,182,72,0.3)' : 'rgba(242,150,126,0.3)'}` }}>
                      <span className="text-xs font-bold shrink-0" style={{ color: '#6b5e56', minWidth: 32 }}>{row.orig}</span>
                      <span className="text-xs" style={{ color: 'rgba(42,36,32,0.3)' }}>→</span>
                      <span className="text-xs flex-1" style={{ color: row.done ? '#2a2420' : '#F2967E', fontStyle: row.done ? 'normal' : 'italic' }}>
                        {row.done ? row.trans : 'empty…'}
                      </span>
                      <span className="text-[10px]">{row.done ? '✓' : '○'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thought bubble chain at bottom */}
            <div className="flex items-end gap-1 px-6 pb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: '#2a2420', opacity: 0.2 }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#2a2420', opacity: 0.2 }} />
              <div className="rounded-2xl px-3 py-1.5 text-xs font-bold"
                style={{ background: '#fff', border: '2px solid #2a2420', color: '#2a2420', boxShadow: '2px 2px 0 #2a2420' }}>
                Bangers · Caveat · Marker · +4 fonts
              </div>
            </div>
          </div>

          {/* ━━━━ PANEL 4 — EXPORT ━━━━ */}
          <div className="relative md:col-span-3 overflow-hidden flex flex-col"
            style={{ background: '#F2967E', minHeight: '280px' }}>

            {/* Speed lines — diagonal, radiating */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
                {Array.from({ length: 16 }).map((_, i) => {
                  const angle = (i / 16) * Math.PI * 2
                  const x2 = 100 + Math.cos(angle) * 400
                  const y2 = 150 + Math.sin(angle) * 400
                  return <line key={i} x1="100" y1="150" x2={x2} y2={y2} stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                })}
              </svg>
            </div>

            {/* Panel number */}
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[25px] font-black tracking-widest px-2 py-0.5 rounded"
                style={{ background: '#fff', color: '#000' }}>4</span>
            </div>

            {/* Big impact word */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 pt-10 relative z-10">
              <div className="text-5xl mb-3 select-none" style={{ filter: 'drop-shadow(2px 2px 0 rgba(42,36,32,0.2))' }}>📦</div>

              <div style={{ fontFamily: 'var(--font-bangers)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', letterSpacing: '0.04em', lineHeight: 0.95, textShadow: '3px 3px 0 rgba(42,36,32,0.2)' }}>
                EXPORT<br />ZIP
              </div>

              {/* Impact starburst */}
              <div className="mt-3 relative">
                <svg viewBox="0 0 80 30" width="120" height="45" className="absolute -inset-4 -z-10">
                  <ellipse cx="40" cy="15" rx="38" ry="13" fill="rgba(255,255,255,0.15)" />
                </svg>
                <p className="text-xs font-bold relative z-10" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Every page as PNG
                </p>
              </div>
            </div>

            {/* Bottom callout box */}
            <div className="m-4 mt-0 relative z-10">
              <div className="rounded-xl p-3 text-center"
                style={{ background: '#fff', border: '2.5px solid #2a2420', boxShadow: '3px 3px 0 #2a2420' }}>
                <p className="text-xs font-black" style={{ color: '#2a2420' }}>↓ Export ZIP</p>
                <p className="text-[10px] mt-0.5" style={{ color: '#6b5e56' }}>Ready to publish</p>
              </div>
            </div>

          </div>

        </div>{/* end panel grid */}

        {/* ── Page gutter label ── */}
        <div className="flex items-center justify-between px-4 py-2 border-t"
          style={{ borderTopColor: 'rgba(42,36,32,0.1)', background: '#EDE8E3' }}>
          <div className="flex items-center gap-3">
            {['UPLOAD', 'DRAW', 'TRANSLATE', 'EXPORT'].map((s, i) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-black text-white"
                  style={{ background: i % 2 === 0 ? '#7AB648' : '#F2967E' }}>{i + 1}</div>
                <span className="text-[10px] font-black tracking-widest hidden sm:block" style={{ color: 'rgba(42,36,32,0.45)' }}>{s}</span>
                {i < 3 && <span style={{ color: 'rgba(42,36,32,0.2)', fontSize: 10 }}>→</span>}
              </div>
            ))}
          </div>
          <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: 'rgba(42,36,32,0.3)' }}>
            MangaFlow · Page 1
          </p>
        </div>

      </div>
    </section>
  )
}