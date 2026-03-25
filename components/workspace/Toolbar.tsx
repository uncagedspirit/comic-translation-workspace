'use client'

import { useProjectStore } from '@/lib/store'
import { ZOOM_STEPS } from './PageCanvas'

interface ToolbarProps { zoomIndex: number; onZoomIn: () => void; onZoomOut: () => void }

export default function Toolbar({ zoomIndex, onZoomIn, onZoomOut }: ToolbarProps) {
  const activeTool = useProjectStore((s) => s.activeTool)
  const setActiveTool = useProjectStore((s) => s.setActiveTool)
  const activeBubbleShape = useProjectStore((s) => s.activeBubbleShape)
  const setActiveBubbleShape = useProjectStore((s) => s.setActiveBubbleShape)

  const zoomPercent = Math.round(ZOOM_STEPS[zoomIndex] * 100)
  const canZoomIn = zoomIndex < ZOOM_STEPS.length - 1
  const canZoomOut = zoomIndex > 0
  const isSelectMode = activeTool === 'select'

  const activeStyle = { background: '#7AB648', color: '#fff' }
  const inactiveStyle = { background: '#f0ebe6', color: '#6b5e56' }
  const disabledStyle = { background: 'rgba(240,235,230,0.4)', color: 'rgba(42,36,32,0.25)', cursor: 'not-allowed' as const }

  return (
    <div className="h-11 flex items-center gap-2 px-4 shrink-0 border-b" style={{ background: '#f5f1ee', borderBottomColor: 'rgba(42,36,32,0.1)' }}>
      <span className="text-xs mr-1" style={{ color: '#6b5e56' }}>Tool:</span>
      <button onClick={() => setActiveTool('select')} title="Select & move (S)"
        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
        style={activeTool === 'select' ? activeStyle : inactiveStyle}>
        ↖ Select Bubble
      </button>
      <button onClick={() => setActiveTool('draw')} title="Draw bubble (D)"
        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
        style={activeTool === 'draw' ? activeStyle : inactiveStyle}>
        ▭ Draw Bubble
      </button>

      <span style={{ color: 'rgba(42,36,32,0.2)' }} className="mx-2">|</span>

      <span className="text-xs mr-1" style={{ color: isSelectMode ? 'rgba(42,36,32,0.25)' : '#6b5e56' }}>Shape:</span>
      <button onClick={() => setActiveBubbleShape('rect')} disabled={isSelectMode}
        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
        style={isSelectMode ? disabledStyle : activeBubbleShape === 'rect' ? activeStyle : inactiveStyle}>
        ▭ Rect
      </button>
      <button onClick={() => setActiveBubbleShape('ellipse')} disabled={isSelectMode}
        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
        style={isSelectMode ? disabledStyle : activeBubbleShape === 'ellipse' ? activeStyle : inactiveStyle}>
        ◯ Oval
      </button>

      <span style={{ color: 'rgba(42,36,32,0.2)' }} className="mx-2">|</span>

      <span className="text-xs mr-1" style={{ color: '#6b5e56' }}>Zoom:</span>
      <button onClick={onZoomOut} disabled={!canZoomOut}
        className="w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center transition-colors"
        style={canZoomOut ? inactiveStyle : disabledStyle}>−</button>
      <span className="text-xs w-10 text-center tabular-nums" style={{ color: '#2a2420' }}>{zoomPercent}%</span>
      <button onClick={onZoomIn} disabled={!canZoomIn}
        className="w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center transition-colors"
        style={canZoomIn ? inactiveStyle : disabledStyle}>+</button>

      <span className="text-xs ml-4" style={{ color: 'rgba(42,36,32,0.4)' }}>
        {activeTool === 'draw'
          ? `Drawing ${activeBubbleShape === 'ellipse' ? 'oval' : 'rectangle'} bubbles — switch to Select when done.`
          : 'Click to select · Drag to move · Delete to remove'}
      </span>
    </div>
  )
}