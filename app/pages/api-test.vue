<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Тест калькуляторов</h1>
        
        <!-- Управление шагами -->
        <div class="bg-gray-100 p-4 rounded-lg mb-8">
            <h2 class="text-xl font-semibold mb-4">Управление шагами</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Калькулятор 1 -->
                <div class="bg-white p-4 rounded-lg">
                    <h3 class="font-semibold mb-3">Калькулятор 1 (ID: 1)</h3>
                    <div class="space-y-2">
                        <button 
                            v-for="step in 4" 
                            :key="step"
                            @click="calc1Steps.toggleStep(step)"
                            class="block w-full text-left px-3 py-2 rounded border"
                            :class="calc1Steps.isStepVisible(step) ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'"
                        >
                            {{ calc1Steps.isStepVisible(step) ? 'Скрыть' : 'Показать' }} шаг {{ step }}
                        </button>
                        <button 
                            @click="calc1Steps.goToStep(1)"
                            class="block w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Перейти к шагу 1
                        </button>
                        <button 
                            @click="calc1Steps.showAllSteps()"
                            class="block w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Показать все шаги
                        </button>
                        <button 
                            @click="calc1Steps.showOnlyFirstStep()"
                            class="block w-full px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Только первый шаг
                        </button>
                    </div>
                </div>
                
                <!-- Калькулятор 2 -->
                <div class="bg-white p-4 rounded-lg">
                    <h3 class="font-semibold mb-3">Калькулятор 2 (ID: 2)</h3>
                    <div class="space-y-2">
                        <button 
                            v-for="step in 4" 
                            :key="step"
                            @click="calc2Steps.toggleStep(step)"
                            class="block w-full text-left px-3 py-2 rounded border"
                            :class="calc2Steps.isStepVisible(step) ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'"
                        >
                            {{ calc2Steps.isStepVisible(step) ? 'Скрыть' : 'Показать' }} шаг {{ step }}
                        </button>
                        <button 
                            @click="calc2Steps.goToStep(1)"
                            class="block w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Перейти к шагу 1
                        </button>
                        <button 
                            @click="calc2Steps.showAllSteps()"
                            class="block w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Показать все шаги
                        </button>
                        <button 
                            @click="calc2Steps.showOnlyFirstStep()"
                            class="block w-full px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Только первый шаг
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Калькуляторы -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Калькулятор 1 -->
            <div class="bg-white border rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-4">Калькулятор 1</h2>
                <div class="mb-4 space-y-2">
                    <p class="text-sm text-gray-600">
                        Текущий шаг: {{ calc1Steps.currentStep }}
                    </p>
                    <p class="text-sm text-gray-600">
                        Видимые шаги: {{ calc1Steps.visibleSteps.join(', ') }}
                    </p>
                    <p class="text-sm text-gray-600">
                        Прогресс: {{ calc1Steps.progress }}%
                    </p>
                    <p class="text-sm text-gray-600">
                        Завершенные шаги: {{ calc1Steps.completedSteps.join(', ') || 'Нет' }}
                    </p>
                </div>
                <BlockCalc :calculator-id="1" ref="calc1Ref" />
            </div>
            
            <!-- Калькулятор 2 -->
            <div class="bg-white border rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-4">Калькулятор 2</h2>
                <div class="mb-4 space-y-2">
                    <p class="text-sm text-gray-600">
                        Текущий шаг: {{ calc2Steps.currentStep }}
                    </p>
                    <p class="text-sm text-gray-600">
                        Видимые шаги: {{ calc2Steps.visibleSteps.join(', ') }}
                    </p>
                    <p class="text-sm text-gray-600">
                        Прогресс: {{ calc2Steps.progress }}%
                    </p>
                    <p class="text-sm text-gray-600">
                        Завершенные шаги: {{ calc2Steps.completedSteps.join(', ') || 'Нет' }}
                    </p>
                </div>
                <BlockCalc :calculator-id="2" ref="calc2Ref" />
            </div>
        </div>
        
        <!-- Информация о состоянии -->
        <div class="mt-8 bg-gray-100 p-4 rounded-lg">
            <h2 class="text-xl font-semibold mb-4">Состояние Store</h2>
            <pre class="bg-white p-4 rounded text-sm overflow-auto">{{ storeState }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import BlockCalc from '../components/blocks/BlockCalc.vue';

// Используем store
const calculatorStore = useCalculatorStore();

// Используем composables для каждого калькулятора
const calc1Steps = useCalculatorSteps(1);
const calc2Steps = useCalculatorSteps(2);

// Refs для доступа к методам компонентов
const calc1Ref = ref();
const calc2Ref = ref();

// Состояние store для отображения
const storeState = computed(() => {
    return JSON.stringify(calculatorStore.calculatorSteps, null, 2);
});

// Инициализация при загрузке страницы
onMounted(() => {
    // Инициализируем калькуляторы
    calc1Steps.initialize();
    calc2Steps.initialize();
    
    // Показываем все шаги для демонстрации
    calc1Steps.showAllSteps();
    calc2Steps.showAllSteps();
});
</script>

<style scoped></style> 