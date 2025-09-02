import { useTranslation } from 'react-i18next';
import type { Page } from '../types/Page';
import './About.scss'; // ✅ importa SCSS

export const AboutPage: Page = { name: 'about' };

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="page">
      <h1 className="page-title">{t('i18n_aboutTitle')}</h1>
      <p className="page-description">{t('i18n_aboutDescription')}</p>

      <div className="tool-container">
        <div className="tool-header">
          <h2 className="tool-title">{t('i18n_characteristics')}</h2>
          <p className="tool-description">{t('i18n_whatMakesSpecial')}</p>
        </div>

        <div className="grid three-cols">
          <div className="card">
            <h3>{t('i18n_interface')}</h3>
            <p>{t('i18n_interfaceDesc')}</p>
          </div>
          <div className="card">
            <h3>{t('i18n_performance')}</h3>
            <p>{t('i18n_performanceDesc')}</p>
          </div>
          <div className="card">
            <h3>{t('i18n_responsive')}</h3>
            <p>{t('i18n_responsiveDesc')}</p>
          </div>
        </div>

        <div className="grid techs card">
          <h3>{t('i18n_technologies')}</h3>
          <div className="grid techs">
            <div>
              <p className="bold">{t('i18n_frontend')}</p>
              <p>{t('i18n_frontendTech')}</p>
            </div>
            <div>
              <p className="bold">{t('i18n_build')}</p>
              <p>{t('i18n_buildTech')}</p>
            </div>
            <div>
              <p className="bold">{t('i18n_style')}</p>
              <p>{t('i18n_styleTech')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
