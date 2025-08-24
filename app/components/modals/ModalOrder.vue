<template>
  <div
    class="callback fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center bottom-0 z-50"
  >
    <div class="bg-lightGrey rounded-2xl p-8 max-w-[464px] relative">
      <h3 class="text-headline-4 font-medium mb-6">
        Оставьте свой телефон и мы проконсультируем вас
      </h3>
      <div
        class="absolute top-4 right-4 flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-white"
        @click="closeAllModals"
      >
        <iconClose />
      </div>
      <div class="flex flex-col gap-6 mb-5">
        <div class="flex items-center gap-6">
          <img
            src="/images/order.jpg"
            alt="modal-order"
            class="w-20 h-20 flex items-center justify-center rounded-lg"
          />
          <p class="text-body-1 font-manrope max-w-[160px]">Бумажный пакет Великан v2</p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-headline-4 font-semibold">20 000 руб.</p>
          <span class="text-body-4 font-manrope text-lightGreyBlue">Тираж 100 шт.</span>
        </div>
      </div>
      <div class="flex flex-col gap-4 mb-4">
        <Inputs v-model="form.name" placeholder="Имя" />
        <Inputs v-model="form.phone" phoneMask placeholder="Телефон" />
      </div>
      <div class="mb-4">
        <p class="text-[12px] mb-2">Как с вами связаться?</p>
        <div class="space-y-2">
          <Checkbox
            v-model="form.callType"
            type="radio"
            label="Позвонить"
            value="call"
            name="callType"
            id="call"
          />
          <Checkbox
            v-model="form.callType"
            type="radio"
            label="Написать в WhatsApp"
            value="wa"
            name="callType"
            id="wa"
          />
          <Checkbox
            v-model="form.callType"
            type="radio"
            label="Написать в Telegram"
            value="tg"
            name="callType"
            id="tg"
          />
        </div>
      </div>
      <Btn name="Отправить" class="inline-block mb-4" />
      <div class="text-[12px] text-lightGreyBlue">
        Нажимая кнопку, вы соглашаетесь c нашей
        <NuxtLink to="/oferta" class="underline">публичной офертой</NuxtLink> и
        <NuxtLink to="/privacy" class="underline">политикой конфиденциальности</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import iconClose from "@/components/icons/icon-close.vue";
import Inputs from "@/components/shared/Inputs.vue";
import Btn from "../buttons/Btn.vue";
import Checkbox from "../shared/Checkbox.vue";
import Textarea from "../shared/Textarea.vue";
import { useModalStore } from "@/store/useModalStore";

const { closeAllModals } = useModalStore();

const form = ref<any>({
  name: "",
  phone: "",
  callType: "call",
  comment: "",
});
</script>

<style scoped></style>
