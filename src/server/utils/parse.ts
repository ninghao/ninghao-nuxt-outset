import { createError, readBody, getQuery, getHeaders, parseCookies } from 'h3';
import type { H3Event } from 'h3';
import { z } from 'zod';
import qs from 'qs';
import { Filters, entitiesRequestQuerySchema } from '~/schema/api';

export const validateWithSchema = <ZodSchema extends z.ZodTypeAny>(
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

  return validateWithSchema(data, schema, errorCode, errorMessage);
};

export const parseParams = <ZodSchema extends z.ZodTypeAny>(
  event: H3Event,
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Parameter parsing failed',
) => {
  const data = event.context.params;

  return validateWithSchema(data, schema, errorCode, errorMessage);
};

export const parseQuery = <ZodSchema extends z.ZodTypeAny>(
  event: H3Event,
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Query parsing failed',
) => {
  const data = qs.parse(getQuery(event) as any);

  return validateWithSchema(data, schema, errorCode, errorMessage);
};

export const parseCookie = <ZodSchema extends z.ZodTypeAny>(
  event: H3Event,
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Cookie parsing failed',
) => {
  const data = parseCookies(event);

  return validateWithSchema(data, schema, errorCode, errorMessage);
};

export const parseHeader = <ZodSchema extends z.ZodTypeAny>(
  event: H3Event,
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Header parsing failed',
) => {
  const data = getHeaders(event);

  return validateWithSchema(data, schema, errorCode, errorMessage);
};

export const parseData = async <ZodSchema extends z.ZodTypeAny>(
  dataOrPromise: any | Promise<any>,
  schema: ZodSchema,
  errorCode = 422,
  errorMessage = 'Data parsing failed',
) => {
  const data = await dataOrPromise;

  return validateWithSchema(data, schema, errorCode, errorMessage);
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

/**
 * 转换成 where 声明
 */
const convertFiltersToWhereConditions = (data: Filters) => {
  const conditions = [];

  for (const key in data) {
    const value = data[key];

    if (typeof value === 'object') {
      const operator = Object.keys(value)[0];
      const operand = value[operator];

      switch (operator) {
        case '$contains':
          conditions.push(`${key} CONTAINS '${operand}'`);
          break;

        case '$eq':
          conditions.push(`${key} = ${operand}`);
          break;

        case '$edge':
          const _key = key.split('.');

          if (_key.length > 1) {
            conditions.push(`->(${_key[0]} WHERE ${_key[1]} == ${operand})`);
          } else {
            if (typeof operand === 'object') {
              const edgeConditions = Object.entries(operand)
                .map(([key, value]) => `${key} == ${value}`)
                .join(' AND ');

              const edgeWhereClause = `WHERE ${edgeConditions}`;
              conditions.push(`->(${key} ${edgeWhereClause})`);
            } else {
              conditions.push(`->${key}`);
            }
          }

          break;
        default:
          break;
      }
    }
  }

  return conditions.length ? `${conditions.join(' AND ')}` : '';
};

export const getEntitiesApiParams = (event: H3Event) => {
  const config = useRuntimeConfig();
  const query = parseQuery(event, entitiesRequestQuerySchema);
  // 分页
  const limit = parseInt(`${config.public.entitiesPerPage}`, 10);
  const start = query.page === 1 ? 0 : (query.page - 1) * limit;

  // 查询条件
  const conditions = convertFiltersToWhereConditions(query.filters);

  return { limit, start, conditions };
};
