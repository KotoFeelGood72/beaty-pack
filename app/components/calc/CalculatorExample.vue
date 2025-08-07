<template>
  <div class="calculator-example">
    <!-- Загрузка -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span class="ml-2">Загрузка...</span>
    </div>

    <!-- Ошибка -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
      <button @click="clearError" class="ml-2 text-red-500 hover:text-red-700">
        ✕
      </button>
    </div>

    <!-- Список калькуляторов -->
    <div v-if="!calculatorForm" class="calculator-list">
      <h2 class="text-2xl font-bold mb-4">Калькуляторы</h2>
      
      <!-- Фильтры -->
      <div class="mb-4 flex gap-4">
        <select v-model="selectedVersion" @change="loadCalculators" class="border rounded px-3 py-2">
          <option value="">Все версии</option>
          <option value="1">Версия 1</option>
          <option value="2">Версия 2</option>
        </select>
        
        <input 
          v-model="searchQuery" 
          @input="filterCalculators"
          placeholder="Поиск калькуляторов..."
          class="border rounded px-3 py-2 flex-1"
        />
      </div>

      <!-- Список -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="calculator in filteredCalculators" 
          :key="calculator.Id"
          @click="selectCalculator(calculator.Id)"
          class="border rounded p-4 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-3">
            <img 
              :src="getCalculatorImage(calculator.Id)" 
              :alt="calculator.Name"
              class="w-16 h-16 object-cover rounded"
              @error="handleImageError"
            />
            <div>
              <h3 class="font-semibold">{{ calculator.Name }}</h3>
              <p class="text-sm text-gray-600">Версия {{ calculator.Version }}</p>
              <p class="text-xs text-gray-500">{{ calculator.Ut ? 'Пользовательский' : 'Стандартный' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Форма калькулятора -->
    <div v-if="calculatorForm" class="calculator-form">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">{{ calculatorForm.Template.Name }}</h2>
        <button @click="backToList" class="text-blue-500 hover:text-blue-700">
          ← Назад к списку
        </button>
      </div>

      <p class="text-gray-600 mb-6">{{ calculatorForm.Template.Description }}</p>

      <!-- Параметры -->
      <form @submit.prevent="calculate" class="space-y-6">
        <div 
          v-for="param in visibleParams" 
          :key="param.Id"
          class="border rounded p-4"
        >
          <label class="block font-medium mb-2">{{ param.Name }}</label>
          
          <!-- Параметр типа list -->
          <div v-if="param.Type === 'list'" class="space-y-2">
            <div 
              v-for="value in getAvailableParamValues(param, formData)" 
              :key="value.Id"
              class="flex items-center"
            >
              <input 
                type="radio" 
                :id="`param-${param.Id}-value-${value.Id}`"
                :name="`param-${param.Id}`"
                :value="value.Id"
                v-model="formData[param.Id]"
                class="mr-2"
              />
              <label :for="`param-${param.Id}-value-${value.Id}`" class="cursor-pointer">
                {{ value.Name }}
                <span v-if="value.Description" class="text-sm text-gray-500 block">
                  {{ value.Description }}
                </span>
              </label>
            </div>
          </div>

          <!-- Параметр типа number -->
          <div v-else-if="param.Type === 'number'">
            <input 
              type="number"
              v-model="formData[param.Id]"
              :min="param.Num?.Min"
              :max="param.Num?.Max"
              :step="param.Num?.K || 1"
              class="border rounded px-3 py-2 w-full"
            />
            <p v-if="param.Num" class="text-sm text-gray-500 mt-1">
              От {{ param.Num.Min }} до {{ param.Num.Max }}, шаг {{ param.Num.K }}
            </p>
          </div>

          <!-- Параметр типа color -->
          <div v-else-if="param.Type === 'color'" class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">CMYK Лицевая сторона</label>
              <input 
                type="number"
                v-model="formData[param.Id].CmykFace"
                min="0"
                max="100"
                class="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">CMYK Обратная сторона</label>
              <input 
                type="number"
                v-model="formData[param.Id].CmykBack"
                min="0"
                max="100"
                class="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Pantone Лицевая сторона</label>
              <input 
                type="number"
                v-model="formData[param.Id].PantoneFace"
                min="0"
                class="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Pantone Обратная сторона</label>
              <input 
                type="number"
                v-model="formData[param.Id].PantoneBack"
                min="0"
                class="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          <!-- Параметр типа paper -->
          <div v-else-if="param.Type === 'paper'">
            <select v-model="formData[param.Id]" class="border rounded px-3 py-2 w-full">
              <option v-for="value in param.Values" :key="value.Id" :value="value.Id">
                {{ value.Name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Тираж -->
        <div class="border rounded p-4">
          <label class="block font-medium mb-2">Тираж</label>
          <div class="space-y-2">
            <div v-for="(tirazh, index) in tirazhi" :key="index" class="flex gap-2">
              <input 
                type="number"
                v-model="tirazhi[index]"
                min="1"
                class="border rounded px-3 py-2 flex-1"
                placeholder="Количество"
              />
              <button 
                v-if="tirazhi.length > 1"
                @click="removeTirazh(index)"
                type="button"
                class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Удалить
              </button>
            </div>
            <button 
              @click="addTirazh"
              type="button"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              + Добавить тираж
            </button>
          </div>
        </div>

        <!-- Название заказа -->
        <div class="border rounded p-4">
          <label class="block font-medium mb-2">Название заказа</label>
          <input 
            v-model="orderName"
            type="text"
            class="border rounded px-3 py-2 w-full"
            placeholder="Введите название заказа"
          />
        </div>

        <!-- Кнопки -->
        <div class="flex gap-4">
          <button 
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Рассчитать
          </button>
          <button 
            @click="saveOrder"
            type="button"
            class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Сохранить заказ
          </button>
        </div>
      </form>
    </div>

    <!-- Результат расчета -->
    <div v-if="calculationResult" class="calculation-result mt-6">
      <h3 class="text-xl font-bold mb-4">Результат расчета</h3>
      
      <div v-if="calculationResult.Errors" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <ul class="list-disc list-inside">
          <li v-for="error in calculationResult.Errors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <div v-if="calculationResult.Data" class="space-y-2">
        <div v-for="item in calculationResult.Data" :key="item.Tirazh" class="flex justify-between">
          <span>Тираж {{ item.Tirazh }}:</span>
          <span class="font-semibold">{{ formatPrice(item.Summa) }}</span>
        </div>
      </div>

      <div v-else-if="calculationResult.Summa" class="text-center">
        <p class="text-2xl font-bold text-green-600">
          {{ formatPrice(calculationResult.Summa) }}
        </p>
        <p v-if="calculationResult.ProductId" class="text-sm text-gray-600 mt-2">
          Номер заказа: {{ calculationResult.ProductId }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { 
  validateCalculatorParams, 
  formatPrice, 
  createCalculationRequest,
  initializeFormData,
  isParamVisible,
  getAvailableParamValues
} from '@/utils/calculatorUtils';

const calculatorStore = useCalculatorStore();
const { 
  calculators, 
  calculatorForm, 
  calculationResult, 
  isLoading, 
  error 
} = storeToRefs(calculatorStore);

// Состояние компонента
const selectedVersion = ref('');
const searchQuery = ref('');
const filteredCalculators = ref<any[]>([]);
const formData = ref<Record<number, any>>({});
const tirazhi = ref<number[]>([100]);
const orderName = ref('');

// Вычисляемые свойства
const visibleParams = computed(() => {
  if (!calculatorForm.value?.Template.Params) return [];
  
  return calculatorForm.value.Template.Params.filter(param => 
    isParamVisible(param, formData.value)
  );
});

// Методы
const loadCalculators = async () => {
  try {
    const version = selectedVersion.value ? parseInt(selectedVersion.value) : undefined;
    await calculatorStore.getCalculatorsList(version);
    filterCalculators();
  } catch (error) {
    console.error('Ошибка загрузки калькуляторов:', error);
  }
};

const filterCalculators = () => {
  if (!searchQuery.value) {
    filteredCalculators.value = calculators.value;
  } else {
    filteredCalculators.value = calculatorStore.getCalculatorsBySearch(searchQuery.value);
  }
};

const selectCalculator = async (calculatorId: number) => {
  try {
    await calculatorStore.getCalculatorForm(calculatorId);
    
    // Инициализируем форму с значениями по умолчанию
    if (calculatorForm.value?.Template.Params) {
      formData.value = initializeFormData(calculatorForm.value.Template.Params);
    }
    
    // Устанавливаем название заказа по умолчанию
    orderName.value = calculatorForm.value?.Template.Name || '';
  } catch (error) {
    console.error('Ошибка загрузки формы калькулятора:', error);
  }
};

const backToList = () => {
  calculatorStore.resetCalculation();
  formData.value = {};
  tirazhi.value = [100];
  orderName.value = '';
};

const addTirazh = () => {
  tirazhi.value.push(100);
};

const removeTirazh = (index: number) => {
  if (tirazhi.value.length > 1) {
    tirazhi.value.splice(index, 1);
  }
};

const calculate = async () => {
  if (!calculatorForm.value) return;

  // Валидация
  const validation = validateCalculatorParams(
    calculatorForm.value.Template.Params,
    formData.value
  );

  if (!validation.isValid) {
    alert('Ошибки валидации:\n' + validation.errors.join('\n'));
    return;
  }

  try {
    const request = createCalculationRequest(
      calculatorForm.value.Template.Id,
      orderName.value,
      calculatorForm.value.Template.Params,
      formData.value,
      tirazhi.value,
      false
    );

    await calculatorStore.calculate(request);
  } catch (error) {
    console.error('Ошибка расчета:', error);
  }
};

const saveOrder = async () => {
  if (!calculatorForm.value) return;

  // Валидация
  const validation = validateCalculatorParams(
    calculatorForm.value.Template.Params,
    formData.value
  );

  if (!validation.isValid) {
    alert('Ошибки валидации:\n' + validation.errors.join('\n'));
    return;
  }

  try {
    const request = createCalculationRequest(
      calculatorForm.value.Template.Id,
      orderName.value,
      calculatorForm.value.Template.Params,
      formData.value,
      tirazhi.value,
      true,
      'Заказ создан через веб-интерфейс'
    );

    await calculatorStore.calculate(request);
  } catch (error) {
    console.error('Ошибка сохранения заказа:', error);
  }
};

const getCalculatorImage = (calculatorId: number) => {
  return calculatorStore.getCalculatorImage(calculatorId);
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = '/images/placeholder.png'; // Заглушка
};

const clearError = () => {
  calculatorStore.clearError();
};

// Инициализация
onMounted(async () => {
  try {
    await calculatorStore.initialize();
    filterCalculators();
  } catch (error) {
    console.error('Ошибка инициализации:', error);
  }
});
</script>

<style scoped>
.calculator-example {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.calculator-list,
.calculator-form {
  width: 100%;
}

.calculation-result {
  border-top: 2px solid #e5e7eb;
  padding-top: 20px;
}
</style> 