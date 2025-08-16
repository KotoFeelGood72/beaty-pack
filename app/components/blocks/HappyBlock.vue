<template>
  <div class="container lg:space-y-11 space-y-7">
    <h2 class="lg:text-headline-2 text-headline-6 font-medium" v-if="title">Сувенирная продукция к празднику</h2>

    <div class="space-y-5">
      <div class="flex lg:gap-5 gap-[10px] custom-grid-1 max-lg:flex-col">
        <HappyCard v-for="item in happy.slice(0, 4)" :key="item.title" :happy="item" />
      </div>
      <div class="flex gap-5 custom-grid-2 lg:gap-5 gap-[10px] max-lg:flex-col">
        <HappyCard v-for="item in happy.slice(4, 7)" :key="item.title" :happy="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HappyCard from "@/components/cards/HappyCard.vue";
import { happy } from "@/data/Happy";


withDefaults(defineProps<{
  title?: boolean;
}>(), {
  title: true,
});
</script>

<style>


@media (min-width: 1024px) { 
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

}

</style>
