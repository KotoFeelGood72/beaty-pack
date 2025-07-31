<template>
  <div>
    <PageHead
      :breadcrumbs="[{ label: 'Главная', to: '/' }, { label: 'Праздники' }]"
      title="Сувенирная продукция к празднику"
    />
    <HappyBlock />
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
import PageHead from "~/components/shared/PageHead.vue";
import HappyBlock from "~/components/blocks/HappyBlock.vue";
import WhatsSliders from "~/components/blocks/WhatsSliders.vue";
import GlobalForm from "~/components/shared/GlobalForm.vue";
import SeoBlock from "~/components/shared/SeoBlock.vue";
import { cases } from "~/data/Cases";
import WhatsCard from "~/components/cards/WhatsCard.vue";
</script>

<style scoped></style>
