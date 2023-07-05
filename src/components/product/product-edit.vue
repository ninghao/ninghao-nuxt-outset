<template>
  <div class="px-8 py-6 space-y-6">
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
    <div class="space-y-4">
      <UFormGroup name="title" label="标题">
        <UInput
          autofocus
          v-model="store.entity.title"
          size="lg"
          variant="none"
          placeholder="请输入标题"
        />
      </UFormGroup>
      <UFormGroup name="color" label="颜色">
        <UInput
          v-model="store.entity.color"
          size="lg"
          variant="none"
          placeholder="请输入颜色"
        />
      </UFormGroup>
      <UFormGroup name="material" label="材质">
        <UInput
          v-model="store.entity.material"
          size="lg"
          variant="none"
          placeholder="请输入材质"
        />
      </UFormGroup>
      <UFormGroup name="price" label="价格">
        <UInput
          v-model="store.entity.price"
          size="lg"
          variant="none"
          placeholder="请输入价格"
        />
      </UFormGroup>
      <UFormGroup name="productId" label="产品ID">
        <UInput
          v-model="store.entity.productId"
          size="lg"
          variant="none"
          placeholder="请输入产品ID"
        />
      </UFormGroup>
      <UFormGroup name="sku" label="SKU">
        <UInput
          v-model="store.entity.sku"
          size="lg"
          variant="none"
          placeholder="请输入SKU"
        />
      </UFormGroup>
      <UFormGroup name="url" label="URL">
        <UInput
          v-model="store.entity.url"
          size="lg"
          variant="none"
          placeholder="请输入URL"
        />
      </UFormGroup>
      <UFormGroup name="brand" label="品牌">
        <USelectMenu
          v-model="store.entity.brand"
          :options="brandStore.entities"
          by="id"
          optionAttribute="title"
          placeholder="请选择品牌"
        />
      </UFormGroup>
      <UFormGroup name="category" label="分类">
        <USelectMenu
          v-model="store.entity.category"
          :options="categoryStore.entities"
          by="id"
          optionAttribute="title"
          placeholder="请选择分类"
        />
      </UFormGroup>
    </div>
    <div class="border-t py-4 font-light text-sm space-y-4">
      <div>可用区</div>
      <div class="flex gap-6 ml-4">
        <div v-for="item in regionStore.entities" :key="item.id">
          <UButton
            variant="soft"
            color="gray"
            size="xs"
            @click="availableStore.create({ product: store.entity.id, region: item.id })"
            >{{ item.title }}</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useProductStore();
const brandStore = useBrandStore();
brandStore.retrieve();
const categoryStore = useCategoryStore();
categoryStore.retrieve();
const regionStore = useRegionStore();
regionStore.retrieve();
const availableStore = useAvailableStore();

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
