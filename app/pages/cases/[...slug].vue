<template>
  <div>
    <HeadBlocks
      :background-image="backgroundImage"
      :background-alt="backgroundAlt"
      :is-dark="isDark"
      :content="content"
    />
    <GlobalForm
      title="Подробнее"
      description="Надежная и проверенная команда амбициозных профессионалов с мощным технологических и интеллектуальным потенциалом. Мы успешно работаем на рынке Урала и Сибири с 2018 года."
      buttonText="Читать далее"
      :isColor="false"
    />
    <div class="container">
      <WorksGrid />
    </div>
    <WhatsSliders />
  </div>
</template>

<script setup lang="ts">
import HeadBlocks from "@/components/blocks/HeadBlocks.vue";
import GlobalForm from "~/components/shared/GlobalForm.vue";
import WorksGrid from "~/components/blocks/WorksGrid.vue";
import WhatsSliders from "~/components/blocks/WhatsSliders.vue";

const backgroundImage = "/images/head/head-suv-desktop.jpg";
const backgroundAlt = "Background image";
const isDark = false;
const content = {
  subtitle: "Кейсы",
  title: "Точка Банк",
  description: "Банк для предпринимателей",
};
</script>

<style scoped></style>
