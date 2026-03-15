'use client'

import { useProjectStore } from '@/lib/store'

export default function Toolbar() {
  const activeTool = useProjectStore((s) => s.activeTool)
  const setActiveTool = useProjectStore((s) => s.setActiveTool)

  return (
    <div className="h-11 bg-gray-900 border-b border-gray-800 flex items-center gap-2 px-4 shrink-0">
      <span className="text-xs text-gray-500 mr-2">Tool:</span>

      <button
        onClick={() => setActiveTool('select')}
        title="Select & move bubbles (S)"
        className={`
          px-3 py-1.5 rounded text-xs font-medium transition-colors
          ${activeTool === 'select'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'}
        `}
      >
        ↖ Select
      </button>

      <button
        onClick={() => setActiveTool('draw')}
        title="Draw new bubble (D)"
        className={`
          px-3 py-1.5 rounded text-xs font-medium transition-colors
          ${activeTool === 'draw'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'}
        `}
      >
        ▭ Draw Bubble
      </button>

      <span className="text-gray-700 text-xs ml-4">
        {activeTool === 'draw'
            ? 'Drag to draw bubbles. Draw as many as you need, then switch to Select when done.'
            : 'Click a bubble to select it. Drag to move. Resize with handles. Delete key to remove.'}
      </span>
    </div>
  )
}