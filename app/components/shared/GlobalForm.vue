<template>
  <div class="bg-brown-800 rounded-lg p-8 flex justify-between items-center">
    <!-- Левая часть с основным текстом -->
    <div class="text-white">
      <h2 class="text-3xl font-bold mb-2">
        Поможем подобрать оптимальные решения для вашего бизнеса
      </h2>
    </div>

    <!-- Правая часть с описанием и кнопкой -->
    <div class="text-gray-300 max-w-md">
      <p class="mb-4 text-sm">
        Наш менеджер свяжется с вами и подскажет, какие продукты помогут решить ваши
        задачи
      </p>
      <Btn name="Отправить запрос" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Btn from "~/components/buttons/Btn.vue";
</script>

<style scoped>
.bg-brown-800 {
  background-color: #92400e;
}
</style>
