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
      @click="navigateTo('/signin')"
      class="mt-4"
      size="xs"
    >
      登录
    </UButton>
  </div>
</template>
