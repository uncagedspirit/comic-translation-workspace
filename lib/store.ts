import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project, Page, Bubble, ActiveTool, BubbleShape } from './types'

interface ProjectStore {
  projects: Record<string, Project>
  currentProjectId: string | null
  currentPageIndex: number
  selectedBubbleId: string | null
  activeTool: ActiveTool
  activeBubbleShape: BubbleShape

  createProject: (name: string, imageUrls: string[]) => string
  deleteProject: (projectId: string) => void

  setCurrentProject: (projectId: string) => void
  setCurrentPage: (index: number) => void

  addBubble: (pageIndex: number, x: number, y: number, width: number, height: number, shape: BubbleShape) => string
  updateBubble: (bubbleId: string, updates: Partial<Bubble>) => void
  deleteBubble: (bubbleId: string) => void

  updateTranslation: (bubbleId: string, text: string) => void

  setSelectedBubble: (id: string | null) => void
  setActiveTool: (tool: ActiveTool) => void
  setActiveBubbleShape: (shape: BubbleShape) => void

  getCurrentProject: () => Project | null
  getCurrentPage: () => Page | null
  getCurrentPageBubbles: () => Bubble[]
  getBubbleById: (id: string) => Bubble | null
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: {},
      currentProjectId: null,
      currentPageIndex: 0,
      selectedBubbleId: null,
      activeTool: 'draw',
      activeBubbleShape: 'ellipse',

      createProject: (name, imageUrls) => {
        const projectId = crypto.randomUUID()
        const pages: Page[] = imageUrls.map((imageUrl) => ({
          imageUrl,
          bubbles: [],
        }))
        const project: Project = {
          id: projectId,
          name,
          createdAt: Date.now(),
          pages,
        }
        set((state) => ({
          projects: { ...state.projects, [projectId]: project },
          currentProjectId: projectId,
          currentPageIndex: 0,
          selectedBubbleId: null,
        }))
        return projectId
      },

      deleteProject: (projectId) => {
        set((state) => {
          const updated = { ...state.projects }
          delete updated[projectId]
          return {
            projects: updated,
            currentProjectId:
              state.currentProjectId === projectId ? null : state.currentProjectId,
          }
        })
      },

      setCurrentProject: (projectId) => {
        set({ currentProjectId: projectId, currentPageIndex: 0, selectedBubbleId: null })
      },

      setCurrentPage: (index) => {
        set({ currentPageIndex: index, selectedBubbleId: null })
      },

      addBubble: (pageIndex, x, y, width, height, shape) => {
        const bubbleId = crypto.randomUUID()
        const bubble: Bubble = {
          id: bubbleId,
          pageIndex,
          x,
          y,
          width,
          height,
          translation: '',
          shape,
          bgColor: '#ffffff',
        }
        set((state) => {
          const project = state.projects[state.currentProjectId!]
          if (!project) return state
          const updatedPages = project.pages.map((page, i) =>
            i === pageIndex
              ? { ...page, bubbles: [...page.bubbles, bubble] }
              : page
          )
          return {
            projects: {
              ...state.projects,
              [project.id]: { ...project, pages: updatedPages },
            },
          }
        })
        return bubbleId
      },

      updateBubble: (bubbleId, updates) => {
        set((state) => {
          const project = state.projects[state.currentProjectId!]
          if (!project) return state
          const updatedPages = project.pages.map((page) => ({
            ...page,
            bubbles: page.bubbles.map((b) =>
              b.id === bubbleId ? { ...b, ...updates } : b
            ),
          }))
          return {
            projects: {
              ...state.projects,
              [project.id]: { ...project, pages: updatedPages },
            },
          }
        })
      },

      deleteBubble: (bubbleId) => {
        set((state) => {
          const project = state.projects[state.currentProjectId!]
          if (!project) return state
          const updatedPages = project.pages.map((page) => ({
            ...page,
            bubbles: page.bubbles.filter((b) => b.id !== bubbleId),
          }))
          return {
            projects: {
              ...state.projects,
              [project.id]: { ...project, pages: updatedPages },
            },
            selectedBubbleId:
              state.selectedBubbleId === bubbleId ? null : state.selectedBubbleId,
          }
        })
      },

      updateTranslation: (bubbleId, text) => {
        get().updateBubble(bubbleId, { translation: text })
      },

      setSelectedBubble: (id) => set({ selectedBubbleId: id }),
      setActiveTool: (tool) => set({ activeTool: tool }),
      setActiveBubbleShape: (shape) => set({ activeBubbleShape: shape }),

      getCurrentProject: () => {
        const { projects, currentProjectId } = get()
        return currentProjectId ? projects[currentProjectId] ?? null : null
      },

      getCurrentPage: () => {
        const { currentPageIndex } = get()
        const project = get().getCurrentProject()
        return project?.pages[currentPageIndex] ?? null
      },

      getCurrentPageBubbles: () => {
        const page = get().getCurrentPage()
        return page?.bubbles ?? []
      },

      getBubbleById: (id) => {
        const project = get().getCurrentProject()
        if (!project) return null
        for (const page of project.pages) {
          const bubble = page.bubbles.find((b) => b.id === id)
          if (bubble) return bubble
        }
        return null
      },
    }),
    {
      name: 'comic-workspace-storage',
      partialize: (state) => ({
        projects: Object.fromEntries(
          Object.entries(state.projects).map(([id, project]) => [
            id,
            {
              ...project,
              pages: project.pages.map((page) => ({
                ...page,
                imageUrl: '',
              })),
            },
          ])
        ),
      }),
    }
  )
)