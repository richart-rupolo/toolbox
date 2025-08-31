import { useTranslation } from 'react-i18next'
import './home.css'
import type { Page } from '../types/Page' // ✅ import como tipo

export const HomePage: Page = { name: 'home' }

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="page">
      <h1 className="page-title">{t('i18n_welcome')}</h1>
      <p className="page-description">
        {t('i18n_welcomeDescription')}
        <br />
        {t('i18n_selectTool')}
      </p>
      
      <div className="tool-container">
        <div className="tool-header">
          <h2 className="tool-title">{t('i18n_availableTools')}</h2>
          <p className="tool-description">
            {t('i18n_exploreTools')}
          </p>
        </div>
        
        <div className="tool-grid">
          <div className="tool-card">
            <h3 className="tool-card-title">{t('i18n_textEditor')}</h3>
            <p className="tool-card-description">
              {t('i18n_textEditorDesc')}
            </p>
          </div>
          
          <div className="tool-card">
            <h3 className="tool-card-title">{t('i18n_jsonFormatter')}</h3>
            <p className="tool-card-description">
              {t('i18n_jsonFormatterDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
