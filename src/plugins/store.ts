import type { PiniaPluginContext, Pinia } from 'pinia';

const actionErrorPlugin = ({ store }: PiniaPluginContext) => {
  store.$onAction((context) => {
    context.onError((error: any) => {
      if (error.name === 'ZodError') {
        const _error = JSON.parse(error);
        const toast = useToast();
        toast.add({ title: _error[0].message });
      }

      return false;
    });
  });
};

export default defineNuxtPlugin(({ $pinia }) => {
  ($pinia as Pinia).use(actionErrorPlugin);
});
