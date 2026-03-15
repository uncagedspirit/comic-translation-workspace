import Konva from 'konva'
import JSZip from 'jszip'
import { Project } from './types'
import { fitText } from './text-fit'

/**
 * Renders a single page (image + text overlays) to a PNG data URL
 * using an offscreen Konva stage — no DOM mounting needed.
 */
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

      // Create an offscreen container div (not mounted to DOM visually)
      const container = document.createElement('div')
      container.style.position = 'absolute'
      container.style.top = '-9999px'
      container.style.left = '-9999px'
      document.body.appendChild(container)

      const stage = new Konva.Stage({
        container,
        width,
        height,
      })

      const layer = new Konva.Layer()
      stage.add(layer)

      // Draw the base image
      const konvaImage = new Konva.Image({
        image: img,
        width,
        height,
      })
      layer.add(konvaImage)

      // Draw text overlays for each bubble
      for (const bubble of page.bubbles) {
        if (!bubble.translation.trim()) continue

        const { fontSize, lines } = fitText(
          bubble.translation,
          bubble.width,
          bubble.height,
          28,
          8,
          'Bangers'
        )

        const lineHeight = fontSize * 1.4
        const totalTextHeight = lines.length * lineHeight
        const startY = bubble.y + (bubble.height - totalTextHeight) / 2

        // White background box behind text for readability
        const bgRect = new Konva.Rect({
          x: bubble.x + 4,
          y: bubble.y + 4,
          width: bubble.width - 8,
          height: bubble.height - 8,
          fill: 'white',
          cornerRadius: 4,
        })
        layer.add(bgRect)

        lines.forEach((line, i) => {
          const text = new Konva.Text({
            text: line,
            x: bubble.x,
            y: startY + i * lineHeight,
            width: bubble.width,
            fontSize,
            fontFamily: 'Bangers',
            fill: 'black',
            align: 'center',
          })
          layer.add(text)
        })
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

/**
 * Exports all pages of a project as a ZIP of PNG files.
 * Triggers a browser download automatically.
 */
export async function exportChapter(project: Project): Promise<void> {
  const zip = new JSZip()

  for (let i = 0; i < project.pages.length; i++) {
    const dataUrl = await renderPageToPng(project, i)
    // Strip the data:image/png;base64, prefix
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