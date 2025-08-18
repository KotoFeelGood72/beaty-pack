<template>
  <div class="lg:bg-lightGrey lg:py-100 pt-[39px] pb-[78px] overflow-hidden">
    <div class="container relative">
      <div class="flex justify-between items-center lg:pb-9 lg:mb-9  mb-5 lg:relative">
        <h2 class="lg:text-headline-2 text-headline-6 font-semibold">{{ title }}</h2>
        <div class="lg:flex gap-4 hidden">
          <div
            class="w-12 h-12 bg-brown rounded-full cursor-pointer flex items-center justify-center swiper-button-prev"
            :class="`${uniqueId}-button-prev`"
          >
            <IconArrowSlider />
          </div>
          <div
            class="w-12 h-12 bg-brown rounded-full cursor-pointer flex items-center justify-center swiper-button-next"
            :class="`${uniqueId}-button-next`"
          >
            <IconArrowSlider class="rotate-180" />
          </div>
        </div>
        <div
          class="swiper-pagination w-full !bottom-0 whats-pagination"
          :class="`${uniqueId}-pagination`"
        ></div>
      </div>
      <Swiper
        class="pt-8 mobile_styles_slider"
        :modules="[Navigation, Pagination]"
        :pagination="{
          el: `.${uniqueId}-pagination`,
          type: 'progressbar',
          clickable: true,
        }"
        :navigation="{
          nextEl: `.${uniqueId}-button-next`,
          prevEl: `.${uniqueId}-button-prev`,
        }"
        :breakpoints="{
          367: {
            slidesPerView: 2.3,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }"
      >
        <SwiperSlide v-for="item in items" :key="item.id">
          <slot name="card" :item="item"> </slot>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconArrowSlider from "@/components/icons/icon-arrow-slider.vue";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed } from "vue";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  title?: string;
  items: any[];
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "С кем мы работаем",
  className: "whats",
  items: () => [],
});

// Создаем стабильный ID на основе props
const uniqueId = computed(() => {
  // Создаем стабильную строку на основе всех props
  const stableString = `${props.title || ''}-${props.className || ''}-${props.items.length || 0}`;
  
  // Простая хеш-функция для создания стабильного ID
  let hash = 0;
  for (let i = 0; i < stableString.length; i++) {
    const char = stableString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Используем абсолютное значение и преобразуем в base36
  const hashString = Math.abs(hash).toString(36);
  return `${props.className || 'swiper'}-${hashString}`;
});
</script>

<style scoped>
.swiper-pagination-progressbar {
  background: #e5e5e5;
  height: 2px;
  top: auto;
  bottom: 0;


}

:deep(.swiper-pagination-progressbar-fill) {
  background: #8b4513 !important;
  height: 2px;
}

@media (max-width: 1024px) {
  .whats-pagination {
    top: calc(100% + 25px)!important;
    position: absolute;
    max-width: calc(100% - 40px);
    left: 50%;
    transform: translateX(-50%);
  }

  .mobile_styles_slider {
    overflow: visible;
  }
}
</style>
