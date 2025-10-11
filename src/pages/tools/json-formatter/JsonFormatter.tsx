// JsonFormatter.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Page } from '../../../types/Page';
import * as JsonUtils from './jsonFormatterUtils'; 
import './JsonFormatter.scss';

export const JsonFormatterPage: Page = { name: 'json-formatter' };

const JsonFormatter = () => {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputJson(e.target.value);
    setIsValid(null);
    setErrorMessage('');
    setFormattedJson('');
  };

  const handleFormat = () => {
    try {
      const result = JsonUtils.formatJsonString(inputJson);
      setFormattedJson(result);
      setIsValid(true);
      setErrorMessage('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error instanceof Error ? error.message : 'Formato inválido');
      setFormattedJson('');
    }
  };

  const handleMinify = () => {
    try {
      const result = JsonUtils.minifyJsonString(inputJson);
      setFormattedJson(result);
      setIsValid(true);
      setErrorMessage('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error instanceof Error ? error.message : 'Formato inválido');
      setFormattedJson('');
    }
  };

  const handleValidate = () => {
    try {
      const result = JsonUtils.validateJsonString(inputJson);
      setIsValid(result.valid);
      setErrorMessage(result.message);
      setFormattedJson('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error instanceof Error ? error.message : 'Formato inválido');
      setFormattedJson('');
    }
  };

  const handleSampleJson = () => {
    setInputJson(JsonUtils.getSampleJson());
    setIsValid(null);
    setErrorMessage('');
    setFormattedJson('');
  };

  const handleCopy = () => formattedJson && navigator.clipboard.writeText(formattedJson);
  const handleClear = () => {
    setInputJson('');
    setFormattedJson('');
    setIsValid(null);
    setErrorMessage('');
  };

  return (
    <div className="page">
      <h1 className="page-title">{t('i18n_jsonFormatterTitle')}</h1>
      <p className="page-description">{t('i18n_jsonFormatterDesc')}</p>

      <div className="tool-container">
        <div className="tool-header">
          <h2 className="tool-title">{t('i18n_formatter')}</h2>
          <p className="tool-description">{t('i18n_insertJson')}</p>
        </div>

        <div className="controls">
          <button className="primary" onClick={handleFormat}>{t('i18n_format')}</button>
          <button className="secondary" onClick={handleMinify}>{t('i18n_minify')}</button>
          <button className="secondary" onClick={handleValidate}>{t('i18n_validate')}</button>
          <button className="secondary" onClick={handleSampleJson}>{t('i18n_example')}</button>
          <button className="secondary" onClick={handleCopy} disabled={!formattedJson}>{t('i18n_copy')}</button>
          <button className="secondary" onClick={handleClear}>{t('i18n_clear')}</button>
        </div>

        {isValid !== null && <div className={`status ${isValid ? 'valid' : 'invalid'}`}>{errorMessage}</div>}

        <div className="grid two-cols">
          <div className="card">
            <h3>{t('i18n_inputJson')}</h3>
            <textarea value={inputJson} onChange={handleInputChange} placeholder={t('i18n_pasteJson')} />
          </div>
          <div className="card">
            <h3>{t('i18n_result')}</h3>
            <textarea value={formattedJson} readOnly placeholder={t('i18n_resultHere')} />
          </div>
        </div>

        <div className="tips">
          <h4>{t('i18n_tips')}</h4>
          <ul>
            <li><strong>{t('i18n_format')}:</strong> {t('i18n_formatTip')}</li>
            <li><strong>{t('i18n_minify')}:</strong> {t('i18n_minifyTip')}</li>
            <li><strong>{t('i18n_validate')}:</strong> {t('i18n_validateTip')}</li>
            <li>{t('i18n_exampleTip')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
