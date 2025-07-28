<template>
  <div>
    <div class="dots"></div>
    <div>
      <h3>{{ card.title }}</h3>
    </div>
    <ul v-if="!card.requisites">
      <li v-for="item in card.info">
        <div v-html="item.action"></div>
      </li>
    </ul>
    <div v-if="card.social">
      <IconTelegram />
      <IconWhatsapp />
    </div>
    <div v-if="card.requisites">
      <div v-for="item in card.organization">
        <p>{{ item.label }}</p>
        <p>{{ item.inn }}</p>
        <p>{{ item.ogrn }}</p>
      </div>
      <Btn name="Скачать реквизиты" />
    </div>
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
