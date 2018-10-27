import { getUploadObject } from '../src/helpers'

test('test getUploadObject', () => {
  const uploadParams = getUploadObject({
    Bucket: 'TEST_ABC',
    Key: '/dir/user',
    Body: 'body',
    ContentType: 'image/png'
  })
  expect(uploadParams.Bucket).toBe('TEST_ABC')
  expect(uploadParams.Key).toBe('/dir/user')
  expect(uploadParams.Body).toBe('body')
  expect(uploadParams.ContentType).toBe('image/png')
})
