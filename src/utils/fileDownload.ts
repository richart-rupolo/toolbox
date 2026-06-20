export const downloadTextFile = (content: string, fileName: string) => {
  const blob = new Blob([content], { type: 'text/plain' })
  downloadBlob(blob, fileName)
}

export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = fileName

  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)

  URL.revokeObjectURL(url)
}
