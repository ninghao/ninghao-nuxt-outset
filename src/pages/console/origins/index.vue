<template>
  <div class="py-6">
    <div class="flex justify-between items-center px-6 pb-12">
      <h1>来源</h1>
      <UButton
        icon="i-heroicons-plus"
        size="xs"
        color="primary"
        square
        variant="solid"
        @click="store.showSideover('ConsoleOriginCreate')"
      />
    </div>
    <UContainer>
      <ConsoleRegionList />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'console',
});

const store = useConsoleStore();

useHead({
  title: '来源',
});
</script>
