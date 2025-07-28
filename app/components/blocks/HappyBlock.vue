<template>
  <div class="container">
    <h2>Сувенирная продукция к празднику</h2>
    <div>
      <HappyCard v-for="item in happy" :key="item.title" :happy="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HappyCard from "@/components/cards/HappyCard.vue";
import { happy } from "@/data/Happy";
</script>

<style scoped></style>
