import { ReadStream } from 'fs';
import path from 'path';
import sharp from 'sharp';
import supertest from 'supertest';
import app from '../';
import { isOriginalImgExists } from '../utils/fileExistCheckers';
import { imgResize } from '../utils/resizeImg';

const request = supertest(app);

describe('Test Image End Point Responses', () => {
  // let url = `http://localhost:3000/image?filename=Udacity`;
  it('Test the api endpoint ', async () => {
    const response = await request.get('/image');
    expect(response.status).toBe(200);
  });
});

describe('Image functions', () => {
  let originalImgPath = path.join(
    path.resolve('./'),
    'assets',
    'full',
    `fjord.jpg`
  );
  it('Expect original image file to be found ', () => {
    expect(isOriginalImgExists(originalImgPath)).toBeTrue();
  });

  it('Expect image resize to return transform', () => {
    expect(imgResize(originalImgPath, 400, 400)).toBeInstanceOf(sharp);
  });
});
