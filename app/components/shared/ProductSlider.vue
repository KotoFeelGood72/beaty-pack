<template>
  <div class="product-view max-w-[720px] w-full max-lg:overflow-hidden">
    <div>
      <PageHead
        classNames="lg:px-0"
        :breadcrumbs="[
          { label: 'Главная', to: '/' },
          {
            label: 'Каталог',
            children: [
              { label: 'Полиграфия', to: '/shop' },
              { label: 'Баннеры', to: '/shop/banners' },
              { label: 'Буклеты', to: '/shop/booklets' },
              { label: 'Визитки', to: '/shop/visitors' },
              { label: 'Буклеты', to: '/shop/booklets' },
              { label: 'Буклеты', to: '/shop/booklets' },
            ],
          },
          {
            label: 'Упаковка',
            children: [
              { label: 'Полиграфия', to: '/shop' },
              { label: 'Баннеры', to: '/shop/banners' },
              { label: 'Буклеты', to: '/shop/booklets' },
              { label: 'Визитки', to: '/shop/visitors' },
              { label: 'Буклеты', to: '/shop/booklets' },
              { label: 'Буклеты', to: '/shop/booklets' },
            ],
          },
          { label: 'Пакеты' },
          { label: 'Бумажный пакет Великан v2' },
        ]"
        title="Бумажный пакет Великан v2"
      />
    </div>
    <div class="flex gap-5 max-lg:flex-wrap lg:h-[460px] max-lg:pl-4">
      <div class="rounded-lg overflow-hidden flex-grow">
        <Swiper
          :modules="[Thumbs]"
          :slides-per-view="1"
          :space-between="20"
          class="product-slider"
          :breakpoints="{
            320: { slidesPerView: 1.1, spaceBetween: 10 },
            480: { slidesPerView: 1.1, spaceBetween: 10 },
            768: { slidesPerView: 1.1, spaceBetween: 10 },
            1024: { slidesPerView: 1, spaceBetween: 10 },
          }"
          :slides-offset-after="10"
          :thumbs="{ swiper: thumbsSwiper }"
        >
          <SwiperSlide v-for="value in images" :key="value.alt">
            <NuxtImg
              :src="value.src"
              :alt="value.alt"
              class="w-full h-full object-cover rounded-[10px] max-lg:h-[242px]"
              loading="lazy"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="space-y-5 max-lg:hidden">
        <Swiper
          :modules="[FreeMode, Thumbs]"
          :slides-per-view="3"
          :space-between="20"
          direction="vertical"
          :free-mode="true"
          :watch-slides-progress="true"
          class="h-full w-[140px] product-slider-thumbs"
          @swiper="onThumbsSwiperReady"
        >
          <SwiperSlide v-for="value in images" :key="value.alt">
            <NuxtImg
              :src="value.src"
              :alt="value.alt"
              class="w-full h-full object-cover rounded-lg overflow-hidden"
              loading="lazy"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper/modules";
import PageHead from "./PageHead.vue";

const props = defineProps<{
  images: { src: string; alt: string }[];
}>();

const thumbsSwiper = ref<any | null>(null);
const onThumbsSwiperReady = (swiper: any) => {
  thumbsSwiper.value = swiper;
};
</script>

<style>
.product-slider-thumbs .swiper-slide {
  position: relative;
  cursor: pointer;
}

@media (max-width: 768px) {
  .product-slider {
    overflow-x: visible;
  }
}

.product-slider-thumbs .swiper-slide::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(122 89 70);
  border-radius: 12px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}
.product-slider-thumbs .swiper-slide-thumb-active::after {
  opacity: 1;
  visibility: visible;
}

/* Скрытие скроллбара */
.product-view {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.product-view::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.product-slider {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.product-slider::-webkit-scrollbar {
  display: none;
}

.product-slider-thumbs {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.product-slider-thumbs::-webkit-scrollbar {
  display: none;
}
</style>
