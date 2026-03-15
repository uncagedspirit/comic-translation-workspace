const steps = [
  {
    number: '01',
    verb: 'UPLOAD',
    title: 'Drop your raw pages',
    desc: 'Upload your chapter images. Sort by filename — name them 01.jpg, 02.jpg and you\'re done.',
    icon: '📂',
    color: '#e11d1d',
  },
  {
    number: '02',
    verb: 'DRAW',
    title: 'Box the speech bubbles',
    desc: 'Switch to Draw mode and drag rectangles or ovals over every balloon. Resize anytime.',
    icon: '✏️',
    color: '#ffffff',
  },
  {
    number: '03',
    verb: 'TRANSLATE',
    title: 'Type your translations',
    desc: 'Click any bubble in the side panel and type. The font auto-fits. Bangers included.',
    icon: '💬',
    color: '#e11d1d',
  },
  {
    number: '04',
    verb: 'EXPORT',
    title: 'Download your chapter',
    desc: 'Hit Export ZIP and get every composited page as a PNG, ready to publish.',
    icon: '📦',
    color: '#ffffff',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b-[3px] border-white">
      {/* Section header */}
      <div className="border-b-[3px] border-white px-6 py-6 bg-[#e11d1d]">
        <p className="text-xs font-black tracking-[0.3em] uppercase text-white/60 mb-1">Chapter 1</p>
        <h2
          className="text-5xl md:text-6xl text-white"
          style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.06em' }}
        >
          HOW IT WORKS
        </h2>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="border-r-0 md:border-r-[3px] border-b-[3px] md:border-b-0 border-white last:border-r-0 p-8 flex flex-col gap-4 hover:bg-white/[0.03] transition-colors group"
          >
            {/* Step number */}
            <div className="flex items-start justify-between">
              <span
                className="text-6xl leading-none opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ fontFamily: 'var(--font-bangers)', color: step.color }}
              >
                {step.number}
              </span>
              <span className="text-3xl">{step.icon}</span>
            </div>

            {/* Verb badge */}
            <div
              className="inline-block px-2 py-0.5 text-xs font-black tracking-[0.25em] border-2 self-start"
              style={{ borderColor: step.color, color: step.color }}
            >
              {step.verb}
            </div>

            <h3
              className="text-2xl text-white"
              style={{ fontFamily: 'var(--font-bangers)', letterSpacing: '0.06em' }}
            >
              {step.title}
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>

            {/* Connector arrow */}
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute right-[-1.5rem] top-1/2 text-gray-600 text-2xl pointer-events-none z-10">
                ▶
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}