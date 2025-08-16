<template>
  <div class="container font-manrope ">
    <h2>SEO-текст</h2>
    <div :class="['line-clamp-4', {'line-clamp-none': isOpen}]">
      В целом, конечно, понимание сути ресурсосберегающих технологий предопределяет
      высокую востребованность распределения внутренних резервов и ресурсов. Банальные, но
      неопровержимые выводы, а также активно развивающиеся страны третьего мира освещают
      чрезвычайно интересные особенности картины в целом, однако конкретные выводы,
      разумеется, в равной степени предоставлены сами себе! Противоположная точка зрения
      подразумевает, что диаграммы связей рассмотрены исключительно в разрезе
      маркетинговых и финансовых предпосылок.
    </div>

    <Btn :name="isOpen ? 'Скрыть' : 'Читать далее'" class="lg:hidden flex max-w-[172px] max-lg:justify-center " @click="isOpen = !isOpen" />
  </div>
</template>

<script setup lang="ts">
import Btn from '../buttons/Btn.vue';

const isOpen = ref(false);
</script>

<style scoped>
:deep(h2) {
  font-size: 32px;
  font-weight: 700;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 17px;
  padding: 11px 16px 50px 16px;
}

@media (max-width: 764px) {
  
  .container {
    
    padding: 64px 20px 51px 20px;
  }
}
</style>
