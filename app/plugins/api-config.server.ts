export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // На сервере мы можем безопасно использовать API ключ
  const calculatorStore = useCalculatorStore();

  // Устанавливаем полную конфигурацию
  calculatorStore.setApiConfig(config.apiDomain, config.apiKey);

  // Обновляем базовый URL
  if (config.apiBaseUrl !== calculatorStore.apiConfig.baseUrl) {
    calculatorStore.apiConfig.baseUrl = config.apiBaseUrl;
  }
});
