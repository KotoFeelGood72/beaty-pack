<template>
  <div class="lg:py-100 py-60 overflow-hidden ">
    <div class="container max-lg:px-0">
      <div class="space-y-6">
        <h3 class="max-w-[910px] lg:text-headline-2 font-semibold text-headline-6 max-lg:px-5">
          Более 13 лет занимаемся производством упаковки и сувенирной продукцией
        </h3>
        <p class="max-w-[783px] text-lightGreyBlue font-manrope line-clamp-4 max-lg:px-5">
          В целом, конечно, понимание сути ресурсосберегающих технологий предопределяет
          высокую востребованность распределения внутренних резервов и ресурсов.
          Банальные, но неопровержимые выводы, а также активно развивающиеся страны
          третьего мира освещают чрезвычайно интересные особенности картины в целом,
          однако конкретные выводы, разумеется, в равной степени предоставлены сами себе!
          Противоположная точка зрения подразумевает, что диаграммы связей рассмотрены
          исключительно в разрезе маркетинговых и финансовых предпосылок.
        </p>
        <Btn name="Узнать подробнее" class="inline-block max-lg:mx-5" />
      </div>
      
        <ClientOnly>
          <NuxtImg 
          class="w-full max-lg:pl-5" 
          :src="currentImage" 
          alt="countries"
          loading="lazy"
        /></ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import Btn from "@/components/buttons/Btn.vue";
import { useResponsiveImage } from "~/utils/useResponsiveImage";




const { getImage,  } = useResponsiveImage();


// Вычисляемое свойство для выбора подходящего изображения
const currentImage = computed(() => {
  return getImage('/images/countries_mobile.png', '/images/countries.png');
});
</script>

<style scoped></style>
