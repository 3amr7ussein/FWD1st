import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';
import { imgResize } from '../utils/resizeImg';
const path = require('path');

export function isOriginalImgExists(filename: string | undefined): boolean {
  // check if original image exists in full directory

  const originalImagePath: string = `${path.resolve(
    './'
  )}/assets/full/${filename}.jpg`;

  return fs.existsSync(originalImagePath);
}

export function isResizedImgExists(
  filename: string | undefined,
  width: string | undefined,
  height: string | undefined
): boolean {
  //check if resized image already exist in thumb directory

  const resizedImagePath: string = `${path.resolve(
    './'
  )}/assets/thumb/${filename}${width}${height}.jpg`;

  return fs.existsSync(resizedImagePath);
}

async function imageProcessing(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const filename = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  let originalImgPath = `${path.resolve('./')}/assets/full/${filename}.jpg`;
  let resizedImgPath = `${path.resolve(
    './'
  )}/assets/thumb/${filename}${width}${height}.jpg`;
  try {
    //validate if parameters exist

    if (filename != '') {
      //if file name exists but neither width nor height do nothing but next
      if (width && height) {
        if (isResizedImgExists(filename, width, height) == false) {
          if (isOriginalImgExists(filename)) {
            //create resized images
            console.log('Creating Resized Image');
            await imgResize(originalImgPath, +width, +height)
              .toBuffer()
              .then((data) => {
                fs.writeFileSync(resizedImgPath, data);
                res.end(data);
              });
          }
        }
      }
    } else {
      throw new Error(`Image File (${filename}.jpg) Is Not Exists`);
    }
  } catch (e) {
    next(e);
  }
  next();
}
export default imageProcessing;
