"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageProcessingMW_1 = __importDefault(require("../../middlewares/imageProcessingMW"));
var path = require('path');
var imageApi = express_1.default.Router();
//api to get the url params and pass the it to utility function the resize the image and send the new image
imageApi.use(imageProcessingMW_1.default);
imageApi.get('/image', function (req, res) {
    var fileName = req.query.filename;
    var width = req.query.width;
    var height = req.query.height;
    try {
        if (!width && !height) {
            res.sendFile("".concat(path.resolve('./'), "/assets/full/").concat(fileName, ".jpg"));
        }
        else if (width && height) {
            res.sendFile("".concat(path.resolve('./'), "/assets/thumb/").concat(fileName).concat(width).concat(height, ".jpg"));
        }
        else
            throw new Error('Missing Url Parameters');
    }
    catch (e) {
        console.log(e);
    }
});
exports.default = imageApi;
