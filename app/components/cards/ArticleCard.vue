<template>
  <NuxtLink :to="`/blog/${post.id}`">
    <div class="rounded-card lg:h-[252px] overflow-hidden mb-6">
      <NuxtImg :src="post.image" alt="article-card" class="w-full h-full object-cover" />
    </div>
    <div class="lg:space-y-8 space-y-4">
      <div class="lg:space-y-4 space-y-2">
        <h3
          class="lg:text-headline-5 text-body-5 font-semibold max-lg:line-clamp-1 line-clamp-2"
        >
          {{ post.title }}
        </h3>
        <p class="max-lg:text-body-5 max-lg:line-clamp-2 line-clamp-3">
          {{ post.description }}
        </p>
      </div>
      <div class="flex justify-start items-center gap-8">
        <p class="text-brown max-lg:text-body-6">{{ post.date }}</p>
        <div class="lg:flex items-center justify-center hidden">
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
