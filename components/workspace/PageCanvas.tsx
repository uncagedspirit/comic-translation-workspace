'use client'

import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Image as KonvaImage, Rect } from 'react-konva'
import Konva from 'konva'
import { useProjectStore } from '@/lib/store'
import BubbleRect from './BubbleRect'
import TextOverlay from './TextOverlay'

const ZOOM_STEPS = [0.25, 0.33, 0.5, 0.67, 0.75, 1.0, 1.25, 1.5]
const DEFAULT_ZOOM_INDEX = 2 // 0.5 = 50%

interface PageCanvasProps {
  zoom: number
}

export default function PageCanvas({ zoom }: PageCanvasProps) {
  const currentPage = useProjectStore((s) => s.getCurrentPage())
  const currentPageIndex = useProjectStore((s) => s.currentPageIndex)
  const bubbles = useProjectStore((s) => s.getCurrentPageBubbles())
  const activeTool = useProjectStore((s) => s.activeTool)
  const selectedBubbleId = useProjectStore((s) => s.selectedBubbleId)
  const setSelectedBubble = useProjectStore((s) => s.setSelectedBubble)
  const setActiveTool = useProjectStore((s) => s.setActiveTool)
  const addBubble = useProjectStore((s) => s.addBubble)
  const deleteBubble = useProjectStore((s) => s.deleteBubble)

  const stageRef = useRef<Konva.Stage>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imageSize, setImageSize] = useState({ width: 800, height: 600 })

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 })
  const [drawRect, setDrawRect] = useState<{
    x: number; y: number; width: number; height: number
  } | null>(null)

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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedBubbleId) {
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

  const stageWidth = imageSize.width * zoom
  const stageHeight = imageSize.height * zoom

  const getPointerPos = () => {
    const stage = stageRef.current
    if (!stage) return { x: 0, y: 0 }
    return stage.getPointerPosition() ?? { x: 0, y: 0 }
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
        drawRect.x / zoom,
        drawRect.y / zoom,
        drawRect.width / zoom,
        drawRect.height / zoom
      )
      setSelectedBubble(id)
    }
    setDrawRect(null)
  }

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) setSelectedBubble(null)
  }

  if (!currentPage) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-600">
        No page loaded
      </div>
    )
  }

  return (
    // Scrollable container
    <div
      className="flex-1 overflow-auto bg-gray-950"
      style={{ cursor: activeTool === 'draw' ? 'crosshair' : 'default' }}
    >
      {/* Inner wrapper centers the stage when smaller than container */}
      <div
        className="min-h-full flex items-start justify-center p-6"
        style={{ minWidth: stageWidth + 48 }}
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
            style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.6)' }}
          >
            <Layer>
              <KonvaImage image={image} width={stageWidth} height={stageHeight} />
            </Layer>
            <Layer>
              {bubbles.map((bubble) => (
                <BubbleRect key={bubble.id} bubble={bubble} scale={zoom} />
              ))}
              {bubbles.map((bubble) => (
                <TextOverlay key={`text-${bubble.id}`} bubble={bubble} scale={zoom} />
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
          <div className="text-gray-600 text-sm mt-20">Loading page...</div>
        )}
      </div>
    </div>
  )
}

export { ZOOM_STEPS, DEFAULT_ZOOM_INDEX }