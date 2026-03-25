'use client'
import { useProjectStore } from '@/lib/store'

export default function PageNavigator() {
  const project = useProjectStore((s) => s.getCurrentProject())
  const currentPageIndex = useProjectStore((s) => s.currentPageIndex)
  const setCurrentPage = useProjectStore((s) => s.setCurrentPage)

  if (!project) return null

  return (
    <div className="flex items-center shrink-0 border-t" style={{ background: '#f5f1ee', borderTopColor: 'rgba(42,36,32,0.1)' }}>
      <span className="text-xs shrink-0 px-4 py-2 border-r" style={{ color: '#6b5e56', borderRightColor: 'rgba(42,36,32,0.1)' }}>
        Page {currentPageIndex + 1} / {project.pages.length}
      </span>
      <div className="flex gap-2 px-3 py-2 overflow-x-auto">
        {project.pages.map((page, index) => (
          <button key={index} onClick={() => setCurrentPage(index)}
            className="shrink-0 w-12 h-16 rounded-lg overflow-hidden border-2 transition-colors"
            style={{ borderColor: index === currentPageIndex ? '#7AB648' : 'rgba(42,36,32,0.15)', opacity: index === currentPageIndex ? 1 : 0.5 }}>
            {page.imageUrl ? (
              <img src={page.imageUrl} alt={`Page ${index + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: '#ddd6ce' }}>
                <span className="text-xs" style={{ color: '#6b5e56' }}>{index + 1}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}