'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.isOriginalImgExists = exports.isResizedImgExists = void 0;
var fs_1 = __importDefault(require('fs'));
function isResizedImgExists(filePath) {
  //check if resized image already exist in thumb directory
  return fs_1.default.existsSync(filePath);
}
exports.isResizedImgExists = isResizedImgExists;
function isOriginalImgExists(filePath) {
  // check if original image exists in full directory
  return fs_1.default.existsSync(filePath);
}
exports.isOriginalImgExists = isOriginalImgExists;
