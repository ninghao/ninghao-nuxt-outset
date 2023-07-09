<template>
  <div class="flex-1 flex flex-col">
    <SubscriptionSteps />
    <SubscriptionSelectRegion v-if="store.currentStep === 'selectRegion'" />
    <SubscriptionSelectPlan v-if="store.currentStep !== 'selectRegion'" />
    <SubscriptionPayment v-if="store.currentStep !== 'selectRegion'" />
  </div>
</template>

<script setup lang="ts">
const store = useSubscriptionStore();
</script>
