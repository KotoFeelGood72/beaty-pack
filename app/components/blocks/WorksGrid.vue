<template>
  <ClientOnly>
  <div class="w-full" :class="{ 'flex flex-row overflow-x-auto gap-[10px]': slider }">
    <div class="max-lg:mb-[10px]" :class="startWrapperClass">
      <div
        v-if="works[0]"
        class="row-span-2 relative rounded-xl overflow-hidden cursor-pointer max-h-[924px] h-full lg:block hidden"
      >
        <img :src="`/images/works/${works[0]}.jpg`" class="w-full lg:h-full object-cover max-lg:rounded-xl" />
      </div>
      <div class="lg:h-full" :class="startWrapperClass">
        <div
          v-for="(item, index) in works.slice(1, 5)"
          :key="item + index"
          class="relative rounded-xl overflow-hidden cursor-pointer lg:h-[450px] max-lg:min-w-[169px] max-lg:h-[255px]"
        >
          <img :src="`/images/works/${item}.jpg`" class="w-full lg:h-full object-cover max-lg:rounded-xl" />
        </div>
      </div>
    </div>
    <div :class="endWrapperClass"
    >
      <div
        v-for="(item, index) in works.slice(5, 9)"
        :key="item + index"
        class="relative rounded-xl overflow-hidden cursor-pointer max-lg:min-w-[169px] max-lg:h-[255px]"
      >
        <img :src="`/images/works/${item}.jpg`" class="w-full h-full object-cover max-lg:rounded-xl" />
      </div>
    </div>
  </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { works } from "~/data/Cases";

const props = defineProps<{
  slider: boolean;
}>();

const startWrapperClass = computed(() => {
  return props.slider ? 'flex flex-row flex-nowrap gap-[10px]' : 'grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-[10px]';
});

const endWrapperClass = computed(() => {
  return props.slider ? 'flex flex-row flex-nowrap  gap-[10px]' : 'grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-[10px]';
});
</script>

<style scoped></style>
