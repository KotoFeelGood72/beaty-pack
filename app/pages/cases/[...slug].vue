<template>
  <div>
    <HeadBlocks
      desktop-image="/images/head/head-suv-desktop.jpg"
      mobile-image="/images/head/head-suv-mobile.jpg"
      :is-dark="true"
      :content="content"
    />
    <GlobalForm
      title="Подробнее"
      description="Надежная и проверенная команда амбициозных профессионалов с мощным технологических и интеллектуальным потенциалом. Мы успешно работаем на рынке Урала и Сибири с 2018 года."
      buttonText="Читать далее"
      :isColor="false"
      class="mb-[43px] mt-[33px]"
    />
    <div class="container mb-20">
      <WorksGrid />
    </div>
    <WhatsSliders :items="cases">
      <template #card="{ item }">
        <WhatsCard :item="item" />
      </template>
    </WhatsSliders>
    <GlobalForm
      title="Поможем подобрать оптимальные решения для вашего бизнеса"
      description="Наш менеджер свяжется с вами и подскажет, какие продукты помогут решить ваши задачи"
      buttonText="Отправить запрос"
      :isColor="true"
    />
  </div>
</template>

<script setup lang="ts">
import HeadBlocks from "@/components/blocks/HeadBlocks.vue";
import GlobalForm from "~/components/shared/GlobalForm.vue";
import WorksGrid from "~/components/blocks/WorksGrid.vue";
import WhatsSliders from "~/components/blocks/WhatsSliders.vue";
import { cases } from "~/data/Cases";
import WhatsCard from "~/components/cards/WhatsCard.vue";

const content = {
  subtitle: "Кейсы",
  title: "Точка Банк",
  description: "Банк для предпринимателей",
};
</script>

<style scoped></style>
