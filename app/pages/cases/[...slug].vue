<template>
  <div class="max-lg:grid max-lg:grid-cols-1">
    <HeadBlocks
      desktop-image="/images/head/head-suv-desktop.jpg"
      mobile-image="/images/head/head-suv-mobile.jpg"
      :is-dark="isMobile ? false : true"
      :overlay="isMobile ? true : false"
      :content="content"
      class="max-lg:order-1"
    />
    <GlobalForm
      title="Подробнее"
      description="Надежная и проверенная команда амбициозных профессионалов с мощным технологических и интеллектуальным потенциалом. Мы успешно работаем на рынке Урала и Сибири с 2018 года."
      buttonText="Читать далее"
      :isColor="false"
      class="lg:mb-[43px] lg:mt-[33px] -mt-10 mb-3 max-lg:order-2"
    />
    <div class="container lg:mb-20 mb-12 max-lg:order-3">
      <WorksGrid :slider="isMobile ? true : false" />
    </div>
    <WhatsSliders :items="cases" class="max-lg:order-5 max-lg:mt-3">
      <template #card="{ item }">
        <WhatsCard :item="item" />
      </template>
    </WhatsSliders>
    <GlobalForm
      title="Поможем подобрать оптимальные решения для вашего бизнеса"
      description="Наш менеджер свяжется с вами и подскажет, какие продукты помогут решить ваши задачи"
      buttonText="Отправить запрос"
      :isColor="true"
      class="max-lg:order-4"
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
import { useMediaQuery } from "@vueuse/core";

const content = {
  subtitle: "Кейсы",
  title: "Точка Банк",
  description: "Банк для предпринимателей",
};

const isMobile = useMediaQuery("(max-width: 768px)");
</script>

<style scoped></style>
