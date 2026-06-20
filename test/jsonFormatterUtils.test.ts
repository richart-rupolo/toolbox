import {
  formatJsonString,
  getSampleJson,
  minifyJsonString,
  validateJsonString,
} from '../src/tools/json-formatter/jsonFormatterUtils'

describe('JsonFormatterUtils', () => {
  const validJson = '{"name":"Test","age":30}'
  const invalidJson = '{"name":"Test",age:30}'

  test('formatJsonString should format JSON correctly', () => {
    const formatted = formatJsonString(validJson)
    expect(formatted).toContain('\n  "name": "Test",\n  "age": 30\n')
  })

  test('formatJsonString should throw on empty input', () => {
    expect(() => formatJsonString('')).toThrow('Por favor, insira um JSON para formatar.')
  })

  test('minifyJsonString should minify JSON correctly', () => {
    const minified = minifyJsonString(validJson)
    expect(minified).toBe('{"name":"Test","age":30}')
  })

  test('minifyJsonString should throw on empty input', () => {
    expect(() => minifyJsonString('')).toThrow('Por favor, insira um JSON para minificar.')
  })

  test('validateJsonString should return valid for correct JSON', () => {
    const result = validateJsonString(validJson)
    expect(result.valid).toBe(true)
    expect(result.message).toBe('JSON valido! OK')
  })

  test('validateJsonString should return invalid for incorrect JSON', () => {
    const result = validateJsonString(invalidJson)
    expect(result.valid).toBe(false)
    expect(result.message).toContain('JSON invalido:')
  })

  test('getSampleJson should return sample JSON', () => {
    const sample = getSampleJson()
    expect(sample).toContain('"name": "Exemplo"')
    expect(sample).toContain('"features": ["formatacao","validacao","minificacao"]')
  })
})
