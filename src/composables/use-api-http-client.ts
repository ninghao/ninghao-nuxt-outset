type UseApiHttpClient = {
  key?: string;
  body?: Record<string, any>;
  method?: any;
};

export const useApiHttpClient = <T>(
  api: string | (() => string),
  options?: UseApiHttpClient,
) => {
  const {
    public: { apiBaseUrl, apiToken },
  } = useRuntimeConfig();

  return useFetch<T>(api, {
    baseURL: apiBaseUrl,

    onRequest: (context) => {
      context.options.headers = {
        Authorization: `Bearer ${apiToken}`,
      };
    },

    ...options,
  });
};
