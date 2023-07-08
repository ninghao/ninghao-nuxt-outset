<template>
  <div class="font-light px-8 text-center space-y-4 py-8">
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="item in store.entities"
        :key="item.id"
        :class="['border border-black', 'py-4 px-6', 'cursor-pointer']"
        @click="
          () => {
            subscriptionStore.setSelectedSubscriptionType(item);
            subscriptionStore.setCurrentStep('pay');
          }
        "
      >
        <div class="text-sm">{{ item.title }}</div>
        <div><span class="text-xs">¥</span>{{ item.price }}</div>
      </div>
    </div>
    <div
      :class="['border border-black', 'py-7 px-6']"
      v-if="subscriptionStore.selectedSubscriptionType"
    >
      微信支付
    </div>
    <div class="text-xs" v-if="subscriptionStore.selectedRegion">
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
</script>
