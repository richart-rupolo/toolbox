import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, Save } from 'lucide-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import PageShell from '../../components/layout/PageShell'
import ToolShell from '../../components/layout/ToolShell'
import Button from '../../components/ui/Button'
import Select from '../../components/ui/Select'
import { useFileDownload } from '../../hooks/useFileDownload'
import type { PageComponentProps } from '../types'
import * as textUtils from './textUtils'
import './TextEditor.scss'

const quillModules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }, { align: [] }],
    ['link', 'image', 'video', 'formula', 'clean'],
  ],
}

const quillFormats = [
  'font',
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'color',
  'background',
  'script',
  'list',
  'bullet',
  'indent',
  'direction',
  'align',
  'link',
  'image',
  'video',
  'formula',
]

const TextEditor = (_props: PageComponentProps) => {
  const { t } = useTranslation()
  const [fileName, setFileName] = useState('novo-arquivo.txt')
  const [selectedActionValue, setSelectedActionValue] = useState('remove-double-spaces')
  const [text, setText] = useState('')
  const { downloadText } = useFileDownload()

  const actionOptions = useMemo(
    () => [
      { label: t('i18n_removeDuplicateSpaces'), value: 'remove-double-spaces', fn: textUtils.removeDoubleSpaces },
      { label: t('i18n_removeExtraLineBreaks'), value: 'remove-extra-line-breaks', fn: textUtils.removeExtraLineBreaks },
      { label: t('i18n_tabsToSpaces'), value: 'tabs-to-spaces', fn: textUtils.removeTabs },
      { label: t('i18n_uppercase'), value: 'uppercase', fn: textUtils.toUpperCase },
      { label: t('i18n_lowercase'), value: 'lowercase', fn: textUtils.toLowerCase },
      { label: t('i18n_capitalized'), value: 'capitalized', fn: textUtils.capitalizeText },
      { label: t('i18n_removeFormatting'), value: 'remove-formatting', fn: textUtils.removeFormatting },
      { label: t('i18n_removeAccents'), value: 'remove-accents', fn: textUtils.removeAccents },
      { label: t('i18n_trimLines'), value: 'trim-lines', fn: textUtils.trimLines },
      { label: t('i18n_sortLinesAZ'), value: 'sort-lines', fn: textUtils.sortLines },
      { label: t('i18n_removeDuplicateLines'), value: 'remove-duplicate-lines', fn: textUtils.removeDuplicateLines },
      { label: t('i18n_reverseText'), value: 'reverse-text', fn: textUtils.reverseText },
      { label: t('i18n_compressOneLine'), value: 'compress-one-line', fn: textUtils.compressOneLine },
      { label: t('i18n_extractNumbers'), value: 'extract-numbers', fn: textUtils.extractNumbers },
      { label: t('i18n_extractEmails'), value: 'extract-emails', fn: textUtils.extractEmails },
      { label: t('i18n_jsonString'), value: 'json-string', fn: textUtils.toJSONString },
    ],
    [t],
  )

  const selectedAction = actionOptions.find((action) => action.value === selectedActionValue) ?? actionOptions[0]

  const handleApplyAction = () => {
    const plainText = text.replace(/<[^>]+>/g, '')
    setText(selectedAction.fn(plainText))
  }

  const handleSave = () => {
    downloadText(text, fileName)
  }

  const actions = (
    <>
      <input
        aria-label={t('i18n_fileName')}
        className="field-input text-editor-file-name"
        onChange={(event) => setFileName(event.target.value)}
        placeholder={t('i18n_fileName')}
        type="text"
        value={fileName}
      />

      <div className="text-editor-select">
        <Select
          onChange={(option) => setSelectedActionValue(option?.value ?? selectedActionValue)}
          options={actionOptions.map((action) => ({ label: action.label, value: action.value }))}
          value={{ label: selectedAction.label, value: selectedAction.value }}
        />
      </div>

      <Button icon={<Play />} onClick={handleApplyAction} variant="secondary">
        {t('i18n_apply')}
      </Button>
      <Button icon={<Save />} onClick={handleSave} variant="success">
        {t('i18n_save')}
      </Button>
    </>
  )

  return (
    <PageShell title={t('i18n_textEditorTitle')}>
      <ToolShell actions={actions} description={t('i18n_typeEditSave')} title={t('i18n_editor')}>
        <div className="text-editor-editor">
          <ReactQuill
            formats={quillFormats}
            modules={quillModules}
            onChange={setText}
            theme="snow"
            value={text}
          />
        </div>
      </ToolShell>
    </PageShell>
  )
}

export default TextEditor
