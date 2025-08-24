<template>
  <div class="calc-step">
    <CalcHead title="Упаковка и доставка" :step="4" />
    <div class="flex flex-col gap-8">
      <div class="flex lg:gap-10 gap-4 max-lg:flex-col max-lg:items-start">
        <div class="flex flex-col gap-2 max-lg:w-full">
          <CalcSelect
            v-model="packaging"
            :options="packagingOptions"
            label="Упаковка*"
            placeholder="Выберите упаковку"
            class="max-lg:w-full"
          />
          <p class="text-body-5 font-manrope text-lightGreyBlue">
            *В среднем в коробке 30-50 пакетов
          </p>
        </div>

        <!-- Доставка -->
        <CalcSelect
          v-model="delivery"
          :options="deliveryOptions"
          label="Доставка"
          placeholder="Выберите спос  об доставки"
          class="max-lg:w-full"
        />
      </div>

      <!-- Особые требования -->
      <div class="flex flex-col gap-4">
        <label class="text-body-4 font-manrope lg:font-semibold max-w-[300px]">
          Здесь вы можете указать особые требования к вашему заказу
        </label>
        <textarea
          v-model="specialRequirements"
          class="w-full p-4 bg-lightGrey rounded-lg focus:outline-none resize-none max-lg:text-body-4"
          rows="5"
          placeholder="Комментарий"
        ></textarea>
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
</script>

<style scoped></style>
