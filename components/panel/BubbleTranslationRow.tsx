'use client'

import { useProjectStore } from '@/lib/store'
import { Bubble } from '@/lib/types'

const PRESETS = [
  { color: '#ffffff', label: 'White' },
  { color: '#fffde7', label: 'Cream' },
  { color: '#e3f2fd', label: 'Ice Blue' },
  { color: '#fce4ec', label: 'Blush' },
  { color: '#f3e5f5', label: 'Lavender' },
  { color: '#e8f5e9', label: 'Mint' },
  { color: '#000000', label: 'Black' },
]

interface BubbleTranslationRowProps {
  bubble: Bubble
  index: number
}

export default function BubbleTranslationRow({ bubble, index }: BubbleTranslationRowProps) {
  const selectedBubbleId = useProjectStore((s) => s.selectedBubbleId)
  const setSelectedBubble = useProjectStore((s) => s.setSelectedBubble)
  const updateTranslation = useProjectStore((s) => s.updateTranslation)
  const updateBubble = useProjectStore((s) => s.updateBubble)

  const isSelected = selectedBubbleId === bubble.id
  const bgColor = bubble.bgColor ?? '#ffffff'
  const isLight = isColorLight(bgColor)

  return (
    <div
      className={`
        p-3 rounded-lg border transition-colors cursor-pointer
        ${isSelected
          ? 'border-indigo-500 bg-indigo-950/40'
          : 'border-gray-700 bg-gray-800/40 hover:border-gray-600'}
      `}
      onClick={() => setSelectedBubble(bubble.id)}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-400">
          Bubble {index + 1}
        </span>
        {!bubble.translation && (
          <span className="text-xs text-amber-500/70">empty</span>
        )}
        {bubble.translation && (
          <span className="text-xs text-green-500/70">✓</span>
        )}
      </div>

      {/* Translation textarea */}
      <textarea
        value={bubble.translation}
        onChange={(e) => updateTranslation(bubble.id, e.target.value)}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedBubble(bubble.id)
        }}
        placeholder="Type translation here..."
        rows={3}
        className={`
          w-full bg-gray-900 text-gray-100 text-sm rounded px-2 py-1.5
          border transition-colors resize-none outline-none
          placeholder:text-gray-600 mb-2
          ${isSelected
            ? 'border-indigo-500/50 focus:border-indigo-400'
            : 'border-gray-700 focus:border-gray-500'}
        `}
      />

      {/* Color picker */}
      <div
        className="flex items-center gap-1.5 flex-wrap"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[10px] text-gray-600 uppercase tracking-wider mr-0.5">
          Fill
        </span>

        {/* Preset swatches */}
        {PRESETS.map(({ color, label }) => (
          <button
            key={color}
            title={label}
            onClick={() => updateBubble(bubble.id, { bgColor: color })}
            className="w-4 h-4 rounded-full border transition-transform hover:scale-110 shrink-0"
            style={{
              background: color,
              borderColor: bgColor === color ? '#818cf8' : 'rgba(255,255,255,0.2)',
              boxShadow: bgColor === color ? '0 0 0 1.5px #818cf8' : 'none',
            }}
          />
        ))}

        {/* Custom color input */}
        <label
          title="Custom color"
          className="w-4 h-4 rounded-full border border-white/20 overflow-hidden cursor-pointer shrink-0 relative hover:scale-110 transition-transform"
          style={{ background: 'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)' }}
        >
          <input
            type="color"
            value={bgColor}
            onChange={(e) => updateBubble(bubble.id, { bgColor: e.target.value })}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
        </label>

        {/* Current color preview */}
        <div
          className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10"
          style={{ background: bgColor }}
        >
          <span
            className="text-[10px] font-mono"
            style={{ color: isLight ? '#00000080' : '#ffffff80' }}
          >
            {bgColor}
          </span>
        </div>
      </div>
    </div>
  )
}

function isColorLight(hex: string): boolean {
  try {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 > 128
  } catch {
    return true
  }
}