// src/utils/textUtils.ts

export const removeDoubleSpaces = (txt: string) => txt.replace(/\s+/g, ' ').trim()
export const removeExtraLineBreaks = (txt: string) => txt.replace(/\n\s*\n/g, '\n')
export const removeTabs = (txt: string) => txt.replace(/\t/g, '    ')
export const toUpperCase = (txt: string) => txt.toUpperCase()
export const toLowerCase = (txt: string) => txt.toLowerCase()
export const capitalizeText = (txt: string) => txt.replace(/\b\w/g, c => c.toUpperCase())
export const removeFormatting = (txt: string) => {
  const div = document.createElement('div')
  div.innerHTML = txt
  return div.textContent || div.innerText || ''
}
export const removeAccents = (txt: string) => txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
export const trimLines = (txt: string) => txt.split('\n').map(l => l.trim()).join('\n')
export const sortLines = (txt: string) => txt.split('\n').sort().join('\n')
export const removeDuplicateLines = (txt: string) => [...new Set(txt.split('\n'))].join('\n')
export const splitLines = (txt: string, delimiter: string) => txt.split(delimiter).join('\n')
export const joinLines = (txt: string, delimiter: string) => txt.split('\n').join(delimiter)
export const reverseText = (txt: string) => txt.split('').reverse().join('')
export const compressOneLine = (txt: string) => txt.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
export const extractNumbers = (txt: string) => txt.match(/\d+/g)?.join(' ') || ''
export const extractEmails = (txt: string) => txt.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)?.join(', ') || ''
export const simpleFindReplace = (txt: string, find: string, replace: string) => txt.split(find).join(replace)
export const toJSONString = (txt: string) => JSON.stringify(txt)
