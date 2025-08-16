<template>
  <div>
    <PageHead
      :breadcrumbs="[{ label: 'Главная', to: '/' }, { label: 'Портфолио' }]"
      title="Портфолио"
    />
    <div class="container flex flex-col lg:gap-14 gap-12 lg:mb-100 mb-12">
      <WorksGrid />
      <div class="flex justify-center">
        <button
          class="border border-[#9F9F9F] rounded-lg py-4 px-[32px] text-lightGreyBlue flex items-center justify-center gap-2"
        >
          <p>Загрузить еще</p>
          <iconChevron />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WorksGrid from "@/components/blocks/WorksGrid.vue";
import iconChevron from "~/components/icons/icon-chevron.vue";
import PageHead from "~/components/shared/PageHead.vue";
</script>

<style scoped></style>
