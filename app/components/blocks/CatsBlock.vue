<template>
  <div class="container">
    <h2 v-if="title" class="lg:text-headline-2 font-medium max-lg:text-center lg:mb-10 mb-6 text-headline-6 ">{{ title }}</h2>
    <div class="flex flex-wrap gap-x-2 gap-y-8 justify-between max-lg:grid max-lg:grid-cols-2">
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
