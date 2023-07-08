<template>
  <div class="py-6">
    <div class="flex justify-between items-center px-6 pb-12">
      <h1>区域</h1>
      <UButton
        icon="i-heroicons-plus"
        size="xs"
        color="primary"
        square
        variant="solid"
        @click="store.showSideover('ConsoleRegionCreate')"
      />
    </div>
    <ConsoleRegionList class="px-6" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'console',
});

const store = useConsoleStore();

useHead({
  title: '区域',
});
</script>
