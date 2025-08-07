import { defineStore, storeToRefs } from "pinia";

// Типы для API калькулятора
interface Calculator {
  Id: number;
  Version: number;
  Name: string;
  SearchText: string;
  Ut: boolean;
  Time: string;
}

interface CalculatorForm {
  Template: {
    Id: number;
    Version: number;
    Name: string;
    Description: string;
    Variants?: number;
    Params: Array<{
      Id: number;
      Type: "list" | "number" | "color" | "paper";
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

interface CalculationResponse {
  Errors?: string[];
  Summa: number;
  ProductId?: number;
  Info?: any;
  Data?: Array<{
    Tirazh: number;
    Summa: number;
  }>;
}

interface PaymentInfo {
  ProductId: number;
  Summa: number;
  Balance: number;
  Payment: number;
  Error: string[];
}

export const useCalculatorStore = defineStore("calculator", {
  state: () => ({
    // API конфигурация
    apiConfig: {
      baseUrl: "https://api.simprint.ddns.net/v1/",
      domain: "simprint",
      key: "81d3c7e1-3552-4012-8102-9e35657559c5",
    },

    // Состояние калькуляторов
    calculators: [] as Calculator[],
    currentCalculator: null as Calculator | null,
    calculatorForm: null as CalculatorForm | null,

    // Состояние расчетов
    calculationResult: null as CalculationResponse | null,
    isLoading: false,
    error: null as string | null,

    // Кэш времени последнего изменения
    lastUpdateTime: null as string | null,
  }),

  getters: {
    // Получить калькуляторы по версии
    getCalculatorsByVersion: (state) => (version: number | number[]) => {
      if (Array.isArray(version)) {
        return state.calculators.filter((calc) =>
          version.includes(calc.Version)
        );
      }
      return state.calculators.filter((calc) => calc.Version === version);
    },

    // Получить калькуляторы по поисковому запросу
    getCalculatorsBySearch: (state) => (searchText: string) => {
      const query = searchText.toLowerCase();
      return state.calculators.filter(
        (calc) =>
          calc.Name.toLowerCase().includes(query) ||
          calc.SearchText.toLowerCase().includes(query)
      );
    },

    // Проверить, нужно ли обновить кэш
    shouldUpdateCache: (state) => {
      if (!state.lastUpdateTime) return true;
      const lastUpdate = new Date(state.lastUpdateTime);
      const now = new Date();
      const diffHours =
        (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
      return diffHours > 1; // Обновляем кэш каждый час
    },
  },

  actions: {
    // Получить заголовки для API запросов
    getApiHeaders() {
      return {
        "X-API-Domain": this.apiConfig.domain,
        "X-API-Key": this.apiConfig.key,
        "Content-Type": "application/json",
      };
    },

    // Проверить время последнего изменения всех калькуляторов
    async checkUpdateTime() {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await $fetch(
          `${this.apiConfig.baseUrl}checktime.php`,
          {
            method: "GET",
            headers: this.getApiHeaders(),
          }
        );

        this.lastUpdateTime = new Date().toISOString();
        return response;
      } catch (error: any) {
        this.error = `Ошибка при проверке времени обновления: ${error.message}`;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Получить список калькуляторов
    async getCalculatorsList(version?: number | number[]) {
      try {
        this.isLoading = true;
        this.error = null;

        const params = new URLSearchParams();
        if (version) {
          if (Array.isArray(version)) {
            params.append("Version", JSON.stringify(version));
          } else {
            params.append("Version", version.toString());
          }
        }

        const url = `${this.apiConfig.baseUrl}list.php${
          params.toString() ? "?" + params.toString() : ""
        }`;

        const response = await $fetch<Calculator[]>(url, {
          method: "GET",
          headers: this.getApiHeaders(),
        });

        this.calculators = response;
        return response;
      } catch (error: any) {
        this.error = `Ошибка при получении списка калькуляторов: ${error.message}`;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Получить форму калькулятора
    async getCalculatorForm(calculatorId: number) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await $fetch<CalculatorForm>(
          `${this.apiConfig.baseUrl}calcform.php`,
          {
            method: "POST",
            headers: this.getApiHeaders(),
            body: { id: calculatorId },
          }
        );

        this.calculatorForm = response;
        this.currentCalculator =
          this.calculators.find((calc) => calc.Id === calculatorId) || null;

        return response;
      } catch (error: any) {
        this.error = `Ошибка при получении формы калькулятора: ${error.message}`;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Выполнить расчет
    async calculate(request: CalculationRequest) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await $fetch<CalculationResponse>(
          `${this.apiConfig.baseUrl}calculate.php`,
          {
            method: "POST",
            headers: this.getApiHeaders(),
            body: request,
          }
        );

        this.calculationResult = response;
        return response;
      } catch (error: any) {
        this.error = `Ошибка при выполнении расчета: ${error.message}`;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Получить изображение калькулятора
    getCalculatorImage(calculatorId: number, imageId?: string) {
      const params = new URLSearchParams();
      params.append("id", calculatorId.toString());
      if (imageId) {
        params.append("image", imageId);
      }

      return `${this.apiConfig.baseUrl}image.php?${params.toString()}`;
    },

    // Получить информацию об оплате заказа
    async getPaymentInfo(productId: number, payment?: number) {
      try {
        this.isLoading = true;
        this.error = null;

        const params = new URLSearchParams();
        params.append("ProductId", productId.toString());
        if (payment !== undefined) {
          params.append("Payment", payment.toString());
        }

        const response = await $fetch<PaymentInfo>(
          `${this.apiConfig.baseUrl}payment.php?${params.toString()}`,
          {
            method: "GET",
            headers: this.getApiHeaders(),
          }
        );

        return response;
      } catch (error: any) {
        this.error = `Ошибка при получении информации об оплате: ${error.message}`;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Создать платеж
    async createPayment(productId: number, payment: number) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await $fetch<PaymentInfo>(
          `${this.apiConfig.baseUrl}payment.php`,
          {
            method: "POST",
            headers: this.getApiHeaders(),
            body: {
              ProductId: productId,
              Payment: payment,
            },
          }
        );

        return response;
      } catch (error: any) {
        this.error = `Ошибка при создании платежа: ${error.message}`;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Инициализация с проверкой обновлений
    async initialize() {
      try {
        // Проверяем время последнего обновления
        await this.checkUpdateTime();

        // Если кэш устарел или пуст, загружаем список калькуляторов
        if (this.shouldUpdateCache || this.calculators.length === 0) {
          await this.getCalculatorsList();
        }
      } catch (error: any) {
        this.error = `Ошибка при инициализации: ${error.message}`;
        throw error;
      }
    },

    // Очистить ошибку
    clearError() {
      this.error = null;
    },

    // Сбросить состояние расчета
    resetCalculation() {
      this.calculationResult = null;
      this.error = null;
    },

    // Установить конфигурацию API
    setApiConfig(domain: string, key: string) {
      this.apiConfig.domain = domain;
      this.apiConfig.key = key;
    },
  },
});

export const useCalculatorStoreRefs = () => storeToRefs(useCalculatorStore());
