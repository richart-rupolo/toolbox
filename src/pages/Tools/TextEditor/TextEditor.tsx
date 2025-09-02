import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Select from '../../../components/Select/Select'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // estilo padrão do Quill
import './TextEditor.scss'
import * as utils from './TextUtils'
import type { Page } from '../../../types/Page'

export const TextEditorPage: Page = { name: 'text-editor' }

// Text transform actions
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

const TextEditor = () => {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('novo-arquivo.txt')
  const [selectedAction, setSelectedAction] = useState<typeof actions[0] | null>(actions[0])
  const [fontSize, setFontSize] = useState(14)

  const handleApplyAction = () => {
    if (selectedAction) {
      const plainText = text.replace(/<[^>]+>/g, '') // strip HTML before transform
      setText(selectedAction.fn(plainText))
    }
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
        {/* Controls */}
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

          <button onClick={handleApplyAction} className="btn btn-apply">Apply</button>
          <button onClick={handleSave} className="btn btn-save">Save</button>
        </div>

        {/* Editor */}
        <div className="editor-wrapper" style={{ marginTop: '1rem' }}>
          <ReactQuill
          className='text-area-background'
            theme="snow"
            value={text}
            onChange={setText}
            style={{ height: '60vh', background: '#1e1f22', color: '#fff', borderRadius: 8, fontSize }}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['clean'],
              ],
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TextEditor
