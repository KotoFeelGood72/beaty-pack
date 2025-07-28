<template>
  <div class="whats-card">
    <div class="whats-card-image">
      <NuxtImg
        :src="image"
        alt="Банк Точка - подарочный пакет"
        class="whats-card-img"
        loading="lazy"
        format="webp"
      />
    </div>
    <div class="whats-card-content">
      <h3 class="whats-card-title">{{ title }}</h3>
      <p class="whats-card-description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  image: string;
}>();
</script>
