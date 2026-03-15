'use client'

import { useProjectStore } from '@/lib/store'
import { ZOOM_STEPS } from './PageCanvas'

interface ToolbarProps {
  zoomIndex: number
  onZoomIn: () => void
  onZoomOut: () => void
}

export default function Toolbar({ zoomIndex, onZoomIn, onZoomOut }: ToolbarProps) {
  const activeTool = useProjectStore((s) => s.activeTool)
  const setActiveTool = useProjectStore((s) => s.setActiveTool)

  const zoomPercent = Math.round(ZOOM_STEPS[zoomIndex] * 100)
  const canZoomIn = zoomIndex < ZOOM_STEPS.length - 1
  const canZoomOut = zoomIndex > 0

  return (
    <div className="h-11 bg-gray-900 border-b border-gray-800 flex items-center gap-2 px-4 shrink-0">
      {/* Draw / Select tools */}
      <span className="text-xs text-gray-500 mr-1">Tool:</span>

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

      {/* Divider */}
      <span className="text-gray-700 mx-2">|</span>

      {/* Zoom controls */}
      <span className="text-xs text-gray-500 mr-1">Zoom:</span>

      <button
        onClick={onZoomOut}
        disabled={!canZoomOut}
        title="Zoom out"
        className={`
          w-7 h-7 rounded text-sm font-bold transition-colors flex items-center justify-center
          ${canZoomOut
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            : 'bg-gray-800/40 text-gray-600 cursor-not-allowed'}
        `}
      >
        −
      </button>

      <span className="text-xs text-gray-300 w-10 text-center tabular-nums">
        {zoomPercent}%
      </span>

      <button
        onClick={onZoomIn}
        disabled={!canZoomIn}
        title="Zoom in"
        className={`
          w-7 h-7 rounded text-sm font-bold transition-colors flex items-center justify-center
          ${canZoomIn
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            : 'bg-gray-800/40 text-gray-600 cursor-not-allowed'}
        `}
      >
        +
      </button>

      {/* Hint text */}
      <span className="text-gray-700 text-xs ml-4">
        {activeTool === 'draw'
          ? 'Drag to draw bubbles. Switch to Select when done.'
          : 'Click a bubble to select it. Drag to move. Delete key to remove.'}
      </span>
    </div>
  )
}