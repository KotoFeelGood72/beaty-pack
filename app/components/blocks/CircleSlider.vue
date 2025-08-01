<template>
  <div class="container py-10">
    <div class="circle-slider">
      <Swiper
        :modules="[Pagination]"
        :breakpoints="{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 42,
          },
        }"
        :loop="true"
        class="hero-swiper !px-4 !-mx-4"
      >
        <SwiperSlide v-for="item in stories" :key="'item' + item.id">
          <CircleCard :item="item" @click="setCurrentStory(item, item.id)" />
        </SwiperSlide>
        <SwiperSlide>
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
import { Pagination } from "swiper/modules";
import { useStoriesStore } from "~/store/useStoriesStore";
import "swiper/css";
import "swiper/css/pagination";

const { setCurrentStory } = useStoriesStore();
</script>

<style scoped></style>
