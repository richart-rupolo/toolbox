import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Page } from '../../types/Page' // ✅ import como tipo

export const JsonFormatterPage: Page = { name: 'json-formatter' }

const JsonFormatter = () => {
  const [inputJson, setInputJson] = useState('')
  const [formattedJson, setFormattedJson] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation()

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputJson(e.target.value)
    setIsValid(null)
    setErrorMessage('')
    setFormattedJson('')
  }

  const formatJson = () => {
    try {
      if (!inputJson.trim()) {
        setIsValid(false)
        setErrorMessage('Por favor, insira um JSON para formatar.')
        return
      }

      const parsed = JSON.parse(inputJson)
      const formatted = JSON.stringify(parsed, null, 2)
      
      setFormattedJson(formatted)
      setIsValid(true)
      setErrorMessage('')
    } catch (error) {
      setIsValid(false)
      setErrorMessage(`Erro de JSON: ${error instanceof Error ? error.message : 'Formato inválido'}`)
      setFormattedJson('')
    }
  }

  const minifyJson = () => {
    try {
      if (!inputJson.trim()) {
        setIsValid(false)
        setErrorMessage('Por favor, insira um JSON para minificar.')
        return
      }

      const parsed = JSON.parse(inputJson)
      const minified = JSON.stringify(parsed)
      
      setFormattedJson(minified)
      setIsValid(true)
      setErrorMessage('')
    } catch (error) {
      setIsValid(false)
      setErrorMessage(`Erro de JSON: ${error instanceof Error ? error.message : 'Formato inválido'}`)
      setFormattedJson('')
    }
  }

  const validateJson = () => {
    try {
      if (!inputJson.trim()) {
        setIsValid(false)
        setErrorMessage('Por favor, insira um JSON para validar.')
        return
      }

      JSON.parse(inputJson)
      setIsValid(true)
      setErrorMessage('JSON válido! ✅')
      setFormattedJson('')
    } catch (error) {
      setIsValid(false)
      setErrorMessage(`JSON inválido: ${error instanceof Error ? error.message : 'Formato incorreto'}`)
      setFormattedJson('')
    }
  }

  const handleCopy = () => {
    if (formattedJson) {
      navigator.clipboard.writeText(formattedJson)
    }
  }

  const handleClear = () => {
    setInputJson('')
    setFormattedJson('')
    setIsValid(null)
    setErrorMessage('')
  }

  const handleSampleJson = () => {
    const sample = `{
  "name": "Exemplo",
  "version": "1.0.0",
  "description": "JSON de exemplo",
  "features": [
    "formatação",
    "validação",
    "minificação"
  ],
  "metadata": {
    "author": "Toolbox",
    "created": "2024"
  }
}`
    setInputJson(sample)
    setIsValid(null)
    setErrorMessage('')
    setFormattedJson('')
  }

  return (
    <div className="page">
      <h1 className="page-title">{t('i18n_jsonFormatterTitle')}</h1>
      <p className="page-description">
        {t('i18n_jsonFormatterDesc')}
      </p>
      
      <div className="tool-container">
        <div className="tool-header">
          <h2 className="tool-title">{t('i18n_formatter')}</h2>
          <p className="tool-description">
            {t('i18n_insertJson')}
          </p>
        </div>
        
        {/* Controles */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <button
            onClick={formatJson}
            style={{
              background: 'var(--hacker-green)',
              color: 'var(--midnight-darker)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 'bold'
            }}
          >
            {t('i18n_format')}
          </button>
          
          <button
            onClick={minifyJson}
            style={{
              background: 'var(--midnight-lighter)',
              color: 'var(--text-white)',
              border: '1px solid var(--border-color)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {t('i18n_minify')}
          </button>
          
          <button
            onClick={validateJson}
            style={{
              background: 'var(--midnight-lighter)',
              color: 'var(--text-white)',
              border: '1px solid var(--border-color)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {t('i18n_validate')}
          </button>
          
          <button
            onClick={handleSampleJson}
            style={{
              background: 'var(--midnight-lighter)',
              color: 'var(--text-white)',
              border: '1px solid var(--border-color)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {t('i18n_example')}
          </button>
          
          <button
            onClick={handleCopy}
            disabled={!formattedJson}
            style={{
              background: formattedJson ? 'var(--midnight-lighter)' : 'var(--midnight-darker)',
              color: formattedJson ? 'var(--text-white)' : 'var(--text-light-gray)',
              border: '1px solid var(--border-color)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: formattedJson ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit'
            }}
          >
            {t('i18n_copy')}
          </button>
          
          <button
            onClick={handleClear}
            style={{
              background: 'var(--midnight-lighter)',
              color: 'var(--text-white)',
              border: '1px solid var(--border-color)',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {t('i18n_clear')}
          </button>
        </div>
        
        {/* Status */}
        {isValid !== null && (
          <div style={{ 
            padding: '0.5rem 1rem',
            marginBottom: '1rem',
            borderRadius: '4px',
            background: isValid ? 'rgba(0, 255, 65, 0.1)' : 'rgba(255, 0, 0, 0.1)',
            border: `1px solid ${isValid ? 'var(--hacker-green)' : '#ff4444'}`,
            color: isValid ? 'var(--hacker-green)' : '#ff4444'
          }}>
            {errorMessage}
          </div>
        )}
        
        {/* Áreas de texto */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1.5rem',
          marginBottom: '1rem'
        }}>
          {/* Input */}
          <div>
            <h3 style={{ color: 'var(--hacker-green)', marginBottom: '0.5rem' }}>{t('i18n_inputJson')}</h3>
            <textarea
              value={inputJson}
              onChange={handleInputChange}
              placeholder={t('i18n_pasteJson')}
              style={{
                width: '100%',
                minHeight: '300px',
                background: 'var(--midnight-darker)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-white)',
                padding: '1rem',
                borderRadius: '4px',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                resize: 'vertical'
              }}
            />
          </div>
          
          {/* Output */}
          <div>
            <h3 style={{ color: 'var(--hacker-green)', marginBottom: '0.5rem' }}>{t('i18n_result')}</h3>
            <textarea
              value={formattedJson}
              readOnly
              placeholder={t('i18n_resultHere')}
              style={{
                width: '100%',
                minHeight: '300px',
                background: 'var(--midnight-darker)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-white)',
                padding: '1rem',
                borderRadius: '4px',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                resize: 'vertical'
              }}
            />
          </div>
        </div>
        
        {/* Dicas */}
        <div style={{ 
          background: 'var(--midnight-darker)', 
          padding: '1rem', 
          borderRadius: '4px', 
          border: '1px solid var(--border-color)' 
        }}>
          <h4 style={{ color: 'var(--hacker-green)', marginBottom: '0.5rem' }}>{t('i18n_tips')}</h4>
          <ul style={{ color: 'var(--text-light-gray)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <li><strong>{t('i18n_format')}:</strong> {t('i18n_formatTip')}</li>
            <li><strong>{t('i18n_minify')}:</strong> {t('i18n_minifyTip')}</li>
            <li><strong>{t('i18n_validate')}:</strong> {t('i18n_validateTip')}</li>
            <li>{t('i18n_exampleTip')}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default JsonFormatter
