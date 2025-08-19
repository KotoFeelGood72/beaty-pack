<template>
  <div
    class="burger-modal fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bottom-0 z-50 bg-white w-full h-full"
  >
    <div class="flex items-center justify-between gap-4 mb-5">
      <NuxtLink to="/" class="flex items-center justify-start p-2 max-w-[154px] w-full">
        <NuxtImg src="images/logo.svg" alt="logo" class="w-full h-full" />
      </NuxtLink>
      <iconClose
        class="flex items-center justify-center mt-2 mr-2 text-brown"
        @click="closeModal('burger')"
      />
    </div>
    <ul class="mb-5">
      <li v-for="link in links" :key="link.label" class="px-5 border-b border-[#D5D5D5]">
        <NuxtLink
          :to="link.to"
          class="flex items-center justify-between py-2 text-body-1 font-manrope"
        >
          <p>{{ link.label }}</p>
          <iconChevron class="-rotate-90 w-4 h-4 flex items-center justify-center" />
        </NuxtLink>
      </li>
    </ul>
    <ul class="px-5 flex flex-col gap-3 mb-4">
      <li>
        <a href="#" class="flex items-center gap-2 font-manrope">
          <iconEmail />
          <p>info@game-studio.ru</p>
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center gap-2 font-manrope">
          <iconTel />
          <p>+7 (999) 999-99-99</p>
        </a>
      </li>
    </ul>
    <ul class="px-5 flex items-center justify-start gap-3">
      <li>
        <a
          href="#"
          class="flex items-center gap-2 border border-[#333537] rounded-full font-manrope py-2 px-3"
        >
          <p>Whatsapp</p>
          <img src="/images/mobile-wa.png" alt="whatsapp" />
        </a>
      </li>
      <li>
        <a
          href="#"
          class="flex items-center gap-2 border border-[#333537] rounded-full font-manrope py-2 px-3"
        >
          <p>Telegram</p>
          <img src="/images/mobile-tg.png" alt="whatsapp" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/store/useModalStore";

import iconChevron from "../icons/icon-chevron.vue";
import iconClose from "../icons/icon-close.vue";
import iconEmail from "../icons/icon-email.vue";
import iconTel from "../icons/icon-tel.vue";

const { closeModal } = useModalStore();

const links = [
  { label: "Каталог", to: "/" },
  { label: "О компании", to: "/" },
  { label: "Кейсы", to: "/" },
  { label: "Портфолио", to: "/" },
  { label: "Блог", to: "/" },
  { label: "Контакты", to: "/" },
];
</script>

<style scoped></style>
