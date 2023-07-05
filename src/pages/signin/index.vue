<template>
  <div :class="['flex flex-col items-center justify-center', 'min-h-screen']">
    <div :class="['min-w-[400px]', 'border border-neutral-100 px-8 py-12 rounded-xl']">
      <AppLogo class="mb-12" />
      <form class="space-y-4 w-full">
        <UFormGroup name="name" label="名字">
          <UInput
            v-model="store.name"
            size="lg"
            placeholder="请输入名字"
            variant="none"
            autocomplete="username"
          />
        </UFormGroup>
        <UFormGroup name="title" label="密码">
          <UInput
            v-model="store.password"
            type="password"
            size="lg"
            variant="none"
            placeholder="请输入密码"
            autocomplete="current-password"
          />
        </UFormGroup>

        <div class="border-t pt-6 border-neutral-100">
          <UButton size="lg" @click="store.signin">登录</UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank',
});

const store = useAuthStore();
</script>
