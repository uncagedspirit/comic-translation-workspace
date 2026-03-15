import Konva from 'konva'
import JSZip from 'jszip'
import { Project } from './types'
import { fitText } from './text-fit'

async function renderPageToPng(
  project: Project,
  pageIndex: number
): Promise<string> {
  const page = project.pages[pageIndex]

  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = page.imageUrl
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      const width = img.naturalWidth
      const height = img.naturalHeight

      const container = document.createElement('div')
      container.style.position = 'absolute'
      container.style.top = '-9999px'
      container.style.left = '-9999px'
      document.body.appendChild(container)

      const stage = new Konva.Stage({ container, width, height })
      const layer = new Konva.Layer()
      stage.add(layer)

      // Base image
      const konvaImage = new Konva.Image({ image: img, width, height })
      layer.add(konvaImage)

      for (const bubble of page.bubbles) {
        if (!bubble.translation.trim()) continue

        const padding = 8

        // White background — same shape as the bubble
        if (bubble.shape === 'ellipse') {
          const bgEllipse = new Konva.Ellipse({
            x: bubble.x + bubble.width / 2,
            y: bubble.y + bubble.height / 2,
            radiusX: bubble.width / 2 - 4,
            radiusY: bubble.height / 2 - 4,
            fill: 'white',
          })
          layer.add(bgEllipse)
        } else {
          const bgRect = new Konva.Rect({
            x: bubble.x + 4,
            y: bubble.y + 4,
            width: bubble.width - 8,
            height: bubble.height - 8,
            fill: 'white',
            cornerRadius: 4,
          })
          layer.add(bgRect)
        }

        // Get font size from fitText, then let Konva handle layout —
        // identical to how TextOverlay works in the preview
        const { fontSize } = fitText(
          bubble.translation,
          bubble.width,
          bubble.height,
          28,
          8,
          'Bangers'
        )

        const text = new Konva.Text({
          text: bubble.translation,
          x: bubble.x + padding,
          y: bubble.y + padding,
          width: bubble.width - padding * 2,
          height: bubble.height - padding * 2,
          fontSize,
          fontFamily: 'Bangers',
          fill: 'black',
          align: 'center',
          verticalAlign: 'middle',
          wrap: 'word',
        })
        layer.add(text)
      }

      layer.draw()

      try {
        const dataUrl = stage.toDataURL({ pixelRatio: 1 })
        stage.destroy()
        document.body.removeChild(container)
        resolve(dataUrl)
      } catch (err) {
        stage.destroy()
        document.body.removeChild(container)
        reject(err)
      }
    }

    img.onerror = () => reject(new Error(`Failed to load image for page ${pageIndex}`))
  })
}

export async function exportChapter(project: Project): Promise<void> {
  const zip = new JSZip()

  for (let i = 0; i < project.pages.length; i++) {
    const dataUrl = await renderPageToPng(project, i)
    const base64 = dataUrl.split(',')[1]
    const pageNum = String(i + 1).padStart(2, '0')
    zip.file(`page-${pageNum}.png`, base64, { base64: true })
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${project.name.replace(/[^a-z0-9]/gi, '-')}.zip`
  a.click()
  URL.revokeObjectURL(url)
}