'use client'

import { useProjectStore } from '@/lib/store'

export default function PageNavigator() {
  const project = useProjectStore((s) => s.getCurrentProject())
  const currentPageIndex = useProjectStore((s) => s.currentPageIndex)
  const setCurrentPage = useProjectStore((s) => s.setCurrentPage)

  if (!project) return null

  return (
    <div className="flex items-center bg-gray-900 border-t border-gray-800 shrink-0">
      {/* Label — never scrolls */}
      <span className="text-xs text-gray-500 shrink-0 px-4 py-2 border-r border-gray-800">
        Page {currentPageIndex + 1} / {project.pages.length}
      </span>

      {/* Thumbnails — scroll horizontally only */}
      <div className="flex gap-2 px-3 py-2 overflow-x-auto">
        {project.pages.map((page, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`
              shrink-0 w-12 h-16 rounded overflow-hidden border-2 transition-colors
              ${index === currentPageIndex
                ? 'border-indigo-400'
                : 'border-gray-700 hover:border-gray-500'}
            `}
          >
            {page.imageUrl ? (
              <img
                src={page.imageUrl}
                alt={`Page ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-xs text-gray-500">{index + 1}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}