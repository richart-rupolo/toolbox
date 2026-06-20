import { Braces, FileText, House, Info, ShieldCheck } from 'lucide-react'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import JsonFormatter from './json-formatter/JsonFormatter'
import SslCertificateGenerator from './ssl-certificate/SslCertificateGenerator'
import TextEditor from './text-editor/TextEditor'
import type { PageId, PageRegistryEntry, ToolRegistryEntry } from './types'

export const pageRegistry: PageRegistryEntry[] = [
  {
    id: 'home',
    section: 'navigation',
    labelKey: 'i18n_home',
    component: HomePage,
    icon: House,
  },
  {
    id: 'about',
    section: 'navigation',
    labelKey: 'i18n_about',
    component: AboutPage,
    icon: Info,
  },
  {
    id: 'text-editor',
    section: 'tools',
    labelKey: 'i18n_textEditor',
    cardDescriptionKey: 'i18n_textEditorDesc',
    component: TextEditor,
    icon: FileText,
  },
  {
    id: 'json-formatter',
    section: 'tools',
    labelKey: 'i18n_jsonFormatter',
    cardDescriptionKey: 'i18n_jsonFormatterDesc',
    component: JsonFormatter,
    icon: Braces,
  },
  {
    id: 'ssl-certificate',
    section: 'tools',
    labelKey: 'i18n_sslCertificate',
    cardDescriptionKey: 'i18n_sslCertificateDesc',
    component: SslCertificateGenerator,
    icon: ShieldCheck,
  },
]

const isToolEntry = (entry: PageRegistryEntry): entry is ToolRegistryEntry => entry.section === 'tools'

export const toolRegistry = pageRegistry.filter(isToolEntry)

export const getPageEntry = (pageId: PageId) => pageRegistry.find((entry) => entry.id === pageId)
