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

  // Use fitText only to get the right fontSize — Konva handles wrapping/layout
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
      {/* White background — same as export */}
      {bubble.shape === 'ellipse' ? (
        <Ellipse
          x={(bubble.x + bubble.width / 2) * scale}
          y={(bubble.y + bubble.height / 2) * scale}
          radiusX={(bubble.width / 2 - 4) * scale}
          radiusY={(bubble.height / 2 - 4) * scale}
          fill="white"
          listening={false}
        />
      ) : (
        <Rect
          x={(bubble.x + 4) * scale}
          y={(bubble.y + 4) * scale}
          width={(bubble.width - 8) * scale}
          height={(bubble.height - 8) * scale}
          fill="white"
          cornerRadius={4}
          listening={false}
        />
      )}

      {/* Single Konva Text — wraps and aligns naturally, no jumping */}
      <Text
        text={bubble.translation}
        x={scaledX + padding}
        y={scaledY + padding}
        width={scaledWidth - padding * 2}
        height={scaledHeight - padding * 2}
        fontSize={fontSize * scale}
        fontFamily="Bangers"
        fill="black"
        align="center"
        verticalAlign="middle"
        wrap="word"
        listening={false}
      />
    </>
  )
}