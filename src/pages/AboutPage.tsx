import { useTranslation } from 'react-i18next'
import PageShell from '../components/layout/PageShell'
import ToolShell from '../components/layout/ToolShell'
import SurfaceCard from '../components/ui/SurfaceCard'
import type { PageComponentProps } from '../tools/types'
import './About.scss'

const AboutPage = (_props: PageComponentProps) => {
  const { t } = useTranslation()

  return (
    <PageShell title={t('i18n_aboutTitle')} description={t('i18n_aboutDescription')}>
      <ToolShell title={t('i18n_characteristics')} description={t('i18n_whatMakesSpecial')}>
        <div className="surface-grid about-feature-grid">
          <SurfaceCard description={t('i18n_interfaceDesc')} title={t('i18n_interface')} />
          <SurfaceCard description={t('i18n_performanceDesc')} title={t('i18n_performance')} />
          <SurfaceCard description={t('i18n_responsiveDesc')} title={t('i18n_responsive')} />
        </div>

        <SurfaceCard className="about-tech-card" title={t('i18n_technologies')}>
          <div className="surface-grid about-tech-grid">
            <div>
              <p className="about-tech-label">{t('i18n_frontend')}</p>
              <p>{t('i18n_frontendTech')}</p>
            </div>
            <div>
              <p className="about-tech-label">{t('i18n_build')}</p>
              <p>{t('i18n_buildTech')}</p>
            </div>
            <div>
              <p className="about-tech-label">{t('i18n_style')}</p>
              <p>{t('i18n_styleTech')}</p>
            </div>
          </div>
        </SurfaceCard>
      </ToolShell>
    </PageShell>
  )
}

export default AboutPage
