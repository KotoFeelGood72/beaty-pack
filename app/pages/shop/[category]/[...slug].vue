<template>
  <div class="">
    <div
      class="container flex gap-10 mb-100 flex-col lg:flex-row max-lg:px-0 overflow-x-hidden"
    >
      <ProductSlider :images="responsiveProductImages" />
      <ProductInfo :info="info" :prices="prices" :sizes="sizes" :tirages="tirages" />
    </div>
    <div class="container mb-10 overflow-auto">
      <div
        class="flex justify-between items-center gap-12 overflow-x-auto hide-scrollbar"
      >
        <div
          v-for="value in services"
          :key="value"
          class="flex items-center gap-4 text-headline-5 font-onest max-lg:whitespace-nowrap"
        >
          <IconsFillCheck />
          <p v-html="value"></p>
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
    <Transition name="fade">
      <ModalOrder v-if="isActiveModal" />
    </Transition>
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
import { useResponsiveImage } from "~/utils/useResponsiveImage";
import ModalOrder from "~/components/modals/ModalOrder.vue";
import { useModalStoreRefs } from "@/store/useModalStore";

const services = [
  "Бесплатный<br>макет",
  "100% гарантия<br>качества",
  "Бесплатная доставка<br>от 30 000 руб.",
  "Работаем<br>по ЭДО",
];

// Используем утилиту для адаптивных изображений
const { getResponsiveImages } = useResponsiveImage();
const { modals } = useModalStoreRefs();

const isActiveModal = computed(() => modals.value.order);

// Массив изображений с адаптивными версиями
const productImages = [
  {
    mobile: "/images/product-view-1-mobile.png",
    desktop: "/images/product-view-1.png",
    alt: "Product View 1",
  },
  {
    mobile: "/images/product-view-2-mobile.png",
    desktop: "/images/product-view-2.png",
    alt: "Product View 2",
  },
  {
    mobile: "/images/product-view-3-mobile.png",
    desktop: "/images/product-view-2.png",
    alt: "Product View 3",
  },
  {
    mobile: "/images/product-view-4-mobile.png",
    desktop: "/images/product-view-2.png",
    alt: "Product View 4",
  },
];

// Получаем адаптивные изображения
const responsiveProductImages = computed(() => {
  return getResponsiveImages(productImages);
});

// Данные для ProductInfo
const info = {
  short: [
    { label: "Материал", value: "Пластик" },
    { label: "Размер", value: "10x15 см" },
  ],
};

const tirages = ["от 100 шт.", "от 1000 шт.", "от 2000 шт."];

const sizes = ["90 руб.", "40 руб.", "28 руб."];

const prices = ["9 000 руб.", "40 000 руб.", "56 000 руб."];
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>
