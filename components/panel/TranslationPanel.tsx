'use client'

import { useProjectStore } from '@/lib/store'
import BubbleTranslationRow from './BubbleTranslationRow'

export default function TranslationPanel() {
  const bubbles = useProjectStore((s) => s.getCurrentPageBubbles())
  const currentPageIndex = useProjectStore((s) => s.currentPageIndex)
  const setActiveTool = useProjectStore((s) => s.setActiveTool)

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="px-4 py-3 border-b shrink-0" style={{ borderBottomColor: '#285A71' }}>
        <h2 className="text-sm font-semibold text-gray-200">Translations</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Page {currentPageIndex + 1} — {bubbles.length} bubble{bubbles.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Bubble list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
        {bubbles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-3">
            <span className="text-3xl">▭</span>
            <p className="text-gray-500 text-sm">
              No bubbles on this page yet.
            </p>
            <button
              onClick={() => setActiveTool('draw')}
              className="text-xs transition-colors hover:opacity-80"
              style={{ color: '#CFDA5A' }}
            >
              Switch to Draw mode →
            </button>
          </div>
        ) : (
          bubbles.map((bubble, index) => (
            <BubbleTranslationRow
              key={bubble.id}
              bubble={bubble}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  )
}