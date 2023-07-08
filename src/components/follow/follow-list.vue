<template>
  <div class="px-4 space-y-4 pb-8">
    <div
      v-for="item in store.entities"
      :key="item.id"
      class="flex items-center gap-2 font-light border-b pb-4"
    >
      <div class="aspect-1/1 w-20 h-20">
        <img
          v-if="item.image && item.image.remote"
          class="object-cover"
          :src="useProductRemoteImage({ url: item.image.remote.url, width: 200 })"
          :alt="item.title"
        />
      </div>
      <div class="space-y-2 flex-1">
        <div class="text-xs">{{ item.sku }} / {{ item.color }}</div>
        <div class="text-sm font-normal">{{ item.title }}</div>
      </div>
      <div class="text-sm">
        <UButton
          v-if="!item.isFollowed"
          size="xs"
          variant="outline"
          color="black"
          class="px-4 rounded-none"
          @click="
            () => {
              if (item.available) {
                const region = item.available[0].id;
                const product = item.id;

                store.create({ region, product });
                item.isFollowed = true;
              }
            }
          "
        >
          关注
        </UButton>
        <UButton
          v-if="item.isFollowed"
          size="xs"
          variant="none"
          class="px-4 rounded-none"
          @click="
            () => {
              if (item.available) {
                const region = item.available[0].id;
                const product = item.id;

                store.update({ region, product });
                item.isFollowed = false;
              }
            }
          "
        >
          <UIcon name="i-heroicons-check" />
          已关注
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useFollowStore();
store.retrieve();
</script>
