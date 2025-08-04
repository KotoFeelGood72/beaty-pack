<template>
  <div
    class="head-block relative overflow-hidden flex flex-col justify-center rounded-b-[40px] -mt-[108px] min-h-[700px]"
  >
    <div class="absolute inset-0 z-0">
      <NuxtImg
        :src="currentImage"
        :alt="backgroundAlt || 'Background image'"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="container relative z-10 pt-[265px] pb-[211px]">
      <div
        class="flex flex-col gap-4 max-w-[409px]"
        :class="{ 'text-dark': isDark, 'text-white': !isDark }"
      >
        <p
          class="uppercase text-body-4"
          :class="{ 'text-lightGreyBlue': isDark, 'text-white': !isDark }"
        >
          {{ content.subtitle }}
        </p>
        <h1
          class="text-headline-1 font-semibold"
          :class="{ 'text-dark': isDark, 'text-white': !isDark }"
        >
          {{ content.title }}
        </h1>
        <span :class="{ 'text-lightGreyBlue': isDark, 'text-white': !isDark }">
          {{ content.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

interface Props {
  desktopImage: string;
  mobileImage: string;
  backgroundAlt?: string;
  isDark?: boolean;
  content: {
    subtitle: string;
    title: string;
    description: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  backgroundAlt: "",
  isDark: false,
});

// Определяем тип устройства с помощью useMediaQuery
const isMobile = useMediaQuery("(max-width: 768px)");

// Вычисляемое свойство для выбора подходящего изображения
const currentImage = computed(() => {
  return isMobile.value ? props.mobileImage : props.desktopImage;
});
</script>
