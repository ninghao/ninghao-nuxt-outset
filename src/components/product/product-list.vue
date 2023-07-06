<template>
  <div>
    <div class="flex gap-8 justify-between items-center">
      <div class="flex gap-6 items-center">
        <div>
          <UInput
            placeholder="搜索 ..."
            v-model="store.entitiesQuery.filters.sku.$contains"
          >
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">SKU</span>
            </template>
          </UInput>
        </div>
        <div>
          <UInput
            placeholder="搜索 ..."
            v-model="store.entitiesQuery.filters.title.$contains"
          >
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">标题</span>
            </template>
          </UInput>
        </div>
        <div class="flex gap-2 text-sm">
          <UCheckbox
            name="available"
            label="可用区"
            @change="store.toggleAvailableFilter"
          />
        </div>
      </div>
      <UPagination
        v-model="store.entitiesQuery.page"
        :page-count="useEntitiesPerPage()"
        :total="store.totalCount"
        class="mb-6"
      />
    </div>
    <UTable :rows="store.entities" :columns="columns" total="700" page-count="25">
      <template #actions-data="{ row }">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-adjustments-horizontal"
          @click="
            () => {
              store.retrieve({ id: row.id });
              consoleStore.showSideover('ProductEdit');
            }
          "
        />
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
      <template #brandTitle-data="{ row }">
        <div v-if="row.brand && row.brand.title">
          {{ row.brand.title }}
        </div>
      </template>
      <template #availableTitle-data="{ row }">
        <div v-if="row.available?.length" class="flex gap-2">
          <div v-for="region in row.available" :key="region.id">
            <UBadge>{{ region.title }}</UBadge>
          </div>
        </div>
        <div v-else>
          <UBadge color="amber">暂无</UBadge>
        </div>
      </template>
      <template #productImage-data="{ row }">
        <div class="w-14">
          <img
            v-if="row.image && row.image.remote"
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
import { log } from 'console';
import { Product } from '~/schema/product';

const store = useProductStore();
await store.retrieve();

watch(store.entitiesQuery, () => {
  store.retrieve();
});

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
    key: 'availableTitle',
    label: '可用区',
  },
  {
    key: 'actions',
    label: '操作',
  },
];

const items = (row: Product) => [
  // [
  //   {
  //     label: 'Edit',
  //     icon: 'i-heroicons-pencil-square',
  //     click: () => {
  //       store.retrieve({ id: row.id });
  //       consoleStore.showSideover('ProductEdit');
  //     },
  //   },
  // ],
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
