<template>
  <div class="px-8 py-6 space-y-4">
    <div class="border-b border-neutral-100 pb-4 mb-8 flex justify-between gap-6">
      <UButton size="xs" @click="store.updateBrand" variant="soft">保存</UButton>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton
          size="xs"
          icon="i-heroicons-ellipsis-horizontal"
          square
          color="white"
          variant="soft"
        />
      </UDropdown>
    </div>
    <UFormGroup name="name" label="名称">
      <UInput
        v-model="store.brand.name"
        size="lg"
        placeholder="请输入名称"
        variant="none"
      />
    </UFormGroup>
    <UFormGroup name="title" label="标题">
      <UInput
        v-model="store.brand.title"
        size="lg"
        variant="none"
        placeholder="请输入标题"
      />
    </UFormGroup>
    <UFormGroup name="alias" label="中文名">
      <UInput
        v-model="store.brand.alias"
        size="lg"
        variant="none"
        placeholder="请输入中文名"
      />
    </UFormGroup>
    <UFormGroup name="logo" label="标志">
      <UInput
        v-model="store.brand.logo"
        size="lg"
        variant="none"
        placeholder="请输入标志"
      />
    </UFormGroup>
  </div>
</template>

<script setup lang="ts">
const store = useBrandUpdateStore();

const items = [
  [
    {
      label: '删除',
      icon: 'i-heroicons-archive-box-x-mark',
      click: () => {
        console.log('Edit');
      },
    },
  ],
];
</script>
