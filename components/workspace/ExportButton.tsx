'use client'

import { useState } from 'react'
import { useProjectStore } from '@/lib/store'
import { exportChapter } from '@/lib/export-utils'
import ExportFeedbackModal from './ExportFeedbackModal'

export default function ExportButton() {
  const project = useProjectStore((s) => s.getCurrentProject())
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleExport = async () => {
    if (!project) return
    setIsExporting(true)
    setError(null)

    try {
      await exportChapter(project)

      const getRes = await fetch('/api/user/export-flag')
      const { hasExported } = await getRes.json() as { hasExported: boolean }

      if (hasExported === false) {
        // Try to mark it — only show modal if the write actually succeeded
        const postRes = await fetch('/api/user/export-flag', { method: 'POST' })
        if (postRes.ok) {
          setTimeout(() => setShowFeedback(true), 800)
        } else {
          const body = await postRes.json()
          console.error('[Export flag] POST failed:', postRes.status, body)
        }
      }
    } catch (err) {
      console.error('Export failed:', err)
      setError('Export failed. Check console for details.')
    } finally {
      setIsExporting(false)
    }
  }

  const totalBubbles =
    project?.pages.reduce((acc, page) => acc + page.bubbles.length, 0) ?? 0

  const translatedBubbles =
    project?.pages.reduce(
      (acc, page) => acc + page.bubbles.filter((b) => b.translation.trim()).length,
      0
    ) ?? 0

  return (
    <>
      <div className="flex items-center gap-3">
        {totalBubbles > 0 && (
          <span className="text-xs text-gray-500">
            {translatedBubbles}/{totalBubbles} translated
          </span>
        )}
        {error && <span className="text-xs text-red-400">{error}</span>}
        <button
          onClick={handleExport}
          disabled={isExporting || !project}
          className={`
            px-4 py-1.5 rounded text-sm font-medium transition-colors
            ${isExporting
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-500 text-white'}
          `}
        >
          {isExporting ? 'Exporting...' : '↓ Export ZIP'}
        </button>
      </div>

      {showFeedback && (
        <ExportFeedbackModal onClose={() => setShowFeedback(false)} />
      )}
    </>
  )
}