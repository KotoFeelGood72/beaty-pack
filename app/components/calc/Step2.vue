<template>
  <div class="calc-step">
    <CalcHead title="Основа" :step="2" />
    <div class="flex flex-col lg:gap-8 gap-4">
      <div class="flex items-center lg:gap-10 max-lg:flex-col max-lg:items-start gap-4">
        <CalcSelect
          v-model="lamination"
          :options="laminationOptions"
          label="Ламинация"
          placeholder="Выберите ламинацию"
          class="max-lg:w-full"
        />
        <CalcSelect
          v-model="lacquer"
          :options="lacquerOptions"
          label="Лак"
          placeholder="Выберите лак"
          class="max-lg:w-full"
        />
        <CalcRadioGroup
          v-model="embossing"
          :options="embossingOptions"
          label="Тиснение"
        />
      </div>
      <div class="flex items-center lg:gap-10 gap-4 max-lg:flex-col max-lg:items-start">
        <CalcSelect
          v-model="color"
          :options="colorOptions"
          label="Цветность"
          placeholder="Выберите цветность"
          class="max-lg:w-full"
        />
        <div class="flex items-center gap-4">
          <CalcSelect
            v-model="front"
            :options="frontOptions"
            label="Лицо"
            placeholder="Выберите лицо"
          />
          <CalcSelect
            v-model="back"
            :options="backOptions"
            label="Оборот"
            placeholder="Выберите оборот"
          />
        </div>
      </div>
      <div class="flex items-center lg:gap-10 gap-4 max-lg:flex-col max-lg:items-start">
        <CalcSelect
          v-model="material"
          :options="materialOptions"
          label="Материал"
          placeholder="Выберите материал"
          class="max-lg:w-full"
        />
        <CalcSelect
          v-model="paper"
          :options="paperOptions"
          label="Бумага"
          placeholder="Выберите бумагу"
          class="max-lg:w-full"
        />
      </div>
      <CalcFileUpload
        label="Добавить файл"
        accept=".pdf,.ai,.eps,.cdr,.jpg,.jpeg,.png"
        @file-selected="handleFileSelected"
        @file-removed="handleFileRemoved"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CalcHead from "./CalcHead.vue";
import CalcInput from "../shared/CalcInput.vue";
import CalcSelect from "../shared/CalcSelect.vue";
import CalcRadioGroup from "../shared/CalcRadioGroup.vue";
import CalcFileUpload from "../shared/CalcFileUpload.vue";

const lamination = ref("matte");
const lacquer = ref("uv");
const embossing = ref("yes");
const color = ref("cmyk");
const front = ref(1);
const back = ref(1);
const material = ref("paper");
const paper = ref("coated-glossy-170");

const laminationOptions = [
  { value: "matte", label: "Матовая" },
  { value: "glossy", label: "Глянцевая" },
  { value: "none", label: "Без ламинации" },
];

const lacquerOptions = [
  { value: "uv", label: "УФ-лак" },
  { value: "water", label: "Водный лак" },
  { value: "none", label: "Без лака" },
];

const embossingOptions = [
  { value: "yes", label: "Есть" },
  { value: "no", label: "Нет" },
];

const colorOptions = [
  { value: "cmyk", label: "CMYK" },
  { value: "pantone", label: "Pantone" },
  { value: "black-white", label: "Ч/Б" },
];

const frontOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
];

const backOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
];

const materialOptions = [
  { value: "paper", label: "Бумага" },
  { value: "cardboard", label: "Картон" },
  { value: "plastic", label: "Пластик" },
];

const paperOptions = [
  { value: "coated-glossy-170", label: "Мелованная глянцевая, 170" },
  { value: "coated-matte-170", label: "Мелованная матовая, 170" },
  { value: "offset-80", label: "Офсетная, 80" },
  { value: "offset-120", label: "Офсетная, 120" },
];

const handleFileSelected = (file: File) => {
  console.log("Файл загружен:", file.name);
};

const handleFileRemoved = () => {
  console.log("Файл удален");
};
</script>

<style scoped>
.step-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
