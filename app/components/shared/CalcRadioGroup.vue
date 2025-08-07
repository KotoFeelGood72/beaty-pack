<template>
  <div class="calc-radio-group">
    <label v-if="label" class="block text-sm font-bold text-gray-900 mb-2">
      {{ label }}
    </label>
    
    <div class="flex gap-3">
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
  @apply w-full;
}

.radio-button {
  @apply flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer;
  min-height: 48px;
}

.radio-button:hover {
  @apply border-gray-400;
}

.radio-button.selected {
  @apply border-lime-500 text-gray-700;
}

.radio-button:not(.selected) {
  @apply text-gray-400;
}

.radio-button:focus {
  @apply outline-none ring-2 ring-lime-500 ring-opacity-50;
}
</style> 