import { NextFunction, Request, Response } from 'express';
import fs, { PathLike } from 'fs';
import sharp from 'sharp';
import { imgResize } from '../utils/resizeImg';
import {
  isResizedImgExists,
  isOriginalImgExists,
} from '../utils/fileExistCheckers';
const path = require('path');

async function imageProcessing(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const fileName = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  let originalImgPath = path.join(
    path.resolve('./'),
    'assets',
    'full',
    `${fileName}.jpg`
  );
  if (fileName != '') {
    //if file name exists but neither width nor height do nothing but next
    if (width && height) {
      let resizedImgPath: PathLike = path.join(
        path.resolve('./'),
        'assets',
        'thumb',
        `${fileName}${width}${height}.jpg`
      );

      if (isResizedImgExists(resizedImgPath) == false) {
        if (isOriginalImgExists(originalImgPath)) {
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
    res.end(`Image File (${fileName}.jpg) Is Not Exists`);
  }
  next();
}
export default imageProcessing;
