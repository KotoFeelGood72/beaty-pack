<template>
  <NuxtLink :to="`/article/${post.id}`">
    <div class="rounded-card lg:h-[252px] overflow-hidden mb-6">
      <NuxtImg :src="post.image" alt="article-card" class="w-full h-full object-cover" />
    </div>
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-headline-5 font-semibold">{{ post.title }}</h3>
        <p>{{ post.description }}</p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-brown">{{ post.date }}</p>
        <div class="flex items-center justify-center">
          <IconArrowArticle />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import IconArrowArticle from "../icons/icon-arrow-article.vue";

const props = defineProps<{
  post: any;
}>();
</script>

<style scoped></style>
