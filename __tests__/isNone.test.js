import { isNone } from '../src/helpers'

test('it should return true with input: null | undefined', () => {
  let input = null
  let result = isNone(input)
  expect(result).toBe(true)
  input = undefined
  result = isNone(input)
  expect(result).toBe(true)
})
test('it should return true with object input: {}', () => {
  const input = {}
  const result = isNone(input)
  expect(result).toBe(true)
})
test('it should return false with object input: { foo: 1, bar: 2 }', () => {
  const input = { foo: 1, bar: 2 }
  const result = isNone(input)
  expect(result).toBe(false)
})
test('it should return true with array input: []', () => {
  const input = []
  const result = isNone(input)
  expect(result).toBe(true)
})
test('it should return false with array input: [1, 2, 3]', () => {
  const input = [1, 2, 3]
  const result = isNone(input)
  expect(result).toBe(false)
})
test('it should return true with string input: "" ', () => {
  const input = '   '
  const result = isNone(input)
  expect(result).toBe(true)
})
test('it should return false with string input: "I am foo" ', () => {
  const input = '  I am foo  '
  const result = isNone(input)
  expect(result).toBe(false)
})
test('it should return false with number input: -1, 0, 1 ...', () => {
  let input = 0
  let result = isNone(input)
  expect(result).toBe(false)
  input = 1
  result = isNone(input)
  expect(result).toBe(false)
  input = -1
  result = isNone(input)
  expect(result).toBe(false)
})
test('it should return false with boolean input: true | false ', () => {
  let input = true
  let result = isNone(input)
  expect(result).toBe(false)
  input = false
  result = isNone(input)
  expect(result).toBe(false)
})
