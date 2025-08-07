<template>
  <div class="calc-step">
    <CalcHead title="Фурнитура" :step="3" />
    <div class="space-y-6">
      <!-- Первый ряд -->
      <div class="grid grid-cols-3 gap-4">
        <CalcSelect
          v-model="handleMaterial"
          :options="handleMaterialOptions"
          label="Материал ручек"
          placeholder="Выберите материал"
        />
        <CalcSelect
          v-model="cord"
          :options="cordOptions"
          label="Шнур"
          placeholder="Выберите шнур"
        />
        <div class="space-y-2">
          <CalcRadioGroup
            v-model="handleReinforcement"
            :options="reinforcementOptions"
            label="Укрепление ручек*"
          />
          <p class="text-xs text-gray-500">*Обязательно для вклейки ленты</p>
        </div>
      </div>

      <!-- Второй ряд -->
      <div class="grid grid-cols-2 gap-4">
        <CalcSelect
          v-model="fastening"
          :options="fasteningOptions"
          label="Крепление"
          placeholder="Выберите крепление"
        />
        <CalcRadioGroup
          v-model="eyelets"
          :options="eyeletsOptions"
          label="Люверсы"
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
