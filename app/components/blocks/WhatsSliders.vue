<template>
  <div class="bg-lightGrey py-[100px]">
    <div class="container">
      <div class="flex justify-between items-center pb-9 mb-9 relative">
        <h2 class="text-headline-2 font-semibold">{{ title }}</h2>
        <div class="flex gap-4">
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
          class="swiper-pagination w-full !bottom-0"
          :class="`${uniqueId}-pagination`"
        ></div>
      </div>
      <Swiper
        class="pt-8"
        :modules="[Navigation, Pagination]"
        :space-between="20"
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
          768: {
            slidesPerView: 3,
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

const uniqueId = `${props.className}-${Math.random().toString(36).substr(2, 9)}`;
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
</style>
