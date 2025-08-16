<template>
  <div class="calc-input-container">
    <input
      type="text"
      v-model="localValue"
      :placeholder="placeholder"
      class="calc-input"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from "vue";

const props = defineProps<{
  placeholder?: string;
  modelValue: any;
  phoneMask?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

// Функция для форматирования номера телефона
const formatPhoneNumber = (value: string): string => {
  // Удаляем все нецифровые символы
  const numbers = value.replace(/\D/g, "");

  // Если номер начинается с 8, заменяем на 7
  let formattedNumber = numbers;
  if (formattedNumber.startsWith("8") && formattedNumber.length > 0) {
    formattedNumber = "7" + formattedNumber.slice(1);
  }

  // Применяем маску +7 (999) 999-99-99
  if (formattedNumber.length === 0) return "";
  if (formattedNumber.length <= 3) return `+7 (${formattedNumber}`;
  if (formattedNumber.length <= 6)
    return `+7 (${formattedNumber.slice(0, 3)}) ${formattedNumber.slice(3)}`;
  if (formattedNumber.length <= 8)
    return `+7 (${formattedNumber.slice(0, 3)}) ${formattedNumber.slice(
      3,
      6
    )}-${formattedNumber.slice(6)}`;
  return `+7 (${formattedNumber.slice(0, 3)}) ${formattedNumber.slice(
    3,
    6
  )}-${formattedNumber.slice(6, 8)}-${formattedNumber.slice(8, 10)}`;
};

// Обработчик ввода с применением маски
const handleInput = (event: Event) => {
  if (!props.phoneMask) return;

  const target = event.target as HTMLInputElement;
  const cursorPosition = target.selectionStart || 0;
  const newValue = formatPhoneNumber(target.value);

  // Обновляем значение
  emit("update:modelValue", newValue);

  // Восстанавливаем позицию курсора
  setTimeout(() => {
    const newCursorPosition = Math.min(cursorPosition, newValue.length);
    target.setSelectionRange(newCursorPosition, newCursorPosition);
  }, 0);
};
</script>

<style scoped>
.calc-input-container {
  position: relative;
  height: 60px;
}

.calc-input {
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  border-radius: 0.5rem;
  color: #6b7280;
  border: 1px solid #d1d5db;
  background-color: white;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.calc-input:focus {
  outline: none;
  border-color: #84cc16;
}

.calc-input::placeholder {
  color: #9ca3af;
}
</style>
