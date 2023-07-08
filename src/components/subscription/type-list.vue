<template>
  <div class="font-light px-6 text-center space-y-4 py-8">
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="item in store.entities"
        :key="item.id"
        :class="['border border-black', 'py-4 px-6']"
      >
        <div class="text-sm">{{ item.title }}</div>
        <div><span class="text-xs">¥</span>{{ item.price }}</div>
      </div>
    </div>
    <div :class="['border border-black', 'py-7 px-6']">微信支付</div>
    <div class="text-xs">LOUIS VUITTON 中国内地</div>
  </div>
</template>

<script setup lang="ts">
const store = useSubscriptionTypeStore();
store.retrieve();
</script>
