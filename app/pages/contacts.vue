<template>
  <div class="container">
    <div class="contact-grid gap-5 mb-10">
      <ContactsCard
        :card="contact"
        v-for="(contact, index) in contacts"
        :key="contact.title"
        :class="getCardClasses(index)"
      />
    </div>
    <div class="w-full h-[500px] rounded-card overflow-hidden">
      <NuxtImg src="/images/map.png" alt="map" class="w-full h-full object-cover" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactsCard from "@/components/cards/ContactsCard.vue";
import { contacts } from "@/data/Contacts";

const getCardClasses = (index: number) => {
  if (index === 2) {
    return "requisites-card";
  }
  return "regular-card";
};
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
}

.regular-card {
  grid-column: span 1;
  grid-row: span 1;
}

.requisites-card {
  grid-column: 3;
  grid-row: 1 / 3;
}
</style>
