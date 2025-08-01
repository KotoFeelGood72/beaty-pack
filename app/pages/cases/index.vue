<template>
  <div>
    <PageHead
      :breadcrumbs="[{ label: 'Главная', to: '/' }, { label: 'Кейсы' }]"
      title="С кем мы работаем"
    />
    <div class="container">
      <div class="grid grid-cols-3 gap-y-8 gap-x-5">
        <WhatsCard v-for="(item, idx) in cases" :key="item.id" :item="item" :idx="idx" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WhatsCard from "@/components/cards/WhatsCard.vue";
import PageHead from "~/components/shared/PageHead.vue";
import { cases } from "~/data/Cases";
</script>

<style scoped></style>
