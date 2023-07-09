<template>
  <div class="flex-1 flex flex-col">
    <SubscriptionSteps />
    <SubscriptionRegionList v-if="store.currentStep === 'selectRegion'" />
    <SubscriptionPlanList v-if="store.currentStep !== 'selectRegion'" />
  </div>
</template>

<script setup lang="ts">
const store = useSubscriptionStore();
</script>
