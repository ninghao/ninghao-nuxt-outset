<template>
  <div class="max-w-lg mx-auto flex flex-col min-h-screen">
    <header class="font-light flex flex-col items-center py-8">
      <AppLogo class="w-20 mb-6 mt-8 ml-3 h-8" />
      <nav class="flex gap-10 text-sm">
        <NuxtLink
          v-for="item in items"
          :key="item.name"
          :to="item.url"
          class="block"
          activeClass="border-b border-black/60 text-black "
        >
          {{ item.title }}
        </NuxtLink>
      </nav>
    </header>
    <main class="flex-1 flex flex-col">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  {
    title: '物品',
    name: 'products',
    url: '/',
  },
  {
    title: '关注',
    name: 'follows',
    url: '/follows',
  },
  {
    title: '订阅',
    name: 'subscription',
    url: '/subscription',
  },
]);
</script>
