<template>
  <div
    :class="[
      'flex flex-col items-center justify-center',
      'min-h-screen',
    ]"
  >
    <AppLogo />
    <UButton
      color="white"
      @click="
        navigateTo(`${store.isLoggedIn ? '/console' : '/signin'}`)
      "
      class="mt-4"
      size="xs"
    >
      {{ store.isLoggedIn ? '控制台' : '登录' }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
const store = useAuthStore();
</script>
