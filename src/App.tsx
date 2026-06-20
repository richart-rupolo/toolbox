import { useState } from 'react'
import './assets/scss/main.scss'
import AppLayout from './components/layout/AppLayout'
import { getPageEntry, pageRegistry, toolRegistry } from './tools/registry'
import type { PageId } from './tools/types'

function App() {
  const [currentPageId, setCurrentPageId] = useState<PageId>('home')

  const currentPageEntry = getPageEntry(currentPageId) ?? pageRegistry[0]
  const CurrentPageComponent = currentPageEntry.component

  return (
    <AppLayout currentPageId={currentPageId} onNavigate={setCurrentPageId} pageEntries={pageRegistry}>
      <CurrentPageComponent onNavigate={setCurrentPageId} toolEntries={toolRegistry} />
    </AppLayout>
  )
}

export default App
