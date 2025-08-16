# Система управления шагами калькулятора

## Обзор

Система позволяет управлять видимостью и состоянием шагов калькулятора для каждого товара отдельно через Pinia store. Каждый калькулятор имеет свой уникальный ID и независимое состояние шагов.

## Основные компоненты

### 1. Store (`useCalculatorStore`)

Основной store для управления состоянием всех калькуляторов.

#### Состояние
```typescript
{
  calculatorSteps: Record<number, CalculatorStepsState>
}
```

#### Интерфейс состояния шагов
```typescript
interface CalculatorStepsState {
  currentStep: number;        // Текущий активный шаг
  visibleSteps: number[];     // Массив видимых шагов
  completedSteps: number[];   // Массив завершенных шагов
  totalSteps: number;         // Общее количество шагов
}
```

#### Основные методы store
- `initializeCalculatorSteps(calculatorId, totalSteps)` - инициализация
- `showStep(calculatorId, step)` - показать шаг
- `hideStep(calculatorId, step)` - скрыть шаг
- `nextStep(calculatorId)` - следующий шаг
- `prevStep(calculatorId)` - предыдущий шаг
- `goToStep(calculatorId, step)` - перейти к шагу
- `completeStep(calculatorId, step)` - отметить как завершенный
- `resetCalculatorSteps(calculatorId)` - сбросить состояние

### 2. Composable (`useCalculatorSteps`)

Удобный composable для работы с конкретным калькулятором.

#### Использование
```typescript
const calculatorSteps = useCalculatorSteps(calculatorId);
```

#### Доступные свойства
- `currentStep` - текущий шаг
- `visibleSteps` - видимые шаги
- `completedSteps` - завершенные шаги
- `totalSteps` - общее количество шагов
- `progress` - прогресс в процентах
- `canGoBack` - можно ли идти назад
- `canGoNext` - можно ли идти вперед
- `isLastStep` - последний ли это шаг

#### Доступные методы
- `showStep(step)` - показать шаг
- `hideStep(step)` - скрыть шаг
- `toggleStep(step)` - переключить видимость шага
- `goToStep(step)` - перейти к шагу
- `nextStep()` - следующий шаг
- `prevStep()` - предыдущий шаг
- `completeStep(step)` - завершить шаг
- `resetSteps()` - сбросить все
- `showAllSteps()` - показать все шаги
- `showOnlyFirstStep()` - показать только первый шаг

### 3. Компонент (`BlockCalc`)

Основной компонент калькулятора с поддержкой управления шагами.

#### Props
```typescript
interface Props {
  calculatorId: number; // Уникальный ID калькулятора
}
```

#### Экспортируемые методы
```typescript
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
```

## Примеры использования

### 1. Базовое использование компонента

```vue
<template>
  <BlockCalc :calculator-id="1" ref="calculatorRef" />
</template>

<script setup>
const calculatorRef = ref();

// Управление через ref
onMounted(() => {
  calculatorRef.value.showStep(2);
  calculatorRef.value.goToStep(3);
});
</script>
```

### 2. Использование composable

```vue
<template>
  <div>
    <div v-if="isStepVisible(1)">Шаг 1</div>
    <div v-if="isStepVisible(2)">Шаг 2</div>
    <div v-if="isStepVisible(3)">Шаг 3</div>
    <div v-if="isStepVisible(4)">Шаг 4</div>
    
    <button @click="nextStep" :disabled="!canGoNext">Дальше</button>
    <button @click="prevStep" :disabled="!canGoBack">Назад</button>
    
    <div>Прогресс: {{ progress }}%</div>
  </div>
</template>

<script setup>
const calculatorSteps = useCalculatorSteps(1);

const {
  currentStep,
  progress,
  isStepVisible,
  canGoNext,
  canGoBack,
  nextStep,
  prevStep
} = calculatorSteps;
</script>
```

### 3. Несколько калькуляторов на одной странице

```vue
<template>
  <div class="grid grid-cols-2 gap-8">
    <BlockCalc :calculator-id="1" />
    <BlockCalc :calculator-id="2" />
  </div>
</template>

<script setup>
// Каждый калькулятор работает независимо
const calc1Steps = useCalculatorSteps(1);
const calc2Steps = useCalculatorSteps(2);

onMounted(() => {
  // Настройка первого калькулятора
  calc1Steps.showAllSteps();
  
  // Настройка второго калькулятора
  calc2Steps.showOnlyFirstStep();
  calc2Steps.showStep(3); // Показать только шаги 1 и 3
});
</script>
```

### 4. Динамическое управление шагами

```vue
<template>
  <div>
    <div class="controls">
      <button 
        v-for="step in 4" 
        :key="step"
        @click="toggleStep(step)"
        :class="{ active: isStepVisible(step) }"
      >
        {{ isStepVisible(step) ? 'Скрыть' : 'Показать' }} шаг {{ step }}
      </button>
    </div>
    
    <BlockCalc :calculator-id="calculatorId" />
  </div>
</template>

<script setup>
const calculatorId = 1;
const calculatorSteps = useCalculatorSteps(calculatorId);

const { isStepVisible, toggleStep } = calculatorSteps;
</script>
```

## Особенности

### 1. Независимость калькуляторов
Каждый калькулятор имеет свое состояние, которое не влияет на другие калькуляторы.

### 2. Автоматическая навигация
При скрытии текущего шага происходит автоматический переход к предыдущему видимому шагу.

### 3. Валидация
- Нельзя перейти к невидимому шагу
- Навигация работает только между видимыми шагами
- Автоматическая сортировка видимых шагов

### 4. Прогресс
Автоматический расчет прогресса на основе текущего шага и количества видимых шагов.

### 5. Сохранение состояния
Состояние сохраняется в store и не теряется при переключении между компонентами.

## API Reference

### Store методы

#### `initializeCalculatorSteps(calculatorId, totalSteps = 4)`
Инициализирует состояние шагов для калькулятора.

#### `showStep(calculatorId, step)`
Делает шаг видимым.

#### `hideStep(calculatorId, step)`
Скрывает шаг. Если скрывается текущий шаг, происходит переход к предыдущему видимому.

#### `nextStep(calculatorId)`
Переходит к следующему видимому шагу.

#### `prevStep(calculatorId)`
Переходит к предыдущему видимому шагу.

#### `goToStep(calculatorId, step)`
Переходит к конкретному шагу (если он видим).

#### `completeStep(calculatorId, step)`
Отмечает шаг как завершенный.

#### `resetCalculatorSteps(calculatorId)`
Сбрасывает состояние калькулятора к начальному.

### Composable методы

Все методы store доступны в composable, но без параметра `calculatorId`:

```typescript
const steps = useCalculatorSteps(1);
steps.showStep(2); // Вместо store.showStep(1, 2)
```

Дополнительные методы composable:

#### `showAllSteps()`
Показывает все шаги калькулятора.

#### `showOnlyFirstStep()`
Скрывает все шаги кроме первого.

#### `toggleStep(step)`
Переключает видимость шага.

## Стилизация

Компонент `BlockCalc` включает базовые стили для анимаций переходов:

```css
.calc-step {
  @apply transition-all duration-300 ease-in-out;
}

.calc-step.hidden {
  @apply opacity-0 pointer-events-none;
}
```

## Миграция

Для миграции существующих калькуляторов:

1. Добавьте `calculatorId` к компоненту `BlockCalc`
2. Замените локальное состояние на использование store
3. Используйте composable для удобной работы с шагами
4. Обновите навигацию для использования новых методов

