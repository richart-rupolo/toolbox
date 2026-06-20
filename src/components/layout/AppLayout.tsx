import { useTranslation } from 'react-i18next'
import LanguageSelector from '../ui/LanguageSelector'
import Sidebar from './Sidebar'
import type { AppLayoutProps } from '../../tools/types'

const AppLayout = ({ children, currentPageId, onNavigate, pageEntries }: AppLayoutProps) => {
  const { t } = useTranslation()

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">{t('i18n_title')}</h1>
        <LanguageSelector />
      </header>

      <div className="main-container">
        <Sidebar currentPageId={currentPageId} onNavigate={onNavigate} pageEntries={pageEntries} />

        <main className="content">{children}</main>
      </div>
    </div>
  )
}

export default AppLayout
