<template>
  <div class="px-8 py-6 space-y-4">
    <div class="border-b border-neutral-100 pb-4 mb-8 flex justify-between gap-6">
      <UButton size="xs" @click="store.update">保存</UButton>
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
    <UFormGroup name="website" label="网址">
      <UInput
        v-model="store.entity.website"
        size="lg"
        variant="none"
        placeholder="请输入网址"
      />
    </UFormGroup>
    <UFormGroup name="brand" label="品牌">
      <USelectMenu
        v-model="store.entity.brand"
        :options="brandStore.entities"
        by="id"
        optionAttribute="title"
        placeholder="请选择品牌"
      >
      </USelectMenu>
    </UFormGroup>
  </div>
</template>

<script setup lang="ts">
const store = useRegionStore();
const brandStore = useBrandStore();
await brandStore.retrieve();

const items = [
  [
    {
      label: '删除',
      icon: 'i-heroicons-archive-box-x-mark',
      click: () => {
        store.destroy();
      },
    },
  ],
];
</script>
