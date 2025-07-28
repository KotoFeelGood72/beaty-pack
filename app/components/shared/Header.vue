<template>
  <header>
    <div class="container">
      <div class="logo">
        <NuxtLink to="/">
          <NuxtImg src="/logo.svg" alt="logo" class="" />
        </NuxtLink>
      </div>
      <Navigation />
      <SearchButton />
      <Btn name="Заказать звонок" />
    </div>
  </header>
</template>

<script setup lang="ts">
import Navigation from "@/components/shared/Navigation.vue";
import SearchButton from "@/components/buttons/SearchButton.vue";
import Btn from "@/components/buttons/Btn.vue";
</script>

<style scoped></style>
