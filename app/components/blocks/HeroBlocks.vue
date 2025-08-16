<template>
  <div
    class="hero-slider bg-gradient-to-r from-[#d8d6e1] to-[#a0a8c2] rounded-bl-3xl rounded-br-3xl -mt-[180px] relative"
  >
    <Swiper
      :modules="[Pagination]"
      :pagination="{
        el: '.hero-swiper-pagination',
        type: 'progressbar',
        clickable: true,
      }"
      :loop="false"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      class="hero-swiper"
    >
      <SwiperSlide v-for="item in 5" :key="'item' + item">
        <div class="container relative">
          <div
            class="hero-slide flex items-center gap-5 justify-between pt-[239px] pb-[150px] flex-wrap"
          >
            <div class="hero-content flex flex-col lg:gap-y-4 gap-y-2 max-w-[426px] max-lg:order-2">
              <h2 class="lg:text-headline-1 text-head font-semibold text-headline-6">
                Подарочные коробки с вашим логотипом
              </h2>
              <p class="text-lightGreyBlue max-lg:max-w-[267px]">
                Бесплатный дизайн макет при заказе на сумму от 30 000 руб.
              </p>
              <Btn name="Узнать подробнее" class="mt-2 inline-flex w-fit" />
            </div>
            <div class="hero-image max-lg:order-1">
              <NuxtImg src="/images/hero.png" alt="hero" class="w-full h-full" />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="absolute left-1/2 -translate-x-1/2 lg:max-w-[340px] w-full z-10 bottom-16 hero_pagination">
      <div class="hero-swiper-pagination w-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Btn from "@/components/buttons/Btn.vue";

import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
</script>

<style>
.hero-swiper-pagination.swiper-pagination-progressbar {
  background: rgba(255, 255, 255, 0.24);
  border-radius: 10px;
}

.hero-swiper-pagination .swiper-pagination-progressbar-fill {
  border-radius: 10px;
  background: #fff !important;
}

.hero_pagination {
  max-width: calc(100% - 40px);
}
</style>
