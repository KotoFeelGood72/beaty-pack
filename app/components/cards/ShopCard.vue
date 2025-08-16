<template>
  <div class="shop-card " >
    <div class="shop-card-image flex items-center justify-center relative mb-4">
      <div class="shop__chip absolute top-2 left-2 lg:p-3 py-1 px-2 lg:rounded-lg rounded-md max-lg:text-body-5" :class="[chipTheme]">
        {{ item.chip }}
      </div>
      <img 
        :src="imageSrc" 
        :alt="item.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div class="shop-card-content">
      <div class="shop-card-content-title">
        <h3 class="lg:text-headline-4 font-medium text-body-1">{{ item.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const props = defineProps<{
  item: any;
}>();

const chipTheme = computed(() => {
  switch (props.item.chip) {
    case "Топ-продаж":
      return "bg-[#9F6ED7] text-white text-[12px]";
    case "Sale":
      return "bg-[#FD9E2D] text-white text-[12px]";
  }
});

// Используем useMediaQuery для определения мобильного устройства
const isMobile = useMediaQuery("(max-width: 768px)");

// Добавляем состояние для отслеживания гидратации
const isHydrated = ref(false);

onMounted(() => {
  isHydrated.value = true;
});

const imageSrc = computed(() => {
  // Проверяем, что item.image существует и имеет нужные свойства
  if (!props.item.image) {
    return '';
  }
  
  // На сервере всегда возвращаем desktop изображение
  if (!process.client) {
    return props.item.image.desktop || props.item.image.mobile || '';
  }
  
  // На клиенте ждем завершения гидратации перед использованием useMediaQuery
  if (!isHydrated.value) {
    return props.item.image.desktop || props.item.image.mobile || '';
  }
  
  // После гидратации используем useMediaQuery
  if (isMobile.value && props.item.image.mobile) {
    return props.item.image.mobile;
  }
  
  // По умолчанию возвращаем desktop изображение
  return props.item.image.desktop || props.item.image.mobile || '';
});
</script>

<style scoped></style>
