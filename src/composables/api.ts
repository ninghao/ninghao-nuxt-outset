import type { FetchContext, FetchResponse } from 'ofetch';

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
