export interface TextFitResult {
  fontSize: number
  lines: string[]
  fits: boolean
}

const PADDING_X = 16 // horizontal padding inside bubble (each side)
const PADDING_Y = 12 // vertical padding inside bubble (each side)
const LINE_HEIGHT_RATIO = 1.4

/**
 * Measures the pixel width of a string at a given font size using an offscreen canvas.
 */
function measureTextWidth(text: string, fontSize: number, fontFamily: string): number {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return text.length * fontSize * 0.6
  ctx.font = `${fontSize}px ${fontFamily}`
  return ctx.measureText(text).width
}

/**
 * Word-wraps text to fit within maxWidth at a given font size.
 * Returns an array of lines.
 */
function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string
): string[] {
  const words = text.trim().split(/\s+/)
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const testWidth = measureTextWidth(testLine, fontSize, fontFamily)

    if (testWidth <= maxWidth) {
      currentLine = testLine
    } else {
      if (currentLine) lines.push(currentLine)
      // If a single word is wider than maxWidth, push it anyway
      currentLine = word
    }
  }

  if (currentLine) lines.push(currentLine)
  return lines
}

/**
 * Finds the largest font size at which `text` fits inside a bubble
 * of the given dimensions.
 *
 * @param text          - The translated text to fit
 * @param bubbleWidth   - Bubble width in pixels (unscaled)
 * @param bubbleHeight  - Bubble height in pixels (unscaled)
 * @param maxFontSize   - Start trying from this size (default 28)
 * @param minFontSize   - Give up below this size (default 8)
 * @param fontFamily    - Font to measure with (default 'Bangers')
 */
export function fitText(
  text: string,
  bubbleWidth: number,
  bubbleHeight: number,
  maxFontSize = 28,
  minFontSize = 8,
  fontFamily = 'Bangers'
): TextFitResult {
  if (!text.trim()) {
    return { fontSize: maxFontSize, lines: [], fits: true }
  }

  const availableWidth = bubbleWidth - PADDING_X * 2
  const availableHeight = bubbleHeight - PADDING_Y * 2

  for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize--) {
    const lines = wrapText(text, availableWidth, fontSize, fontFamily)
    const lineHeight = fontSize * LINE_HEIGHT_RATIO
    const totalHeight = lines.length * lineHeight

    if (totalHeight <= availableHeight) {
      return { fontSize, lines, fits: true }
    }
  }

  // Text doesn't fit even at minimum size — return min size anyway
  const lines = wrapText(text, availableWidth, minFontSize, fontFamily)
  return { fontSize: minFontSize, lines, fits: false }
}