import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import LanguageSelector from './components/LanguageSelector/LanguageSelector'
import Home, { HomePage } from './pages/Home'
import About, { AboutPage } from './pages/About'
import TextEditor, { TextEditorPage } from './pages/Tools/TextEditor/TextEditor'
import JsonFormatter, { JsonFormatterPage } from './pages/Tools/JsonFormatter'
import type { Page } from './types/Page' // Page agora é um objeto { name: string }

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(HomePage)
  const { t } = useTranslation()

  const renderPage = () => {
    switch (currentPage.name) {
      case HomePage.name:
        return <Home />
      case AboutPage.name:
        return <About />
      case TextEditorPage.name:
        return <TextEditor />
      case JsonFormatterPage.name:
        return <JsonFormatter />
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">{t('i18n_title')}</h1>
        <LanguageSelector />
      </header>

      <div className="main-container">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />
        
        <main className="content">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
