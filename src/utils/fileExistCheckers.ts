import fs, { PathLike } from 'fs';
import path from 'path';

export function isResizedImgExists(filePath: PathLike): boolean {
  //check if resized image already exist in thumb directory
  return fs.existsSync(filePath);
}

export function isOriginalImgExists(filePath: PathLike): boolean {
  // check if original image exists in full directory
  return fs.existsSync(filePath);
}
