export type BubbleShape = 'rect' | 'ellipse'

export interface Bubble {
  id: string
  pageIndex: number
  x: number
  y: number
  width: number
  height: number
  translation: string
  shape: BubbleShape
}

export interface Page {
  imageUrl: string
  bubbles: Bubble[]
}

export interface Project {
  id: string
  name: string
  createdAt: number
  pages: Page[]
}

export type ActiveTool = 'select' | 'draw'