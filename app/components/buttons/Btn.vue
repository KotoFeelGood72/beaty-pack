<template>
  <div
    class="py-4 px-[28px] rounded-xl cursor-pointer transition-all duration-200 hover:opacity-90 text-center"
    :class="themeClasses"
  >
    {{ name }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  theme?: "primary" | "secondary" | "light" | "dark" | "brown";
}>();

const themeClasses = computed(() => {
  switch (props.theme) {
    case "primary":
      return "bg-black text-white text-body-1";
    case "secondary":
      return "bg-white text-gray-800 border border-gray-300";
    case "light":
      return "bg-gray-100 text-gray-800";
    case "dark":
      return "bg-gray-900 text-white";
    case "brown":
      return "bg-brown text-white";
    default:
      return "bg-brown text-white";
  }
});
</script>

<style scoped></style>
