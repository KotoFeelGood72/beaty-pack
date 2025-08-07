# Документация по использованию Calculator Store

## Обзор

`useCalculatorStore` - это Pinia стор для работы с API калькулятора печатной продукции. Стор предоставляет полный набор методов для взаимодействия с API, включая получение списка калькуляторов, загрузку форм, выполнение расчетов и управление заказами.

## Установка и настройка

### 1. Переменные окружения

Добавьте в файл `.env`:

```env
NUXT_API_DOMAIN=your_api_domain
NUXT_API_KEY=your_api_key
```

### 2. Импорт стора

```typescript
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { useCalculatorStoreRefs } from '@/store/useCalculatorStore';
```

## Основные возможности

### Инициализация

```typescript
const calculatorStore = useCalculatorStore();

// Инициализация с проверкой обновлений
await calculatorStore.initialize();
```

### Получение списка калькуляторов

```typescript
// Получить все калькуляторы
await calculatorStore.getCalculatorsList();

// Получить калькуляторы определенной версии
await calculatorStore.getCalculatorsList(2);

// Получить калькуляторы нескольких версий
await calculatorStore.getCalculatorsList([1, 2]);

// Фильтрация по поисковому запросу
const filtered = calculatorStore.getCalculatorsBySearch('бейдж');
```

### Загрузка формы калькулятора

```typescript
// Загрузить форму калькулятора по ID
await calculatorStore.getCalculatorForm(46);
```

### Выполнение расчетов

```typescript
const request = {
  Save: false, // true для сохранения заказа
  TemplateId: 46,
  Name: 'Мой заказ',
  Message: 'Комментарий к заказу',
  Tirazhi: [100, 200, 500],
  Params: [
    { Id: 1, Value: 2 },
    { Id: 2, Value: 150 },
    { Id: 3, Value: { CmykFace: 4, CmykBack: 0, PantoneFace: 0, PantoneBack: 0 } }
  ]
};

const result = await calculatorStore.calculate(request);
```

### Работа с изображениями

```typescript
// Получить URL изображения калькулятора
const imageUrl = calculatorStore.getCalculatorImage(46);

// Получить URL конкретного изображения
const specificImageUrl = calculatorStore.getCalculatorImage(46, 'image1');
```

### Управление платежами

```typescript
// Получить информацию об оплате
const paymentInfo = await calculatorStore.getPaymentInfo(12345);

// Создать платеж
const payment = await calculatorStore.createPayment(12345, 1000);
```

## Состояние стора

### Основные поля

```typescript
const { 
  calculators,        // Список калькуляторов
  currentCalculator,  // Текущий выбранный калькулятор
  calculatorForm,     // Форма текущего калькулятора
  calculationResult,  // Результат последнего расчета
  isLoading,         // Статус загрузки
  error             // Текущая ошибка
} = useCalculatorStoreRefs();
```

### Геттеры

```typescript
// Получить калькуляторы по версии
const version2Calculators = calculatorStore.getCalculatorsByVersion(2);

// Получить калькуляторы по поиску
const searchResults = calculatorStore.getCalculatorsBySearch('блокнот');

// Проверить необходимость обновления кэша
const shouldUpdate = calculatorStore.shouldUpdateCache;
```

## Утилиты

### Импорт утилит

```typescript
import { 
  validateCalculatorParams,
  formatPrice,
  createCalculationRequest,
  initializeFormData,
  isParamVisible,
  getAvailableParamValues,
  getOrderStatusInfo,
  ORDER_STATUSES
} from '@/utils/calculatorUtils';
```

### Валидация параметров

```typescript
const validation = validateCalculatorParams(params, formData);
if (!validation.isValid) {
  console.log('Ошибки:', validation.errors);
}
```

### Форматирование цены

```typescript
const formattedPrice = formatPrice(1500); // "1 500 ₽"
```

### Создание запроса на расчет

```typescript
const request = createCalculationRequest(
  templateId,
  name,
  params,
  formData,
  tirazhi,
  save,
  message
);
```

### Инициализация формы

```typescript
const formData = initializeFormData(params);
```

## Примеры использования

### Полный цикл работы с калькулятором

```typescript
const calculatorStore = useCalculatorStore();

// 1. Инициализация
await calculatorStore.initialize();

// 2. Получение списка калькуляторов
await calculatorStore.getCalculatorsList();

// 3. Выбор калькулятора
await calculatorStore.getCalculatorForm(46);

// 4. Инициализация формы
const formData = initializeFormData(calculatorStore.calculatorForm.Template.Params);

// 5. Валидация данных
const validation = validateCalculatorParams(
  calculatorStore.calculatorForm.Template.Params,
  formData
);

// 6. Выполнение расчета
if (validation.isValid) {
  const request = createCalculationRequest(
    calculatorStore.calculatorForm.Template.Id,
    'Мой заказ',
    calculatorStore.calculatorForm.Template.Params,
    formData,
    [100, 200],
    false
  );
  
  const result = await calculatorStore.calculate(request);
  console.log('Стоимость:', formatPrice(result.Summa));
}
```

### Работа с несколькими тиражами

```typescript
// Для калькуляторов версии 2 с параметром Variants
const tirazhi = [100, 200, 500, 1000];
const request = {
  Save: false,
  TemplateId: 46,
  Name: 'Заказ с несколькими тиражами',
  Tirazhi: tirazhi,
  Params: [
    { Id: 1, Value: 2 },
    { Id: 2, Value: tirazhi } // Массив тиражей для параметра Variants
  ]
};

const result = await calculatorStore.calculate(request);
// result.Data будет содержать массив расчетов для каждого тиража
```

### Обработка ошибок

```typescript
try {
  await calculatorStore.getCalculatorsList();
} catch (error) {
  console.error('Ошибка:', calculatorStore.error);
  calculatorStore.clearError();
}
```

## Типы данных

### Calculator

```typescript
interface Calculator {
  Id: number;
  Version: number;
  Name: string;
  SearchText: string;
  Ut: boolean;
  Time: string;
}
```

### CalculatorForm

```typescript
interface CalculatorForm {
  Template: {
    Id: number;
    Version: number;
    Name: string;
    Description: string;
    Variants?: number;
    Params: Array<{
      Id: number;
      Type: 'list' | 'number' | 'color' | 'paper';
      Name: string;
      Control?: {
        ParamId: number;
        Values: number[];
      };
      Default?: any;
      Values?: any[];
      Num?: {
        K: number;
        Min: number;
        Max: number;
      };
    }>;
  };
  ImageList: number[];
}
```

### CalculationRequest

```typescript
interface CalculationRequest {
  Save: boolean;
  TemplateId: number;
  Name: string;
  Message?: string;
  Tirazhi: number[];
  Params: Array<{
    Id: number;
    Value: number | string | object | number[];
  }>;
}
```

## Статусы заказов

```typescript
import { ORDER_STATUSES, getOrderStatusInfo } from '@/utils/calculatorUtils';

// Получить информацию о статусе
const statusInfo = getOrderStatusInfo('print');
console.log(statusInfo.label); // "Отпечатан"
console.log(statusInfo.color); // "text-indigo-500"
```

## Лучшие практики

1. **Всегда инициализируйте стор** перед использованием
2. **Используйте валидацию** перед отправкой запросов
3. **Обрабатывайте ошибки** с помощью try-catch
4. **Очищайте ошибки** после обработки
5. **Используйте кэширование** для оптимизации производительности
6. **Проверяйте видимость параметров** перед отображением

## Совместимость

Стор поддерживает обе версии API:
- **Версия 1**: Классическая версия с параметрами Orders
- **Версия 2**: Новая версия с типизированными параметрами

Автоматическое определение версии происходит на основе данных, полученных от API. 