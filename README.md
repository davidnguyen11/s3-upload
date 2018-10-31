# S3 Uploading

The small lib which allows to upload directory to AWS S3.

## Installation

**yarn**
```bash
yarn add s3-uploading -D
```

**npm**
```bash
npm i s3-uploading -D
```

## Usage

**upload.js**
```js
const Uploader = require('s3-uploading').default

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
    bucket: `TEST_S3_UPLOADING`
  }
}

const uploading = new Uploader(options)
uploading.upload()
```

**run**
```bash
AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID> AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY> AWS_HOST_BUCKET=<AWS_HOST_BUCKET> node upload.js
```

## Options
### s3
Contains all the params of `AWS JavaScript SDK`. You could find it at the link below:
[https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)

### upload
#### directory

> `string`

The path of directory that you want to upload.

#### bucket

> `string`

The name of the bucket that you want to upload the directory to.

