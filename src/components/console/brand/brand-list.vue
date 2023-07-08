<template>
  <div>
    <div class="flex gap-8 justify-between"></div>
    <UTable :rows="store.entities" :columns="columns" total="700" page-count="25">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
      <template #image-data="{ row }">
        <div class="w-10">
          <img class="object-cover" :src="row.logo" alt="" />
        </div>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { Product } from '~/schema/product';

const store = useBrandStore();
await store.retrieve();

const consoleStore = useConsoleStore();

const columns = [
  {
    key: 'image',
    label: '图片',
  },
  {
    key: 'title',
    label: '标题',
  },
  {
    key: 'name',
    label: '名称',
  },
  {
    key: 'alias',
    label: '别名',
  },
  {
    key: 'actions',
    label: '操作',
  },
];

const items = (row: Product) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square',
      click: () => {
        store.retrieve({ id: row.id });
        consoleStore.showSideover('ConsoleBrandEdit');
      },
    },
  ],
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-archive-box-x-mark',
      click: () => {
        useToast().add({
          title: `确定要执行删除吗？`,
          actions: [
            {
              color: 'red',
              variant: 'outline',
              label: '确定删除',
              click: () => {
                store.destroy(row.id);
              },
            },
          ],
        });
      },
    },
  ],
];
</script>
