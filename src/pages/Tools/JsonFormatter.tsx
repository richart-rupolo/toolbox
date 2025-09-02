import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Page } from '../../types/Page';
import './JsonFormatter.scss'; // ✅ importa SCSS

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

  const formatJson = () => {
    try {
      if (!inputJson.trim()) throw new Error('Por favor, insira um JSON para formatar.');
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setIsValid(true);
      setErrorMessage('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error instanceof Error ? error.message : 'Formato inválido');
      setFormattedJson('');
    }
  };

  const minifyJson = () => {
    try {
      if (!inputJson.trim()) throw new Error('Por favor, insira um JSON para minificar.');
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed));
      setIsValid(true);
      setErrorMessage('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error instanceof Error ? error.message : 'Formato inválido');
      setFormattedJson('');
    }
  };

  const validateJson = () => {
    try {
      if (!inputJson.trim()) throw new Error('Por favor, insira um JSON para validar.');
      JSON.parse(inputJson);
      setIsValid(true);
      setErrorMessage('JSON válido! ✅');
      setFormattedJson('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage(`JSON inválido: ${error instanceof Error ? error.message : 'Formato incorreto'}`);
      setFormattedJson('');
    }
  };

  const handleCopy = () => formattedJson && navigator.clipboard.writeText(formattedJson);
  const handleClear = () => { setInputJson(''); setFormattedJson(''); setIsValid(null); setErrorMessage(''); };
  const handleSampleJson = () => {
    const sample = `{
  "name": "Exemplo",
  "version": "1.0.0",
  "description": "JSON de exemplo",
  "features": ["formatação","validação","minificação"],
  "metadata": {"author": "Toolbox","created": "2024"}
}`;
    setInputJson(sample); setIsValid(null); setErrorMessage(''); setFormattedJson('');
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
          <button className="primary" onClick={formatJson}>{t('i18n_format')}</button>
          <button className="secondary" onClick={minifyJson}>{t('i18n_minify')}</button>
          <button className="secondary" onClick={validateJson}>{t('i18n_validate')}</button>
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
