import {
  createError,
  readBody,
  getQuery,
  getHeaders,
  parseCookies,
} from 'h3';
import type { H3Event } from 'h3';
import { z } from 'zod';

export const validateWithSchema = <
  ZodSchema extends z.ZodTypeAny,
>(
  data: any,
  schema: ZodSchema,
  statusCode: number,
  statusMessage: string,
): z.infer<ZodSchema> => {
  try {
    return schema.parse(data);
  } catch (error) {
    throw createError({
      statusCode,
      statusMessage,
      data: error,
    });
  }
};

export const parseBody = async <ZodSchema extends z.ZodTypeAny>(
  event: H3Event,
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Body parsing failed',
) => {
  const data = await readBody(event);

  return validateWithSchema(
    data,
    schema,
    errorCode,
    errorMessage,
  );
};

export const parseParams = <ZodSchema extends z.ZodTypeAny>(
  event: H3Event,
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Parameter parsing failed',
) => {
  const data = event.context.params;

  return validateWithSchema(
    data,
    schema,
    errorCode,
    errorMessage,
  );
};

export const parseQuery = <ZodSchema extends z.ZodTypeAny>(
  event: H3Event,
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Query parsing failed',
) => {
  const data = getQuery(event);

  return validateWithSchema(
    data,
    schema,
    errorCode,
    errorMessage,
  );
};

export const parseCookie = <ZodSchema extends z.ZodTypeAny>(
  event: H3Event,
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Cookie parsing failed',
) => {
  const data = parseCookies(event);

  return validateWithSchema(
    data,
    schema,
    errorCode,
    errorMessage,
  );
};

export const parseHeader = <ZodSchema extends z.ZodTypeAny>(
  event: H3Event,
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Header parsing failed',
) => {
  const data = getHeaders(event);

  return validateWithSchema(
    data,
    schema,
    errorCode,
    errorMessage,
  );
};

export const parseData = async <ZodSchema extends z.ZodTypeAny>(
  dataOrPromise: any | Promise<any>,
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Data parsing failed',
) => {
  const data = await dataOrPromise;

  return validateWithSchema(
    data,
    schema,
    errorCode,
    errorMessage,
  );
};

export const makeParser = <ZodSchema extends z.ZodTypeAny>(
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Data parsing failed',
) => {
  return (
    data: any,
    errorCodeOverwrite = undefined,
    errorMessageOverwrite = undefined,
  ) => {
    return validateWithSchema(
      data,
      schema,
      errorCodeOverwrite || errorCode,
      errorMessageOverwrite || errorMessage,
    );
  };
};

export const makePromiseParser = <ZodSchema extends z.ZodTypeAny>(
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Data-promise parsing failed',
) => {
  return async (
    promise: Promise<any>,
    errorCodeOverwrite = undefined,
    errorMessageOverwrite = undefined,
  ) => {
    const data = await promise;

    return validateWithSchema(
      data,
      schema,
      errorCodeOverwrite || errorCode,
      errorMessageOverwrite || errorMessage,
    );
  };
};