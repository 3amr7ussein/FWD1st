export type inputsResponse = {
  flag: boolean;
  message: string;
};

export default function inputsCheaker(
  fileName: string,
  width: string,
  height: string
): inputsResponse {
  const inputsRes: inputsResponse = {
    flag: true,
    message: '',
  };
  if (fileName == '') {
    inputsRes.flag = false;
    inputsRes.message = 'Expect to pass image file name as a parameter';
  } else if (width === undefined && height === undefined) {
    inputsRes.flag = true;
  } else if (!+width || !+height || +width <= 0 || +height <= 0) {
    inputsRes.flag = false;
    inputsRes.message =
      'Expect parameters width and height to be a valid intergers';
  }
  return inputsRes;
}
