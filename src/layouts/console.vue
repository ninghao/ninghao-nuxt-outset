<template>
  <div class="flex font-light">
    <ConsoleAside />
    <main class="flex-1">
      <slot></slot>
    </main>
    <UModal v-model="store.isModalVisible">
      <component :is="modalComponent"></component>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const store = useConsoleStore();

const components: Record<string, any> = {
  BrandCreate: resolveComponent('BrandCreate'),
  BrandEdit: resolveComponent('BrandEdit'),
};

const modalComponent = computed(() => {
  return components[store.modalComponent];
});

store.$subscribe(() => {
  if (!store.isModalVisible && store.modalComponent) {
    store.modalComponent = '';
  }
});
</script>
