<template>
  <div :class="['grid grid-cols-2 gap-1', 'text-center font-light text-sm']">
    <div v-for="item in store.entities" :key="item.id">
      <div>
        <img
          v-if="item.image && item.image.remote"
          class="object-cover"
          :src="useProductRemoteImage({ url: item.image.remote.url, width: 200 })"
          :alt="item.title"
        />
      </div>
      <div class="space-y-4">
        <div class="space-y-1">
          <div class="text-xs">{{ item.sku }} / {{ item.color }}</div>
          <div class="font-normal">{{ item.title }}</div>
        </div>
        <div>
          <UButton size="xs" variant="outline" color="black" class="px-4 rounded-none"
            >关注</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useProductStore();
store.retrieve();
</script>
