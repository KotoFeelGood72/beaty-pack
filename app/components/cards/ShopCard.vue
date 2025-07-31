<template>
  <div class="shop-card">
    <div class="shop-card-image flex items-center justify-center relative mb-4">
      <div class="shop__chip absolute top-2 left-2 p-3 rounded-lg" :class="[chipTheme]">
        {{ item.chip }}
      </div>
      <NuxtImg :src="imageSrc" alt="shop-card-image" width="100%" height="100%" />
    </div>
    <div class="shop-card-content">
      <div class="shop-card-content-title">
        <h3 class="text-headline-4 font-semibold">{{ item.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const props = defineProps<{
  item: any;
}>();

const chipTheme = computed(() => {
  switch (props.item.chip) {
    case "Топ-продаж":
      return "bg-[#9F6ED7] text-white text-[12px]";
    case "Sale":
      return "bg-[#FD9E2D] text-white text-[12px]";
  }
});

const isMobile = useMediaQuery("(max-width: 767px)");
const imageSrc = computed(() => {
  return isMobile.value ? props.item.image.mobile : props.item.image.desktop;
});
</script>

<style scoped></style>
