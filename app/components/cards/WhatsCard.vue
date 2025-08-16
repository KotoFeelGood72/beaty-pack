<template>
  <NuxtLink :to="`/cases/${item.id}`" @click="handleClick">
    <div class="whats-card bg-white lg:rounded-card rounded-mobile lg:h-[406px] ">
      <div
        class="whats-card-image w-full h-full max-h-[252px] lg:rounded-card rounded-mobile overflow-hidden"
      >
        <NuxtImg
          :src="item.image"
          :alt="item.title"
          loading="lazy"
          format="webp"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="whats-card-content lg:space-y-4 space-y-2 lg:px-5 lg:py-6 px-2 py-4">
        <h3 class="whats-card-title lg:text-headline-5 font-semibold font-onest text-body-5 line-clamp-1">
          {{ item.title }}
        </h3>
        <p class="whats-card-description max-lg:text-body-5 line-clamp-2">
          {{ item.description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useStoriesStore } from "@/store/useStoriesStore";

const props = defineProps<{
  item: any;
  idx?: number;
}>();

const storiesStore = useStoriesStore();

const handleClick = () => {
  if (props.idx !== undefined) {
    storiesStore.setCurrentStory(props.item, props.idx);
  }
};
</script>
