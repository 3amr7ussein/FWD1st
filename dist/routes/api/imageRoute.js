'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var imageProcessingMW_1 = __importDefault(
  require('../../middlewares/imageProcessingMW')
);
var fileExistCheckers_1 = require('../../utils/fileExistCheckers');
var path = require('path');
var imageApi = express_1.default.Router();
//api to get the url params and pass the it to utility function the resize the image and send the new image
imageApi.use(imageProcessingMW_1.default);
imageApi.get('/', function (req, res) {
  var fileName = req.query.filename;
  var width = req.query.width;
  var height = req.query.height;
  var fullPath = path.join(
    path.resolve('./'),
    'assets',
    'full',
    ''.concat(fileName, '.jpg')
  );
  if (!width && !height) {
    if (!(0, fileExistCheckers_1.isOriginalImgExists)(fullPath))
      res.send('There is no Such file with name '.concat(fileName, '.jpg'));
    res.sendFile(fullPath);
  } else if (width && height) {
    var resizedPath = path.join(
      path.resolve('./'),
      'assets',
      'thumb',
      ''.concat(fileName).concat(width).concat(height, '.jpg')
    );
    res.sendFile(resizedPath);
  } else res.send('Missing Url Parameters');
});
exports.default = imageApi;
