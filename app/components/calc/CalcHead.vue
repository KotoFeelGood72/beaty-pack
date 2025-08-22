<template>
  <div class="calc-head flex items-center justify-between">
    <div>
      <h3 class="text-headline-4 font-semibold">{{ title }}</h3>
    </div>
    <div class="flex items-center gap-2 flex-col">
        <p class="step-text text-lightGreyBlue text-headline-5 font-semibold">Шаг {{ step }} из 4</p>
      <div class="step-progress">
        <div
          class="step-progress-fill"
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

<style scoped>
.calc-head {
  margin-bottom: 1.5rem;
}

.step-progress {
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.3rem;
}

.step-progress-fill {
  background-color: #84cc16;
  height: 0.3rem;
  border-radius: 9999px;
  transition: width 0.3s ease-in-out;
}
</style>
