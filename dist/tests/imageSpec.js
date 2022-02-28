'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var path_1 = __importDefault(require('path'));
var sharp_1 = __importDefault(require('sharp'));
var fileExistCheckers_1 = require('../utils/fileExistCheckers');
var resizeImg_1 = require('../utils/resizeImg');
describe('Image functions', function () {
  var originalImgPath = path_1.default.join(
    path_1.default.resolve('./'),
    'assets',
    'full',
    'fjord.jpg'
  );
  it('Expect original image file to be found ', function () {
    expect(
      (0, fileExistCheckers_1.isOriginalImgExists)(originalImgPath)
    ).toBeTrue();
  });
  it('Expect image resize to return transform', function () {
    expect(
      (0, resizeImg_1.imgResize)(originalImgPath, 400, 400)
    ).toBeInstanceOf(sharp_1.default);
  });
});
