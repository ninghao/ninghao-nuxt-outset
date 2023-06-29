<template>
  <UTable :rows="store.regions" />
</template>

<script setup lang="ts">
const store = useRegionIndexStore();
await store.getRegions();
</script>
