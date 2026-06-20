import type { ComponentType, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export type PageId = 'home' | 'about' | 'text-editor' | 'json-formatter' | 'ssl-certificate'
export type PageSection = 'navigation' | 'tools'

export interface ToolRegistryEntry {
  id: PageId
  section: 'tools'
  labelKey: string
  cardDescriptionKey: string
  component: ComponentType<PageComponentProps>
  icon: LucideIcon
}

export interface PageRegistryEntry {
  id: PageId
  section: PageSection
  labelKey: string
  cardDescriptionKey?: string
  component: ComponentType<PageComponentProps>
  icon: LucideIcon
}

export interface PageComponentProps {
  onNavigate: (pageId: PageId) => void
  toolEntries: ToolRegistryEntry[]
}

export interface AppLayoutProps {
  children: ReactNode
  currentPageId: PageId
  onNavigate: (pageId: PageId) => void
  pageEntries: PageRegistryEntry[]
}
