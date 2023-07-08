<template>
  <div class="font-light px-8 text-center space-y-4 py-8">
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="item in store.entities"
        :key="item.id"
        :class="[
          'relative',
          'border',
          'py-4 px-6',
          'cursor-pointer',
          `${
            item.id !== subscriptionStore.selectedSubscriptionType?.id
              ? 'border-black'
              : 'border-green-400 text-green-500 '
          }`,
        ]"
        @click="
          () => {
            subscriptionStore.setSelectedSubscriptionType(item);
            subscriptionStore.setCurrentStep('pay');
          }
        "
      >
        <div class="text-sm">{{ item.title }}</div>
        <div><span class="text-xs">¥</span>{{ item.price }}</div>
        <AppCheckmark v-if="isCurrentSelectedType(item)" />
      </div>
    </div>
    <div :class="['border border-black', 'py-7 px-6']" v-if="selectedSubscriptionType">
      微信支付
    </div>
    <div class="text-xs" v-if="selectedRegion">
      {{ (subscriptionStore.selectedRegion?.brand as Brand).title }}
      {{ subscriptionStore.selectedRegion?.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Brand } from '~/schema/brand';

const store = useSubscriptionTypeStore();
store.retrieve();

const subscriptionStore = useSubscriptionStore();

const { isCurrentSelectedType, selectedSubscriptionType, selectedRegion } =
  storeToRefs(subscriptionStore);
</script>
