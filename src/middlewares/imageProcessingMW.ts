import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';
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

function imageResize(filename: string, width: number, height: number): void {
  //function that accept file name of image , width and height
  //serach for image in full folder and resize it

  sharp(`${path.resolve('./')}/assets/full/${filename}.jpg`)
    .resize(width, height)
    .toFile(
      `${path.resolve('./')}/assets/thumb/${filename}${width}${height}.jpg`,
      function (err) {
        if (err) console.log(err);
      }
    );
}

async function imageProcessing(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const filename = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;

  try {
    //validate if parameters exist

    if (filename != '') {
      //if file name exists but neither width nor height do nothing but next
      if (width && height) {
        if (isResizedImgExists(filename, width, height) == false) {
          if (isOriginalImgExists(filename)) {
            //create resized images
            await imageResize(filename, +width, +height);
            next();
          }
        }
      }
    } else {
      throw new Error(`Image File (${filename}.jpg) Is Not Exists`);
    }
  } catch (e) {
    next(e);
  }
}
export default imageProcessing;
