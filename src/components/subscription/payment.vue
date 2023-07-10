<template>
  <div class="font-light px-8 text-center py-8">
    <div class="text-xs space-y-4">
      <div v-if="store.region" @click="store.setCurrentStep('selectRegion')">
        <div>订阅区域</div>
        <div class="pl-2">
          {{ (store.region?.brand as Brand).title }}
          {{ store.region?.title }}
          <UIcon name="i-heroicons-arrow-uturn-left" />
        </div>
      </div>
      <div v-if="store.plan">
        <div>支付金额</div>
        <div>¥{{ store.plan.salePrice }}</div>
      </div>
      <div v-if="store.plan" class="text-neutral-400 pt-8">
        <div>{{ store.plan.description }}</div>
      </div>
      <div
        v-if="store.plan"
        :class="['font-medium  bg-green-500 text-white', 'py-6 px-6', 'text-sm']"
      >
        微信支付
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Brand } from '~/schema/brand';

const store = useSubscriptionStore();

// 1.准备订阅
// 2.创建订单
// 3.发起支付
</script>
