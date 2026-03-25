'use client'

import { useRef, useEffect } from 'react'
import { Rect, Ellipse, Transformer } from 'react-konva'
import Konva from 'konva'
import { useProjectStore } from '@/lib/store'
import { Bubble } from '@/lib/types'

interface BubbleRectProps {
  bubble: Bubble
  scale: number
}

export default function BubbleRect({ bubble, scale }: BubbleRectProps) {
  const rectRef = useRef<Konva.Rect>(null)
  const ellipseRef = useRef<Konva.Ellipse>(null)
  const trRef = useRef<Konva.Transformer>(null)

  const selectedBubbleId = useProjectStore((s) => s.selectedBubbleId)
  const setSelectedBubble = useProjectStore((s) => s.setSelectedBubble)
  const updateBubble = useProjectStore((s) => s.updateBubble)

  const isSelected = selectedBubbleId === bubble.id
  const isEllipse = bubble.shape === 'ellipse'

  useEffect(() => {
    if (isSelected && trRef.current) {
      const node = isEllipse ? ellipseRef.current : rectRef.current
      if (node) {
        trRef.current.nodes([node])
        trRef.current.getLayer()?.batchDraw()
      }
    }
  }, [isSelected, isEllipse])

  const handleClick = () => setSelectedBubble(bubble.id)

  const hasTranslation = bubble.translation.trim().length > 0

  const sharedProps = {
    // Selected: yellow-green stroke; unselected: muted teal stroke
    fill: hasTranslation ? 'transparent' : 'rgba(40, 90, 113, 0.10)',
    stroke: isSelected ? '#CFDA5A' : 'rgba(207, 218, 90, 0.5)',
    strokeWidth: isSelected ? 2 : 1.5,
    draggable: true,
    onClick: handleClick,
    onTap: handleClick,
  }

  const cx = (bubble.x + bubble.width / 2) * scale
  const cy = (bubble.y + bubble.height / 2) * scale
  const rx = (bubble.width / 2) * scale
  const ry = (bubble.height / 2) * scale

  return (
    <>
      {isEllipse ? (
        <Ellipse
          ref={ellipseRef}
          x={cx}
          y={cy}
          radiusX={rx}
          radiusY={ry}
          {...sharedProps}
          onDragEnd={(e) => {
            updateBubble(bubble.id, {
              x: e.target.x() / scale - bubble.width / 2,
              y: e.target.y() / scale - bubble.height / 2,
            })
          }}
          onTransformEnd={() => {
            if (!ellipseRef.current) return
            const node = ellipseRef.current
            const scaleX = node.scaleX()
            const scaleY = node.scaleY()
            node.scaleX(1)
            node.scaleY(1)
            const newWidth = (node.radiusX() * 2 * scaleX) / scale
            const newHeight = (node.radiusY() * 2 * scaleY) / scale
            updateBubble(bubble.id, {
              x: node.x() / scale - newWidth / 2,
              y: node.y() / scale - newHeight / 2,
              width: newWidth,
              height: newHeight,
            })
          }}
        />
      ) : (
        <Rect
          ref={rectRef}
          x={bubble.x * scale}
          y={bubble.y * scale}
          width={bubble.width * scale}
          height={bubble.height * scale}
          cornerRadius={4}
          {...sharedProps}
          onDragEnd={(e) => {
            updateBubble(bubble.id, {
              x: e.target.x() / scale,
              y: e.target.y() / scale,
            })
          }}
          onTransformEnd={() => {
            if (!rectRef.current) return
            const node = rectRef.current
            const scaleX = node.scaleX()
            const scaleY = node.scaleY()
            node.scaleX(1)
            node.scaleY(1)
            updateBubble(bubble.id, {
              x: node.x() / scale,
              y: node.y() / scale,
              width: (node.width() * scaleX) / scale,
              height: (node.height() * scaleY) / scale,
            })
          }}
        />
      )}

      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          // Style the transformer handles to match the palette
          anchorFill="#CFDA5A"
          anchorStroke="#285A71"
          borderStroke="#CFDA5A"
          anchorSize={8}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20 || newBox.height < 20) return oldBox
            return newBox
          }}
        />
      )}
    </>
  )
}