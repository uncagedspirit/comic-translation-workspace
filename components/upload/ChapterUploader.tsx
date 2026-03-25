'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useProjectStore } from '@/lib/store'

export default function ChapterUploader() {
  const router = useRouter()
  const createProject = useProjectStore((s) => s.createProject)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files)

      const invalid = fileArray.filter((f) => !ACCEPTED_TYPES.includes(f.type))
      if (invalid.length > 0) {
        setError('Only JPG, PNG, and WebP images are supported.')
        return
      }

      if (fileArray.length > 50) {
        setError('Maximum 50 pages per chapter.')
        return
      }

      if (fileArray.length === 0) {
        setError('Please upload at least one image.')
        return
      }

      setError(null)

      const sorted = fileArray.sort((a, b) => a.name.localeCompare(b.name))
      const imageUrls = sorted.map((f) => URL.createObjectURL(f))
      const projectName = sorted[0].name.replace(/\.[^/.]+$/, '') + ' (chapter)'
      const projectId = createProject(projectName, imageUrls)
      router.push(`/workspace/${projectId}`)
    },
    [createProject, router]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      processFiles(e.dataTransfer.files)
    },
    [processFiles]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) processFiles(e.target.files)
    },
    [processFiles]
  )

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className="w-full border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors duration-150"
        style={isDragging
          ? { borderColor: '#CFDA5A', background: 'rgba(40,90,113,0.2)' }
          : { borderColor: '#4b5563' }
        }
        onMouseEnter={e => { if (!isDragging) e.currentTarget.style.borderColor = '#285A71' }}
        onMouseLeave={e => { if (!isDragging) e.currentTarget.style.borderColor = '#4b5563' }}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <div className="text-5xl">📂</div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-100">
            Drop your chapter pages here
          </p>
          <p className="text-sm text-gray-400 mt-1">
            JPG, PNG, or WebP — up to 50 pages
          </p>
        </div>
        <button
          className="mt-2 px-6 py-2 rounded-lg text-sm font-medium transition-colors text-[#0a0a0a]"
          style={{ background: '#CFDA5A' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#b8c24a')}
          onMouseLeave={e => (e.currentTarget.style.background = '#CFDA5A')}
        >
          Browse files
        </button>
      </div>

      <input
        id="file-input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={handleFileInput}
      />

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <p className="text-xs text-gray-500 text-center">
        Pages are sorted alphabetically by filename.
        Name them 01.jpg, 02.jpg etc. for correct order.
      </p>
    </div>
  )
}