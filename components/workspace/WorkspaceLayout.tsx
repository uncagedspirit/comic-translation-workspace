'use client'

import PageCanvas from './PageCanvas'
import PageNavigator from './PageNavigator'
import Toolbar from './Toolbar'
import TranslationPanel from '@/components/panel/TranslationPanel'
import ExportButton from './ExportButton'

export default function WorkspaceLayout() {
  return (
    <div className="h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <div className="h-12 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center">
          <a href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Upload new chapter
          </a>
          <span className="mx-3 text-gray-700">|</span>
          <span className="text-gray-300 text-sm font-medium">
            Comic Translation Workspace
          </span>
        </div>
        <ExportButton />
      </div>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Toolbar />
          <PageCanvas />
          <PageNavigator />
        </div>

        {/* Translation panel */}
        <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col shrink-0">
          <TranslationPanel />
        </div>
      </div>
    </div>
  )
}