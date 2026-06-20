import * as textUtils from '../src/tools/text-editor/textUtils'

describe('Text Utils', () => {
  beforeAll(() => {
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

  test('removeFormatting', () => {
    expect(textUtils.removeFormatting('<b>Hello</b> <i>World</i>')).toBe('Hello World')
  })

  test('removeAccents', () => {
    expect(textUtils.removeAccents('a\u00E7\u00E3o')).toBe('acao')
  })

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

  test('reverseText', () => {
    expect(textUtils.reverseText('abc')).toBe('cba')
  })

  test('compressOneLine', () => {
    expect(textUtils.compressOneLine('a\n b   c')).toBe('a b c')
  })

  test('extractNumbers', () => {
    expect(textUtils.extractNumbers('abc123def456')).toBe('123 456')
    expect(textUtils.extractNumbers('sem numero')).toBe('')
  })

  test('extractEmails', () => {
    expect(textUtils.extractEmails('me@test.com other@mail.com')).toBe('me@test.com, other@mail.com')
    expect(textUtils.extractEmails('nenhum email aqui')).toBe('')
  })

  test('simpleFindReplace', () => {
    expect(textUtils.simpleFindReplace('a b c', 'b', 'B')).toBe('a B c')
  })

  test('toJSONString', () => {
    expect(textUtils.toJSONString('hello')).toBe('"hello"')
  })
})
