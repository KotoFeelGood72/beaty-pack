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

// Интерфейс для состояния шагов калькулятора
interface CalculatorStepsState {
  currentStep: number;
  visibleSteps: number[];
  completedSteps: number[];
  totalSteps: number;
}

export const useCalculatorStore = defineStore("calculator", {
  state: () => ({
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

    // Состояние шагов для каждого калькулятора
    calculatorSteps: {} as Record<number, CalculatorStepsState>,
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

    // Получить состояние шагов для конкретного калькулятора
    getCalculatorSteps: (state) => (calculatorId: number) => {
      return state.calculatorSteps[calculatorId] || {
        currentStep: 1,
        visibleSteps: [1],
        completedSteps: [],
        totalSteps: 4,
      };
    },

    // Проверить, видим ли шаг для конкретного калькулятора
    isStepVisible: (state) => (calculatorId: number, step: number) => {
      const stepsState = state.calculatorSteps[calculatorId];
      if (!stepsState) return step === 1;
      return stepsState.visibleSteps.includes(step);
    },

    // Проверить, завершен ли шаг для конкретного калькулятора
    isStepCompleted: (state) => (calculatorId: number, step: number) => {
      const stepsState = state.calculatorSteps[calculatorId];
      if (!stepsState) return false;
      return stepsState.completedSteps.includes(step);
    },

    // Получить текущий шаг для конкретного калькулятора
    getCurrentStep: (state) => (calculatorId: number) => {
      const stepsState = state.calculatorSteps[calculatorId];
      return stepsState ? stepsState.currentStep : 1;
    },
  },

  actions: {
    // Инициализировать состояние шагов для калькулятора
    initializeCalculatorSteps(calculatorId: number, totalSteps: number = 4) {
      this.calculatorSteps[calculatorId] = {
        currentStep: 1,
        visibleSteps: [1],
        completedSteps: [],
        totalSteps,
      };
    },

    // Показать шаг для конкретного калькулятора
    showStep(calculatorId: number, step: number) {
      if (!this.calculatorSteps[calculatorId]) {
        this.initializeCalculatorSteps(calculatorId);
      }

      const stepsState = this.calculatorSteps[calculatorId];
      if (!stepsState.visibleSteps.includes(step)) {
        stepsState.visibleSteps.push(step);
        stepsState.visibleSteps.sort((a, b) => a - b);
      }
    },

    // Скрыть шаг для конкретного калькулятора
    hideStep(calculatorId: number, step: number) {
      if (!this.calculatorSteps[calculatorId]) return;

      const stepsState = this.calculatorSteps[calculatorId];
      stepsState.visibleSteps = stepsState.visibleSteps.filter(s => s !== step);
      
      // Если скрываем текущий шаг, переходим к предыдущему видимому
      if (stepsState.currentStep === step && stepsState.visibleSteps.length > 0) {
        const currentIndex = stepsState.visibleSteps.indexOf(step);
        if (currentIndex > 0) {
          stepsState.currentStep = stepsState.visibleSteps[currentIndex - 1];
        } else {
          stepsState.currentStep = stepsState.visibleSteps[0];
        }
      }
    },

    // Перейти к следующему шагу для конкретного калькулятора
    nextStep(calculatorId: number) {
      if (!this.calculatorSteps[calculatorId]) {
        this.initializeCalculatorSteps(calculatorId);
      }

      const stepsState = this.calculatorSteps[calculatorId];
      const currentIndex = stepsState.visibleSteps.indexOf(stepsState.currentStep);
      
      if (currentIndex < stepsState.visibleSteps.length - 1) {
        stepsState.currentStep = stepsState.visibleSteps[currentIndex + 1];
      }
    },

    // Перейти к предыдущему шагу для конкретного калькулятора
    prevStep(calculatorId: number) {
      if (!this.calculatorSteps[calculatorId]) return;

      const stepsState = this.calculatorSteps[calculatorId];
      const currentIndex = stepsState.visibleSteps.indexOf(stepsState.currentStep);
      
      if (currentIndex > 0) {
        stepsState.currentStep = stepsState.visibleSteps[currentIndex - 1];
      }
    },

    // Перейти к конкретному шагу для конкретного калькулятора
    goToStep(calculatorId: number, step: number) {
      if (!this.calculatorSteps[calculatorId]) {
        this.initializeCalculatorSteps(calculatorId);
      }

      const stepsState = this.calculatorSteps[calculatorId];
      if (stepsState.visibleSteps.includes(step)) {
        stepsState.currentStep = step;
      }
    },

    // Отметить шаг как завершенный для конкретного калькулятора
    completeStep(calculatorId: number, step: number) {
      if (!this.calculatorSteps[calculatorId]) {
        this.initializeCalculatorSteps(calculatorId);
      }

      const stepsState = this.calculatorSteps[calculatorId];
      if (!stepsState.completedSteps.includes(step)) {
        stepsState.completedSteps.push(step);
        stepsState.completedSteps.sort((a, b) => a - b);
      }
    },

    // Сбросить завершение шага для конкретного калькулятора
    uncompleteStep(calculatorId: number, step: number) {
      if (!this.calculatorSteps[calculatorId]) return;

      const stepsState = this.calculatorSteps[calculatorId];
      stepsState.completedSteps = stepsState.completedSteps.filter(s => s !== step);
    },

    // Сбросить все шаги для конкретного калькулятора
    resetCalculatorSteps(calculatorId: number) {
      this.calculatorSteps[calculatorId] = {
        currentStep: 1,
        visibleSteps: [1],
        completedSteps: [],
        totalSteps: 4,
      };
    },

    // Проверить время последнего изменения всех калькуляторов
    async checkUpdateTime() {
      try {
        this.isLoading = true;
        this.error = null;

        const { apiRequest } = useCalculatorApi();
        const response = await apiRequest("checktime.php");

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

        const { apiRequest } = useCalculatorApi();
        const params: Record<string, any> = {};
        
        if (version) {
          if (Array.isArray(version)) {
            params.Version = JSON.stringify(version);
          } else {
            params.Version = version.toString();
          }
        }

        const response = await apiRequest<Calculator[]>("list.php", { params });

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

        const { apiRequest } = useCalculatorApi();
        const response = await apiRequest<CalculatorForm>("calcform.php", {
          method: "POST",
          body: { id: calculatorId },
        });

        this.calculatorForm = response;
        this.currentCalculator =
          this.calculators.find((calc) => calc.Id === calculatorId) || null;

        // Инициализируем шаги для этого калькулятора
        this.initializeCalculatorSteps(calculatorId);

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

        const { apiRequest } = useCalculatorApi();
        const response = await apiRequest<CalculationResponse>("calculate.php", {
          method: "POST",
          body: request,
        });

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
      const { getBaseUrl } = useCalculatorApi();
      const params = new URLSearchParams();
      params.append("id", calculatorId.toString());
      if (imageId) {
        params.append("image", imageId);
      }

      return `${getBaseUrl()}image.php?${params.toString()}`;
    },

    // Получить информацию об оплате заказа
    async getPaymentInfo(productId: number, payment?: number) {
      try {
        this.isLoading = true;
        this.error = null;

        const { apiRequest } = useCalculatorApi();
        const params: Record<string, any> = {
          ProductId: productId.toString(),
        };
        
        if (payment !== undefined) {
          params.Payment = payment.toString();
        }

        const response = await apiRequest<PaymentInfo>("payment.php", { params });

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

        const { apiRequest } = useCalculatorApi();
        const response = await apiRequest<PaymentInfo>("payment.php", {
          method: "POST",
          body: {
            ProductId: productId,
            Payment: payment,
          },
        });

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
  },
});

export const useCalculatorStoreRefs = () => storeToRefs(useCalculatorStore());
