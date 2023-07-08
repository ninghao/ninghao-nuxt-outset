<template>
  <div class="py-6">
    <div class="flex justify-between items-center px-6 pb-12">
      <h1>品牌</h1>
      <UButton
        icon="i-heroicons-plus"
        size="xs"
        color="primary"
        square
        variant="solid"
        @click="store.showModal('ConsoleBrandCreate')"
      />
    </div>
    <ConsoleBrandList class="px-6" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'console',
});

const store = useConsoleLayoutStore();
</script>
