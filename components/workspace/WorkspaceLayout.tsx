'use client'

import { useState } from 'react'
import PageCanvas, { ZOOM_STEPS, DEFAULT_ZOOM_INDEX } from './PageCanvas'
import PageNavigator from './PageNavigator'
import Toolbar from './Toolbar'
import TranslationPanel from '@/components/panel/TranslationPanel'
import ExportButton from './ExportButton'

export default function WorkspaceLayout() {
  const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX)

  const handleZoomIn = () =>
    setZoomIndex((i) => Math.min(i + 1, ZOOM_STEPS.length - 1))

  const handleZoomOut = () =>
    setZoomIndex((i) => Math.max(i - 1, 0))

  const zoom = ZOOM_STEPS[zoomIndex]

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            ← New chapter
          </a>
          <span className="text-gray-700">|</span>
          <span className="text-gray-200 text-sm font-semibold tracking-wide">
            Comic Translation Workspace
          </span>
        </div>
        <ExportButton />
      </div>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas column */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Toolbar
            zoomIndex={zoomIndex}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
          <PageCanvas zoom={zoom} />
          <PageNavigator />
        </div>

        {/* Translation panel */}
        <div className="w-96 bg-gray-900 border-l border-gray-800 flex flex-col shrink-0">
          <TranslationPanel />
        </div>
      </div>
    </div>
  )
}