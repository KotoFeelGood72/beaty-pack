<template>
  <div class="flex items-center relative">
    <div class="flex items-center flex-1">
      <input
        :type="type"
        :id="id"
        :name="name"
        :value="value"
        :checked="isChecked"
        @change="handleChange"
        class="absolute opacity-0 cursor-pointer"
      />
      <label
        :for="id"
        class="flex items-center gap-2 cursor-pointer text-lightGreyBlue text-body-4"
      >
        <span>
          <component :is="isChecked ? iconChecked : iconCircle" />
        </span>
        <span class="font-normal leading-relaxed">{{ label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import iconCircle from "../icons/icon-circle.vue";
import iconChecked from "../icons/icon-checked.vue";
interface Props {
  id?: string;
  name?: string;
  value?: string;
  label?: string;
  modelValue?: boolean | string;
  type?: "radio";
}

interface Emits {
  (e: "update:modelValue", value: boolean | string): void;
}

const props = withDefaults(defineProps<Props>(), {
  id: "input",
  name: "input-group",
  value: "",
  label: "Позвонить",
  modelValue: false,
  type: "radio",
});

const emit = defineEmits<Emits>();

const isChecked = computed(() => {
  if (props.type === "radio") {
    return props.modelValue === props.value;
  }
  return props.modelValue as boolean;
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (props.type === "radio") {
    emit("update:modelValue", props.value);
  } else {
    emit("update:modelValue", target.checked);
  }
};
</script>

<style scoped></style>
