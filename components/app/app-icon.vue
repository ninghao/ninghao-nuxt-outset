<template>
  <span class="app-icon">{{ name }}</span>
</template>

<script setup lang="ts">
interface Props {
  name?: string;
}

withDefaults(defineProps<Props>(), {
  name: 'chat',
});
</script>
