<template>
  <div>
    <CardMenu v-for="col in submenu" :key="col.label" :col="col" v-if="!isAbout" />
    <ul>
      <li v-for="item in aboutSubmenu" :key="item.label">
        <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { submenu, aboutSubmenu } from "@/data/Navigation";

const props = defineProps<{
  isAbout: boolean;
}>();
</script>

<style scoped></style>
