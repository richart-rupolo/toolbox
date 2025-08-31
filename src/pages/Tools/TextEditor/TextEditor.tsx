import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Editor from '@monaco-editor/react'
import Select from '../../../components/Select/Select' // seu Select estilizado
import './TextEditor.css'
import * as utils from './TextUtils'
import type { Page } from '../../../types/Page'

export const TextEditorPage: Page = { name: 'text-editor' }

// Ações disponíveis
const actions = [
  { label: 'Remove Double Spaces', fn: utils.removeDoubleSpaces },
  { label: 'Remove Extra Line Breaks', fn: utils.removeExtraLineBreaks },
  { label: 'Tabs → Spaces', fn: utils.removeTabs },
  { label: 'UPPERCASE', fn: utils.toUpperCase },
  { label: 'lowercase', fn: utils.toLowerCase },
  { label: 'Capitalized', fn: utils.capitalizeText },
  { label: 'Remove Formatting', fn: utils.removeFormatting },
  { label: 'Remove Accents', fn: utils.removeAccents },
  { label: 'Trim Lines', fn: utils.trimLines },
  { label: 'Sort Lines A-Z', fn: utils.sortLines },
  { label: 'Remove Duplicate Lines', fn: utils.removeDuplicateLines },
  { label: 'Reverse Text', fn: utils.reverseText },
  { label: 'Compress One Line', fn: utils.compressOneLine },
  { label: 'Extract Numbers', fn: utils.extractNumbers },
  { label: 'Extract Emails', fn: utils.extractEmails },
  { label: 'JSON String', fn: utils.toJSONString },
]

// Linguagens do Monaco
const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'plaintext', label: 'Plain Text' },
]

const TextEditor = () => {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('novo-arquivo.txt')
  const [selectedAction, setSelectedAction] = useState<typeof actions[0] | null>(actions[0])
  const [language, setLanguage] = useState('javascript')
  const [fontSize, setFontSize] = useState(14)

  const handleApplyAction = () => {
    if (selectedAction) setText(selectedAction.fn(text))
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

  return (
    <div className="page">
      <h1 className="page-title">{t('i18n_textEditorTitle')}</h1>

      <div className="tool-container">
        {/* Controles */}
        <div className="controls" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            placeholder="File Name"
            style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #2a2a3e', background: '#050508', color: '#fff' }}
          />

          <div style={{ minWidth: 200 }}>
            <Select
              value={selectedAction ? { label: selectedAction.label, value: selectedAction.label } : null}
              onChange={opt => {
                const action = actions.find(a => a.label === opt?.value)
                setSelectedAction(action || null)
              }}
              options={actions.map(a => ({ label: a.label, value: a.label }))}
            />
          </div>

          <div style={{ minWidth: 150 }}>
            <Select
              value={languages.find(l => l.value === language)}
              onChange={opt => setLanguage(opt?.value || 'javascript')}
              options={languages}
            />
          </div>

          <input
            type="number"
            value={fontSize}
            min={10}
            max={30}
            onChange={e => setFontSize(Number(e.target.value))}
            style={{ width: 70, padding: '0.3rem', borderRadius: 4, border: '1px solid #2a2a3e', background: '#050508', color: '#fff' }}
          />

          <button onClick={handleApplyAction} className="btn btn-apply">Apply</button>
          <button onClick={handleSave} className="btn btn-save">Save</button>
        </div>

        {/* Editor */}
        <div className="editor-wrapper" style={{ marginTop: '1rem' }}>
          <Editor
            height="60vh"
            language={language}
            value={text}
            onChange={value => setText(value || '')}
            options={{
              fontSize,
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              fontFamily: 'Courier New, monospace',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TextEditor
