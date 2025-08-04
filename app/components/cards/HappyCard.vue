<template>
  <NuxtLink
    :to="happy.link"
    class="border border-darkGrey rounded-lg flex relative overflow-hidden h-[200px] cursor-pointer p-6 flex-grow"
  >
    <div>
      <div class="space-y-3 max-w-[194px] relative z-10 pointer-events-none">
        <h3 class="text-headline-4 font-semibold">{{ happy.title }}</h3>
        <p class="text-lightGreyBlue">{{ happy.description }}</p>
      </div>
      <div
        class="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
      >
        <NuxtImg :src="happy.image" alt="happy" class="w-full h-full object-cover" />
      </div>
      <IconArrowLink
        class="w-12 h-12 border-darkGrey border rounded-full p-3 absolute bottom-[10px] right-[10px] bg-lightGrey pointer-events-none"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import IconArrowLink from "@/components/icons/icon-arrow-link.vue";

const props = defineProps<{
  happy: any;
}>();
</script>

<style scoped>
a {
  transition: all 0.3s ease;
  transform-origin: center;
}
</style>
