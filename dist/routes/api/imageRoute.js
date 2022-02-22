"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageProcesses_1 = __importDefault(require("../../utils/imageProcesses"));
var path = require('path');
var imageApi = express_1.default.Router();
//api to get the url params and pass the it to utility function the resize the image and send the new image
imageApi.get('/image', function (req, res) {
    console.log('params   =  ', req.query);
    (0, imageProcesses_1.default)();
    res.sendFile("".concat(path.resolve('./'), "/assets/full/fjord.jpg"));
});
exports.default = imageApi;
