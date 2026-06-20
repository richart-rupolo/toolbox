import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Archive, Copy, Download, FileKey, Files, ShieldCheck, Trash2 } from 'lucide-react'
import PageShell from '../../components/layout/PageShell'
import ToolShell from '../../components/layout/ToolShell'
import Button from '../../components/ui/Button'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { useClipboard } from '../../hooks/useClipboard'
import { useFileDownload } from '../../hooks/useFileDownload'
import type { PageComponentProps } from '../types'
import {
  generateSelfSignedCertificate,
  type CertificateFormValues,
  type GeneratedCertificate,
} from './sslCertificateUtils'
import './SslCertificateGenerator.scss'

const initialValues: CertificateFormValues = {
  algorithm: 'rsa',
  commonName: 'localhost',
  organization: 'Toolbox Local',
  country: 'BR',
  validityDays: 365,
  keySize: 2048,
  ecCurve: 'P-256',
  subjectAltNames: 'localhost,127.0.0.1',
  pfxPassword: '',
}

const SslCertificateGenerator = (_props: PageComponentProps) => {
  const { t } = useTranslation()
  const { copyText } = useClipboard()
  const { downloadBlob, downloadText } = useFileDownload()
  const [values, setValues] = useState(initialValues)
  const [generatedCertificate, setGeneratedCertificate] = useState<GeneratedCertificate | null>(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const updateField = (field: keyof CertificateFormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: field === 'validityDays' || field === 'keySize' ? Number(value) : value,
    }))
  }

  const handleGenerate = () => {
    setIsGenerating(true)

    window.setTimeout(async () => {
      try {
        const certificate = await generateSelfSignedCertificate(values)
        setGeneratedCertificate(certificate)
        setStatusMessage(
          !certificate.pfxPasswordProtected && values.algorithm === 'ecdsa' && values.pfxPassword
            ? t('i18n_ecPfxPasswordNotice')
            : t('i18n_sslGenerated'),
        )
        setIsError(false)
      } catch (error) {
        setGeneratedCertificate(null)
        setStatusMessage(error instanceof Error ? error.message : t('i18n_sslGenerateError'))
        setIsError(true)
      } finally {
        setIsGenerating(false)
      }
    }, 0)
  }

  const handleCopy = async () => {
    if (!generatedCertificate) {
      return
    }

    await copyText(generatedCertificate.combinedPem)
    setStatusMessage(t('i18n_sslCopied'))
    setIsError(false)
  }

  const getSafeFileBaseName = () => values.commonName.trim().replace(/[^a-z0-9.-]+/gi, '-') || 'certificate'

  const handleDownloadPfx = () => {
    if (!generatedCertificate) {
      return
    }

    downloadBlob(generatedCertificate.pfxBlob, `${getSafeFileBaseName()}.pfx`)
  }

  const handleDownloadPem = () => {
    if (!generatedCertificate) {
      return
    }

    downloadText(generatedCertificate.combinedPem, `${getSafeFileBaseName()}.pem`)
  }

  const handleDownloadCrtAndKey = () => {
    if (!generatedCertificate) {
      return
    }

    downloadText(generatedCertificate.certificatePem, `${getSafeFileBaseName()}.crt`)
    downloadText(generatedCertificate.privateKeyPem, `${getSafeFileBaseName()}.key`)
  }

  const handleClear = () => {
    setGeneratedCertificate(null)
    setStatusMessage('')
    setIsError(false)
  }

  const actions = (
    <>
      <Button icon={<ShieldCheck />} isLoading={isGenerating} onClick={handleGenerate} variant="primary">
        {t('i18n_generate')}
      </Button>
      <Button disabled={!generatedCertificate} icon={<Copy />} onClick={handleCopy} variant="secondary">
        {t('i18n_copy')}
      </Button>
      <Button disabled={!generatedCertificate} icon={<Archive />} onClick={handleDownloadPfx} variant="secondary">
        {t('i18n_downloadPfx')}
      </Button>
      <Button disabled={!generatedCertificate} icon={<Download />} onClick={handleDownloadPem} variant="secondary">
        {t('i18n_downloadPem')}
      </Button>
      <Button disabled={!generatedCertificate} icon={<Files />} onClick={handleDownloadCrtAndKey} variant="secondary">
        {t('i18n_downloadCrtKey')}
      </Button>
      <Button disabled={!generatedCertificate} icon={<Trash2 />} onClick={handleClear} variant="secondary">
        {t('i18n_clear')}
      </Button>
    </>
  )

  const status = statusMessage ? (
    <div className={`status-message ${isError ? 'status-message--danger' : 'status-message--success'}`}>
      {statusMessage}
    </div>
  ) : null

  return (
    <PageShell title={t('i18n_sslCertificate')} description={t('i18n_sslCertificateDesc')}>
      <ToolShell actions={actions} description={t('i18n_sslCertificateInstructions')} status={status} title={t('i18n_sslGenerator')}>
        <div className="ssl-certificate-grid">
          <SurfaceCard className="ssl-certificate-panel" title={t('i18n_sslSettings')}>
            <div className="ssl-certificate-form">
              <label className="input-group">
                {t('i18n_certificateAlgorithm')}
                <select
                  className="field-input"
                  onChange={(event) => updateField('algorithm', event.target.value)}
                  value={values.algorithm}
                >
                  <option value="rsa">RSA</option>
                  <option value="ecdsa">ECDSA</option>
                </select>
              </label>

              <label className="input-group">
                {t('i18n_commonName')}
                <input
                  className="field-input"
                  onChange={(event) => updateField('commonName', event.target.value)}
                  value={values.commonName}
                />
              </label>

              <label className="input-group">
                {t('i18n_organization')}
                <input
                  className="field-input"
                  onChange={(event) => updateField('organization', event.target.value)}
                  value={values.organization}
                />
              </label>

              <label className="input-group">
                {t('i18n_country')}
                <input
                  className="field-input"
                  maxLength={2}
                  onChange={(event) => updateField('country', event.target.value)}
                  value={values.country}
                />
              </label>

              <label className="input-group">
                {t('i18n_validityDays')}
                <input
                  className="field-input"
                  min={1}
                  max={3650}
                  onChange={(event) => updateField('validityDays', event.target.value)}
                  type="number"
                  value={values.validityDays}
                />
              </label>

              <label className="input-group">
                {values.algorithm === 'rsa' ? t('i18n_keySize') : t('i18n_ecCurve')}
                {values.algorithm === 'rsa' ? (
                  <select
                    className="field-input"
                    onChange={(event) => updateField('keySize', event.target.value)}
                    value={values.keySize}
                  >
                    <option value={2048}>2048 bits</option>
                    <option value={3072}>3072 bits</option>
                    <option value={4096}>4096 bits</option>
                  </select>
                ) : (
                  <select
                    className="field-input"
                    onChange={(event) => updateField('ecCurve', event.target.value)}
                    value={values.ecCurve}
                  >
                    <option value="P-256">P-256</option>
                    <option value="P-384">P-384</option>
                    <option value="P-521">P-521</option>
                  </select>
                )}
              </label>

              <label className="input-group ssl-certificate-form__wide">
                {t('i18n_subjectAltNames')}
                <input
                  className="field-input"
                  onChange={(event) => updateField('subjectAltNames', event.target.value)}
                  placeholder="localhost,app.local,127.0.0.1"
                  value={values.subjectAltNames}
                />
              </label>

              <label className="input-group ssl-certificate-form__wide">
                {t('i18n_pfxPassword')}
                <div className="ssl-certificate-password-field">
                  <FileKey aria-hidden="true" className="ssl-certificate-password-field__icon" />
                  <input
                    className="field-input"
                    onChange={(event) => updateField('pfxPassword', event.target.value)}
                    placeholder={t('i18n_pfxPasswordPlaceholder')}
                    type="password"
                    value={values.pfxPassword}
                  />
                </div>
              </label>
            </div>
          </SurfaceCard>

          <SurfaceCard className="ssl-certificate-panel" title={t('i18n_certificateOutput')}>
            <textarea
              className="ssl-certificate-output"
              placeholder={t('i18n_certificateOutputPlaceholder')}
              readOnly
              value={generatedCertificate?.combinedPem ?? ''}
            />
          </SurfaceCard>
        </div>
      </ToolShell>
    </PageShell>
  )
}

export default SslCertificateGenerator
