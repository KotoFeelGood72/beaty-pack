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
    <div class="">
      <div class="">
        <div class="">
          <NuxtImg
            v-if="images && images.length > 0 && images[0]"
            :src="images[0].src"
            :alt="images[0].alt"
            class=""
            loading="lazy"
          />
        </div>
      </div>

      <div class="">
        <div class="">
          <div v-for="(image, index) in images.slice(1)" :key="index" class="">
            <NuxtImg :src="image.src" :alt="image.alt" class="" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHead from "./PageHead.vue";

const props = defineProps<{
  images: { src: string; alt: string }[];
}>();
</script>

<style scoped></style>
