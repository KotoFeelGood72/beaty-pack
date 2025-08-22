<template>
  <div class="">
    <label v-if="label" class="block font-manrope font-semibold mb-3">
      {{ label }}
    </label>
    
    <div class="relative">
      <div 
        class=" bg-white border border-grey rounded-lg p-4 max-h-[54px] flex items-center justify-between transition-all duration-200 cursor-pointer min-h-12 gap-2"
        :class="{ 'border-brown': isOpen || isActive }"
        @click="toggleDropdown"
        @blur="handleBlur"
      >
        <span class="text-lightGreyBlue font-manrope" :class="{ 'text-gray-400': !modelValue }">
          {{ displayValue || placeholder }}
        </span>
        <div class="text-lightGreyBlue transition-transform duration-200 flex items-center justify-center" :class="{ 'rotate-180': isOpen }">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div 
        v-if="isOpen" 
        class="absolute top-full left-0 right-0 z-10 mt-1"
        @click.stop
      >
        <div class="bg-white border border-grey rounded-b-lg shadow-lg max-h-48 overflow-y-auto">
          <div 
            v-for="option in options" 
            :key="option.value"
            class="py-3 px-4 text-sm text-gray-700 cursor-pointer transition-colors hover:bg-gray-50"
            :class="{ ' bg-brown text-white pointer-events-none': modelValue === option.value }"
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
