<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 md:gap-3">
    <button
      v-if="currentPage > 1"
      @click="goToPage(currentPage - 1)"
      class="flex items-center justify-center w-[46px] h-[46px]"
      :class="{ 'rotate-180': true }"
    >
      <IconArrowArticle />
    </button>
    <div class="flex items-center gap-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        class="flex items-center justify-center w-[46px] h-[46px] rounded-full"
        :class="{
          'border border-brown text-brown pointer-events-none': currentPage === page,
        }"
      >
        {{ page }}
      </button>
    </div>
    <button
      v-if="currentPage < totalPages"
      @click="goToPage(currentPage + 1)"
      class="flex items-center justify-center w-[46px] h-[46px]"
    >
      <IconArrowArticle />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconArrowArticle from "~/components/icons/icon-arrow-article.vue";

interface Props {
  totalRecords: number;
  recordsPerPage?: number;
  currentPage?: number;
}

const props = withDefaults(defineProps<Props>(), {
  recordsPerPage: 9,
  currentPage: 1,
});

const emit = defineEmits<{
  "page-change": [page: number];
}>();

const totalPages = computed(() => Math.ceil(props.totalRecords / props.recordsPerPage));
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit("page-change", page);
  }
};
</script>
