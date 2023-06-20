<template>
  <div class="py-6">
    <UContainer class="space-y-8">
      <div class="flex justify-between items-center">
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
      <BrandView />
      <UModal v-model="isOpen">
        <BrandCreate />
      </UModal>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'workspace',
});

const isOpen = ref(false);
</script>
