<template>
  <div class="flex flex-col items-center">
    <div class="flex font-light text-xs px-6 py-4 text-neutral-500">
      <div
        v-for="(item, index) in store.steps"
        :key="index"
        :class="[
          'flex',
          {
            'text-black': store.isStepActive(item.name),
          },
        ]"
        @click="
          () => {
            if ((item.name === 'selectType' && !store.region) || item.name === 'pay') {
              return;
            }

            store.setCurrentStep(item.name);
          }
        "
      >
        <div>{{ index + 1 }}. {{ item.title }}</div>
        <div class="px-3" v-if="index + 1 !== store.steps.length">—</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useSubscriptionStore();
</script>
