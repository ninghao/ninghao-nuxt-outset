<template>
  <div class="px-8 py-6 space-y-4">
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
    <UFormGroup name="alias" label="别名">
      <UInput
        v-model="store.entity.alias"
        size="lg"
        variant="none"
        placeholder="请输入别名"
      />
    </UFormGroup>
    <UFormGroup name="code" label="代码">
      <UInput
        v-model="store.entity.code"
        size="lg"
        variant="none"
        placeholder="请输入代码"
      />
    </UFormGroup>
    <UFormGroup name="area" label="地区">
      <UInput
        v-model="store.entity.area"
        size="lg"
        variant="none"
        placeholder="请输入代码"
      />
    </UFormGroup>
    <UFormGroup name="website" label="网址">
      <UInput
        v-model="store.entity.website"
        size="lg"
        variant="none"
        placeholder="请输入网址"
      />
    </UFormGroup>
    <div class="border-t pt-6 border-neutral-100">
      <UButton size="lg" @click="store.create">创建区域</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useRegionStore();
</script>
