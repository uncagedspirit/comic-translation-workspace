'use client'

import { useProjectStore } from '@/lib/store'
import { Bubble } from '@/lib/types'

interface BubbleTranslationRowProps {
  bubble: Bubble
  index: number
}

export default function BubbleTranslationRow({ bubble, index }: BubbleTranslationRowProps) {
  const selectedBubbleId = useProjectStore((s) => s.selectedBubbleId)
  const setSelectedBubble = useProjectStore((s) => s.setSelectedBubble)
  const updateTranslation = useProjectStore((s) => s.updateTranslation)

  const isSelected = selectedBubbleId === bubble.id

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
          placeholder:text-gray-600
          ${isSelected
            ? 'border-indigo-500/50 focus:border-indigo-400'
            : 'border-gray-700 focus:border-gray-500'}
        `}
      />
    </div>
  )
}