<template>
  <div
    class="fly-search max-w-[732px] flex items-center justify-center gap-4 w-full absolute top-full left-1/2 -translate-x-1/2 pt-5"
  >
    <div
      class="fly-search__input flex items-center justify-center relative bg-white rounded-[14px] h-14 overflow-hidden flex-grow"
    >
      <iconSearch
        class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
      />
      <input type="search" placeholder="Поиск..." class="w-full h-full p-4 pl-14" />
    </div>
    <Btn name="Искать" />
  </div>
</template>

<script setup lang="ts">
import Btn from "../buttons/Btn.vue";
import iconSearch from "../icons/icon-search.vue";
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
