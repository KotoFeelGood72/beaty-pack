<template>
  <div>
    <PageHead
      :breadcrumbs="[{ label: 'Главная', to: '/' }, { label: 'Каталог' }]"
      title="Каталог"
    />
    <CatsBlock />
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
import CatsBlock from "~/components/blocks/CatsBlock.vue";
</script>

<style scoped></style>
