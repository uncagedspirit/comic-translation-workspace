'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useProjectStore } from '@/lib/store'
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout'

export default function WorkspacePage() {
  const params = useParams()
  const projectId = params.projectId as string
  const project = useProjectStore((s) => s.projects[projectId])
  const setCurrentProject = useProjectStore((s) => s.setCurrentProject)

  useEffect(() => {
    if (projectId) setCurrentProject(projectId)
  }, [projectId, setCurrentProject])

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

  return <WorkspaceLayout />
}