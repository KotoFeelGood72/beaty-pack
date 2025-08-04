<template>
  <footer class="footer bg-black text-white pt-[100px] pb-6">
    <div class="container">
      <div
        class="footer-top grid grid-cols-4 gap-20 pb-[60px] border-b border-darkGrey mb-6"
      >
        <div>
          <NuxtLink to="/" class="mb-10 block">
            <NuxtImg src="/images/footer-logo.png" alt="logo" />
          </NuxtLink>
          <div class="space-y-6">
            <FooterHeadCol title="Покупателям" icon="square" />
            <ul class="space-y-4">
              <li><NuxtLink to="/">Требования к файлам</NuxtLink></li>
              <li><NuxtLink to="/">Шаблоны макетов</NuxtLink></li>
              <li><NuxtLink to="/">Минимальная сумма заказа</NuxtLink></li>
            </ul>
          </div>
        </div>
        <div class="space-y-6">
          <FooterHeadCol title="Каталог" icon="burger" />
          <ul class="space-y-4">
            <li><NuxtLink to="/">Настольные игры</NuxtLink></li>
            <li><NuxtLink to="/">Полиграфия</NuxtLink></li>
            <li><NuxtLink to="/">Упаковка</NuxtLink></li>
            <li><NuxtLink to="/">Чай, шоколад, конфеты</NuxtLink></li>
            <li><NuxtLink to="/">Сувенирная продукция</NuxtLink></li>
            <li><NuxtLink to="/">Продукция к празднику</NuxtLink></li>
          </ul>
        </div>
        <div class="space-y-6">
          <FooterHeadCol title="О компании" icon="home" />
          <ul class="space-y-4">
            <li><NuxtLink to="/">О нас</NuxtLink></li>
            <li><NuxtLink to="/">Кейсы</NuxtLink></li>
            <li><NuxtLink to="/">Портфолио</NuxtLink></li>
            <li><NuxtLink to="/">Отзывы</NuxtLink></li>
            <li><NuxtLink to="/">Реквизиты</NuxtLink></li>
            <li><NuxtLink to="/">Блог</NuxtLink></li>
            <li><NuxtLink to="/">Контакты</NuxtLink></li>
          </ul>
        </div>
        <div class="space-y-6">
          <FooterHeadCol title="Контакты" icon="contacts" />
          <div class="space-y-4">
            <a href="tel:+73432891480" class="block">+7 (343) 289-14-80</a>
            <a href="mailto:info@b-pack.ru" class="block">info@b-pack.ru</a>
            <p class="text-body-4">
              ООО «Бьюти Пак» ИНН: 6671407684, ОГРН: 1126671020893
            </p>
            <p class="text-body-4">
              ООО «Бьюти Гифтс» ИНН: 6671407684, ОГРН: 1126671020893
            </p>
            <p class="text-body-4">
              620066, Свердловская обл., г. Екатеринбург, ул. Народной воли, д. 65, оф.
              804
            </p>
            <SocialsList class="pt-2" />
          </div>
        </div>
      </div>
      <div class="footer-bottom flex items-center justify-between text-body-4 text-grey">
        <p class="opacity-70">© Все права защищены</p>
        <NuxtLink to="/">Политика конфиденциальности</NuxtLink>
        <NuxtLink to="/">Согласие на обработку данных</NuxtLink>
        <a href="/" target="_blank" class="opacity-70"
          >Сайт разработан в Студии Стрижакова</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import FooterHeadCol from "./FooterHeadCol.vue";
import SocialsList from "./SocialsList.vue";
</script>

<style scoped></style>
