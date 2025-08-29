import { useTranslation } from 'react-i18next'

interface LanguageSelectorProps {
  className?: string
}

const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ]

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
  }

  return (
    <div className={`language-selector ${className || ''}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`flag-button ${i18n.language === lang.code ? 'active' : ''}`}
          title={lang.name}
        >
          <span className="flag">{lang.flag}</span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector
