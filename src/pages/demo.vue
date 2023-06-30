<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <UButton @click="onClickButton">验证</UButton>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';

// const schema = z.object({
//   brand: z.object({ id: z.string(), name: z.string() }).transform((data) => 'hello'),
// });

const schema = z
  .string()
  .trim()
  .regex(/^[a-z]+:[a-z_]+$/);

const onClickButton = () => {
  try {
    const result = schema.parse('aaaa:_a');

    console.log(result);
  } catch (error: any) {
    console.log(JSON.parse(error.message)[0].message);
  }
};
</script>
