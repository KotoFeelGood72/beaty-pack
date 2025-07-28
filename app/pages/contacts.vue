<template>
  <div class="container">
    <ContactsCard :card="contact" v-for="contact in contacts" :key="contact.title" />
    <div>
      <NuxtImg src="/images/map.png" alt="map" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactsCard from "@/components/cards/ContactsCard.vue";
import { contacts } from "@/data/Contacts";
</script>

<style scoped></style>
