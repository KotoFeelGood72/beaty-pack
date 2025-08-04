<template>
  <div class="absolute default-submenu z-20 top-full">
    <ul class="space-y-4 bg-white w-[200px] rounded-lg shadow-card p-3 mt-5">
      <li v-for="item in aboutSubmenu" :key="item.label">
        <NuxtLink :to="item.to" class="text-lightGreyBlue">{{ item.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { aboutSubmenu } from "~/data/Navigation";
</script>

<style scoped>
.default-submenu {
  box-shadow: 0 0 15px 0 rgba(108, 118, 132, 0.15);
}

.default-submenu {
  /* top: calc(100% + 20px); */
}
</style>
