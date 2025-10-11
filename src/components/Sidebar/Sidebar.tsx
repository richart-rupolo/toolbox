import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './Sidebar.scss'
import type { Page } from '../../types/Page'
import { HomePage } from '../../pages/Home'
import { AboutPage } from '../../pages/About'
import { TextEditorPage } from '../../pages/tools/text-editor/TextEditor'
import { JsonFormatterPage } from '../../pages/tools/json-formatter/JsonFormatter'

interface SidebarProps {
  currentPage: Page
  onPageChange: (page: Page) => void
}

const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (!mobile) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

const toggleSidebar = () => {
  setCollapsed(!collapsed); // desktop + mobile usam o mesmo collapsed
};

const sidebarClasses = `sidebar ${collapsed ? 'collapsed' : ''}`;


  return (
    <aside className={sidebarClasses}>
      <div className="toggle-container">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {collapsed || open ? '◀' : '▶'}
        </button>
      </div>

      {/* Seção de Navegação */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">{t('i18n_navigation')}</h3>
        <button
          className={`nav-button ${currentPage === HomePage ? 'active' : ''}`}
          onClick={() => onPageChange(HomePage)}
        >
          {t('i18n_home')}
        </button>
        <button
          className={`nav-button ${currentPage === AboutPage ? 'active' : ''}`}
          onClick={() => onPageChange(AboutPage)}
        >
          {t('i18n_about')}
        </button>
      </div>

      {/* Seção de Ferramentas */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">{t('i18n_tools')}</h3>
        <button
          className={`tool-button ${currentPage === TextEditorPage ? 'active' : ''}`}
          onClick={() => onPageChange(TextEditorPage)}
        >
          {t('i18n_textEditor')}
        </button>
        <button
          className={`tool-button ${currentPage === JsonFormatterPage ? 'active' : ''}`}
          onClick={() => onPageChange(JsonFormatterPage)}
        >
          {t('i18n_jsonFormatter')}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
