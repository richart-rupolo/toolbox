import { useTranslation } from 'react-i18next'

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
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ 
            background: 'var(--midnight-darker)', 
            padding: '1.5rem', 
            borderRadius: '6px', 
            border: '1px solid var(--border-color)' 
          }}>
            <h3 style={{ color: 'var(--hacker-green)', marginBottom: '0.5rem' }}>{t('i18n_textEditor')}</h3>
            <p style={{ color: 'var(--text-light-gray)', fontSize: '0.9rem' }}>
              {t('i18n_textEditorDesc')}
            </p>
          </div>
          
          <div style={{ 
            background: 'var(--midnight-darker)', 
            padding: '1.5rem', 
            borderRadius: '6px', 
            border: '1px solid var(--border-color)' 
          }}>
            <h3 style={{ color: 'var(--hacker-green)', marginBottom: '0.5rem' }}>{t('i18n_jsonFormatter')}</h3>
            <p style={{ color: 'var(--text-light-gray)', fontSize: '0.9rem' }}>
              {t('i18n_jsonFormatterDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
