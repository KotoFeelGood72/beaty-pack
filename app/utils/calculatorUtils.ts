// Утилиты для работы с API калькулятора

// Типы статусов заказов
export type OrderStatus =
  | "delete"
  | "reg"
  | "files"
  | "prepress_check"
  | "prepress_layout"
  | "prepress_ctp"
  | "print"
  | "produce"
  | "close";

// Интерфейс для статуса заказа
export interface OrderStatusInfo {
  status: OrderStatus;
  label: string;
  description: string;
  color: string;
}

// Маппинг статусов заказов
export const ORDER_STATUSES: Record<OrderStatus, OrderStatusInfo> = {
  delete: {
    status: "delete",
    label: "Удален",
    description: "Заказ удален",
    color: "text-red-500",
  },
  reg: {
    status: "reg",
    label: "Обработан",
    description: "Заказ обработан менеджером и запущен в работу",
    color: "text-blue-500",
  },
  files: {
    status: "files",
    label: "Файлы получены",
    description: "Файлы для заказа получены",
    color: "text-green-500",
  },
  prepress_check: {
    status: "prepress_check",
    label: "Препресс проверка",
    description: "Препресс проверил заказ",
    color: "text-yellow-500",
  },
  prepress_layout: {
    status: "prepress_layout",
    label: "Препресс монтаж",
    description: "Препресс собрал монтаж",
    color: "text-orange-500",
  },
  prepress_ctp: {
    status: "prepress_ctp",
    label: "CtP формы",
    description: "Изготовлены CtP-формы (только для офсетной печати)",
    color: "text-purple-500",
  },
  print: {
    status: "print",
    label: "Отпечатан",
    description: "Заказ отпечатан",
    color: "text-indigo-500",
  },
  produce: {
    status: "produce",
    label: "Произведен",
    description: "Выполнены все постпечатные операции и заказ упакован",
    color: "text-teal-500",
  },
  close: {
    status: "close",
    label: "Закрыт",
    description: "Заказ доставлен клиенту и закрыт",
    color: "text-gray-500",
  },
};

// Функция для получения информации о статусе
export function getOrderStatusInfo(status: OrderStatus): OrderStatusInfo {
  return ORDER_STATUSES[status];
}

// Функция для валидации параметров калькулятора
export function validateCalculatorParams(
  params: any[],
  formData: any
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const param of params) {
    const value = formData[param.Id];

    // Проверка обязательных полей
    if (param.Control) {
      const controlValue = formData[param.Control.ParamId];
      if (!param.Control.Values.includes(controlValue)) {
        continue; // Параметр не отображается при текущих значениях
      }
    }

    // Проверка в зависимости от типа параметра
    switch (param.Type) {
      case "list":
        if (!value || !param.Values?.some((v: any) => v.Id === value)) {
          errors.push(`Неверное значение для параметра "${param.Name}"`);
        }
        break;

      case "number":
        if (value === undefined || value === null || value === "") {
          errors.push(`Параметр "${param.Name}" обязателен`);
        } else {
          const numValue = Number(value);
          if (isNaN(numValue)) {
            errors.push(`Параметр "${param.Name}" должен быть числом`);
          } else if (param.Num) {
            if (numValue < param.Num.Min || numValue > param.Num.Max) {
              errors.push(
                `Значение параметра "${param.Name}" должно быть от ${param.Num.Min} до ${param.Num.Max}`
              );
            }
            if (param.Num.K > 0 && numValue % param.Num.K !== 0) {
              errors.push(
                `Значение параметра "${param.Name}" должно быть кратно ${param.Num.K}`
              );
            }
          }
        }
        break;

      case "color":
        if (!value || typeof value !== "object") {
          errors.push(`Параметр "${param.Name}" обязателен`);
        } else {
          const requiredFields = [
            "CmykFace",
            "CmykBack",
            "PantoneFace",
            "PantoneBack",
          ];
          for (const field of requiredFields) {
            if (value[field] === undefined || value[field] === null) {
              errors.push(
                `Поле "${field}" в параметре "${param.Name}" обязательно`
              );
            }
          }
        }
        break;

      case "paper":
        if (!value || !param.Values?.some((v: any) => v.Id === value)) {
          errors.push(`Неверное значение для параметра "${param.Name}"`);
        }
        break;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Функция для форматирования цены
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Функция для создания объекта запроса на расчет
export function createCalculationRequest(
  templateId: number,
  name: string,
  params: any[],
  formData: any,
  tirazhi: number[],
  save: boolean = false,
  message?: string
) {
  const requestParams = params
    .filter((param) => {
      // Фильтруем параметры, которые должны быть отправлены
      if (param.Control) {
        const controlValue = formData[param.Control.ParamId];
        return param.Control.Values.includes(controlValue);
      }
      return true;
    })
    .map((param) => ({
      Id: param.Id,
      Value: formData[param.Id],
    }));

  return {
    Save: save,
    TemplateId: templateId,
    Name: name,
    Message: message,
    Tirazhi: tirazhi,
    Params: requestParams,
  };
}

// Функция для получения изображения калькулятора
export function getCalculatorImageUrl(
  baseUrl: string,
  calculatorId: number,
  imageId?: string
): string {
  const params = new URLSearchParams();
  params.append("id", calculatorId.toString());
  if (imageId) {
    params.append("image", imageId);
  }

  return `${baseUrl}image.php?${params.toString()}`;
}

// Функция для проверки доступности параметра
export function isParamVisible(param: any, formData: any): boolean {
  if (!param.Control) return true;

  const controlValue = formData[param.Control.ParamId];
  return param.Control.Values.includes(controlValue);
}

// Функция для получения доступных значений параметра
export function getAvailableParamValues(param: any, formData: any): any[] {
  if (!param.Values) return [];

  return param.Values.filter((value: any) => {
    if (!value.Control) return true;

    const controlValue = formData[value.Control.ParamId];
    return value.Control.Values.includes(controlValue);
  });
}

// Функция для инициализации формы с значениями по умолчанию
export function initializeFormData(params: any[]): Record<number, any> {
  const formData: Record<number, any> = {};

  for (const param of params) {
    if (param.Default !== undefined) {
      formData[param.Id] = param.Default;
    } else {
      // Устанавливаем значения по умолчанию в зависимости от типа
      switch (param.Type) {
        case "list":
          if (param.Values && param.Values.length > 0) {
            formData[param.Id] = param.Values[0].Id;
          }
          break;
        case "number":
          if (param.Num) {
            formData[param.Id] = param.Num.Min;
          }
          break;
        case "color":
          formData[param.Id] = {
            CmykFace: 0,
            CmykBack: 0,
            PantoneFace: 0,
            PantoneBack: 0,
          };
          break;
        case "paper":
          if (param.Values && param.Values.length > 0) {
            formData[param.Id] = param.Values[0].Id;
          }
          break;
      }
    }
  }

  return formData;
}

export const useCalculatorApi = () => {
  const config = useRuntimeConfig();
  
  // Получить заголовки для API запросов
  const getApiHeaders = () => {
    const headers: Record<string, string> = {
      "X-API-Domain": config.public.apiDomain,
      "Content-Type": "application/json",
    };

    // API ключ доступен только на сервере
    if (process.server && config.apiKey) {
      headers["X-API-Key"] = config.apiKey;
    }

    return headers;
  };

  // Базовый URL для API
  const getBaseUrl = () => {
    return config.public.apiBaseUrl;
  };

  // Выполнить API запрос
  const apiRequest = async <T>(
    endpoint: string,
    options: {
      method?: string;
      body?: any;
      params?: Record<string, any>;
    } = {}
  ): Promise<T> => {
    const { method = "GET", body, params } = options;
    
    let url = `${getBaseUrl()}${endpoint}`;
    
    // Добавляем параметры к URL для GET запросов
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    const requestOptions: any = {
      method,
      headers: getApiHeaders(),
    };

    if (body && method !== "GET") {
      requestOptions.body = body;
    }

    return await $fetch<T>(url, requestOptions);
  };

  return {
    getApiHeaders,
    getBaseUrl,
    apiRequest,
  };
};
