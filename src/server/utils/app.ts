import { H3Event } from 'h3';

export const isServerApi = (event: H3Event) => {
  return getRequestPath(event).startsWith('/api');
};
