"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUploadSuccessfully = handleUploadSuccessfully;
exports.handleUploadError = handleUploadError;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = console.log;
var error = _chalk.default.bold.red;
var success = _chalk.default.green;
var cyan = _chalk.default.cyan;

function handleUploadSuccessfully(options) {
  var data = options.data,
      fileLength = options.fileLength,
      count = options.count;
  log(success(data.Location));

  if (count === fileLength) {
    log(cyan('Upload successfully!!!'));
  }
}

function handleUploadError(err) {
  throw error(err);
}