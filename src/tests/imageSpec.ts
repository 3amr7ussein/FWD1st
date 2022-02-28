import path from 'path';
import sharp from 'sharp';

import { isOriginalImgExists } from '../utils/fileExistCheckers';
import { imgResize } from '../utils/resizeImg';

describe('Image functions', () => {
  const originalImgPath = path.join(
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
