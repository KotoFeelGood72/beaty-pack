<template>
  <div class="w-full">
    <div class="grid grid-cols-2 gap-6">
      <div
        v-if="works[0]"
        class="row-span-2 relative rounded-xl overflow-hidden cursor-pointer max-h-[924px] h-full"
      >
        <img :src="`/images/works/${works[0]}.jpg`" class="w-full h-full object-cover" />
      </div>
      <div class="grid grid-cols-2 gap-6 h-full">
        <div
          v-for="(item, index) in works.slice(1, 5)"
          :key="item + index"
          class="relative rounded-xl overflow-hidden cursor-pointer h-[450px]"
        >
          <img :src="`/images/works/${item}.jpg`" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-6">
      <div
        v-for="(item, index) in works.slice(5, 9)"
        :key="item + index"
        class="relative rounded-xl overflow-hidden cursor-pointer"
      >
        <img :src="`/images/works/${item}.jpg`" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { works } from "~/data/Cases";
</script>

<style scoped></style>
