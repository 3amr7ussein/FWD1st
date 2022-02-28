import fs, { PathLike } from 'fs';
import sharp, { Sharp } from 'sharp';

export function imgResize(
  path: PathLike,
  width: number,
  height: number
): Sharp {
  try {
    const readStream = fs.createReadStream(path);
    const transform = sharp();
    transform.resize(width, height);
    transform.toFormat('jpg');
    return readStream.pipe(transform);
  } catch (e) {
    throw new Error('Failed to process Image');
  }
}
