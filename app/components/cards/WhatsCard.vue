<template>
  <NuxtLink :to="`/cases/${item.id}`" @click="handleClick">
    <div class="whats-card bg-white rounded-card">
      <div
        class="whats-card-image w-full h-full max-h-[252px] rounded-card overflow-hidden"
      >
        <NuxtImg
          :src="item.image"
          :alt="item.title"
          loading="lazy"
          format="webp"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="whats-card-content space-y-4 px-5 py-6">
        <h3 class="whats-card-title text-headline-5 font-semibold font-onest">
          {{ item.title }}
        </h3>
        <p class="whats-card-description">
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
