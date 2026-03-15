'use client'

import { Text } from 'react-konva'
import { Bubble } from '@/lib/types'
import { fitText } from '@/lib/text-fit'

interface TextOverlayProps {
  bubble: Bubble
  scale: number
}

export default function TextOverlay({ bubble, scale }: TextOverlayProps) {
  if (!bubble.translation.trim()) return null

  const scaledWidth = bubble.width * scale
  const scaledHeight = bubble.height * scale

  const { fontSize, lines } = fitText(
    bubble.translation,
    bubble.width,   // pass unscaled dimensions to fitText
    bubble.height,
    28,
    8,
    'Bangers'
  )

  const lineHeight = fontSize * 1.4
  const totalTextHeight = lines.length * lineHeight
  const startY = bubble.y * scale + (scaledHeight - totalTextHeight) / 2

  return (
    <>
      {lines.map((line, i) => (
        <Text
          key={i}
          text={line}
          x={bubble.x * scale}
          y={startY + i * lineHeight}
          width={scaledWidth}
          fontSize={fontSize * scale}
          fontFamily="Bangers"
          fill="black"
          align="center"
          listening={false}
        />
      ))}
    </>
  )
}