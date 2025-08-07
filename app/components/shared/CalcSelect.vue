<template>
  <div class="calc-select">
    <label v-if="label" class="block text-sm font-bold text-gray-900 mb-2">
      {{ label }}
    </label>
    
    <div class="relative">
      <div 
        class="select-input cursor-pointer"
        :class="{ 'active': isOpen || isActive }"
        @click="toggleDropdown"
        @blur="handleBlur"
      >
        <span class="select-value" :class="{ 'placeholder': !modelValue }">
          {{ displayValue || placeholder }}
        </span>
        <div class="select-arrow" :class="{ 'rotated': isOpen }">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div 
        v-if="isOpen" 
        class="select-dropdown"
        @click.stop
      >
        <div class="dropdown-content">
          <div 
            v-for="option in options" 
            :key="option.value"
            class="dropdown-item"
            :class="{ 'selected': modelValue === option.value }"
            @click="selectOption(option)"
          >
            {{ option.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SelectOption {
  value: string | number;
  label: string;
}

interface Props {
  modelValue?: string | number;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Выберите опцию'
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const isOpen = ref(false);
const isActive = ref(false);

const displayValue = computed(() => {
  if (!props.modelValue) return '';
  const selectedOption = props.options.find(option => option.value === props.modelValue);
  return selectedOption?.label || '';
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  isActive.value = isOpen.value;
};

const selectOption = (option: SelectOption) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
  isActive.value = false;
};

const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false;
    isActive.value = false;
  }, 150);
};
</script>

<style scoped>
.calc-select {
  @apply w-full;
}

.select-input {
  @apply w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between transition-all duration-200;
  min-height: 48px;
}

.select-input.active {
  @apply border-lime-500;
}

.select-value {
  @apply text-gray-700 text-sm;
}

.select-value.placeholder {
  @apply text-gray-400;
}

.select-arrow {
  @apply text-gray-600 transition-transform duration-200;
}

.select-arrow.rotated {
  @apply rotate-180;
}

.select-dropdown {
  @apply absolute top-full left-0 right-0 z-10 mt-1;
}

.dropdown-content {
  @apply bg-white border border-gray-300 rounded-b-lg shadow-lg max-h-48 overflow-y-auto;
}

.dropdown-item {
  @apply px-4 py-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors duration-150;
}

.dropdown-item.selected {
  @apply bg-lime-50 text-lime-700;
}

.dropdown-item:first-child {
  @apply rounded-t-lg;
}

.dropdown-item:last-child {
  @apply rounded-b-lg;
}
</style> 