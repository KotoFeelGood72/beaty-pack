<template>
    <div class="flex justify-between items-center pt-6">
        <Btn 
            name="Назад" 
            :disabled="!canGoBack"
            @click="handlePrev"
            class="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        />
        
        <div class="flex items-center space-x-4">
            <!-- Индикатор прогресса -->
            <div class="flex space-x-2">
                <div 
                    v-for="step in totalSteps" 
                    :key="step"
                    class="w-3 h-3 rounded-full transition-colors duration-200"
                    :class="getStepClass(step)"
                ></div>
            </div>
        </div>
        
        <Btn 
            :name="isLastStep ? 'Рассчитать' : 'Дальше'"
            :disabled="!canGoNext && !isLastStep"
            @click="handleNext"
            class="bg-amber-700 hover:bg-amber-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
        />
    </div>
</template>

<script setup lang="ts">
import Btn from '../buttons/Btn.vue';

interface Props {
    canGoBack?: boolean;
    canGoNext?: boolean;
    isLastStep?: boolean;
    currentStep?: number;
    totalSteps?: number;
    visibleSteps?: number[];
    completedSteps?: number[];
}

const props = withDefaults(defineProps<Props>(), {
    canGoBack: false,
    canGoNext: true,
    isLastStep: false,
    currentStep: 1,
    totalSteps: 4,
    visibleSteps: () => [1, 2, 3, 4],
    completedSteps: () => [],
});

const emit = defineEmits<{
    prev: [];
    next: [];
}>();

const handlePrev = () => {
    if (props.canGoBack) {
        emit('prev');
    }
};

const handleNext = () => {
    if (props.canGoNext || props.isLastStep) {
        emit('next');
    }
};

const getStepClass = (step: number) => {
    if (!props.visibleSteps.includes(step)) {
        return 'bg-gray-200'; // Скрытый шаг
    }
    
    if (props.completedSteps.includes(step)) {
        return 'bg-green-500'; // Завершенный шаг
    }
    
    if (step === props.currentStep) {
        return 'bg-amber-600'; // Текущий шаг
    }
    
    return 'bg-gray-400'; // Обычный шаг
};
</script>

<style scoped></style>