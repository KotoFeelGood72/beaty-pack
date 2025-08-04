<template>
  <div class="socials flex items-center gap-2">
    <NuxtLink
      v-for="social in socials"
      :key="social.icon"
      :to="social.link"
      class="flex items-center justify-center w-10 h-10"
    >
      <NuxtImg :src="`/images/footer/${social.icon}.svg`" :alt="social.icon" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const socials = [
  {
    icon: "wa",
    link: "https://vk.com/b_pack",
  },
  {
    icon: "tg",
    link: "https://vk.com/b_pack",
  },
  {
    icon: "mail",
    link: "https://vk.com/b_pack",
  },
  {
    icon: "phone",
    link: "https://vk.com/b_pack",
  },
];
</script>

<style scoped></style>
