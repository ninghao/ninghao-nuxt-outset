<template>
  <div>
    <SubscriptionSteps />
    <SubscriptionRegionList v-if="store.currentStep === 'selectRegion'" />
    <SubscriptionTypeList v-if="store.currentStep !== 'selectRegion'" />
  </div>
</template>

<script setup lang="ts">
const store = useSubscriptionStore();
</script>
