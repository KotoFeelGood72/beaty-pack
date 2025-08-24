<template>
  <div class="calculator-container container lg:py-60">
    <h3 class="lg:text-headline-2 text-headline-6 font-semibold lg:mb-10 mb-6">
      Рассчитайте стоимость вашего заказа
    </h3>
    <div class="flex gap-10 flex-wrap">
      <div class="flex-grow max-lg:order-2">
        <CalcStep
          v-for="stepNumber in 4"
          :key="stepNumber"
          :step-number="stepNumber"
          :is-visible="isStepVisible(stepNumber)"
          :is-current="currentStep === stepNumber"
          :can-go-back="canGoBack"
          :can-go-next="canGoNext"
          :is-last-step="isLastStep"
          :current-step="currentStep"
          :total-steps="totalSteps"
          :visible-steps="visibleSteps"
          :completed-steps="completedSteps"
          @next="handleNext"
          @prev="handlePrev"
        />
      </div>
      <div class="max-lg:order-1">
        <div class="max-w-[480px] w-full bg-lightGrey p-8 rounded-2xl">
          <h3 class="text-headline-4 mb-6 font-semibold">Расчет стоимости</h3>
          <div class="flex gap-24 mb-5">
            <p class="text-lightGreyBlue font-light">... шт.</p>
            <p class="font-medium">... руб.</p>
          </div>
          <div class="text-lightGreyBlue font-light font-manrope text-body-4 mb-6">
            В процессе согласования макета, менеджер предоставит вам окончательную смету
          </div>
          <Btn name="Оставить запрос" class="max-w-[201px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CalcStep from "../calc/CalcStep.vue";
import Btn from "../buttons/Btn.vue";

// Props для идентификации калькулятора
interface Props {
  calculatorId: number;
}

const props = defineProps<Props>();

// Используем composable для управления шагами
const {
  currentStep,
  visibleSteps,
  completedSteps,
  totalSteps,
  progress,
  isStepVisible,
  isStepCompleted,
  canGoBack,
  canGoNext,
  isLastStep,
  nextStep,
  prevStep,
  showStep,
  hideStep,
  goToStep,
  completeStep,
  resetSteps,
  initialize,
  showAllSteps,
  showOnlyFirstStep,
} = useCalculatorSteps(props.calculatorId);

// Обработчики навигации
const handleNext = () => {
  if (canGoNext.value || isLastStep.value) {
    nextStep();
  }
};

const handlePrev = () => {
  if (canGoBack.value) {
    prevStep();
  }
};

// Инициализация при монтировании компонента
onMounted(() => {
  // Инициализируем шаги для этого калькулятора
  initialize();
  // Делаем все шаги видимыми сразу, чтобы работала навигация
  showAllSteps();
});

// Экспортируем методы для внешнего использования
defineExpose({
  showStep,
  hideStep,
  goToStep,
  completeStep,
  resetSteps,
  showAllSteps,
  showOnlyFirstStep,
  currentStep,
  isStepVisible,
  isStepCompleted,
  progress,
  visibleSteps,
  completedSteps,
});
</script>

<style scoped>
.calculator-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
