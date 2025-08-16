<template>
  <div class="calc-radio-group">
    <label v-if="label" class="calc-radio-label">
      {{ label }}
    </label>
    
    <div class="calc-radio-options">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="radio-button"
        :class="{ 'selected': modelValue === option.value }"
        @click="selectOption(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RadioOption {
  value: string | number;
  label: string;
}

interface Props {
  modelValue?: string | number;
  options: RadioOption[];
  label?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const selectOption = (value: string | number) => {
  emit('update:modelValue', value);
};
</script>

<style scoped>
.calc-radio-group {
  width: 100%;
}

.calc-radio-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.calc-radio-options {
  display: flex;
  gap: 0.75rem;
}

.radio-button {
  flex: 1;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 48px;
}

.radio-button:hover {
  border-color: #9ca3af;
}

.radio-button.selected {
  border-color: #84cc16;
  color: #374151;
}

.radio-button:not(.selected) {
  color: #9ca3af;
}

.radio-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(132, 204, 22, 0.5);
}
</style> 