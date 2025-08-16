<template>
  <div>
    <HeroBlocks />
    <CircleSlider class="lg:mb-20 mb-16" />
    <Transition name="modal">
      <StorieslSliderModal v-if="isOpen" />
    </Transition>
    <CatsBlock class="lg:mb-100 mb-60" title="Популярные продукты" />
    <GlobalForm
      title="Поможем подобрать оптимальные решения для вашего бизнеса"
      description="Наш менеджер свяжется с вами и подскажет, какие продукты помогут решить ваши задачи"
      buttonText="Отправить запрос"
      :isColor="true"
    />
    <WhatsSliders :items="cases" class="bg-lightGrey">
      <template #card="{ item }">
        <WhatsCard :item="item" />
      </template>
    </WhatsSliders>
    <CountriesBlock />
    <div class="bg-lightGrey lg:pt-100 py-16">
      <HappyBlock />
    </div>
    <WhatsSliders :items="posts" title="Блог" class="blog">
      <template #card="{ item }">
        <ArticleCard :post="item" />
      </template>
    </WhatsSliders>
  </div>
</template>

<script setup lang="ts">
import HeroBlocks from "@/components/blocks/HeroBlocks.vue";
import CircleSlider from "~/components/blocks/CircleSlider.vue";
import StorieslSliderModal from "~/components/modals/StorieslSliderModal.vue";
import CatsBlock from "~/components/blocks/CatsBlock.vue";
import GlobalForm from "~/components/shared/GlobalForm.vue";
import CountriesBlock from "~/components/blocks/CountriesBlock.vue";
import { useStoriesStore, useStoriesStoreRefs } from "~/store/useStoriesStore";
import WhatsSliders from "~/components/blocks/WhatsSliders.vue";
import HappyBlock from "~/components/blocks/HappyBlock.vue";
import WhatsCard from "~/components/cards/WhatsCard.vue";
import { cases } from "~/data/Cases";
import { posts } from "~/data/Posts";
import ArticleCard from "~/components/cards/ArticleCard.vue";

const { currentStory } = useStoriesStoreRefs();

const isOpen = computed(() => currentStory.value?.active);
</script>

<style scoped>
/* Анимация появления/исчезновения модального окна */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

.modal-enter-to .bg-white,
.modal-leave-from .bg-white {
  transform: scale(1) translateY(0);
  opacity: 1;
}
</style>
