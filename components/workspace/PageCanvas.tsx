'use client'

import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Image as KonvaImage, Rect } from 'react-konva'
import Konva from 'konva'
import { useProjectStore } from '@/lib/store'
import BubbleRect from './BubbleRect'

export default function PageCanvas() {
  const currentPage = useProjectStore((s) => s.getCurrentPage())
  const currentPageIndex = useProjectStore((s) => s.currentPageIndex)
  const bubbles = useProjectStore((s) => s.getCurrentPageBubbles())
  const activeTool = useProjectStore((s) => s.activeTool)
  const selectedBubbleId = useProjectStore((s) => s.selectedBubbleId)
  const setSelectedBubble = useProjectStore((s) => s.setSelectedBubble)
  const setActiveTool = useProjectStore((s) => s.setActiveTool)
  const addBubble = useProjectStore((s) => s.addBubble)
  const deleteBubble = useProjectStore((s) => s.deleteBubble)

  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<Konva.Stage>(null)

  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 })
  const [scale, setScale] = useState(1)
  const [imageSize, setImageSize] = useState({ width: 800, height: 600 })

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 })
  const [drawRect, setDrawRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null)

  // Load image when page changes
  useEffect(() => {
    if (!currentPage?.imageUrl) { setImage(null); return }
    const img = new window.Image()
    img.src = currentPage.imageUrl
    img.onload = () => {
      setImage(img)
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight })
    }
  }, [currentPage?.imageUrl])

  // Measure container
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setContainerSize({ width, height })
      }
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Calculate scale to fit image in container
  useEffect(() => {
    if (imageSize.width === 0) return
    const scaleX = containerSize.width / imageSize.width
    const scaleY = containerSize.height / imageSize.height
    setScale(Math.min(scaleX, scaleY, 1))
  }, [containerSize, imageSize])

  // Keyboard delete
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedBubbleId) {
        // Don't delete if user is typing in an input
        if (document.activeElement?.tagName === 'TEXTAREA') return
        if (document.activeElement?.tagName === 'INPUT') return
        deleteBubble(selectedBubbleId)
      }
      if (e.key === 'd' || e.key === 'D') setActiveTool('draw')
      if (e.key === 's' || e.key === 'S') setActiveTool('select')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedBubbleId, deleteBubble, setActiveTool])

  const stageWidth = imageSize.width * scale
  const stageHeight = imageSize.height * scale

  const getPointerPos = () => {
    const stage = stageRef.current
    if (!stage) return { x: 0, y: 0 }
    const pos = stage.getPointerPosition()
    return pos ?? { x: 0, y: 0 }
  }

  const handleMouseDown = () => {
    if (activeTool !== 'draw') return
    const pos = getPointerPos()
    setIsDrawing(true)
    setDrawStart(pos)
    setDrawRect({ x: pos.x, y: pos.y, width: 0, height: 0 })
  }

  const handleMouseMove = () => {
    if (!isDrawing || activeTool !== 'draw') return
    const pos = getPointerPos()
    setDrawRect({
      x: Math.min(pos.x, drawStart.x),
      y: Math.min(pos.y, drawStart.y),
      width: Math.abs(pos.x - drawStart.x),
      height: Math.abs(pos.y - drawStart.y),
    })
  }

  const handleMouseUp = () => {
    if (!isDrawing || !drawRect) return
    setIsDrawing(false)

    if (drawRect.width > 10 && drawRect.height > 10) {
      const id = addBubble(
        currentPageIndex,
        drawRect.x / scale,
        drawRect.y / scale,
        drawRect.width / scale,
        drawRect.height / scale
      )
      setSelectedBubble(id)
      
    }
    setDrawRect(null)
  }

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      setSelectedBubble(null)
    }
  }

  if (!currentPage) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-600">
        No page loaded
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center bg-gray-950 overflow-hidden"
      style={{ cursor: activeTool === 'draw' ? 'crosshair' : 'default' }}
    >
      {image ? (
        <Stage
          ref={stageRef}
          width={stageWidth}
          height={stageHeight}
          listening={true}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleStageClick}
        >
          <Layer>
            <KonvaImage image={image} width={stageWidth} height={stageHeight} />
          </Layer>
          <Layer>
            {bubbles.map((bubble) => (
              <BubbleRect key={bubble.id} bubble={bubble} scale={scale} />
            ))}
            {isDrawing && drawRect && (
              <Rect
                x={drawRect.x}
                y={drawRect.y}
                width={drawRect.width}
                height={drawRect.height}
                fill="rgba(99, 102, 241, 0.2)"
                stroke="#818cf8"
                strokeWidth={1.5}
                dash={[4, 4]}
              />
            )}
          </Layer>
        </Stage>
      ) : (
        <div className="text-gray-600 text-sm">Loading page...</div>
      )}
    </div>
  )
}