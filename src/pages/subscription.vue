<template>
  <div class="flex-1 flex flex-col">
    <SubscriptionSteps />
    <SubscriptionRegionList v-if="store.currentStep === 'selectRegion'" />
    <SubscriptionTypeList v-if="store.currentStep !== 'selectRegion'" />
  </div>
</template>

<script setup lang="ts">
const store = useSubscriptionStore();
</script>
