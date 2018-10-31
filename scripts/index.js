const Uploader = require('../dist').default
var version = require('../package.json').version

require('dotenv').config()

const options = {
  s3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_HOST_BUCKET,
    region: '',
    ACL: 'public-read',
    sslEnabled: false
  },
  upload: {
    directory: '__tests__/fixtures/dir1',
    bucket: `TEST_ABC/${version}`
  }
}

const job = new Uploader(options)
job.upload()
