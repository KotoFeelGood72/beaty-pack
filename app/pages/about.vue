<template>
  <div>
    <HeadBlocks
      desktop-image="/images/head/about-head.jpg"
      mobile-image="/images/head/about-head.jpg"
      :is-dark="false"
      :content="content"
    />
    <div class="container">
      <div class="grid grid-cols-4 gap-5 py-5">
        <div
          v-for="(item, i) in list"
          :key="'about-item-' + i"
          class="p-5 flex flex-col gap-5 bg-lightGrey rounded-lg"
        >
          <p class="text-headline-4 font-semibold font-onest">{{ item.title }}</p>
          <p class="text-lightGreyBlue font-medium">{{ item.text }}</p>
        </div>
      </div>
    </div>
    <div class="container pt-20">
      <h2 class="text-headline-2 font-semibold">Регионы, в которых мы работаем</h2>
      <NuxtImg class="w-full -mt-8" src="/images/countries.png" alt="countries" />
    </div>
    <GlobalForm
      title="Подробнее о компании"
      description="Надежная и проверенная команда амбициозных профессионалов с мощным технологических и интеллектуальным потенциалом. Мы успешно работаем на рынке Урала и Сибири с 2018 года."
      buttonText="Читать далее"
      :isColor="false"
      class="mb-10"
    />
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
import HeadBlocks from "~/components/blocks/HeadBlocks.vue";
import GlobalForm from "~/components/shared/GlobalForm.vue";
import WhatsSliders from "~/components/blocks/WhatsSliders.vue";
import WhatsCard from "~/components/cards/WhatsCard.vue";
import { cases } from "~/data/Cases";

const content = {
  subtitle: "о компании",
  title: "Бьюти Пак",
  description: "Надежный производитель сувенирной продукции для бизнеса",
};

const list = [
  {
    title: "Работаем с 2018 года",
    text: "по Свердловской области и Уралу",
  },
  {
    title: "500+ заказов",
    text: "реализовано и смонтировано",
  },
  {
    title: "100% гарантия",
    text: "качества и сроков выполнения заказов",
  },
  {
    title: "Свое производство",
    text: "сувенирной продукции, упаковки и полиграфии",
  },
];
</script>

<style scoped></style>
