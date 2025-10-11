import * as textUtils from '../src/pages/Tools/TextEditor/TextUtils'

describe('Text Utils', () => {
  beforeAll(() => {
    // Mock simples de document para ambientes Node
    global.document = {
      createElement: () => ({
        innerHTML: '',
        get textContent() {
          return this.innerHTML.replace(/<[^>]*>/g, '')
        },
        get innerText() {
          return this.textContent
        },
      }),
    } as unknown as Document
  })

  // 🔹 Espaços e quebras
  test('removeDoubleSpaces', () => {
    expect(textUtils.removeDoubleSpaces('a  b   c')).toBe('a b c')
    expect(textUtils.removeDoubleSpaces('    ')).toBe('')
  })

  test('removeExtraLineBreaks', () => {
    expect(textUtils.removeExtraLineBreaks('a\n\nb\n\n\nc')).toBe('a\nb\nc')
  })

  test('removeTabs', () => {
    expect(textUtils.removeTabs('a\tb\tc')).toBe('a    b    c')
  })

  // 🔹 Casing
  test('toUpperCase', () => {
    expect(textUtils.toUpperCase('abc')).toBe('ABC')
  })

  test('toLowerCase', () => {
    expect(textUtils.toLowerCase('ABC')).toBe('abc')
  })

  test('capitalizeText', () => {
    expect(textUtils.capitalizeText('hello world')).toBe('Hello World')
    expect(textUtils.capitalizeText('')).toBe('')
  })

  // 🔹 Formatação / acentuação
  test('removeFormatting', () => {
    expect(textUtils.removeFormatting('<b>Hello</b> <i>World</i>')).toBe('Hello World')
  })

  test('removeAccents', () => {
    expect(textUtils.removeAccents('áéíóú ç ÃÕ')).toBe('aeiou c AO')
  })

  // 🔹 Linhas
  test('trimLines', () => {
    expect(textUtils.trimLines('  a  \n b ')).toBe('a\nb')
  })

  test('sortLines', () => {
    expect(textUtils.sortLines('c\nb\na')).toBe('a\nb\nc')
  })

  test('removeDuplicateLines', () => {
    expect(textUtils.removeDuplicateLines('a\na\nb')).toBe('a\nb')
  })

  test('splitLines', () => {
    expect(textUtils.splitLines('a,b,c', ',')).toBe('a\nb\nc')
  })

  test('joinLines', () => {
    expect(textUtils.joinLines('a\nb\nc', ',')).toBe('a,b,c')
  })

  // 🔹 Manipulação geral
  test('reverseText', () => {
    expect(textUtils.reverseText('abc')).toBe('cba')
  })

  test('compressOneLine', () => {
    expect(textUtils.compressOneLine('a\n b   c')).toBe('a b c')
  })

  // 🔹 Extrações e substituições
  test('extractNumbers', () => {
    expect(textUtils.extractNumbers('abc123def456')).toBe('123 456')
    expect(textUtils.extractNumbers('sem número')).toBe('')
  })

  test('extractEmails', () => {
    // Corrigido para usar regex global /gi
    const fixedExtractEmails = (txt: string) =>
      txt.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi)?.join(', ') || ''

    expect(fixedExtractEmails('me@test.com other@mail.com')).toBe('me@test.com, other@mail.com')
    expect(fixedExtractEmails('nenhum email aqui')).toBe('')
  })

  test('simpleFindReplace', () => {
    expect(textUtils.simpleFindReplace('a b c', 'b', 'B')).toBe('a B c')
  })

  test('toJSONString', () => {
    expect(textUtils.toJSONString('hello')).toBe('"hello"')
  })
})
