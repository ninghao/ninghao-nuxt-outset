<template>
  <UTable :rows="store.entities" :columns="columns">
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
    <template #brandTitle-data="{ row }">
      {{ row.brand.title }}
    </template>
    <template #productImage-data="{ row }">
      <div class="w-14">
        <img :src="getRemoteImage(row.image.remote.url, 200, 200)" />
      </div>
    </template>
  </UTable>
</template>

<script setup lang="ts">
import { Product } from '~/schema/product';

const store = useProductStore();
await store.retrieve();

const consoleStore = useConsoleStore();

const getRemoteImage = (
  url: string,
  width: number | string,
  height?: number | string,
) => {
  return url.replace('{IMG_WIDTH}', `${width}`).replace('{IMG_HEIGHT}', `${height}`);
};

const columns = [
  {
    key: 'productImage',
    label: '图片',
  },
  {
    key: 'sku',
    label: 'SKU',
  },
  {
    key: 'brandTitle',
    label: '品牌',
  },
  {
    key: 'title',
    label: '标题',
  },
  {
    key: 'color',
    label: '颜色',
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
        consoleStore.showSideover('RegionEdit');
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
                // store.destroy(row.id);
              },
            },
          ],
        });
      },
    },
  ],
];
</script>
