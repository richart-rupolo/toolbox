export const htmlToText = (html: string) => {
  const element = document.createElement('div')
  element.innerHTML = html

  return element.textContent || element.innerText || ''
}
