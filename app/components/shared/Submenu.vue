<template>
  <div class="container absolute w-full left-1/2 -translate-x-1/2 top-full">
    <div class="mt-5 bg-white rounded-2xl shadow-card">
      <div class="flex gap-9 p-8 justify-between">
        <div class="flex flex-col gap-10">
          <CardMenu
            title="Настольные игры"
            :list="[{ label: 'Игральные карты', to: '/shop/tabletop-games' }]"
          />
          <CardMenu
            title="Упаковка"
            :list="[
              { label: 'Конверты', to: '/shop/tabletop-games', tag: 'sale' },
              { label: 'Коробки', to: '/shop/tabletop-games' },
              { label: 'Пакеты', to: '/shop/tabletop-games' },
              { label: 'Тубусы', to: '/shop/tabletop-games' },
            ]"
          />
        </div>
        <div>
          <CardMenu
            title="Полиграфия"
            :list="[
              { label: 'Визитки', to: '/shop/tabletop-games' },
              { label: 'Календари', to: '/shop/calendar' },
              { label: 'POS-материалы', to: '/shop/pos-materials' },
              { label: 'Папки-фолдеры', to: '/shop/folders' },
              { label: 'Листовки', to: '/shop/leaflets' },
              { label: 'Флаеры', to: '/shop/flyers' },
              { label: 'Буклеты', to: '/shop/booklets' },
              { label: 'Блокноты', to: '/shop/notebooks' },
              { label: 'Тетради', to: '/shop/tabletop-games', tag: 'sale' },
              { label: 'Куб-блоки', to: '/shop/cube-blocks' },
            ]"
          />
        </div>
        <div>
          <CardMenu
            title="Чай, шоколад, конфеты"
            :list="[
              { label: 'Комплименты', to: '/shop/compliments', tag: 'new' },
              { label: 'Конфеты в коробках с логотипом', to: '/shop/chocolate-boxes' },
              { label: 'Наборы шоколада', to: '/shop/chocolate-sets' },
              { label: 'Шоколад и конфеты россыпью', to: '/shop/chocolate-and-candy' },
              { label: 'Чай и кофе', to: '/shop/tea-and-coffee' },
            ]"
          />
        </div>
        <div>
          <CardMenu
            title="Сувенирная продукция"
            :list="[
              { label: 'Виниловые магниты', to: '/shop/vinyl-magnets' },
              { label: 'Носки с логотипом', to: '/shop/socks' },
              { label: 'Магнит с куб-блоком', to: '/shop/cube-block-magnet' },
              { label: 'Адвенты', to: '/shop/advents', tag: 'new' },
              { label: 'Браслеты', to: '/shop/bracelets' },
            ]"
          />
        </div>
        <div class="flex flex-col gap-10">
          <CardMenu
            title="Широкоформатная печать"
            :list="[
              { label: 'Роллапы', to: '/shop/rollups', tag: 'sale' },
              { label: 'Информационные стенды', to: '/shop/information-stands' },
            ]"
          />
          <CardMenu
            title="Интерьерная печать"
            :list="[
              { label: 'Баннеры', to: '/shop/banners' },
              { label: 'Таблички', to: '/shop/tablets', tag: 'sale' },
            ]"
          />
        </div>
        <div>
          <CardMenu
            title="Сувениры и подарки на праздники"
            :list="[
              { label: 'День строителя', to: '/shop/builder-day' },
              { label: '1 мая', to: '/shop/may-1' },
              { label: '9 мая', to: '/shop/may-9' },
              { label: '12 июня', to: '/shop/june-12' },
              { label: 'Новый год', to: '/shop/new-year', tag: 'new' },
              { label: '8 марта', to: '/shop/march-8', tag: 'new' },
              { label: '23 февраля', to: '/shop/february-23', tag: 'new' },
              { label: 'День нефтяника', to: '/shop/oil-day' },
              { label: 'День железнодорожника', to: '/shop/railway-day' },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardMenu from "../cards/CardMenu.vue";
</script>

<style scoped></style>
