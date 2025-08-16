<template>
  <div class="footer-head-col flex items-center lg:gap-3 gap-2 lg:text-headline-5 text-headline-5 max-lg:font-bold">
    <div class="lg:w-6  lg:h-6 w-5 h-5 flex items-center justify-center">
      <NuxtImg :src="`/images/footer/${icon}.svg`" :alt="title" class="max-lg:w-full max-lg:h-full"/>
    </div>
    <p class="">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>();
</script>

<style scoped></style>
