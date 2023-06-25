import type { FetchError } from 'ofetch';

export const useApiResponseError = (
  error: Ref<FetchError | null>,
) => {
  const toast = useToast();

  const { data } = error.value!;

  if (data?.data && data.data?.name === 'ZodError') {
    return toast.add({ title: data.data.issues[0].message });
  }

  toast.add({ title: data.message });
};
