'use client'

import { useParams } from 'next/navigation'
import { useProjectStore } from '@/lib/store'

export default function WorkspacePage() {
  const params = useParams()
  const projectId = params.projectId as string
  const project = useProjectStore((s) => s.projects[projectId])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Project not found.</p>
          <a href="/" className="text-indigo-400 text-sm mt-2 inline-block hover:underline">
            ← Back to upload
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-300 text-lg font-medium">{project.name}</p>
        <p className="text-gray-500 text-sm mt-1">{project.pages.length} pages loaded</p>
        <p className="text-gray-600 text-xs mt-4">Workspace coming in next phase</p>
      </div>
    </div>
  )
}