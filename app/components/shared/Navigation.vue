<template>
  <ul class="flex items-center gap-8">
    <li
      v-for="item in navigation"
      :key="item.label"
      class="group min-h-[88px] flex items-center"
      :class="{ relative: item.to === '/about' }"
      @mouseenter="handleMouseEnter(item)"
      @mouseleave="handleMouseLeave"
    >
      <NuxtLink
        :to="item.to"
        class="flex items-center gap-2 py-3 text-lightGreyBlue text-body-4 font-medium"
      >
        <p>{{ item.label }}</p>
        <IconChevron
          v-if="item.submenu"
          class="group-hover:rotate-180 transition-all duration-300"
        />
      </NuxtLink>
      <Submenu
        v-if="item.submenu && item.to === '/shop'"
        class="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
      />
      <DefaultSubmenu
        v-if="item.submenu && item.to === '/about'"
        class="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { navigation } from "@/data/Navigation";
import IconChevron from "@/components/icons/icon-chevron.vue";
import Submenu from "./Submenu.vue";
import DefaultSubmenu from "./DefaultSubmenu.vue";
import { useModalStore } from "@/store/useModalStore";

const { toggleBg } = useModalStore();

const isSubmenuOpen = ref(false);

const handleMouseEnter = (item: any) => {
  // Добавляем класс только если у элемента есть подменю
  if (item.submenu) {
    isSubmenuOpen.value = true;
  }
};

const handleMouseLeave = () => {
  isSubmenuOpen.value = false;
};

// Управление классом body
watchEffect(() => {
  if (process.client) {
    if (isSubmenuOpen.value) {
      document.body.classList.add("submenu-open");
      toggleBg(true);
    } else {
      document.body.classList.remove("submenu-open");
      toggleBg(false);
    }
  }
});

// Очистка при размонтировании компонента
onUnmounted(() => {
  if (process.client) {
    document.body.classList.remove("submenu-open");
    toggleBg(false);
  }
});
</script>

<style scoped></style>
