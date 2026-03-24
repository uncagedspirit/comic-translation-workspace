import Konva from 'konva'
import JSZip from 'jszip'
import { Project } from './types'
import { fitText } from './text-fit'

function isColorLight(hex: string): boolean {
  try {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 > 128
  } catch {
    return true
  }
}

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
      const width  = img.naturalWidth
      const height = img.naturalHeight

      const container = document.createElement('div')
      container.style.position = 'absolute'
      container.style.top  = '-9999px'
      container.style.left = '-9999px'
      document.body.appendChild(container)

      const stage = new Konva.Stage({ container, width, height })
      const layer = new Konva.Layer()
      stage.add(layer)

      layer.add(new Konva.Image({ image: img, width, height }))

      for (const bubble of page.bubbles) {
        if (!bubble.translation.trim()) continue

        const padding    = 8
        const bgColor    = bubble.bgColor    ?? '#ffffff'
        const fontFamily = bubble.fontFamily ?? 'Bangers'
        const textColor  = isColorLight(bgColor) ? 'black' : 'white'

        if (bubble.shape === 'ellipse') {
          layer.add(new Konva.Ellipse({
            x:       bubble.x + bubble.width  / 2,
            y:       bubble.y + bubble.height / 2,
            radiusX: bubble.width  / 2 - 4,
            radiusY: bubble.height / 2 - 4,
            fill:    bgColor,
          }))
        } else {
          layer.add(new Konva.Rect({
            x:            bubble.x + 4,
            y:            bubble.y + 4,
            width:        bubble.width  - 8,
            height:       bubble.height - 8,
            fill:         bgColor,
            cornerRadius: 4,
          }))
        }

        const { fontSize } = fitText(
          bubble.translation,
          bubble.width,
          bubble.height,
          28,
          8,
          fontFamily
        )

        layer.add(new Konva.Text({
          text:          bubble.translation,
          x:             bubble.x + padding,
          y:             bubble.y + padding,
          width:         bubble.width  - padding * 2,
          height:        bubble.height - padding * 2,
          fontSize,
          fontFamily,
          fill:          textColor,
          align:         'center',
          verticalAlign: 'middle',
          wrap:          'word',
        }))
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
    const base64  = dataUrl.split(',')[1]
    const pageNum = String(i + 1).padStart(2, '0')
    zip.file(`page-${pageNum}.png`, base64, { base64: true })
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `${project.name.replace(/[^a-z0-9]/gi, '-')}.zip`
  a.click()
  URL.revokeObjectURL(url)
}