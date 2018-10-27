import fs from 'fs'
import { S3 } from 'aws-sdk'
import mime from 'mime'
import recursive from 'recursive-readdir'

import { getUploadObject, isNone } from './helpers'
import { handleUploadSuccessfully, handleUploadError } from './states'

class Uploader {
  constructor(options) {
    if (isNone(options) || isNone(options.s3) || isNone(options.upload)) {
      throw new Error(error('Missing config!'))
    }

    const { s3, upload } = options
    this.count = 0
    this.s3Options = s3
    this.uploadOptions = upload
    this.s3 = new S3(this.s3Options)
  }

  handleUpload(files) {
    const { bucket, directory } = this.uploadOptions
    const partialDirs = directory.split('/')
    const finalPart = partialDirs[partialDirs.length - 1]
    let count = this.count

    files.forEach(file => {
      const fileStream = fs.createReadStream(file)

      fileStream.on('error', function(err) {
        this.emitter.emit('fail', `File error: ${err}`)
      })

      const uploadParams = getUploadObject({
        Bucket: bucket,
        Key: file.replace(directory, finalPart),
        Body: fileStream,
        ContentType: mime.getType(file)
      })
      this.s3.upload(uploadParams, function(err, data) {
        if (err) {
          handleUploadError(err)
        }

        if (data) {
          count++
          handleUploadSuccessfully({ data, fileLength: files.length, count })
        }
      })
    })
  }

  upload() {
    const { directory } = this.uploadOptions
    recursive(directory).then(files => {
      this.handleUpload(files)
    })
  }
}

export default Uploader
