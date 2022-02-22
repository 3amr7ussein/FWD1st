import express, { Request, Response } from 'express';
import imageProcessing from '../../middlewares/imageProcessingMW';
import fs from 'fs';
const path = require('path');
const imageApi = express.Router();

//api to get the url params and pass the it to utility function the resize the image and send the new image
imageApi.use(imageProcessing);
imageApi.get('/image', (req: Request, res: Response) => {
  const fileName = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;

  try {
    if (!width && !height) {
      res.sendFile(`${path.resolve('./')}/assets/full/${fileName}.jpg`);
    } else if (width && height) {
      res.sendFile(
        `${path.resolve('./')}/assets/thumb/${fileName}${width}${height}.jpg`
      );
    } else throw new Error('Missing Url Parameters');
  } catch (e) {
    console.log(e);
  }
});

export default imageApi;
