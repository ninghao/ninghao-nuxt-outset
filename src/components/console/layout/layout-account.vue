<template>
  <div class="pl-2">
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <div class="flex gap-1">
        <UAvatar
          src="/images/avatars/avatar-01.jpg"
          alt="用户头像"
          size="sm"
          chip-color="primary"
          chip-text=""
          chip-position="top-right"
        />
        <ClientOnly>
          <template #fallback>
            <div class="flex flex-col items-center justify-center ml-2">
              <USkeleton class="h-4 w-20" />
            </div>
          </template>
          <UButton color="white" variant="soft" :label="store.currentUser.name" />
        </ClientOnly>
      </div>
    </UDropdown>
  </div>
</template>

<script setup lang="ts">
// const { currentUser } = useCurrentUser();
const store = useAuthStore();

const items = [
  // [
  //   {
  //     label: 'Profile',
  //     avatar: {
  //       src: 'https://avatars.githubusercontent.com/u/739984?v=4',
  //     },
  //   },
  // ],
  // [
  //   {
  //     label: 'Edit',
  //     icon: 'i-heroicons-pencil-square-20-solid',
  //     shortcuts: ['E'],
  //     click: () => {
  //       console.log('Edit');
  //     },
  //   },
  //   {
  //     label: 'Duplicate',
  //     icon: 'i-heroicons-document-duplicate-20-solid',
  //     shortcuts: ['D'],
  //     disabled: true,
  //   },
  // ],
  // [
  //   {
  //     label: 'Archive',
  //     icon: 'i-heroicons-archive-box-20-solid',
  //   },
  //   {
  //     label: 'Move',
  //     icon: 'i-heroicons-arrow-right-circle-20-solid',
  //   },
  // ],
  // [
  //   {
  //     label: 'Delete',
  //     icon: 'i-heroicons-trash-20-solid',
  //     shortcuts: ['⌘', 'D'],
  //   },
  // ],
  [
    {
      label: '退出登录',
      icon: 'i-heroicons-arrow-right-circle',
      // shortcuts: ['⌘', 'D'],
      click: () => {
        store.signout();
      },
    },
  ],
];
</script>
