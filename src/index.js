import fs from 'fs'
import chalk from 'chalk'
import { S3 } from 'aws-sdk'
import mime from 'mime'
import recursive from 'recursive-readdir'

import { getUploadObject, isNone } from './helpers'
import { handleUploadSuccessfully, handleUploadError } from './actions'

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

  getDirPath(filePath) {
    const { directory } = this.uploadOptions
    let filePartials = filePath.replace(directory, '').split('/')
    return filePartials.filter(item => !isNone(item))
  }

  getListUploadFiles(files) {
    const { bucket } = this.uploadOptions
    const { ACL } = this.s3Options

    return files.map(file => {
      const key = this.getDirPath(file).join('/')
      const fileStream = fs.createReadStream(file)

      fileStream.on('error', function(err) {
        handleUploadError(`File error: ${err}`)
      })

      return getUploadObject({
        Bucket: bucket,
        Key: key,
        Body: fileStream,
        ContentType: mime.getType(file),
        ACL
      })
    })
  }

  handleUpload(files) {
    let count = this.count
    const uploadFiles = this.getListUploadFiles(files)
    uploadFiles.forEach(item => {
      this.s3.upload(item, function(err, data) {
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
    recursive(directory)
      .then(files => {
        this.handleUpload(files)
      })
      .catch(err => {
        console.error(chalk.bold.red(err))
      })
  }
}

export default Uploader
