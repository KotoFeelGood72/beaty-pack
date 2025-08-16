<template>
  <div class="bg-lightGrey py-5 px-8 space-y-[11px] rounded-card relative">
    <div
      class="dots absolute top-8 right-8 w-[10px] h-[10px] bg-brown rounded-full"
    ></div>
    <div class="space-y-6">
      <h3
        class="font-bold text-dark text-headline-4"
        :class="card.requisites ? 'mb-6' : ''"
      >
        {{ card.title }}
      </h3>
      <ul v-if="!card.requisites" class="space-y-2">
        <li v-for="item in card.info" :key="item.label">
          <a
            v-if="item.value"
            :href="item.value"
            class="text-dark hover:text-primary transition-colors"
          >
            {{ item.label }}
          </a>
          <span v-else class="text-dark">{{ item.label }}</span>
        </li>
      </ul>
    </div>
    <div v-if="card.social" class="flex items-end justify-end gap-2">
      <a
        href="#"
        class="w-10 h-10 border border-brown rounded-full flex items-center justify-center"
      >
        <IconWhatsapp />
      </a>
      <a
        href="#"
        class="w-10 h-10 border border-brown rounded-full flex items-center justify-center"
      >
        <IconTelegram class="" />
      </a>
    </div>
    <div v-if="card.requisites" class="space-y-8 text-dark">
      <div v-for="item in card.organization" :key="item.label" class="space-y-2">
        <p class="font-medium">{{ item.label }}</p>
        <p class="text-body-2">ИНН: {{ item.inn }} ОГРН: {{ item.ogrn }}</p>
      </div>
    </div>
    <Btn
      name="Скачать карточку предприятия"
      v-if="card.requisites"
      :class="card.requisites ? '!mt-10' : ''"
      class="max-lg:text-body-2 max-lg:w-full"
    />
  </div>
</template>

<script setup lang="ts">
import IconTelegram from "@/components/icons/icon-telegram.vue";
import IconWhatsapp from "@/components/icons/icon-whatsapp.vue";
import Btn from "../buttons/Btn.vue";
const props = defineProps<{
  card: any;
}>();
</script>

<style scoped></style>
