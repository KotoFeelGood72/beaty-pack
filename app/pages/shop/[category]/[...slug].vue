<template>
  <div class="">
    <div>
      <ProductSlider />
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
import WhatsSliders from "~/components/blocks/WhatsSliders.vue";
import { cases } from "~/data/Cases";
import WhatsCard from "~/components/cards/WhatsCard.vue";
import Btn from "~/components/buttons/Btn.vue";
import ProductSlider from "~/components/shared/ProductSlider.vue";
</script>

<style scoped></style>
