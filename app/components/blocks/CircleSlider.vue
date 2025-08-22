<template>
  <div class="container lg:py-10 pt-14">
    <div class="circle-slider">
      <Swiper
        :modules="[Pagination]"
        :breakpoints="{
          320: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 42,
          },
        }"
        :loop="shouldEnableLoop"
        class="hero-swiper !px-4 !-mx-4"
      >
        <SwiperSlide v-for="item in displayStories" :key="'item' + item.id">
          <CircleCard :item="item" @click="setCurrentStory(item, item.id)" />
        </SwiperSlide>
        <SwiperSlide v-if="!shouldEnableLoop">
          <CircleCard :item="{ title: 'Свое лого' }" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { stories } from "~/data/Stories";
import CircleCard from "@/components/cards/CircleCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useStoriesStore } from "~/store/useStoriesStore";
import { computed } from "vue";

const { setCurrentStory } = useStoriesStore();

// Вычисляем, нужно ли включать loop режим
const shouldEnableLoop = computed(() => {
  // Для мобильных устройств (1 слайд) - включаем loop если есть больше 1 слайда
  // Для планшетов (2 слайда) - включаем loop если есть больше 2 слайдов  
  // Для десктопа (8 слайдов) - включаем loop если есть больше 8 слайдов
  return stories.length > 8;
});

// Подготавливаем слайды для отображения
const displayStories = computed(() => {
  if (shouldEnableLoop.value) {
    // Для loop режима дублируем слайды, чтобы их было достаточно
    return [...stories, ...stories.slice(0, 2)]; // Добавляем первые 2 слайда в конец
  }
  return stories;
});
</script>

<style scoped></style>
