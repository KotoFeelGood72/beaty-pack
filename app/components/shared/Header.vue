<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <div
      class="container flex items-center justify-between py-4 header-shadow rounded-b-[20px] gap-6 bg-white"
    >
      <div class="logo flex-grow">
        <NuxtLink to="/" class="flex items-center justify-start p-2">
          <NuxtImg src="images/logo.svg" alt="logo" class="" />
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

<style scoped>
.header-shadow {
  box-shadow: 1px 3px 15px 0px rgba(108, 118, 132, 0.07),
    2px 2px 20px 0px rgba(108, 118, 132, 0.05);
}
</style>
