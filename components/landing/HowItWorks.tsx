const steps = [
  {
    number: '01',
    verb: 'UPLOAD',
    title: 'Drop your raw pages',
    desc: 'Upload your chapter images — manga, manhua, manhwa, or any comic format. Name them 01.jpg, 02.jpg and they sort automatically.',
    icon: '📂',
    bg: '#F7D9B0',
  },
  {
    number: '02',
    verb: 'DRAW',
    title: 'Box the speech bubbles',
    desc: 'Switch to Draw mode and drag rectangles or ovals over every balloon. Works on any panel layout — vertical, horizontal, webtoon strips.',
    icon: '✏️',
    bg: '#EDE8E3',
  },
  {
    number: '03',
    verb: 'TRANSLATE',
    title: 'Type your translations',
    desc: 'Click any bubble in the side panel and type. The font auto-fits. Bangers included — swap to any font you need.',
    icon: '💬',
    bg: '#F7D9B0',
  },
  {
    number: '04',
    verb: 'EXPORT',
    title: 'Download your chapter',
    desc: 'Hit Export ZIP and get every composited page as a PNG, ready to publish or share with your scanlation team.',
    icon: '📦',
    bg: '#EDE8E3',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b" style={{ borderBottomColor: 'rgba(42,36,32,0.12)' }}>
      {/* Section header */}
      <div className="px-6 py-8 border-b" style={{ background: '#7AB648', borderBottomColor: 'rgba(42,36,32,0.12)' }}>
        <p className="text-xs font-black tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Chapter 1</p>
        <h2 className="text-5xl md:text-6xl text-white" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.06em' }}>
          HOW IT WORKS
        </h2>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className="relative border-b lg:border-b-0 border-r-0 md:border-r last:border-r-0 p-8 flex flex-col gap-4 group transition-colors"
            style={{
              background: step.bg,
              borderColor: 'rgba(42,36,32,0.1)',
            }}
          >
            <div className="flex items-start justify-between">
              <span
                className="text-6xl leading-none opacity-15 group-hover:opacity-30 transition-opacity"
                style={{ fontFamily: 'var(--font-bangers)', color: idx % 2 === 0 ? '#7AB648' : '#F2967E' }}
              >
                {step.number}
              </span>
              <span className="text-3xl">{step.icon}</span>
            </div>

            <div
              className="inline-block px-2.5 py-0.5 text-xs font-black tracking-[0.25em] rounded-full self-start"
              style={{
                background: idx % 2 === 0 ? '#7AB648' : '#F2967E',
                color: '#fff',
              }}
            >
              {step.verb}
            </div>

            <h3 className="text-2xl" style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.06em', color: '#2a2420' }}>
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#6b5e56' }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}