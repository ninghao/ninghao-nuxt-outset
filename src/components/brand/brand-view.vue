<template>
  <div class="flex gap-8">
    <UCard
      v-for="item in store.brands"
      :key="item.id"
      :class="[
        'flex flex-col items-center justify-center',
        'w-44',
        'text-center',
        'aspect-1/1',
        'cursor-pointer',
      ]"
      @click="onClickBrandItem(item.id)"
    >
      <div class="space-y-6 flex flex-col aspect-square p-2">
        <img class="h-12" :src="item.logo" :alt="item.title" />
        <h2 class="text-sm">{{ item.title }}</h2>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// const brands = [
//   {
//     id: 'louis-vuitton',
//     name: 'louisvuitton',
//     title: 'LOUIS VUITTON',
//     alias: '路易威登',
//     logo: '/images/brands/louis-vuitton.svg',
//   },
//   {
//     id: 'hermes',
//     name: 'hermes',
//     title: 'Hermès',
//     alias: '爱马仕',
//     logo: '/images/brands/hermes.svg',
//   },
// ];

const store = useBrandIndexStore();
await store.getBrands();

const consoleStore = useConsoleStore();
const brandShowStore = useBrandShowStore();
const brandUpdateStore = useBrandUpdateStore();

const onClickBrandItem = async (id: string) => {
  const brand = await brandShowStore.getBrandById(id);

  if (brand?.value) {
    brandUpdateStore.brand = brand.value;
  }

  consoleStore.showSideover('BrandEdit');
};
</script>
