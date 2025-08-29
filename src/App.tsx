import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import LanguageSelector from './components/LanguageSelector/LanguageSelector'
import Home from './pages/Home'
import About from './pages/About'
import TextEditor from './pages/Tools/TextEditor'
import JsonFormatter from './pages/Tools/JsonFormatter'

type Page = 'home' | 'about' | 'text-editor' | 'json-formatter'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { t } = useTranslation()

  // Detectar se é mobile
  const isMobile = window.innerWidth <= 768

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'about':
        return <About />
      case 'text-editor':
        return <TextEditor />
      case 'json-formatter':
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
          collapsed={sidebarCollapsed}
          open={sidebarOpen}
        />
        
        <main className="content">
          <button 
            className="sidebar-toggle"
            onClick={toggleSidebar}
            title={t('i18n_toggleSidebar')}
          >
            {sidebarCollapsed || sidebarOpen ? '◀' : '▶'}
          </button>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
