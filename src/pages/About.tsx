import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()

  return (
    <div className="page">
      <h1 className="page-title">{t('i18n_aboutTitle')}</h1>
      <p className="page-description">
        {t('i18n_aboutDescription')}
      </p>
      
      <div className="tool-container">
        <div className="tool-header">
          <h2 className="tool-title">{t('i18n_characteristics')}</h2>
          <p className="tool-description">
            {t('i18n_whatMakesSpecial')}
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            background: 'var(--midnight-darker)', 
            padding: '1.5rem', 
            borderRadius: '6px', 
            border: '1px solid var(--border-color)' 
          }}>
            <h3 style={{ color: 'var(--hacker-green)', marginBottom: '0.5rem' }}>{t('i18n_interface')}</h3>
            <p style={{ color: 'var(--text-light-gray)', fontSize: '0.9rem' }}>
              {t('i18n_interfaceDesc')}
            </p>
          </div>
          
          <div style={{ 
            background: 'var(--midnight-darker)', 
            padding: '1.5rem', 
            borderRadius: '6px', 
            border: '1px solid var(--border-color)' 
          }}>
            <h3 style={{ color: 'var(--hacker-green)', marginBottom: '0.5rem' }}>{t('i18n_performance')}</h3>
            <p style={{ color: 'var(--text-light-gray)', fontSize: '0.9rem' }}>
              {t('i18n_performanceDesc')}
            </p>
          </div>
          
          <div style={{ 
            background: 'var(--midnight-darker)', 
            padding: '1.5rem', 
            borderRadius: '6px', 
            border: '1px solid var(--border-color)' 
          }}>
            <h3 style={{ color: 'var(--hacker-green)', marginBottom: '0.5rem' }}>{t('i18n_responsive')}</h3>
            <p style={{ color: 'var(--text-light-gray)', fontSize: '0.9rem' }}>
              {t('i18n_responsiveDesc')}
            </p>
          </div>
        </div>
        
        <div style={{ 
          background: 'var(--midnight-darker)', 
          padding: '1.5rem', 
          borderRadius: '6px', 
          border: '1px solid var(--border-color)' 
        }}>
          <h3 style={{ color: 'var(--hacker-green)', marginBottom: '1rem' }}>{t('i18n_technologies')}</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            <div>
              <p style={{ color: 'var(--text-white)', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('i18n_frontend')}</p>
              <p style={{ color: 'var(--text-light-gray)', fontSize: '0.9rem' }}>{t('i18n_frontendTech')}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-white)', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('i18n_build')}</p>
              <p style={{ color: 'var(--text-light-gray)', fontSize: '0.9rem' }}>{t('i18n_buildTech')}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-white)', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('i18n_style')}</p>
              <p style={{ color: 'var(--text-light-gray)', fontSize: '0.9rem' }}>{t('i18n_styleTech')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
