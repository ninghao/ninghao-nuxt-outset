<template>
  <div
    :class="[
      'flex flex-col items-center justify-center',
      'min-h-screen',
    ]"
  >
    <div
      :class="['min-w-[400px]', 'border px-8 py-12 rounded-xl']"
    >
      <AppLogo class="mb-12" />
      <div class="space-y-4 w-full">
        <UFormGroup name="name" label="名字">
          <UInput
            v-model="name"
            size="lg"
            placeholder="请输入名字"
            variant="none"
          />
        </UFormGroup>
        <UFormGroup name="title" label="密码">
          <UInput
            v-model="password"
            type="password"
            size="lg"
            variant="none"
            placeholder="请输入密码"
          />
        </UFormGroup>

        <div class="border-t pt-6 border-neutral-100">
          <UButton size="lg">登录</UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank',
});

const name = ref<string>();
const password = ref<string>();
</script>
