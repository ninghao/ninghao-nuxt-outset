<template>
  <div class="px-8 py-8 space-y-4">
    <UFormGroup name="name" label="名称">
      <UInput
        v-model="name"
        size="lg"
        placeholder="请输入名称"
        variant="none"
      />
    </UFormGroup>
    <UFormGroup name="title" label="标题">
      <UInput
        v-model="title"
        size="lg"
        variant="none"
        placeholder="请输入标题"
      />
    </UFormGroup>
    <UFormGroup name="alias" label="别名">
      <UInput
        v-model="alias"
        size="lg"
        variant="none"
        placeholder="请输入别名"
      />
    </UFormGroup>
    <UFormGroup name="alias" label="标志">
      <UInput
        v-model="logo"
        size="lg"
        variant="none"
        placeholder="请输入标志"
      />
    </UFormGroup>
    <div class="border-t pt-6 border-neutral-100">
      <UButton size="lg">创建品牌</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const name = ref<string>();
const title = ref<string>();
const alias = ref<string>();
const logo = ref<string>();
</script>
