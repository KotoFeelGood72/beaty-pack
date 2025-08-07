<template>
  <div class="">
    <div class="container">
      <ProductSlider :images="productViewImages" />
      <ProductInfo />
    </div>
    <div class="container">
      <div>
        <div v-for="value in services" :key="value">
          <IconsFillCheck />
          <p>{{ value }}</p>
        </div>
      </div>
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
</script>

<style scoped></style>
