<template>
  <div class="flex flex-col gap-4 items-center py-8 font-light">
    <div
      v-for="item in consoleRegionStore.entities"
      :key="item.id"
      class="cursor-pointer relative"
      @click="
        () => {
          store.setRegion(item);
          store.setCurrentStep('selectPlan');
        }
      "
    >
      <div
        :class="[
          'py-4 w-64',
          'border',
          'text-center',
          `${
            store.isSelectedRegion(item)
              ? 'border-black'
              : 'border-green-400 text-green-500 '
          }`,
        ]"
      >
        <AppCheckmark v-if="item.id == store.region?.id" />
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

const store = useSubscriptionStore();

const consoleRegionStore = useConsoleRegionStore();
consoleRegionStore.retrieve();
</script>
