<template>
  <div class="calc-select">
    <label v-if="label" class="calc-select-label">
      {{ label }}
    </label>
    
    <div class="select-container">
      <div 
        class="select-input"
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
  width: 100%;
}

.calc-select-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.select-container {
  position: relative;
}

.select-input {
  width: 100%;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 48px;
}

.select-input.active {
  border-color: #84cc16;
}

.select-value {
  color: #374151;
  font-size: 0.875rem;
}

.select-value.placeholder {
  color: #9ca3af;
}

.select-arrow {
  color: #6b7280;
  transition: transform 0.2s ease;
}

.select-arrow.rotated {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  margin-top: 0.25rem;
}

.dropdown-content {
  background-color: white;
  border: 1px solid #d1d5db;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 12rem;
  overflow-y: auto;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dropdown-item:hover {
  background-color: #f9fafb;
}

.dropdown-item.selected {
  background-color: #f7fee7;
  color: #65a30d;
}

.dropdown-item:first-child {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.dropdown-item:last-child {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
</style> 