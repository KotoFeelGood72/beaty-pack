<template>
  <div class="calc-step">
    <CalcHead title="Основа" :step="2" />
    <div class="step-content">
      <CalcSelect
        v-model="lamination"
        :options="laminationOptions"
        label="Ламинация"
        placeholder="Выберите ламинацию"
      />
      <CalcSelect
        v-model="lacquer"
        :options="lacquerOptions"
        label="Лак"
        placeholder="Выберите лак"
      />
      <CalcRadioGroup v-model="embossing" :options="embossingOptions" label="Тиснение" />
      <CalcSelect
        v-model="color"
        :options="colorOptions"
        label="Цветность"
        placeholder="Выберите цветность"
      />
      <div class="grid-inputs">
        <CalcInput v-model="front" type="number" label="Лицо" placeholder="0" />
        <CalcInput v-model="back" type="number" label="Оборот" placeholder="0" />
      </div>
      <CalcSelect
        v-model="material"
        :options="materialOptions"
        label="Материал"
        placeholder="Выберите материал"
      />
      <CalcSelect
        v-model="paper"
        :options="paperOptions"
        label="Бумага"
        placeholder="Выберите бумагу"
      />
      <div class="file-upload-section">
        <label class="file-upload-label">
          Здесь вы можете прикрепить макет или логотип для размещения
        </label>
        <CalcFileUpload
          label="Добавить файл"
          accept=".pdf,.ai,.eps,.cdr,.jpg,.jpeg,.png"
          @file-selected="handleFileSelected"
          @file-removed="handleFileRemoved"
        />
      </div>
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
const front = ref(0);
const back = ref(0);
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

.grid-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.file-upload-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-upload-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}
</style>
