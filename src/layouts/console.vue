<template>
  <div class="flex font-light">
    <ConsoleAside />
    <main class="flex-1">
      <slot></slot>
    </main>
    <UModal v-model="store.isModalVisible">
      <component :is="modalComponent"></component>
    </UModal>
    <USlideover v-model="store.isSlideoverVisible">
      <component :is="sideoverComponent"></component>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const store = useConsoleStore();

const components: Record<string, any> = {
  BrandCreate: resolveComponent('BrandCreate'),
  BrandEdit: resolveComponent('BrandEdit'),
  RegionEdit: resolveComponent('RegionEdit'),
};

const modalComponent = computed(() => {
  return components[store.modalComponent];
});

const sideoverComponent = computed(() => {
  return components[store.slideoverComponent];
});

store.$subscribe(() => {
  if (!store.isModalVisible && store.modalComponent) {
    store.modalComponent = '';
  }

  if (!store.isSlideoverVisible && store.slideoverComponent) {
    store.slideoverComponent = '';
  }
});
</script>
