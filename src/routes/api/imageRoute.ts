import express, { Request, Response } from 'express';
import imageProcessing from '../../middlewares/imageProcessingMW';
import { isOriginalImgExists } from '../../utils/fileExistCheckers';
const path = require('path');
const imageApi = express.Router();

//api to get the url params and pass the it to utility function the resize the image and send the new image
imageApi.use(imageProcessing);
imageApi.get('/image', (req: Request, res: Response) => {
  const fileName = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  const fullPath = path.join(
    path.resolve('./'),
    'assets',
    'full',
    `${fileName}.jpg`
  );

  if (!width && !height) {
    if (!isOriginalImgExists(fullPath))
      res.send(`There is no Such file with name ${fileName}.jpg`);
    res.sendFile(fullPath);
  } else if (width && height) {
    const resizedPath = path.join(
      path.resolve('./'),
      'assets',
      'thumb',
      `${fileName}${width}${height}.jpg`
    );
    res.sendFile(resizedPath);
  } else res.send('Missing Url Parameters');
});

export default imageApi;
