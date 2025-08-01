<template>
  <div
    class="flex flex-col items-center cursor-pointer"
    :class="{ selected: item.active }"
    @click="handleClick"
  >
    <div class="flex flex-col gap-4">
      <div class="w-[140px] h-[140px] rounded-full relative">
        <div class="absolute inset-0 w-full h-full flex items-center justify-center">
          <svg
            class="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox="0 0 140 140"
          >
            <!-- Фоновый круг -->
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="#e5e7eb"
              stroke-width="1"
            />
            <!-- Прогресс круг -->
            <circle
              cx="70"
              cy="70"
              r="62.5"
              fill="none"
              stroke="#22c55e"
              stroke-width="4"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="strokeDashoffset"
              class="transition-all duration-100 ease-linear"
            />
          </svg>

          <NuxtImg
            v-if="item.thumbnail"
            :src="item.thumbnail"
            :alt="item.title"
            class=""
          />
          <img src="/images/plus.svg" alt="" v-else-if="item.title === 'Свое лого'" />
        </div>
      </div>
      <div class="text-body-1 font-manrope text-center">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStoriesStoreRefs } from "~/store/useStoriesStore";

const { currentStory } = useStoriesStoreRefs();

const props = defineProps<{
  item?: any;
}>();

const emit = defineEmits<{
  click: [storyId?: string];
}>();

const handleClick = () => {
  emit("click", props?.item?.id);
};

// Константы для SVG (для зеленого круга прогресса)
const radius = 62.5;
const circumference = 2 * Math.PI * radius;

// Вычисляем stroke-dashoffset для прогресса
const strokeDashoffset = computed(() => {
  // Проверяем, что это активный слайд по ID
  if (!currentStory.value) {
    return circumference; // Без обводки
  }

  // Если это активный слайд - показываем уменьшающийся прогресс
  if (currentStory.value.id === props.item.id) {
    const progressValue = Math.max(0, Math.min(100, currentStory.value.progress || 0));
    // Инвертируем логику: начинаем с 0 (полная обводка) и увеличиваем до circumference (пустая обводка)
    return (progressValue / 100) * circumference;
  }

  // Для всех остальных слайдов - без обводки
  return circumference;
});
</script>
