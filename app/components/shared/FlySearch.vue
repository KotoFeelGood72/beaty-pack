<template>
  <div
    class="fly-search lg:max-w-[732px] flex items-center justify-center gap-4 w-full absolute lg:top-full top-1/2 -translate-y-1/2 left-5 lg:left-1/2 lg:-translate-x-1/2 lg:pt-5"
  >
    <div
      class="fly-search__input flex items-center justify-center relative bg-white lg:rounded-[14px] rounded-md lg:h-14 h-11 overflow-hidden flex-grow max-lg:border border-[#3063A8]"
    >
      <iconSearch
        class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center max-lg:hidden"
      />
      <input
        type="search"
        placeholder="Поиск..."
        class="w-full h-full p-4 lg:pl-14 pl-5"
      />
      <IconClose
        class="absolute right-4 top-1/2 -translate-y-1/2 lg:hidden w-5 h-5 flex items-center justify-center"
      />
    </div>
    <Btn name="Искать" class="max-lg:hidden" />
  </div>
</template>

<script setup lang="ts">
import Btn from "../buttons/Btn.vue";
import iconSearch from "../icons/icon-search.vue";
import IconClose from "../icons/icon-close.vue";
</script>

<style scoped>
input:focus {
  outline: none;
}

@media (max-width: 768px) {
  .fly-search {
    max-width: calc(100% - 80px);
    max-height: 43px;
  }
}
</style>
