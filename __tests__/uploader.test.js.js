import { handleUploadSuccessfully, handleUploadError } from '../src/actions'
jest.mock('recursive-readdir')
jest.mock('aws-sdk')
jest.mock('../src/actions')

const recursive = require('recursive-readdir')
recursive.mockImplementation(directory => {
  return Promise.resolve([
    '__tests__/fixtures/dir1/build2/index.js',
    '__tests__/fixtures/dir1/build1/image111.png',
    '__tests__/fixtures/dir1/build1/abc.js/klklk.js',
    '__tests__/fixtures/dir1/build1/index/abc.js'
  ])
})

const mockHandleUploadSuccessfully = jest.fn(() => 1)
const mockHandleUploadError = jest.fn(() => 0)

const S3 = require('aws-sdk').S3

import Uploader from '../src'

var version = require('../package.json').version

beforeEach(() => {
  S3.mockClear()
})

test('test upload successfully', () => {
  jest.mock('../src/helpers')
  jest.mock('../src/index')

  const getUploadObject = require('../src/helpers').getUploadObject
  const isNone = require('../src/helpers').isNone
  getUploadObject.mockImplementation(() => {
    return {
      hello: 'world'
    }
  })
  isNone.mockImplementation(() => false)

  const options = {
    s3: {
      accessKeyId: '',
      secretAccessKey: '',
      endpoint: '',
      region: '',
      sslEnabled: false
    },
    upload: {
      directory: '__tests__/fixtures/dir1',
      bucket: `TEST_ABC/${version}`
    }
  }

  S3.mockImplementation(() => {
    return {
      upload: (params, cb) => {
        const status = 'success'
        const data = {
          Location: status
        }
        cb(null, data)
      }
    }
  })
  const job = new Uploader(options)
  job.upload()
})
