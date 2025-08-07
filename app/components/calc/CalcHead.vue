<template>
  <div class="calc-head">
    <div>
      <h3>{{ title }}</h3>
    </div>
    <div>
      <div class="text-center mb-4">
        <p class="text-gray-700 font-medium">Шаг {{ step }} из 4</p>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-lime-500 h-2 rounded-full transition-all duration-300 ease-in-out"
          :style="{ width: `${(step / 4) * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  step: number;
  title: string;
}>();
</script>

<style scoped></style>
