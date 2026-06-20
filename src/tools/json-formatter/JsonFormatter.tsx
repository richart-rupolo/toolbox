import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, ClipboardList, Copy, Package, Trash2, WandSparkles } from 'lucide-react'
import PageShell from '../../components/layout/PageShell'
import ToolShell from '../../components/layout/ToolShell'
import Button from '../../components/ui/Button'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useClipboard } from '../../hooks/useClipboard'
import type { PageComponentProps } from '../types'
import * as jsonFormatterUtils from './jsonFormatterUtils'
import './JsonFormatter.scss'

const JsonFormatter = (_props: PageComponentProps) => {
  const { t } = useTranslation()
  const [inputJson, setInputJson] = useState('')
  const [formattedJson, setFormattedJson] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isCopying, setIsCopying] = useState(false)
  const { copyText } = useClipboard()

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputJson(event.target.value)
    setIsValid(null)
    setErrorMessage('')
    setFormattedJson('')
  }

  const runFormatterAction = (action: (input: string) => string) => {
    try {
      const result = action(inputJson)
      setFormattedJson(result)
      setIsValid(true)
      setErrorMessage('')
    } catch (error) {
      setIsValid(false)
      setErrorMessage(error instanceof Error ? error.message : 'Formato invalido')
      setFormattedJson('')
    }
  }

  const handleValidate = () => {
    try {
      const result = jsonFormatterUtils.validateJsonString(inputJson)
      setIsValid(result.valid)
      setErrorMessage(result.message)
      setFormattedJson('')
    } catch (error) {
      setIsValid(false)
      setErrorMessage(error instanceof Error ? error.message : 'Formato invalido')
      setFormattedJson('')
    }
  }

  const handleSampleJson = () => {
    setInputJson(jsonFormatterUtils.getSampleJson())
    setIsValid(null)
    setErrorMessage('')
    setFormattedJson('')
  }

  const handleCopy = async () => {
    if (!formattedJson) {
      return
    }

    setIsCopying(true)

    try {
      await copyText(formattedJson)
    } finally {
      setIsCopying(false)
    }
  }

  const handleClear = () => {
    setInputJson('')
    setFormattedJson('')
    setIsValid(null)
    setErrorMessage('')
  }

  const actions = (
    <>
      <Button
        icon={<WandSparkles />}
        onClick={() => runFormatterAction(jsonFormatterUtils.formatJsonString)}
        variant="primary"
      >
        {t('i18n_format')}
      </Button>
      <Button
        icon={<Package />}
        onClick={() => runFormatterAction(jsonFormatterUtils.minifyJsonString)}
        variant="secondary"
      >
        {t('i18n_minify')}
      </Button>
      <Button icon={<CheckCircle2 />} onClick={handleValidate} variant="secondary">
        {t('i18n_validate')}
      </Button>
      <Button icon={<ClipboardList />} onClick={handleSampleJson} variant="secondary">
        {t('i18n_example')}
      </Button>
      <Button disabled={!formattedJson} icon={<Copy />} isLoading={isCopying} onClick={handleCopy} variant="secondary">
        {t('i18n_copy')}
      </Button>
      <Button icon={<Trash2 />} onClick={handleClear} variant="secondary">
        {t('i18n_clear')}
      </Button>
    </>
  )

  const status =
    isValid !== null ? (
      <div className={`status-message ${isValid ? 'status-message--success' : 'status-message--danger'}`}>
        {errorMessage}
      </div>
    ) : null

  return (
    <PageShell title={t('i18n_jsonFormatterTitle')} description={t('i18n_jsonFormatterDesc')}>
      <ToolShell
        actions={actions}
        description={t('i18n_insertJson')}
        status={status}
        title={t('i18n_formatter')}
      >
        <div className="json-formatter-grid">
          <SurfaceCard className="json-formatter-panel" title={t('i18n_inputJson')}>
            <textarea
              className="json-formatter-textarea"
              onChange={handleInputChange}
              placeholder={t('i18n_pasteJson')}
              value={inputJson}
            />
          </SurfaceCard>
          <SurfaceCard className="json-formatter-panel" title={t('i18n_result')}>
            <textarea
              className="json-formatter-textarea"
              placeholder={t('i18n_resultHere')}
              readOnly
              value={formattedJson}
            />
          </SurfaceCard>
        </div>

        <SurfaceCard className="json-formatter-tips" title={t('i18n_tips')} titleAs="h4">
          <ul className="json-formatter-tips-list">
            <li>
              <strong>{t('i18n_format')}:</strong> {t('i18n_formatTip')}
            </li>
            <li>
              <strong>{t('i18n_minify')}:</strong> {t('i18n_minifyTip')}
            </li>
            <li>
              <strong>{t('i18n_validate')}:</strong> {t('i18n_validateTip')}
            </li>
            <li>{t('i18n_exampleTip')}</li>
          </ul>
        </SurfaceCard>
      </ToolShell>
    </PageShell>
  )
}

export default JsonFormatter
