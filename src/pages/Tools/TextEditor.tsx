import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const TextEditor = () => {
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('novo-arquivo.txt')
  const { t } = useTranslation()

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value)
  }

  const handleSave = () => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setText('')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
  }

  const handleRemoveFormatting = () => {
    // Remove formatação HTML, tags, etc.
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = text
    const plainText = tempDiv.textContent || tempDiv.innerText || ''
    setText(plainText)
  }

  const handleRemoveDuplicateSpaces = () => {
    // Remove espaços duplicados e normaliza espaços
    const cleanedText = text.replace(/\s+/g, ' ').trim()
    setText(cleanedText)
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const charCount = text.length
  const charCountNoSpaces = text.replace(/\s/g, '').length

  return (
    <div className="page">
      <h1 className="page-title">{t('i18n_textEditorTitle')}</h1>
      <p className="page-description">
        {t('i18n_textEditorDesc')}
      </p>
      
      <div className="tool-container">
        <div className="tool-header">
          <h2 className="tool-title">{t('i18n_editor')}</h2>
          <p className="tool-description">
            {t('i18n_typeEditSave')}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{t('i18n_fileName')}</label>
            <input
              type="text"
              value={fileName}
              onChange={handleFileNameChange}
              style={{
                background: 'var(--midnight-darker)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-white)',
                padding: '0.5rem',
                borderRadius: '4px',
                fontFamily: 'inherit',
                fontSize: '0.9rem'
              }}
            />
          </div>
          
          <button
            onClick={handleSave}
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
            {t('i18n_save')}
          </button>
          
          <button
            onClick={handleCopy}
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
            {t('i18n_copy')}
          </button>
          
          <button
            onClick={handleRemoveFormatting}
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
            {t('i18n_removeFormatting')}
          </button>
          
          <button
            onClick={handleRemoveDuplicateSpaces}
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
            {t('i18n_removeDuplicateSpaces')}
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
        
        {/* Estatísticas */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem', 
          marginBottom: '1rem',
          padding: '0.5rem',
          background: 'var(--midnight-darker)',
          borderRadius: '4px',
          border: '1px solid var(--border-color)'
        }}>
          <div>
            <span style={{ color: 'var(--hacker-green)', fontWeight: 'bold' }}>{t('i18n_words')}</span>
            <span style={{ color: 'var(--text-white)', marginLeft: '0.5rem' }}>{wordCount}</span>
          </div>
          <div>
            <span style={{ color: 'var(--hacker-green)', fontWeight: 'bold' }}>{t('i18n_characters')}</span>
            <span style={{ color: 'var(--text-white)', marginLeft: '0.5rem' }}>{charCount}</span>
          </div>
          <div>
            <span style={{ color: 'var(--hacker-green)', fontWeight: 'bold' }}>Caracteres (sem espaços):</span>
            <span style={{ color: 'var(--text-white)', marginLeft: '0.5rem' }}>{charCountNoSpaces}</span>
          </div>
        </div>
        
        {/* Área de texto */}
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder={t('i18n_typeHere')}
          style={{
            width: '100%',
            minHeight: '400px',
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
  )
}

export default TextEditor
