'use client'

import { useRef, useEffect } from 'react'
import { Rect, Transformer } from 'react-konva'
import Konva from 'konva'
import { useProjectStore } from '@/lib/store'
import { Bubble } from '@/lib/types'

interface BubbleRectProps {
  bubble: Bubble
  scale: number
}

export default function BubbleRect({ bubble, scale }: BubbleRectProps) {
  const rectRef = useRef<Konva.Rect>(null)
  const trRef = useRef<Konva.Transformer>(null)
  const selectedBubbleId = useProjectStore((s) => s.selectedBubbleId)
  const setSelectedBubble = useProjectStore((s) => s.setSelectedBubble)
  const updateBubble = useProjectStore((s) => s.updateBubble)
  const setActiveTool = useProjectStore((s) => s.setActiveTool)

  const isSelected = selectedBubbleId === bubble.id

  useEffect(() => {
    if (isSelected && trRef.current && rectRef.current) {
      trRef.current.nodes([rectRef.current])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <Rect
        ref={rectRef}
        x={bubble.x * scale}
        y={bubble.y * scale}
        width={bubble.width * scale}
        height={bubble.height * scale}
        fill="rgba(99, 102, 241, 0.15)"
        stroke={isSelected ? '#818cf8' : '#6366f1'}
        strokeWidth={isSelected ? 2 : 1.5}
        cornerRadius={4}
        draggable={true}
        onClick={() => {
          setSelectedBubble(bubble.id)
          setActiveTool('select')
        }}
        onTap={() => {
          setSelectedBubble(bubble.id)
          setActiveTool('select')
        }}
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
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20 || newBox.height < 20) return oldBox
            return newBox
          }}
        />
      )}
    </>
  )
}