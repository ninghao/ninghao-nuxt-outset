<template>
  <UVerticalNavigation :links="links" :ui="{ font: '' }" />
</template>

<script setup lang="ts">
const links = [
  {
    label: '品牌',
    icon: 'i-heroicons-heart',
    to: '/workspace/brands',
  },
  {
    label: '区域',
    icon: 'i-heroicons-map',
    to: '/workspace/locations',
  },
  {
    label: '来源',
    icon: 'i-heroicons-link',
    to: '/workspace/origins',
  },
  {
    label: '日志',
    icon: 'i-heroicons-bug-ant',
    to: '/workspace/logs',
  },
  {
    label: '产品',
    icon: 'i-heroicons-shopping-bag',
    to: '/workspace/products',
  },
  {
    label: '用户',
    icon: 'i-heroicons-user',
    to: '/workspace/users',
  },
  {
    label: '管理',
    icon: 'i-heroicons-user-circle',
    to: '/workspace/admins',
  },
  {
    label: '设置',
    icon: 'i-heroicons-adjustments-horizontal',
    to: '/workspace/settings',
  },
  // {
  //   label: 'Profile',
  //   avatar: {
  //     src: 'https://avatars.githubusercontent.com/u/739984?v=4',
  //   },
  //   badge: 100,
  // },
  // {
  //   label: 'Installation',
  //   icon: 'i-heroicons-home',
  //   to: '/getting-started/installation',
  // },
  // {
  //   label: 'Vertical Navigation',
  //   icon: 'i-heroicons-chart-bar',
  //   to: '/navigation/vertical-navigation',
  // },
  // {
  //   label: 'Command Palette',
  //   icon: 'i-heroicons-command-line',
  //   to: '/navigation/command-palette',
  // },
];
</script>
