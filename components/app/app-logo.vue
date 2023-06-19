<template>
  <div class="app-logo">
    <img :src="`/images/logo.svg`" alt="" />
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
