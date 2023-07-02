import qs from 'qs';

export const useProductRemoteImage = (options: {
  url: string;
  width?: string | number;
  height?: string | number;
}) => {
  const { url, width, height } = options;

  let _url = url.split('?')[0];

  const queryString = qs.stringify({ wid: width, hei: height });

  return `${_url}?${queryString}`;
};
