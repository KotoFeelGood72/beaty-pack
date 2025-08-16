<template>
  <div class="calc-head">
    <div>
      <h3>{{ title }}</h3>
    </div>
    <div>
      <div class="step-info">
        <p class="step-text">Шаг {{ step }} из 4</p>
      </div>
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

.calc-head h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.step-info {
  text-align: center;
  margin-bottom: 1rem;
}

.step-text {
  color: #374151;
  font-weight: 500;
}

.step-progress {
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.5rem;
}

.step-progress-fill {
  background-color: #84cc16;
  height: 0.5rem;
  border-radius: 9999px;
  transition: width 0.3s ease-in-out;
}
</style>
