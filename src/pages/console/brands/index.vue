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
        @click="isOpen = true"
      />
    </div>
    <UContainer>
      <BrandView />
    </UContainer>
    <UModal v-model="isOpen">
      <BrandCreate />
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'console',
});

const isOpen = ref(false);
</script>
