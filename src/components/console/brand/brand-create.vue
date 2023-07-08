<template>
  <div class="px-8 py-8 space-y-4">
    <UFormGroup name="name" label="名称">
      <UInput
        v-model="store.entity.name"
        size="lg"
        placeholder="请输入名称"
        variant="none"
      />
    </UFormGroup>
    <UFormGroup name="title" label="标题">
      <UInput
        v-model="store.entity.title"
        size="lg"
        variant="none"
        placeholder="请输入标题"
      />
    </UFormGroup>
    <UFormGroup name="alias" label="中文名">
      <UInput
        v-model="store.entity.alias"
        size="lg"
        variant="none"
        placeholder="请输入中文名"
      />
    </UFormGroup>
    <UFormGroup name="logo" label="标志">
      <UInput
        v-model="store.entity.logo"
        size="lg"
        variant="none"
        placeholder="请输入标志"
      />
    </UFormGroup>
    <div class="border-t pt-6 border-neutral-100">
      <UButton size="lg" @click="store.create">创建品牌</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useConsoleBrandStore();
</script>
