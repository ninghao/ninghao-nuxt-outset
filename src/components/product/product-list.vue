<template>
  <div>
    <UPagination
      v-model="store.currentPage"
      :page-count="store.totalPages"
      :total="store.totalCount"
      class="mb-6"
    />
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
      <template #brandTitle-data="{ row }">
        {{ row.brand.title }}
      </template>
      <template #productImage-data="{ row }">
        <div class="w-14">
          <img
            class="object-cover"
            :src="useProductRemoteImage({ url: row.image.remote.url, width: 200 })"
            alt=""
          />
        </div>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { Product } from '~/schema/product';

const store = useProductStore();
await store.retrieve();

const consoleStore = useConsoleStore();

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
