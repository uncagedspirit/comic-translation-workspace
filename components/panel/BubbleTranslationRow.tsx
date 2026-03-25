'use client'
import { useProjectStore } from '@/lib/store'
import { Bubble } from '@/lib/types'

const PRESETS = [
  { color: '#ffffff', label: 'White' },
  { color: '#fffde7', label: 'Cream' },
  { color: '#F7D9B0', label: 'Peach' },
  { color: '#EDE8E3', label: 'Linen' },
  { color: '#e3f2fd', label: 'Ice Blue' },
  { color: '#f3e5f5', label: 'Lavender' },
  { color: '#000000', label: 'Black' },
]

export const MANGA_FONTS = [
  { name: 'Bangers', label: 'Bangers' },
  { name: 'Permanent Marker', label: 'Marker' },
  { name: 'Boogaloo', label: 'Boogaloo' },
  { name: 'Chewy', label: 'Chewy' },
  { name: 'Caveat', label: 'Caveat' },
  { name: 'Patrick Hand', label: 'Patrick' },
  { name: 'Comic Neue', label: 'Comic Neue' },
]

interface Props { bubble: Bubble; index: number }

export default function BubbleTranslationRow({ bubble, index }: Props) {
  const selectedBubbleId = useProjectStore((s) => s.selectedBubbleId)
  const setSelectedBubble = useProjectStore((s) => s.setSelectedBubble)
  const updateTranslation = useProjectStore((s) => s.updateTranslation)
  const updateBubble = useProjectStore((s) => s.updateBubble)

  const isSelected = selectedBubbleId === bubble.id
  const bgColor = bubble.bgColor ?? '#ffffff'
  const fontFamily = bubble.fontFamily ?? 'Bangers'
  const isLight = isColorLight(bgColor)

  return (
    <div className="p-3 rounded-xl border transition-colors cursor-pointer"
      style={isSelected ? { borderColor: '#7AB648', background: 'rgba(122,182,72,0.06)' } : { borderColor: 'rgba(42,36,32,0.1)', background: '#f5f1ee' }}
      onClick={() => setSelectedBubble(bubble.id)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium" style={{ color: '#6b5e56' }}>Bubble {index + 1}</span>
        {!bubble.translation && <span className="text-xs" style={{ color: '#F2967E' }}>empty</span>}
        {bubble.translation && <span className="text-xs" style={{ color: '#7AB648' }}>✓</span>}
      </div>
      <textarea value={bubble.translation} onChange={e => updateTranslation(bubble.id, e.target.value)}
        onClick={e => { e.stopPropagation(); setSelectedBubble(bubble.id) }}
        placeholder="Type translation here..." rows={3}
        className="w-full text-sm rounded-lg px-2 py-1.5 border outline-none resize-none transition-colors mb-2 placeholder:opacity-40"
        style={{ background: '#fff', color: '#2a2420', borderColor: isSelected ? 'rgba(122,182,72,0.4)' : 'rgba(42,36,32,0.12)' }} />

      {/* Fill picker */}
      <div className="flex items-center gap-1.5 flex-wrap mb-2" onClick={e => e.stopPropagation()}>
        <span className="text-[10px] uppercase tracking-wider mr-0.5" style={{ color: 'rgba(42,36,32,0.4)' }}>Fill</span>
        {PRESETS.map(({ color, label }) => (
          <button key={color} title={label} onClick={() => updateBubble(bubble.id, { bgColor: color })}
            className="w-4 h-4 rounded-full border transition-transform hover:scale-110 shrink-0"
            style={{ background: color, borderColor: bgColor === color ? '#7AB648' : 'rgba(42,36,32,0.2)', boxShadow: bgColor === color ? '0 0 0 1.5px #7AB648' : 'none' }} />
        ))}
        <label title="Custom color" className="w-4 h-4 rounded-full border overflow-hidden cursor-pointer shrink-0 relative hover:scale-110 transition-transform"
          style={{ background: 'conic-gradient(red,yellow,lime,cyan,blue,magenta,red)', borderColor: 'rgba(42,36,32,0.2)' }}>
          <input type="color" value={bgColor} onChange={e => updateBubble(bubble.id, { bgColor: e.target.value })} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
        </label>
        <div className="ml-auto flex items-center px-1.5 py-0.5 rounded-md border" style={{ background: bgColor, borderColor: 'rgba(42,36,32,0.1)' }}>
          <span className="text-[10px] font-mono" style={{ color: isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)' }}>{bgColor}</span>
        </div>
      </div>

      {/* Font picker */}
      <div className="flex items-center gap-1 flex-wrap" onClick={e => e.stopPropagation()}>
        <span className="text-[10px] uppercase tracking-wider mr-0.5 shrink-0" style={{ color: 'rgba(42,36,32,0.4)' }}>Font</span>
        {MANGA_FONTS.map(f => (
          <button key={f.name} title={f.name} onClick={() => updateBubble(bubble.id, { fontFamily: f.name })}
            className="px-1.5 py-0.5 rounded-md text-[11px] leading-snug transition-colors border shrink-0"
            style={fontFamily === f.name
              ? { borderColor: '#7AB648', background: 'rgba(122,182,72,0.12)', color: '#5d9130', fontFamily: f.name }
              : { borderColor: 'rgba(42,36,32,0.12)', background: '#fff', color: '#6b5e56', fontFamily: f.name }}>
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function isColorLight(hex: string): boolean {
  try {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
    return (r*299 + g*587 + b*114)/1000 > 128
  } catch { return true }
}