<template>
  <div class="flex flex-col gap-8 items-center py-8 font-light">
    <div v-for="item in store.entities" :key="item.id" class="cursor-pointer">
      <div class="border border-black py-4 w-64 text-center">
        <div class="text-xs">
          {{ (item.brand as Brand).title }}
        </div>
        <div class="font-normal">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Brand } from '~/schema/brand';

const store = useConsoleRegionStore();
store.retrieve();
</script>
