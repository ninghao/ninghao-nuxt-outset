<template>
  <div class="flex font-light">
    <ConsoleLayoutAside />
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
const store = useConsoleLayoutStore();

const components: Record<string, any> = {
  ConsoleBrandCreate: resolveComponent('ConsoleBrandCreate'),
  ConsoleBrandEdit: resolveComponent('ConsoleBrandEdit'),
  ConsoleRegionEdit: resolveComponent('ConsoleRegionEdit'),
  ConsoleRegionCreate: resolveComponent('ConsoleRegionCreate'),
  ConsoleOriginCreate: resolveComponent('ConsoleOriginCreate'),
  ConsoleProductCreate: resolveComponent('ConsoleProductCreate'),
  ConsoleProductEdit: resolveComponent('ConsoleProductEdit'),
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
