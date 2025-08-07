# Быстрый старт с API калькулятора

## 1. Создайте файл .env.local

В корне проекта создайте файл `.env.local`:

```env
NUXT_API_DOMAIN=simprint
NUXT_API_KEY=81d3c7e1-3552-4012-8102-9e35657559c5
NUXT_API_BASE_URL=https://api.simprint.ddns.net/v1/
```

## 2. Запустите проект

```bash
npm run dev
```

## 3. Откройте тестовую страницу

Перейдите по адресу: `http://localhost:3000/api-test`

## 4. Проверьте работу API

На тестовой странице вы увидите:
- Статус подключения к API
- Кнопки для тестирования запросов
- Результаты запросов
- Полный калькулятор

## Что уже настроено:

✅ **API Store** - полный стор для работы с калькулятором  
✅ **Утилиты** - функции валидации и форматирования  
✅ **Плагины** - инициализация конфигурации  
✅ **Тестовая страница** - для проверки API  
✅ **Безопасность** - API ключ защищен  

## Готово к использованию!

Теперь вы можете использовать `useCalculatorStore` в любом компоненте:

```vue
<script setup>
import { useCalculatorStore } from '@/store/useCalculatorStore';

const calculatorStore = useCalculatorStore();
await calculatorStore.initialize();
</script>
``` 