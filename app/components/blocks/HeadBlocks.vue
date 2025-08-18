<template>
    <ClientOnly>  
  <div
    class="head-block relative overflow-hidden flex flex-col justify-center rounded-b-[40px] -mt-[108px] lg:min-h-[700px] max-lg:h-[567px] max-lg:mb-10"
  >
    <div class="absolute inset-0 z-0">
      <NuxtImg
        :src="currentImage"
        :alt="backgroundAlt || 'Background image'"
        class="w-full h-full object-cover"
      />
    <div class="bg absolute top-0 left-0 w-full h-full bg-black/30" v-if="overlay"></div>
    </div>
    <div class="container relative z-10 lg:pt-[265px] lg:pb-[211px] max-lg:h-full max-lg:flex flex-col lg:items-end justify-end max-lg:pb-[58px]">
      <div
        class="flex flex-col lg:gap-4 gap-2 max-w-[409px] max-lg:justify-end"
        :class="{ 'text-dark': isDark, 'text-white': !isDark }"
      >
        <p
          class="uppercase lg:text-body-4 text-[13px]"
          :class="{ 'text-lightGreyBlue': isDark, 'text-white': !isDark }"
        >
          {{ content.subtitle }}
        </p>
        <h1
          class="lg:text-headline-1 text-headline-6 font-semibold"
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
    </ClientOnly>
</template>

<script setup lang="ts">
import { useResponsiveImage } from "~/utils/useResponsiveImage";

interface Props {
  desktopImage: string;
  mobileImage: string;
  backgroundAlt?: string;
  isDark?: boolean;
  overlay?: boolean;
  content: {
    subtitle: string;
    title: string;
    description: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  backgroundAlt: "",
  isDark: false,
  overlay: false,
});

// Используем нашу утилиту для получения подходящего изображения
const { getImage } = useResponsiveImage();

// Вычисляемое свойство для выбора подходящего изображения
const currentImage = computed(() => {
  return getImage(props.mobileImage, props.desktopImage);
});
</script>
