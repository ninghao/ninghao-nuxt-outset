import type { FetchContext, FetchResponse } from 'ofetch';
import qs from 'qs';
import { entitiesRequestQuerySchema } from '~/schema/api';
import _ from 'lodash';

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
const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
  return _.pickBy(obj, (value) => {
    // 自定义判断函数，去除空白值
    if (_.isPlainObject(value)) {
      // 递归处理嵌套对象
      return !_.isEmpty(removeEmptyValues(value));
    } else if (_.isArray(value)) {
      // 递归处理嵌套数组
      return !_.isEmpty(_.map(value, removeEmptyValues));
    } else {
      // 去除空白字符串、null、undefined
      return !(_.isNil(value) || _.isEmpty(_.toString(value).trim()));
    }
  });
};

export const useEntitiesQueryString = (data: Record<string, any>) => {
  const _data = _.pickBy(entitiesRequestQuerySchema.parse(data), (item) => {
    if (typeof item === 'object') {
      const result = removeEmptyValues(item);
      return Object.keys(result).length ? true : false;
    }

    return item !== '' && item !== undefined && item !== null;
  });

  return qs.stringify(_data, {
    encodeValuesOnly: true, // prettify URL
  });
};
