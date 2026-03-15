import ChapterUploader from '@/components/upload/ChapterUploader'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-100 mb-2">
          Comic Translation Workspace
        </h1>
        <p className="text-gray-400 max-w-md">
          Upload your raw chapter pages, mark speech bubbles,
          type translations, and export a finished chapter — all in one place.
        </p>
      </div>
      <ChapterUploader />
    </main>
  )
}