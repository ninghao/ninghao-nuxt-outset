<template>
  <div class="app-logo">
    <NuxtLink to="/" title="首页">
      <img class="w-24" :src="`/images/logo.svg`" alt="" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  color?: 'white' | 'black';
}

withDefaults(defineProps<Props>(), {
  color: 'black',
});
</script>
