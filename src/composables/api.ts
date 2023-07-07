import type { FetchContext, FetchResponse } from 'ofetch';
import qs from 'qs';
import { entitiesRequestQuerySchema } from '~/schema/api';

/**
 * 请求拦截器
 */
export const useApiInterceptor = () => {
  return {
    // 拦截请求
    onRequest: (context: FetchContext) => {
      const { currentUser } = useCurrentUser();

      if (currentUser.value) {
        context.options.headers = {
          Authorization: `Bearer ${currentUser.value?.token}`,
        };
      }
    },

    // 拦截响应错误
    onResponseError: (
      context: FetchContext & {
        response: FetchResponse<ResponseType>;
      },
    ) => {
      const toast = useToast();

      const error = context.response?._data;

      if (error && error.data?.name === 'ZodError') {
        toast.add({
          title: error.data.issues[0].message,
        });

        return;
      }

      if (error && error.message) {
        toast.add({ title: error.message });

        return;
      }
    },

    // 拦截请求错误
    onRequestError: () => {
      const toast = useToast();

      toast.add({ title: '无法执行请求' });
    },
  };
};

/**
 * 每页实体数量
 */
export const useEntitiesPerPage = () => {
  const config = useRuntimeConfig();
  return parseInt(`${config.public.entitiesPerPage}`, 10);
};

/**
 * Query
 */
const removeEmptyValues = (obj: any) => {
  const newObj: any = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'object' && !Array.isArray(value)) {
        const nestedObj = removeEmptyValues(value);
        if (Object.keys(nestedObj).length > 0) {
          newObj[key] = nestedObj;
        }
      } else if (value !== '') {
        newObj[key] = value;
      }
    }
  }

  return newObj;
};

export const useEntitiesQueryString = (data: Record<string, any>) => {
  const _data = removeEmptyValues(entitiesRequestQuerySchema.parse(data));

  return qs.stringify(_data, {
    encodeValuesOnly: true, // prettify URL
  });
};
