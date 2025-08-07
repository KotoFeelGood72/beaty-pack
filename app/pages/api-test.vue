<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Тест API калькулятора</h1>
    
    <!-- Статус подключения -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-3">Статус подключения</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="border rounded p-4">
          <h3 class="font-medium">API Domain</h3>
          <p class="text-gray-600">{{ apiConfig.domain }}</p>
        </div>
        <div class="border rounded p-4">
          <h3 class="font-medium">API Base URL</h3>
          <p class="text-gray-600">{{ apiConfig.baseUrl }}</p>
        </div>
        <div class="border rounded p-4">
          <h3 class="font-medium">API Key</h3>
          <p class="text-gray-600">{{ apiConfig.key ? '***' + apiConfig.key.slice(-4) : 'Не настроен' }}</p>
        </div>
      </div>
    </div>

    <!-- Тестовые кнопки -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-3">Тестовые запросы</h2>
      <div class="flex flex-wrap gap-4">
        <button 
          @click="testCheckTime"
          :disabled="isLoading"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {{ isLoading ? 'Загрузка...' : 'Проверить время обновления' }}
        </button>
        
        <button 
          @click="testGetCalculators"
          :disabled="isLoading"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {{ isLoading ? 'Загрузка...' : 'Получить список калькуляторов' }}
        </button>
        
        <button 
          @click="clearResults"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Очистить результаты
        </button>
      </div>
    </div>

    <!-- Результаты -->
    <div v-if="results.length > 0" class="mb-6">
      <h2 class="text-xl font-semibold mb-3">Результаты</h2>
      <div class="space-y-4">
        <div 
          v-for="(result, index) in results" 
          :key="index"
          class="border rounded p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium">{{ result.title }}</h3>
            <span 
              :class="result.success ? 'text-green-600' : 'text-red-600'"
              class="text-sm font-medium"
            >
              {{ result.success ? 'Успешно' : 'Ошибка' }}
            </span>
          </div>
          
          <div v-if="result.success" class="bg-green-50 border border-green-200 rounded p-3">
            <pre class="text-sm overflow-auto">{{ JSON.stringify(result.data, null, 2) }}</pre>
          </div>
          
          <div v-else class="bg-red-50 border border-red-200 rounded p-3">
            <p class="text-red-700">{{ result.error }}</p>
          </div>
          
          <p class="text-xs text-gray-500 mt-2">
            {{ new Date(result.timestamp).toLocaleString() }}
          </p>
        </div>
      </div>
    </div>

    <!-- Ошибки -->
    <div v-if="error" class="mb-6">
      <h2 class="text-xl font-semibold mb-3 text-red-600">Ошибки</h2>
      <div class="bg-red-50 border border-red-200 rounded p-4">
        <p class="text-red-700">{{ error }}</p>
        <button 
          @click="clearError"
          class="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          Очистить ошибку
        </button>
      </div>
    </div>

    <!-- Компонент калькулятора -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-3">Полный калькулятор</h2>
      <CalculatorExample />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCalculatorStore } from '@/store/useCalculatorStore';

const calculatorStore = useCalculatorStore();
const { apiConfig, isLoading, error } = storeToRefs(calculatorStore);

const results = ref<Array<{
  title: string;
  success: boolean;
  data?: any;
  error?: string;
  timestamp: Date;
}>>([]);

// Тест проверки времени обновления
const testCheckTime = async () => {
  try {
    const data = await calculatorStore.checkUpdateTime();
    results.value.push({
      title: 'Проверка времени обновления',
      success: true,
      data,
      timestamp: new Date()
    });
  } catch (err: any) {
    results.value.push({
      title: 'Проверка времени обновления',
      success: false,
      error: err.message,
      timestamp: new Date()
    });
  }
};

// Тест получения списка калькуляторов
const testGetCalculators = async () => {
  try {
    const data = await calculatorStore.getCalculatorsList();
    results.value.push({
      title: `Получение списка калькуляторов (${data.length} шт.)`,
      success: true,
      data: data.slice(0, 3), // Показываем только первые 3
      timestamp: new Date()
    });
  } catch (err: any) {
    results.value.push({
      title: 'Получение списка калькуляторов',
      success: false,
      error: err.message,
      timestamp: new Date()
    });
  }
};

// Очистка результатов
const clearResults = () => {
  results.value = [];
};

// Очистка ошибки
const clearError = () => {
  calculatorStore.clearError();
};

// Инициализация при загрузке
onMounted(async () => {
  try {
    await calculatorStore.initialize();
  } catch (err) {
    console.error('Ошибка инициализации:', err);
  }
});
</script> 