<template>
  <div class="">
    <label v-if="label" class="block font-manrope lg:font-semibold mb-3">
      {{ label }}
    </label>

    <div class="flex gap-3">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="flex-1 bg-white border border-gray-300 rounded-lg lg:p-4 p-3 lg:text-base text-body-4 font-medium transition-all duration-200 cursor-pointer lg:max-h-[54px] max-h-[41px] focus:outline-none focus:ring-2 focus:green font-manrope max-lg:flex max-lg:items-center max-lg:justify-center"
        :class="[
          modelValue === option.value
            ? 'border-green text-darkGreyBlue'
            : 'text-lightGreyBlue',
        ]"
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
  "update:modelValue": [value: string | number];
}>();

const selectOption = (value: string | number) => {
  emit("update:modelValue", value);
};
</script>
