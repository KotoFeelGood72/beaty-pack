<template>
  <div class="hero-slider">
    <Swiper
      :modules="[Pagination]"
      :pagination="{
        el: '.swiper-pagination',
        type: 'progressbar',
        clickable: true,
      }"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      class="hero-swiper"
    >
      <SwiperSlide v-for="item in 5" :key="'item' + item">
        <div class="hero-slide">
          <div class="hero-content">
            <h2>Подарочные коробки с вашим логотипом</h2>
            <p>Бесплатный дизайн макет при заказе на сумму от 30 000 руб.</p>
            <Btn name="Узнать подробнее" />
          </div>
          <div class="hero-image">
            <NuxtImg src="/images/hero.png" alt="hero" />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="swiper-pagination"></div>
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

<style scoped>
/* Кастомные стили для прогресс-бара */
:deep(.swiper-pagination) {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  z-index: 10;
}

:deep(.swiper-pagination-progressbar) {
  background: #fff;
  height: 100%;
  border-radius: 0;
}

:deep(.swiper-pagination-progressbar-fill) {
  background: #fff;
  height: 100%;
  border-radius: 0;
  transition: width 0.3s ease;
}
</style>
