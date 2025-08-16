import { computed } from 'vue';
import { useCalculatorStore } from '~/store/useCalculatorStore';

export const useCalculatorSteps = (calculatorId: number) => {
  const calculatorStore = useCalculatorStore();

  // Состояние шагов
  const stepsState = computed(() => calculatorStore.getCalculatorSteps(calculatorId));
  
  // Текущий шаг
  const currentStep = computed(() => stepsState.value.currentStep);
  
  // Видимые шаги
  const visibleSteps = computed(() => stepsState.value.visibleSteps);
  
  // Завершенные шаги
  const completedSteps = computed(() => stepsState.value.completedSteps);
  
  // Общее количество шагов
  const totalSteps = computed(() => stepsState.value.totalSteps);

  // Проверка видимости шага
  const isStepVisible = (step: number) => calculatorStore.isStepVisible(calculatorId, step);
  
  // Проверка завершенности шага
  const isStepCompleted = (step: number) => calculatorStore.isStepCompleted(calculatorId, step);
  
  // Проверка, является ли шаг текущим
  const isCurrentStep = (step: number) => currentStep.value === step;

  // Навигация
  const canGoBack = computed(() => {
    const currentIndex = visibleSteps.value.indexOf(currentStep.value);
    return currentIndex > 0;
  });

  const canGoNext = computed(() => {
    const currentIndex = visibleSteps.value.indexOf(currentStep.value);
    return currentIndex < visibleSteps.value.length - 1;
  });

  const isLastStep = computed(() => {
    const currentIndex = visibleSteps.value.indexOf(currentStep.value);
    return currentIndex === visibleSteps.value.length - 1;
  });

  // Методы управления
  const showStep = (step: number) => {
    calculatorStore.showStep(calculatorId, step);
  };

  const hideStep = (step: number) => {
    calculatorStore.hideStep(calculatorId, step);
  };

  const toggleStep = (step: number) => {
    if (isStepVisible(step)) {
      hideStep(step);
    } else {
      showStep(step);
    }
  };

  const goToStep = (step: number) => {
    calculatorStore.goToStep(calculatorId, step);
  };

  const nextStep = () => {
    calculatorStore.nextStep(calculatorId);
  };

  const prevStep = () => {
    calculatorStore.prevStep(calculatorId);
  };

  const completeStep = (step: number) => {
    calculatorStore.completeStep(calculatorId, step);
  };

  const uncompleteStep = (step: number) => {
    calculatorStore.uncompleteStep(calculatorId, step);
  };

  const resetSteps = () => {
    calculatorStore.resetCalculatorSteps(calculatorId);
  };

  // Инициализация
  const initialize = (totalStepsCount: number = 4) => {
    calculatorStore.initializeCalculatorSteps(calculatorId, totalStepsCount);
  };

  // Показать все шаги
  const showAllSteps = () => {
    for (let step = 1; step <= totalSteps.value; step++) {
      showStep(step);
    }
  };

  // Скрыть все шаги кроме первого
  const showOnlyFirstStep = () => {
    resetSteps();
    showStep(1);
  };

  // Получить прогресс в процентах
  const progress = computed(() => {
    if (visibleSteps.value.length === 0) return 0;
    const currentIndex = visibleSteps.value.indexOf(currentStep.value);
    return Math.round(((currentIndex + 1) / visibleSteps.value.length) * 100);
  });

  // Получить следующий доступный шаг
  const nextAvailableStep = computed(() => {
    const currentIndex = visibleSteps.value.indexOf(currentStep.value);
    if (currentIndex < visibleSteps.value.length - 1) {
      return visibleSteps.value[currentIndex + 1];
    }
    return null;
  });

  // Получить предыдущий доступный шаг
  const prevAvailableStep = computed(() => {
    const currentIndex = visibleSteps.value.indexOf(currentStep.value);
    if (currentIndex > 0) {
      return visibleSteps.value[currentIndex - 1];
    }
    return null;
  });

  return {
    // Состояние
    stepsState,
    currentStep,
    visibleSteps,
    completedSteps,
    totalSteps,
    progress,
    
    // Проверки
    isStepVisible,
    isStepCompleted,
    isCurrentStep,
    canGoBack,
    canGoNext,
    isLastStep,
    
    // Навигация
    nextAvailableStep,
    prevAvailableStep,
    
    // Методы управления
    showStep,
    hideStep,
    toggleStep,
    goToStep,
    nextStep,
    prevStep,
    completeStep,
    uncompleteStep,
    resetSteps,
    initialize,
    showAllSteps,
    showOnlyFirstStep,
  };
};


