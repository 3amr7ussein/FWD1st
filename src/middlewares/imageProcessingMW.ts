import { NextFunction, Request, Response } from 'express';
import fs, { PathLike } from 'fs';
import { imgResize } from '../utils/resizeImg';
import {
  isResizedImgExists,
  isOriginalImgExists,
} from '../utils/fileExistCheckers';
import path from 'path';
import inputsCheaker, { inputsResponse } from '../utils/inputChecker';

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
  const paramsChecker: inputsResponse = inputsCheaker(fileName, width, height);

  if (!paramsChecker.flag) {
    res.send(paramsChecker.message);
  } else {
    if (width && height) {
      const resizedImgPath: PathLike = path.join(
        path.resolve('./'),
        'assets',
        'thumb',
        `${fileName}${width}${height}.jpg`
      );

      if (!isResizedImgExists(resizedImgPath)) {
        if (isOriginalImgExists(originalImgPath)) {
          //create resized images
          await imgResize(originalImgPath, +width, +height)
            .toBuffer()
            .then((data) => {
              fs.writeFileSync(resizedImgPath, data);
              res.end(data);
            });
        } else {
          res.end(`Image File (${fileName}.jpg) Is Not Exists`);
        }
      }
    }
    next();
  }
}
export default imageProcessing;
