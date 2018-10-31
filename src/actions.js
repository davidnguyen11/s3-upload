import chalk from 'chalk'

const log = console.log
const error = chalk.bold.red
const success = chalk.green
const cyan = chalk.cyan

export function handleUploadSuccessfully(options) {
  const { data, fileLength, count } = options
  log(success(data.Location))
  if (count === fileLength) {
    log(cyan('Upload successfully!!!'))
  }
}

export function handleUploadError(err) {
  throw error(err)
}
