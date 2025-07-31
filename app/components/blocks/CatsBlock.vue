<template>
  <div class="container">
    <h2 v-if="title">{{ title }}</h2>
    <div class="flex flex-wrap gap-x-2 gap-y-8 justify-between">
      <ShopCard v-for="shop in shops" :key="shop.id" :item="shop" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { shops } from "~/data/Shops";
import ShopCard from "../cards/ShopCard.vue";
defineProps<{
  title?: string;
}>();
</script>

<style scoped></style>
