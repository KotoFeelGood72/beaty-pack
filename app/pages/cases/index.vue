<template>
  <div class="container">
    <div class="grid grid-cols-3 gap-y-8 gap-x-5">
      <WhatsCard v-for="item in cases" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WhatsCard from "@/components/cards/WhatsCard.vue";
import { cases } from "~/data/Cases";
</script>

<style scoped></style>
