'use client'

import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import { useProjectStore } from '@/lib/store'

export default function PageCanvas() {
  const currentPage = useProjectStore((s) => s.getCurrentPage())
  const containerRef = useRef<HTMLDivElement>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 })
  const [scale, setScale] = useState(1)
  const [imageSize, setImageSize] = useState({ width: 800, height: 600 })

  // Load image when page changes
  useEffect(() => {
    if (!currentPage?.imageUrl) {
      setImage(null)
      return
    }

    const img = new window.Image()
    img.src = currentPage.imageUrl
    img.onload = () => {
      setImage(img)
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight })
    }
  }, [currentPage?.imageUrl])

  // Measure container and calculate scale to fit image
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

  useEffect(() => {
    if (imageSize.width === 0) return
    const scaleX = containerSize.width / imageSize.width
    const scaleY = containerSize.height / imageSize.height
    setScale(Math.min(scaleX, scaleY, 1)) // never scale up beyond 100%
  }, [containerSize, imageSize])

  const stageWidth = imageSize.width * scale
  const stageHeight = imageSize.height * scale

  if (!currentPage) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-600">
        No page loaded
      </div>
    )
  }

  return (
    <div ref={containerRef} className="flex-1 flex items-center justify-center bg-gray-950 overflow-hidden">
      {image ? (
        <Stage
          width={stageWidth}
          height={stageHeight}
          listening={true}
        >
          <Layer>
            <KonvaImage
              image={image}
              width={stageWidth}
              height={stageHeight}
            />
          </Layer>
        </Stage>
      ) : (
        <div className="text-gray-600 text-sm">Loading page...</div>
      )}
    </div>
  )
}