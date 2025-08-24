<template>
  <div
    class="border border-grey lg:p-8 p-4 rounded-2xl"
    v-if="isVisible"
    :class="{ hidden: !isCurrent }"
  >
    <component :is="stepComponent" />
    <CalcBottomAction
      v-if="isCurrent"
      :can-go-back="canGoBack"
      :can-go-next="canGoNext"
      :is-last-step="isLastStep"
      :current-step="currentStep"
      :total-steps="totalSteps"
      :visible-steps="visibleSteps"
      :completed-steps="completedSteps"
      @next="$emit('next')"
      @prev="$emit('prev')"
    />
  </div>
</template>

<script setup lang="ts">
import Step1 from "./Step1.vue";
import Step2 from "./Step2.vue";
import Step3 from "./Step3.vue";
import Step4 from "./Step4.vue";
import CalcBottomAction from "./CalcBottomAction.vue";

interface Props {
  stepNumber: number;
  isVisible: boolean;
  isCurrent: boolean;
  canGoBack: boolean;
  canGoNext: boolean;
  isLastStep: boolean;
  currentStep: number;
  totalSteps: number;
  visibleSteps: number[];
  completedSteps: number[];
}

const props = defineProps<Props>();

// Определяем компонент шага на основе номера
const stepComponent = computed(() => {
  switch (props.stepNumber) {
    case 1:
      return Step1;
    case 2:
      return Step2;
    case 3:
      return Step3;
    case 4:
      return Step4;
    default:
      return Step1;
  }
});

// Определяем события
defineEmits<{
  next: [];
  prev: [];
}>();
</script>

<style scoped>
.hidden {
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
}
</style>
