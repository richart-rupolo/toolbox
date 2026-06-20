import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './Sidebar.scss'
import type { PageId, PageRegistryEntry } from '../../tools/types'

interface SidebarProps {
  currentPageId: PageId
  onNavigate: (pageId: PageId) => void
  pageEntries: PageRegistryEntry[]
}

const Sidebar = ({ currentPageId, onNavigate, pageEntries }: SidebarProps) => {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)

  const navigationEntries = useMemo(
    () => pageEntries.filter((entry) => entry.section === 'navigation'),
    [pageEntries],
  )

  const toolEntries = useMemo(
    () => pageEntries.filter((entry) => entry.section === 'tools'),
    [pageEntries],
  )

  const toggleSidebar = () => {
    setCollapsed((isCollapsed) => !isCollapsed)
  }

  const getButtonClassName = (entry: PageRegistryEntry) => {
    const baseClassName = entry.section === 'tools' ? 'tool-button' : 'nav-button'
    const isActive = currentPageId === entry.id ? 'active' : ''

    return `${baseClassName} ${isActive}`.trim()
  }

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="toggle-container">
        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="sidebar-toggle"
          onClick={toggleSidebar}
          type="button"
        >
          {collapsed ? '>' : '<'}
        </button>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">{t('i18n_navigation')}</h3>
        {navigationEntries.map((entry) => (
          <SidebarButton
            key={entry.id}
            collapsed={collapsed}
            entry={entry}
            label={t(entry.labelKey)}
            onClick={() => onNavigate(entry.id)}
            className={getButtonClassName(entry)}
          />
        ))}
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">{t('i18n_tools')}</h3>
        {toolEntries.map((entry) => (
          <SidebarButton
            key={entry.id}
            collapsed={collapsed}
            entry={entry}
            label={t(entry.labelKey)}
            onClick={() => onNavigate(entry.id)}
            className={getButtonClassName(entry)}
          />
        ))}
      </div>
    </aside>
  )
}

interface SidebarButtonProps {
  className: string
  collapsed: boolean
  entry: PageRegistryEntry
  label: string
  onClick: () => void
}

const SidebarButton = ({ className, collapsed, entry, label, onClick }: SidebarButtonProps) => {
  const Icon = entry.icon

  return (
    <button
      aria-label={collapsed ? label : undefined}
      className={className}
      onClick={onClick}
      title={collapsed ? label : undefined}
      type="button"
    >
      <Icon aria-hidden="true" className="sidebar-button-icon" />
      <span className="sidebar-button-label">{label}</span>
    </button>
  )
}

export default Sidebar
