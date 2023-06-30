<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>

<style>
@import '~/assets/icons/style.css';
@import '~/assets/css/transition.css';
</style>

<script setup lang="ts">
useFavicon();

const {
  public: { appName },
} = useRuntimeConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${appName}` : appName;
  },
});
</script>
