<template>
  <div>
    <HeroBlocks />
    <CircleSlider class="mb-20" />
    <Transition name="fade">
      <StorieslSliderModal v-if="isOpen" />
    </Transition>
    <CatsBlock class="mb-[100px]" title="Популярные продукты" />
    <GlobalForm
      title="Поможем подобрать оптимальные решения для вашего бизнеса"
      description="Наш менеджер свяжется с вами и подскажет, какие продукты помогут решить ваши задачи"
      buttonText="Отправить запрос"
      :isColor="true"
    />
    <WhatsSliders :items="cases">
      <template #card="{ item }">
        <WhatsCard :item="item" />
      </template>
    </WhatsSliders>
    <CountriesBlock />
    <div class="bg-lightGrey pt-[100px]">
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

<style scoped></style>
