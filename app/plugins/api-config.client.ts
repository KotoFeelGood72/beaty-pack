export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Инициализация API конфигурации
  const calculatorStore = useCalculatorStore();

  // Устанавливаем конфигурацию из runtime config
  calculatorStore.setApiConfig(
    config.public.apiDomain,
    config.apiKey // Только на сервере
  );

  // Обновляем базовый URL если он отличается
  if (config.public.apiBaseUrl !== calculatorStore.apiConfig.baseUrl) {
    calculatorStore.apiConfig.baseUrl = config.public.apiBaseUrl;
  }
});
