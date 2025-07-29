<template>
  <ul class="flex items-center gap-8">
    <li v-for="item in navigation" :key="item.label">
      <NuxtLink
        :to="item.to"
        class="flex items-center gap-2 py-3 text-lightGreyBlue text-body-4 font-medium font-manrope"
      >
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
