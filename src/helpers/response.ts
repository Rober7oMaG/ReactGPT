import { HttpStatusCode } from 'axios';

export const isResponseOk = (statusCode: HttpStatusCode): boolean => {
  return statusCode >= 200 && statusCode < 300;
};
