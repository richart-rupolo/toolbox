import { useTranslation } from 'react-i18next'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  collapsed?: boolean
  open?: boolean
}

const Sidebar = ({ currentPage, onPageChange, collapsed = false, open = false }: SidebarProps) => {
  const { t } = useTranslation()

  const sidebarClasses = `sidebar ${collapsed ? 'collapsed' : ''} ${open ? 'open' : ''}`

  return (
    <aside className={sidebarClasses}>
      {/* Seção de Navegação Principal */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">{t('i18n_navigation')}</h3>
        <button
          className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => onPageChange('home')}
        >
          {t('i18n_home')}
        </button>
        <button
          className={`nav-button ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => onPageChange('about')}
        >
          {t('i18n_about')}
        </button>
      </div>

      {/* Seção de Ferramentas */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">{t('i18n_tools')}</h3>
        <button
          className={`tool-button ${currentPage === 'text-editor' ? 'active' : ''}`}
          onClick={() => onPageChange('text-editor')}
        >
          {t('i18n_textEditor')}
        </button>
        <button
          className={`tool-button ${currentPage === 'json-formatter' ? 'active' : ''}`}
          onClick={() => onPageChange('json-formatter')}
        >
          {t('i18n_jsonFormatter')}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
