<template>
  <div class="">
    <div class="container flex gap-10 mb-100">
      <ProductSlider :images="productViewImages" />
      <ProductInfo :info="info" :prices="prices" :sizes="sizes" :tirages="tirages" />
    </div>
    <div class="container mb-10">
      <div class="flex justify-between items-center gap-12">
        <div v-for="value in services" :key="value" class="flex items-center gap-4 text-headline-5 font-onest ">
          <IconsFillCheck />
          <p>{{ value }}</p>
        </div>
      </div>
    </div>
    <BlockCalc :calculatorId="1" />
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
    <SeoBlock />
  </div>
</template>

<script setup lang="ts">
import GlobalForm from "~/components/shared/GlobalForm.vue";
import SeoBlock from "~/components/shared/SeoBlock.vue";
import PageHead from "~/components/shared/PageHead.vue";
import IconsFillCheck from "~/components/icons/icons-fill-check.vue";
import WhatsSliders from "~/components/blocks/WhatsSliders.vue";
import { cases } from "~/data/Cases";
import WhatsCard from "~/components/cards/WhatsCard.vue";
import Btn from "~/components/buttons/Btn.vue";
import ProductSlider from "~/components/shared/ProductSlider.vue";
import ProductInfo from "~/components/shared/ProductInfo.vue";
import BlockCalc from "~/components/blocks/BlockCalc.vue";

const services = [
  "Бесплатный макет",
  "100% гарантия качества",
  "Бесплатная доставка от 30 000 руб.",
  "Работаем по ЭДО",
];

const productViewImages = [
  {
    src: "/images/product-view-1.png",
    alt: "Product View 1",
  },
  {
    src: "/images/product-view-2.png",
    alt: "Product View 1",
  },
  {
    src: "/images/product-view-2.png",
    alt: "Product View 1",
  },
  {
    src: "/images/product-view-2.png",
    alt: "Product View 1",
  },
];

// Данные для ProductInfo
const info = {
  short: [
    { label: "Материал", value: "Пластик" },
    { label: "Размер", value: "10x15 см" },
  ]
};

const tirages = ['от 100 шт.', 'от 1000 шт.', 'от 2000 шт.']

const sizes = ['90 руб.', '40 руб.', '28 руб.']

const prices = ['9 000 руб.', '40 000 руб.', '56 000 руб.']

</script>

<style scoped></style>
