'use client'

import { Text, Rect, Ellipse } from 'react-konva'
import { Bubble } from '@/lib/types'
import { fitText } from '@/lib/text-fit'

interface TextOverlayProps {
  bubble: Bubble
  scale: number
}

export default function TextOverlay({ bubble, scale }: TextOverlayProps) {
  if (!bubble.translation.trim()) return null

  const scaledX = bubble.x * scale
  const scaledY = bubble.y * scale
  const scaledWidth = bubble.width * scale
  const scaledHeight = bubble.height * scale
  const padding = 8 * scale

  const bgColor = bubble.bgColor ?? '#ffffff'

  // Derive text color from bg luminance — dark bg gets white text
  const textColor = isColorLight(bgColor) ? 'black' : 'white'

  const { fontSize } = fitText(
    bubble.translation,
    bubble.width,
    bubble.height,
    28,
    8,
    'Bangers'
  )

  return (
    <>
      {bubble.shape === 'ellipse' ? (
        <Ellipse
          x={(bubble.x + bubble.width / 2) * scale}
          y={(bubble.y + bubble.height / 2) * scale}
          radiusX={(bubble.width / 2 - 4) * scale}
          radiusY={(bubble.height / 2 - 4) * scale}
          fill={bgColor}
          listening={false}
        />
      ) : (
        <Rect
          x={(bubble.x + 4) * scale}
          y={(bubble.y + 4) * scale}
          width={(bubble.width - 8) * scale}
          height={(bubble.height - 8) * scale}
          fill={bgColor}
          cornerRadius={4}
          listening={false}
        />
      )}

      <Text
        text={bubble.translation}
        x={scaledX + padding}
        y={scaledY + padding}
        width={scaledWidth - padding * 2}
        height={scaledHeight - padding * 2}
        fontSize={fontSize * scale}
        fontFamily="Bangers"
        fill={textColor}
        align="center"
        verticalAlign="middle"
        wrap="word"
        listening={false}
      />
    </>
  )
}

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