"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUploadObject = getUploadObject;
exports.isNone = isNone;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function getUploadObject(_ref) {
  var Bucket = _ref.Bucket,
      _ref$Key = _ref.Key,
      Key = _ref$Key === void 0 ? '' : _ref$Key,
      _ref$Body = _ref.Body,
      Body = _ref$Body === void 0 ? '' : _ref$Body,
      rest = _objectWithoutProperties(_ref, ["Bucket", "Key", "Body"]);

  return _objectSpread({
    Bucket: Bucket,
    Key: Key,
    Body: Body
  }, rest);
}

function isNone(input) {
  if (typeof input === 'undefined') return true;
  if (input === undefined || input === null) return true;
  if (_typeof(input) === 'object' && Object.keys(input).length === 0) return true;
  if (Array.isArray(input) && input.length === 0) return true;
  if (typeof input === 'string' && input.trim() === '') return true;
  if (typeof input === 'number') return false;
  if (typeof input === 'boolean') return false;
  return false;
}