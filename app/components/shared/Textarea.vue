<template>
  <div class="textarea-wrapper">
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      resize="none"
      class="textarea-field w-full h-full p-4 text-lightGreyBlue text-body-4 rounded-lg"
      :class="{
        'textarea-field--error': error,
        'textarea-field--disabled': disabled,
      }"
    />
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  error?: string;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Комментарий",
  rows: 4,
  disabled: false,
  error: "",
});

defineEmits<Emits>();
</script>

<style scoped></style>
