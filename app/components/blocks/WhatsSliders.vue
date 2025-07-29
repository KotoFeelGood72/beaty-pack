<template>
  <div class="bg-lightGrey py-[100px]">
    <div class="container">
      <div class="flex justify-between items-center pb-9 mb-9 relative">
        <h2 class="text-headline-2 font-semibold">С кем мы работаем</h2>
        <div class="flex gap-4">
          <div
            class="w-12 h-12 bg-brown rounded-full cursor-pointer flex items-center justify-center swiper-button-prev"
          >
            <IconArrowSlider />
          </div>
          <div
            class="w-12 h-12 bg-brown rounded-full cursor-pointer flex items-center justify-center swiper-button-next"
          >
            <IconArrowSlider class="rotate-180" />
          </div>
        </div>
        <div class="swiper-pagination w-full !bottom-0"></div>
      </div>
      <Swiper
        class="pt-8"
        :modules="[Navigation, Pagination]"
        :space-between="20"
        :pagination="{
          el: '.swiper-pagination',
          type: 'progressbar',
          clickable: true,
        }"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :breakpoints="{
          768: {
            slidesPerView: 3,
          },
        }"
      >
        <SwiperSlide v-for="item in cases" :key="item.id">
          <WhatsCard :item="item" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import WhatsCard from "@/components/cards/WhatsCard.vue";
import IconArrowSlider from "@/components/icons/icon-arrow-slider.vue";
import { cases } from "~/data/Cases";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
</script>

<style scoped>
.swiper-pagination {
  /* margin: 20px 0; */
}

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
