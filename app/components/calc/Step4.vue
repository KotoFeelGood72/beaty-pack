<template>
  <div class="calc-step">
    <CalcHead title="Упаковка и доставка" :step="4" />
    <div class="space-y-6">
      <!-- Упаковка -->
      <div class="space-y-2">
        <CalcSelect
          v-model="packaging"
          :options="packagingOptions"
          label="Упаковка*"
          placeholder="Выберите упаковку"
        />
        <p class="text-xs text-gray-500">*В среднем в коробке 30-50 пакетов</p>
      </div>

      <!-- Доставка -->
      <CalcSelect
        v-model="delivery"
        :options="deliveryOptions"
        label="Доставка"
        placeholder="Выберите способ доставки"
      />

      <!-- Особые требования -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          Здесь вы можете указать особые требования к вашему заказу
        </label>
        <textarea
          v-model="specialRequirements"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="4"
          placeholder="Комментарий"
        ></textarea>
      </div>

      <!-- Кнопка расчета -->
      <div class="pt-4">
        <button
          @click="calculateOrder"
          class="bg-amber-700 hover:bg-amber-800 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
        >
          Рассчитать
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CalcHead from "./CalcHead.vue";
import CalcSelect from "../shared/CalcSelect.vue";

const packaging = ref("box");
const delivery = ref("pickup");
const specialRequirements = ref("");

const packagingOptions = [
  { value: "box", label: "Коробка" },
  { value: "bag", label: "Пакет" },
  { value: "envelope", label: "Конверт" },
  { value: "none", label: "Без упаковки" },
];

const deliveryOptions = [
  { value: "pickup", label: "Самовывоз" },
  { value: "courier", label: "Курьер" },
  { value: "post", label: "Почта" },
  { value: "transport", label: "Транспортная компания" },
];

const calculateOrder = () => {
  console.log("Расчет заказа:", {
    packaging: packaging.value,
    delivery: delivery.value,
    specialRequirements: specialRequirements.value,
  });
  // Здесь будет логика расчета заказа
};
</script>

<style scoped></style>
