<template>
  <div class="font-light px-8 text-center py-8 flex-1 flex flex-col">
    <div class="flex-1 space-y-4">
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
              item.id !== subscriptionStore.plan?.id
                ? 'border-black'
                : 'border-green-400 text-green-500 '
            }`,
          ]"
          @click="
            () => {
              subscriptionStore.setPlan(item);
              subscriptionStore.setCurrentStep('pay');
            }
          "
        >
          <div class="text-sm">{{ item.title }}</div>
          <div><span class="text-xs">¥</span>{{ item.price }}</div>
          <AppCheckmark v-if="subscriptionStore.isSelectedPlan(item)" />
        </div>
      </div>
    </div>
    <div class="text-xs space-y-4">
      <div
        v-if="subscriptionStore.region"
        @click="subscriptionStore.setCurrentStep('selectRegion')"
      >
        <div>订阅区域</div>
        <div class="pl-2">
          {{ (subscriptionStore.region?.brand as Brand).title }}
          {{ subscriptionStore.region?.title }}
          <UIcon name="i-heroicons-arrow-uturn-left" />
        </div>
      </div>
      <div v-if="subscriptionStore.plan">
        <div>支付金额</div>
        <div>¥{{ subscriptionStore.plan.salePrice }}</div>
      </div>
      <div v-if="subscriptionStore.plan" class="text-neutral-400 pt-8">
        <div>{{ subscriptionStore.plan.description }}</div>
      </div>
      <div
        :class="['font-medium  bg-green-500 text-white', 'py-6 px-6', 'text-sm']"
        v-if="subscriptionStore.plan"
      >
        微信支付
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Brand } from '~/schema/brand';

const store = usePlanStore();
store.retrieve();

const subscriptionStore = useSubscriptionStore();
</script>
