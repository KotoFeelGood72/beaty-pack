# Настройка API калькулятора

## Шаг 1: Создание файла .env.local

Создайте файл `.env.local` в корне проекта со следующим содержимым:

```env
# API конфигурация для калькулятора
NUXT_API_DOMAIN=simprint
NUXT_API_KEY=81d3c7e1-3552-4012-8102-9e35657559c5
NUXT_API_BASE_URL=https://api.simprint.ddns.net/v1/
```

## Шаг 2: Проверка конфигурации

Убедитесь, что в `nuxt.config.ts` настроены переменные окружения:

```typescript
runtimeConfig: {
  apiDomain: process.env.NUXT_API_DOMAIN || 'simprint',
  apiKey: process.env.NUXT_API_KEY || '81d3c7e1-3552-4012-8102-9e35657559c5',
  apiBaseUrl: process.env.NUXT_API_BASE_URL || 'https://api.simprint.ddns.net/v1/',
  
  public: {
    apiDomain: process.env.NUXT_API_DOMAIN || 'simprint',
    apiBaseUrl: process.env.NUXT_API_BASE_URL || 'https://api.simprint.ddns.net/v1/',
  }
}
```

## Шаг 3: Перезапуск сервера

После создания файла `.env.local` перезапустите сервер разработки:

```bash
npm run dev
```

## Шаг 4: Тестирование

Для тестирования API можно использовать компонент `CalculatorExample.vue`:

```vue
<template>
  <CalculatorExample />
</template>
```

## Безопасность

- Файл `.env.local` уже добавлен в `.gitignore`
- API ключ не будет доступен на клиенте
- Все API запросы выполняются через серверные плагины

## Проверка работоспособности

1. Откройте консоль браузера
2. Проверьте, что нет ошибок CORS
3. Убедитесь, что API запросы выполняются успешно
4. Проверьте, что список калькуляторов загружается 