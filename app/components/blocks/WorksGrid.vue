<template>
  <div class="w-full">
    <div class="grid lg:grid-cols-2 lg:gap-6 gap-[10px] max-lg:mb-[10px]">
      <div
        v-if="works[0]"
        class="row-span-2 relative rounded-xl overflow-hidden cursor-pointer max-h-[924px] h-full lg:block hidden"
      >
        <img :src="`/images/works/${works[0]}.jpg`" class="w-full lg:h-full object-cover" />
      </div>
      <div class="grid grid-cols-2 lg:gap-6 gap-[10px] lg:h-full">
        <div
          v-for="(item, index) in works.slice(1, 5)"
          :key="item + index"
          class="relative rounded-xl overflow-hidden cursor-pointer lg:h-[450px]"
        >
          <img :src="`/images/works/${item}.jpg`" class="w-full lg:h-full object-cover" />
        </div>
      </div>
    </div>
    <div class="grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-[10px]">
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
