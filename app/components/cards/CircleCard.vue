<template>
  <div
    class="flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out p-2 rounded-xl hover:-translate-y-0.5"
    :class="{ selected: isSelected }"
    @click="handleClick"
  >
    <div
      class="w-15 h-15 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-2 transition-all duration-300 ease-in-out overflow-hidden"
      :class="{ 'border-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.2)]': isSelected }"
    >
      <img v-if="image" :src="image" :alt="title" class="w-8 h-8 object-contain" />
      <div v-else class="w-full h-full flex items-center justify-center">
        <slot name="icon">
          <div class="text-2xl font-bold text-green-500">+</div>
        </slot>
      </div>
    </div>
    <div
      class="text-xs font-medium text-center text-gray-700 leading-tight max-w-20 break-words"
    >
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description?: string;
  image?: string;
  storyId?: string;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  click: [storyId?: string];
}>();

const handleClick = () => {
  emit("click", props.storyId);
};
</script>
