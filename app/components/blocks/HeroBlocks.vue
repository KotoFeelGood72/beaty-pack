<script setup lang="ts">
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const props = defineProps<{ slides: any[]; id: string | number }>();
const activeIndex = ref(0);

function onSlideChange(swiper: any) {
  activeIndex.value = swiper.activeIndex;
}

const paginationOptions = computed(() => ({
  el: `.one-slider__pagination-${props.id}`,
  clickable: true,
  renderBullet: (idx: number, className: string) => `
    <span class="${className}">
      <svg width="84" height="8" viewBox="0 0 84 8" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.2 0H84L79.8 8H0L4.2 0Z"/>
      </svg>
    </span>
  `,
}));
</script>

<template>
  <div class="one-slider relative lg:pb-10 pb-5">
    <swiper
      :modules="[Pagination]"
      :slides-per-view="1"
      :space-between="50"
      @slideChange="onSlideChange"
      :pagination="paginationOptions"
      class="h-[126px] lg:h-auto"
    >
      <swiper-slide v-for="(item, i) in slides" :key="`slide-${props.id}-${i}`">
        <RouterLink :to="item.link">
          <img :src="item.img" class="w-full h-full lg:h-auto lg:w-auto" />
        </RouterLink>
      </swiper-slide>
    </swiper>

    <div
      :class="[
        `one-slider__pagination-${props.id}`,
        'slider-main-pagination !bottom-0 absolute !left-[50%] !translate-x-[-50%] flex items-center justify-center',
      ]"
    ></div>
  </div>
</template>
