<template>
    <div class="flex items-center pt-6 gap-4">
        <Btn 
            name="Назад" 
            :disabled="!canGoBack"
            @click="handlePrev"
            theme="light"
            class="disabled:cursor-not-allowed "
        />
        
        <Btn 
            :name="isLastStep ? 'Рассчитать' : 'Дальше'"
            :disabled="!canGoNext && !isLastStep"
            @click="handleNext"
            class=""
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
    } else {
        console.log('Bad calc');
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