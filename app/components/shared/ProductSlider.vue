<template>
  <div class="product-view max-w-[720px] w-full">
    <div>
      <PageHead
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
          { label: '   Бумажный пакет Великан v2' },
        ]"
        title="   Бумажный пакет Великан v2"
      />
    </div>
    <div class="flex gap-5 max-lg:flex-wrap h-[460px]">
      <div class="rounded-lg overflow-hidden flex-grow ">
        <Swiper :modules="[Thumbs]" :slides-per-view="1" :space-between="20" :thumbs="{ swiper: thumbsSwiper }">
          <SwiperSlide v-for="value in images" :key="value.alt">
            <NuxtImg
              :src="value.src"
              :alt="value.alt"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="space-y-5">
      <Swiper
        :modules="[FreeMode, Thumbs]"
        :slides-per-view="3"
        :space-between="20"
        direction="vertical"
        :free-mode="true"
        :watch-slides-progress="true"
        class="h-full w-[140px] "
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

<style scoped></style>
