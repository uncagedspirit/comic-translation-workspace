// ExportButton.tsx
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
    setIsExporting(true); setError(null)
    try {
      await exportChapter(project)
      const getRes = await fetch('/api/user/export-flag')
      const { hasExported } = await getRes.json() as { hasExported: boolean }
      if (hasExported === false) {
        const postRes = await fetch('/api/user/export-flag', { method: 'POST' })
        if (postRes.ok) setTimeout(() => setShowFeedback(true), 800)
      }
    } catch (err) {
      setError('Export failed.')
    } finally {
      setIsExporting(false)
    }
  }

  const total = project?.pages.reduce((acc, p) => acc + p.bubbles.length, 0) ?? 0
  const translated = project?.pages.reduce((acc, p) => acc + p.bubbles.filter(b => b.translation.trim()).length, 0) ?? 0

  return (
    <>
      <div className="flex items-center gap-3">
        {total > 0 && <span className="text-xs" style={{ color: '#6b5e56' }}>{translated}/{total} translated</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
        <button onClick={handleExport} disabled={isExporting || !project}
          className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
          style={isExporting ? { background: '#ddd6ce', color: '#6b5e56', cursor: 'not-allowed' } : { background: '#7AB648', color: '#fff', boxShadow: '0 2px 8px rgba(122,182,72,0.3)' }}>
          {isExporting ? 'Exporting...' : '↓ Export ZIP'}
        </button>
      </div>
      {showFeedback && <ExportFeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  )
}