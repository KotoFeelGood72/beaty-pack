<template>
    <div class="calculator-container">
        <!-- Шаг 1: Общая информация -->
        <Step1 
            v-if="isStepVisible(1)" 
            :class="{ 'hidden': currentStep !== 1 }"
        />
        
        <!-- Шаг 2: Основа -->
        <Step2 
            v-if="isStepVisible(2)" 
            :class="{ 'hidden': currentStep !== 2 }"
        />
        
        <!-- Шаг 3: Фурнитура -->
        <Step3 
            v-if="isStepVisible(3)" 
            :class="{ 'hidden': currentStep !== 3 }"
        />
        
        <!-- Шаг 4: Упаковка и доставка -->
        <Step4 
            v-if="isStepVisible(4)" 
            :class="{ 'hidden': currentStep !== 4 }"
        />
        
        <!-- Навигация по шагам -->
        <CalcBottomAction 
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
        
        <!-- Индикатор прогресса -->
        <div class="progress-container">
            <div class="progress-info">
                <span>Прогресс: {{ progress }}%</span>
                <span>Шаг {{ currentStep }} из {{ visibleSteps.length }}</span>
            </div>
            <div class="progress-bar">
                <div 
                    class="progress-fill"
                    :style="{ width: `${progress}%` }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Step1 from '../calc/Step1.vue';
import Step2 from '../calc/Step2.vue';
import Step3 from '../calc/Step3.vue';
import Step4 from '../calc/Step4.vue';
import CalcBottomAction from '../calc/CalcBottomAction.vue';

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

.calc-step {
  transition: all 0.3s ease-in-out;
}

.calc-step.hidden {
  opacity: 0;
  pointer-events: none;
}

.progress-container {
  margin-top: 1rem;
}

.progress-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.progress-bar {
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.5rem;
}

.progress-fill {
  background-color: #f59e0b;
  height: 0.5rem;
  border-radius: 9999px;
  transition: width 0.3s ease;
}
</style>