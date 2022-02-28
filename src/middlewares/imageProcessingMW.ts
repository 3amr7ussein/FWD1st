import { NextFunction, Request, Response } from 'express';
import fs, { PathLike } from 'fs';
import { imgResize } from '../utils/resizeImg';
import {
  isResizedImgExists,
  isOriginalImgExists,
} from '../utils/fileExistCheckers';
import path from 'path';

async function imageProcessing(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const fileName = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  const originalImgPath = path.join(
    path.resolve('./'),
    'assets',
    'full',
    `${fileName}.jpg`
  );
  try {
    if (fileName != '') {
      //if file name exists but neither width nor height do nothing but next
      if (width && height) {
        const resizedImgPath: PathLike = path.join(
          path.resolve('./'),
          'assets',
          'thumb',
          `${fileName}${width}${height}.jpg`
        );

        if (+width <= 0 || +height <= 0) {
          throw new Error('Invalid Parameters width , height');
        } else if (isResizedImgExists(resizedImgPath) == false) {
          if (isOriginalImgExists(originalImgPath)) {
            await imgResize(originalImgPath, +width, +height)
              .toBuffer()
              .then((data) => {
                fs.writeFileSync(resizedImgPath, data);
                res.end(data);
              });
          } else throw new Error(`Image File (${fileName}.jpg) Is Not Exists`);
        }
      }
      next();
    }
  } catch (e) {
    next(e);
  }
}
export default imageProcessing;
