<template>
  <div class="calc-step w-full flex-grow">
    <CalcHead title="Общая информация" :step="1" />
    <div class="flex items-center lg:gap-10 gap-4 max-lg:flex-col max-lg:items-start">
      <CalcInput modelValue="100 шт." label="Тираж" />
      <CalcSelect
        v-model="selectedSize"
        :options="sizeOptions"
        label="Размер"
        placeholder="Выберите размер"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CalcHead from "./CalcHead.vue";
import CalcInput from "../shared/CalcInput.vue";
import CalcSelect from "../shared/CalcSelect.vue";

const selectedSize = ref("19");

const sizeOptions = [
  { value: "19", label: "520*400*150 мм (№19)" },
  { value: "22", label: "400*500*150 (№ 22)" },
  { value: "23", label: "68045535 (№ 23)" },
  { value: "32", label: "300520300 (№ 32)" },
  { value: "39", label: "46063030 (№ 39)" },
  { value: "41", label: "500400150 (№ 41)" },
];
</script>

<style scoped></style>
