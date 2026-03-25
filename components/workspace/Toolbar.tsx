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
  const activeBubbleShape = useProjectStore((s) => s.activeBubbleShape)
  const setActiveBubbleShape = useProjectStore((s) => s.setActiveBubbleShape)

  const zoomPercent = Math.round(ZOOM_STEPS[zoomIndex] * 100)
  const canZoomIn = zoomIndex < ZOOM_STEPS.length - 1
  const canZoomOut = zoomIndex > 0
  const isSelectMode = activeTool === 'select'

  const activeStyle = { background: '#CFDA5A', color: '#0a0a0a' }
  const inactiveClass = 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
  const disabledClass = 'bg-gray-800/40 text-gray-700 cursor-not-allowed'

  return (
    <div className="h-11 bg-gray-900 border-b border-gray-800 flex items-center gap-2 px-4 shrink-0" style={{ borderBottomColor: '#285A71' }}>

      {/* Tool selector */}
      <span className="text-xs text-gray-500 mr-1">Tool:</span>
      <button
        onClick={() => setActiveTool('select')}
        title="Select & move bubbles (S)"
        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${activeTool === 'select' ? '' : inactiveClass}`}
        style={activeTool === 'select' ? activeStyle : {}}
      >
        ↖ Select Bubble
      </button>
      <button
        onClick={() => setActiveTool('draw')}
        title="Draw new bubble (D)"
        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${activeTool === 'draw' ? '' : inactiveClass}`}
        style={activeTool === 'draw' ? activeStyle : {}}
      >
        ▭ Draw Bubble
      </button>

      <span className="text-gray-700 mx-2">|</span>

      {/* Shape selector */}
      <span className={`text-xs mr-1 ${isSelectMode ? 'text-gray-700' : 'text-gray-500'}`}>
        Shape:
      </span>
      <button
        onClick={() => setActiveBubbleShape('rect')}
        disabled={isSelectMode}
        title="Rectangle bubble"
        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
          isSelectMode ? disabledClass : activeBubbleShape === 'rect' ? '' : inactiveClass
        }`}
        style={!isSelectMode && activeBubbleShape === 'rect' ? activeStyle : {}}
      >
        ▭ Rect
      </button>
      <button
        onClick={() => setActiveBubbleShape('ellipse')}
        disabled={isSelectMode}
        title="Oval / ellipse bubble"
        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
          isSelectMode ? disabledClass : activeBubbleShape === 'ellipse' ? '' : inactiveClass
        }`}
        style={!isSelectMode && activeBubbleShape === 'ellipse' ? activeStyle : {}}
      >
        ◯ Oval
      </button>

      <span className="text-gray-700 mx-2">|</span>

      {/* Zoom controls */}
      <span className="text-xs text-gray-500 mr-1">Zoom:</span>
      <button
        onClick={onZoomOut}
        disabled={!canZoomOut}
        title="Zoom out"
        className={`w-7 h-7 rounded text-sm font-bold transition-colors flex items-center justify-center ${
          canZoomOut ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-800/40 text-gray-600 cursor-not-allowed'
        }`}
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
        className={`w-7 h-7 rounded text-sm font-bold transition-colors flex items-center justify-center ${
          canZoomIn ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-800/40 text-gray-600 cursor-not-allowed'
        }`}
      >
        +
      </button>

      {/* Hint */}
      <span className="text-gray-700 text-xs ml-4">
        {activeTool === 'draw'
          ? `Drawing ${activeBubbleShape === 'ellipse' ? 'oval' : 'rectangle'} bubbles. Switch to Select when done.`
          : 'Click a bubble to select it. Drag to move. Delete key to remove.'}
      </span>
    </div>
  )
}