<template>
  <div>
    <PageHead
      :breadcrumbs="[{ label: 'Главная', to: '/' }, { label: 'Блог' }]"
      title="Блог"
    />
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-11 mb-11">
        <ArticleCard v-for="post in paginatedPosts" :key="post.id" :post="post" />
      </div>
      <Pagination
        :total-records="posts.length"
        :current-page="currentPage"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleCard from "~/components/cards/ArticleCard.vue";
import Pagination from "~/components/shared/Pagination.vue";
import PageHead from "~/components/shared/PageHead.vue";
import { posts } from "~/data/Posts";

// Состояние пагинации
const currentPage = ref(1);
const recordsPerPage = 9;

// Вычисляем посты для текущей страницы
const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  return posts.slice(startIndex, endIndex);
});

// Обработчик изменения страницы
const handlePageChange = (page: number) => {
  currentPage.value = page;
  // Прокручиваем к началу страницы
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped></style>
