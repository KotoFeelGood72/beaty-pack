<template>
  <div class="container space-y-11">
    <h2 class="text-headline-2 font-semibold">Сувенирная продукция к празднику</h2>

    <div class="space-y-5">
      <div class="flex gap-5 custom-grid-1">
        <HappyCard v-for="item in happy.slice(0, 4)" :key="item.title" :happy="item" />
      </div>
      <div class="flex gap-5 custom-grid-2">
        <HappyCard v-for="item in happy.slice(4, 7)" :key="item.title" :happy="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HappyCard from "@/components/cards/HappyCard.vue";
import { happy } from "@/data/Happy";
</script>

<style>
.custom-grid-1 > a {
  width: 295px;
}
.custom-grid-1 > a:hover {
  width: 424px;
}

.custom-grid-2 > a {
  width: 400px;
}
.custom-grid-2 > a:hover {
  width: 696px;
}
</style>
