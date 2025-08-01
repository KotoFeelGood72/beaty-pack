<template>
  <div>
    <HeroBlocks />
    <CircleSlider />
    <Transition name="fade">
      <StorieslSliderModal v-if="isOpen" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import HeadBlocks from "@/components/blocks/HeadBlocks.vue";
import HeroBlocks from "@/components/blocks/HeroBlocks.vue";
import CircleSlider from "~/components/blocks/CircleSlider.vue";
import StorieslSliderModal from "~/components/modals/StorieslSliderModal.vue";
import { useStoriesStore, useStoriesStoreRefs } from "~/store/useStoriesStore";

const { currentStory } = useStoriesStoreRefs();

const isOpen = computed(() => currentStory.value?.active);
</script>

<style scoped></style>
