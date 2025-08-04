<template>
  <div>
    <Header />
    <div class="pt-[108px]">
      <slot />
    </div>
    <Transition name="bg-fade">
      <div
        v-if="activeModal"
        class="bg-black/50 fixed inset-0 z-20 bg-overlay"
        @click="closeAllModals"
        @keydown.esc="closeAllModals"
        :class="{
          'z-50': activeModal === 'callback',
        }"
      ></div>
    </Transition>
    <CallbackModal v-if="activeModal === 'callback'" />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/shared/Header.vue";
import Footer from "~/components/shared/Footer.vue";
import { useModalStoreRefs, useModalStore } from "@/store/useModalStore";
import CallbackModal from "@/components/modals/CallbackModal.vue";

const { bg, modals } = useModalStoreRefs();
const { closeAllModals } = useModalStore();
const activeModal = computed(() => {
  return (
    Object.entries(modals.value).find(([_, isActive]) => isActive)?.[0] ||
    (bg.value ? "bg" : null)
  );
});
</script>

<style scoped>
/* Анимация для bg элемента */
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.bg-fade-enter-from {
  opacity: 0;
}

.bg-fade-enter-to {
  opacity: 1;
}

.bg-fade-leave-from {
  opacity: 1;
}

.bg-fade-leave-to {
  opacity: 0;
}
</style>
