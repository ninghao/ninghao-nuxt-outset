<template>
  <div class="font-light px-8 text-center py-8 flex-1 flex flex-col">
    <div class="flex-1 space-y-4">
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="item in planStore.entities"
          :key="item.id"
          :class="[
            'relative py-4 px-6 border cursor-pointer',
            `${
              item.id !== store.plan?.id
                ? 'border-black'
                : 'border-green-400 text-green-500 '
            }`,
          ]"
          @click="
            () => {
              store.setPlan(item);
              store.setCurrentStep('pay');
            }
          "
        >
          <div class="text-sm">{{ item.title }}</div>
          <div><span class="text-xs">¥</span>{{ item.price }}</div>
          <AppCheckmark v-if="store.isSelectedPlan(item)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useSubscriptionStore();

const planStore = usePlanStore();
planStore.retrieve();
</script>
