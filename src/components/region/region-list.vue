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
  </UTable>
</template>

<script setup lang="ts">
import { Region } from '~/schema/region';

const isModalOpen = ref(false);

const store = useRegionStore();
await store.retrieve();

const consoleStore = useConsoleStore();

const columns = [
  {
    key: 'name',
    label: '名称',
  },
  {
    key: 'title',
    label: '标题',
  },
  {
    key: 'alias',
    label: '别名',
  },
  {
    key: 'code',
    label: '代号',
  },
  {
    key: 'area',
    label: '地区',
  },
  {
    key: 'website',
    label: '网址',
  },
  {
    key: 'actions',
    label: '操作',
  },
];

const items = (row: Region) => [
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
