<template>
  <div class="footer-head-col flex items-center gap-3 text-headline-5">
    <div class="w-6 h-6 flex items-center justify-center">
      <NuxtImg :src="`/images/footer/${icon}.svg`" :alt="title" />
    </div>
    <p>{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>();
</script>

<style scoped></style>
