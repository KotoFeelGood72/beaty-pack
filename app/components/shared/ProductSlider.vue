<template>
  <div class="product-view">
    <div>
      <PageHead
        :breadcrumbs="[
          { label: 'Главная', to: '/' },
          {
            label: 'Каталог',
            children: [
              { label: 'Полиграфия', to: '/shop' },
              { label: 'Баннеры', to: '/shop/banners' },
              { label: 'Буклеты', to: '/shop/booklets' },
              { label: 'Визитки', to: '/shop/visitors' },
              { label: 'Буклеты', to: '/shop/booklets' },
              { label: 'Буклеты', to: '/shop/booklets' },
            ],
          },
          {
            label: 'Упаковка',
            children: [
              { label: 'Полиграфия', to: '/shop' },
              { label: 'Баннеры', to: '/shop/banners' },
              { label: 'Буклеты', to: '/shop/booklets' },
              { label: 'Визитки', to: '/shop/visitors' },
              { label: 'Буклеты', to: '/shop/booklets' },
              { label: 'Буклеты', to: '/shop/booklets' },
            ],
          },
          { label: 'Пакеты' },
          { label: '   Бумажный пакет Великан v2' },
        ]"
        title="   Бумажный пакет Великан v2"
      />
    </div>
    <div>
      <div></div>
      <div>
        <NuxtImg />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHead from "./PageHead.vue";
</script>

<style scoped></style>
