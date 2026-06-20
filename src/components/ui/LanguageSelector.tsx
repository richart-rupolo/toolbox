import { useTranslation } from 'react-i18next'

interface LanguageSelectorProps {
  className?: string
}

const languages = [
  { code: 'pt', flag: 'BR', name: 'Portuguese' },
  { code: 'en', flag: 'EN', name: 'English' },
  { code: 'es', flag: 'ES', name: 'Spanish' },
]

const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
  }

  return (
    <div className={`language-selector ${className || ''}`.trim()}>
      {languages.map((language) => (
        <button
          key={language.code}
          className={`flag-button ${i18n.language === language.code ? 'active' : ''}`.trim()}
          onClick={() => handleLanguageChange(language.code)}
          title={language.name}
          type="button"
        >
          <span className="flag">{language.flag}</span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector
