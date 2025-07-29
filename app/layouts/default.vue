<template>
  <div>
    <Header />
    <div class="pt-[108px]">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/shared/Header.vue";
import Footer from "~/components/shared/Footer.vue";
</script>

<style scoped></style>
