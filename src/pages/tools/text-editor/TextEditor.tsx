import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Select from '../../../components/Select/Select'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // estilo padrão do Quill
import './TextEditor.scss'
import * as utils from './TextUtils'
import type { Page } from '../../../types/Page'

export const TextEditorPage: Page = { name: 'text-editor' }



const TextEditor = () => {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('novo-arquivo.txt')

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

// Text transform actions
const actions = [
  { label: t('i18n_removeDuplicateSpaces'), fn: utils.removeDoubleSpaces },
  { label: t('i18n_removeExtraLineBreaks'), fn: utils.removeExtraLineBreaks },
  { label: t('i18n_tabsToSpaces'), fn: utils.removeTabs },
  { label: t('i18n_uppercase'), fn: utils.toUpperCase },
  { label: t('i18n_lowercase'), fn: utils.toLowerCase },
  { label: t('i18n_capitalized'), fn: utils.capitalizeText },
  { label: t('i18n_removeFormatting'), fn: utils.removeFormatting },
  { label: t('i18n_removeAccents'), fn: utils.removeAccents },
  { label: t('i18n_trimLines'), fn: utils.trimLines },
  { label: t('i18n_sortLinesAZ'), fn: utils.sortLines },
  { label: t('i18n_removeDuplicateLines'), fn: utils.removeDuplicateLines },
  { label: t('i18n_reverseText'), fn: utils.reverseText },
  { label: t('i18n_compressOneLine'), fn: utils.compressOneLine },
  { label: t('i18n_extractNumbers'), fn: utils.extractNumbers },
  { label: t('i18n_extractEmails'), fn: utils.extractEmails },
  { label: t('i18n_jsonString'), fn: utils.toJSONString },
];

const [selectedAction, setSelectedAction] = useState<typeof actions[0] | null>(actions[0])


const modules = {
  toolbar: [
    [{ 'font': [] }, { 'size': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }, { 'align': [] }],
    ['link', 'image', 'video', 'formula', 'clean']
  ],
};

const formats = [
  'font', 'size', 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
  'color', 'background', 'script', 'list', 'bullet', 'indent', 'direction', 'align',
  'link', 'image', 'video', 'formula'
];


  return (
    <div className="page">
      <h1 className="page-title">{t('i18n_textEditorTitle')}</h1>

      <div className="tool-container">
        {/* Controls */}
        <div className="controls bac" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text input-text input-group"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            placeholder="File Name"
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

          <button onClick={handleApplyAction} className="btn btn-default">Apply</button>
          <button onClick={handleSave} className="btn btn-save">Save</button>
        </div>

        {/* Editor */}
        <div className="editor-wrapper" style={{ marginTop: '1rem' }}>
          <ReactQuill
            value={text}
            onChange={setText}
            theme="snow"
            modules={modules}
            formats={formats}
            style={{ height: '45vh', background: '#1e1f22', color: '#fff', borderRadius: 8 }}
          />
        </div>
      </div>
    </div>
  )
}

export default TextEditor
