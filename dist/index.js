"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _awsSdk = require("aws-sdk");

var _mime = _interopRequireDefault(require("mime"));

var _recursiveReaddir = _interopRequireDefault(require("recursive-readdir"));

var _helpers = require("./helpers");

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Uploader =
/*#__PURE__*/
function () {
  function Uploader(options) {
    _classCallCheck(this, Uploader);

    if ((0, _helpers.isNone)(options) || (0, _helpers.isNone)(options.s3) || (0, _helpers.isNone)(options.upload)) {
      throw new Error(error('Missing config!'));
    }

    var s3 = options.s3,
        upload = options.upload;
    this.count = 0;
    this.s3Options = s3;
    this.uploadOptions = upload;
    this.s3 = new _awsSdk.S3(this.s3Options);
  }

  _createClass(Uploader, [{
    key: "getDirPath",
    value: function getDirPath(filePath) {
      var directory = this.uploadOptions.directory;
      var filePartials = filePath.replace(directory, '').split('/');
      return filePartials.filter(function (item) {
        return !(0, _helpers.isNone)(item);
      });
    }
  }, {
    key: "getListUploadFiles",
    value: function getListUploadFiles(files) {
      var _this = this;

      var bucket = this.uploadOptions.bucket;
      var ACL = this.s3Options.ACL;
      return files.map(function (file) {
        var key = _this.getDirPath(file).join('/');

        var fileStream = _fs.default.createReadStream(file);

        fileStream.on('error', function (err) {
          (0, _actions.handleUploadError)("File error: ".concat(err));
        });
        return (0, _helpers.getUploadObject)({
          Bucket: bucket,
          Key: key,
          Body: fileStream,
          ContentType: _mime.default.getType(file),
          ACL: ACL
        });
      });
    }
  }, {
    key: "handleUpload",
    value: function handleUpload(files) {
      var _this2 = this;

      var count = this.count;
      var uploadFiles = this.getListUploadFiles(files);
      uploadFiles.forEach(function (item) {
        _this2.s3.upload(item, function (err, data) {
          if (err) {
            (0, _actions.handleUploadError)(err);
          }

          if (data) {
            count++;
            (0, _actions.handleUploadSuccessfully)({
              data: data,
              fileLength: files.length,
              count: count
            });
          }
        });
      });
    }
  }, {
    key: "upload",
    value: function upload() {
      var _this3 = this;

      var directory = this.uploadOptions.directory;
      (0, _recursiveReaddir.default)(directory).then(function (files) {
        _this3.handleUpload(files);
      }).catch(function (err) {
        console.error(_chalk.default.bold.red(err));
      });
    }
  }]);

  return Uploader;
}();

var _default = Uploader;
exports.default = _default;