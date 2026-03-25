'use client'

import { useState } from 'react'
import PageCanvas, { ZOOM_STEPS, DEFAULT_ZOOM_INDEX } from './PageCanvas'
import PageNavigator from './PageNavigator'
import Toolbar from './Toolbar'
import TranslationPanel from '@/components/panel/TranslationPanel'
import ExportButton from './ExportButton'
import ExportFeedbackModal from './ExportFeedbackModal'

export default function WorkspaceLayout() {
  const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleZoomIn = () => setZoomIndex((i) => Math.min(i + 1, ZOOM_STEPS.length - 1))
  const handleZoomOut = () => setZoomIndex((i) => Math.max(i - 1, 0))
  const zoom = ZOOM_STEPS[zoomIndex]

  return (
    <div className="h-screen flex flex-col" style={{ background: '#EDE8E3' }}>
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-6 shrink-0 border-b"
        style={{ background: '#fff', borderBottomColor: 'rgba(42,36,32,0.12)' }}>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm transition-colors" style={{ color: '#6b5e56' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#2a2420')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b5e56')}>
            ← New chapter
          </a>
          <span style={{ color: 'rgba(42,36,32,0.2)' }}>|</span>
          <span className="text-sm font-semibold tracking-wide" style={{ color: '#2a2420' }}>
            Comic Translation Workspace
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowFeedback(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
            style={{ color: '#6b5e56', borderColor: 'rgba(42,36,32,0.15)', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#F2967E'; e.currentTarget.style.color = '#F2967E' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(42,36,32,0.15)'; e.currentTarget.style.color = '#6b5e56' }}>
            <span>💬</span> Feedback
          </button>
          <ExportButton />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Toolbar zoomIndex={zoomIndex} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
          <PageCanvas zoom={zoom} />
          <PageNavigator />
        </div>
        <div className="w-96 flex flex-col shrink-0 border-l" style={{ background: '#fff', borderLeftColor: 'rgba(42,36,32,0.12)' }}>
          <TranslationPanel />
        </div>
      </div>

      {showFeedback && <ExportFeedbackModal onClose={() => setShowFeedback(false)} />}
    </div>
  )
}