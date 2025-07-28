<template>
  <ul>
    <li v-for="item in navigation" :key="item.label">
      <NuxtLink :to="item.to">
        <p>{{ item.label }}</p>
        <IconChevron v-if="item.submenu" />
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { navigation } from "@/data/Navigation";
import IconChevron from "@/components/icons/icon-chevron.vue";
</script>

<style scoped></style>
