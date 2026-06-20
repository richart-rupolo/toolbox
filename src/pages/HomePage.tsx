import { useTranslation } from 'react-i18next'
import PageShell from '../components/layout/PageShell'
import ToolShell from '../components/layout/ToolShell'
import type { PageComponentProps } from '../tools/types'
import './Home.scss'

const HomePage = ({ onNavigate, toolEntries }: PageComponentProps) => {
  const { t } = useTranslation()

  return (
    <PageShell
      description={
        <>
          {t('i18n_welcomeDescription')}
          <br />
          {t('i18n_selectTool')}
        </>
      }
      title={t('i18n_welcome')}
    >
      <ToolShell description={t('i18n_exploreTools')} title={t('i18n_availableTools')}>
        <div className="tool-grid">
          {toolEntries.map((entry) => (
            <button
              key={entry.id}
              className="surface-card surface-card--interactive tool-card"
              onClick={() => onNavigate(entry.id)}
              type="button"
            >
              <span className="tool-card__icon" aria-hidden="true">
                <entry.icon />
              </span>
              <h3 className="surface-card__title">{t(entry.labelKey)}</h3>
              <p className="surface-card__description">{t(entry.cardDescriptionKey)}</p>
            </button>
          ))}
        </div>
      </ToolShell>
    </PageShell>
  )
}

export default HomePage
