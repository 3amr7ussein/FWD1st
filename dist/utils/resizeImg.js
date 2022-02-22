"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgResize = void 0;
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
function imgResize(path, width, height) {
    var readStream = fs_1.default.createReadStream(path);
    var transform = (0, sharp_1.default)();
    transform.resize(width, height);
    transform.toFormat('jpg');
    return readStream.pipe(transform);
}
exports.imgResize = imgResize;
