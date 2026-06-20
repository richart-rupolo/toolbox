import { writeClipboardText } from '../src/utils/clipboard'
import { downloadTextFile } from '../src/utils/fileDownload'
import { htmlToText } from '../src/utils/htmlToText'

describe('browser utilities', () => {
  const originalDocument = global.document
  const originalUrl = global.URL
  const originalNavigator = global.navigator

  afterEach(() => {
    global.document = originalDocument
    global.URL = originalUrl

    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: originalNavigator,
    })
  })

  test('htmlToText strips markup with the DOM helper', () => {
    const mockElement = {
      innerHTML: '',
      get textContent() {
        return this.innerHTML.replace(/<[^>]*>/g, '')
      },
      get innerText() {
        return this.textContent
      },
    }

    global.document = {
      createElement: jest.fn().mockReturnValue(mockElement),
    } as unknown as Document

    expect(htmlToText('<b>Hello</b> <i>World</i>')).toBe('Hello World')
  })

  test('writeClipboardText delegates to the clipboard API when available', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined)

    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: {
        clipboard: {
          writeText,
        },
      },
    })

    await expect(writeClipboardText('copied text')).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith('copied text')
  })

  test('writeClipboardText returns false when clipboard is unavailable', async () => {
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: {},
    })

    await expect(writeClipboardText('copied text')).resolves.toBe(false)
  })

  test('downloadTextFile creates and clicks a download anchor', () => {
    const click = jest.fn()
    const anchor = {
      click,
      download: '',
      href: '',
    }
    const appendChild = jest.fn()
    const removeChild = jest.fn()
    const createObjectURL = jest.fn().mockReturnValue('blob:toolbox')
    const revokeObjectURL = jest.fn()

    global.document = {
      body: {
        appendChild,
        removeChild,
      },
      createElement: jest.fn().mockReturnValue(anchor),
    } as unknown as Document

    global.URL = {
      createObjectURL,
      revokeObjectURL,
    } as unknown as typeof URL

    downloadTextFile('hello world', 'toolbox.txt')

    expect(createObjectURL).toHaveBeenCalled()
    expect((global.document.createElement as jest.Mock)).toHaveBeenCalledWith('a')
    expect(anchor.download).toBe('toolbox.txt')
    expect(anchor.href).toBe('blob:toolbox')
    expect(appendChild).toHaveBeenCalledWith(anchor)
    expect(click).toHaveBeenCalled()
    expect(removeChild).toHaveBeenCalledWith(anchor)
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:toolbox')
  })
})
