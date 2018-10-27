export function getUploadObject({ Bucket, Key = '', Body = '', ...rest }) {
  return { Bucket, Key, Body, ...rest }
}

export function isNone(input) {
  if (typeof input === 'undefined') return true
  if (input === undefined || input === null) return true

  if (typeof input === 'object' && Object.keys(input).length === 0) return true
  if (Array.isArray(input) && input.length === 0) return true
  if (typeof input === 'string' && input.trim() === '') return true
  if (typeof input === 'number') return false
  if (typeof input === 'boolean') return false
  return false
}
