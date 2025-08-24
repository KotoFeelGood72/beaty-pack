<template>
  <div class="calc-step">
    <CalcHead title="Фурнитура" :step="3" />
    <div class="flex flex-col lg:gap-8 gap-4">
      <div class="flex lg:gap-10 gap-4 max-lg:flex-col max-lg:items-start">
        <CalcSelect
          v-model="handleMaterial"
          :options="handleMaterialOptions"
          label="Материал ручек"
          placeholder="Выберите материал"
          class="max-lg:w-full"
        />
        <CalcSelect
          v-model="cord"
          :options="cordOptions"
          label="Шнур"
          placeholder="Выберите шнур"
          class="max-lg:w-full"
        />
        <div class="space-y-2">
          <CalcRadioGroup
            v-model="handleReinforcement"
            :options="reinforcementOptions"
            label="Укрепление ручек*"
            class="max-lg:max-w-[121px]"
          />
          <p class="text-body-5 font-manrope text-lightGreyBlue lg:max-w-[143px]">
            *Обязательно для вклейки ленты
          </p>
        </div>
      </div>

      <!-- Второй ряд -->
      <div class="flex lg:gap-10 gap-4 max-lg:flex-col max-lg:items-start">
        <div class="max-w-[143px] w-full">
          <CalcSelect
            v-model="fastening"
            :options="fasteningOptions"
            label="Крепление"
            placeholder="Выберите крепление"
            class="max-lg:w-full"
          />
        </div>
        <CalcRadioGroup
          v-model="eyelets"
          :options="eyeletsOptions"
          label="Люверсы"
          class="max-lg:max-w-[121px]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CalcHead from "./CalcHead.vue";
import CalcSelect from "../shared/CalcSelect.vue";
import CalcRadioGroup from "../shared/CalcRadioGroup.vue";

const handleMaterial = ref("cord");
const cord = ref("4mm");
const handleReinforcement = ref("yes");
const fastening = ref("knot");
const eyelets = ref("yes");

const handleMaterialOptions = [
  { value: "cord", label: "Шнур" },
  { value: "leather", label: "Кожа" },
  { value: "plastic", label: "Пластик" },
  { value: "metal", label: "Металл" },
];

const cordOptions = [
  { value: "4mm", label: "4 мм" },
  { value: "6mm", label: "6 мм" },
  { value: "8mm", label: "8 мм" },
  { value: "10mm", label: "10 мм" },
];

const reinforcementOptions = [
  { value: "yes", label: "Есть" },
  { value: "no", label: "Нет" },
];

const fasteningOptions = [
  { value: "knot", label: "Узел" },
  { value: "clip", label: "Клипса" },
  { value: "ring", label: "Кольцо" },
  { value: "hook", label: "Крючок" },
];

const eyeletsOptions = [
  { value: "yes", label: "Есть" },
  { value: "no", label: "Нет" },
];
</script>

<style scoped></style>
