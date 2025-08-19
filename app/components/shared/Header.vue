<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <div
      class="container flex items-center justify-between header-shadow lg:rounded-b-[20px] rounded-b-[10px] lg:gap-6 gap-4 bg-white"
    >
      <div class="logo flex-grow">
        <NuxtLink to="/" class="flex items-center justify-start p-2 max-w-[154px]">
          <NuxtImg src="images/logo.svg" alt="logo" class="w-full h-full" />
        </NuxtLink>
      </div>
      <Navigation class="max-lg:hidden" />
      <SearchButton @click="openModal('fly')" />
      <Btn
        name="Заказать звонок"
        theme="dark"
        @click="openModal('callback')"
        class="max-lg:hidden"
      />
      <ClientOnly>
        <div class="flex items-center justify-center" @click="openModal('burger')">
          <IconBurger v-if="isMobile" />
        </div>
      </ClientOnly>
    </div>
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform lg:-translate-y-4"
      enter-to-class="opacity-100 transform lg:translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform lg:translate-y-0"
      leave-to-class="opacity-0 transform lg:-translate-y-4"
    >
      <FlySearch v-if="modals.fly" />
    </Transition>
  </header>
</template>

<script setup lang="ts">
import Navigation from "@/components/shared/Navigation.vue";
import SearchButton from "@/components/buttons/SearchButton.vue";
import Btn from "@/components/buttons/Btn.vue";
import FlySearch from "@/components/shared/FlySearch.vue";
import { useModalStore, useModalStoreRefs } from "@/store/useModalStore";
import { useMediaQuery } from "@vueuse/core";
import IconBurger from "@/components/icons/icon-burger.vue";
const { modals } = useModalStoreRefs();
const { openModal } = useModalStore();

const isMobile = useMediaQuery("(max-width: 1024px)");
</script>

<style scoped>
.header-shadow {
  box-shadow: 1px 3px 15px 0px rgba(108, 118, 132, 0.07),
    2px 2px 20px 0px rgba(108, 118, 132, 0.05);
}
</style>
