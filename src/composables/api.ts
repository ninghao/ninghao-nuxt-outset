import type { FetchError, FetchContext } from 'ofetch';

/**
 * 处理接口错误
 */
export const useApiError = (error: Ref<FetchError | null>) => {
  const toast = useToast();

  const { data } = error.value!;

  if (data?.data && data.data?.name === 'ZodError') {
    return toast.add({ title: data.data.issues[0].message });
  }

  toast.add({ title: data.message });
};

/**
 * 请求拦截器
 */
export const useApiInterceptor = () => {
  return {
    onRequest: (context: FetchContext) => {
      const { currentUser } = useCurrentUser();

      if (currentUser.value) {
        context.options.headers = {
          Authorization: `Bearer ${currentUser.value?.token}`,
        };
      }
    },
  };
};
