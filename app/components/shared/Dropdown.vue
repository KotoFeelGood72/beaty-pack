<template>
  <div
    class="bg-white rounded-lg p-3 min-w-[264px] z-10 shadow-md"
    :class="{
      'opacity-100 pointer-events-auto': isActive,
      'opacity-0 pointer-events-none': !isActive,
    }"
  >
    <ul class="flex flex-col gap-4">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        :class="[
          'rounded transition-colors cursor-pointer hover:text-darkBlue',
          idx === activeIndex ? 'text-darkBlue' : 'text-lightGreyBlue',
        ]"
        @mouseenter="activeIndex = idx"
        @mouseleave="activeIndex = null"
      >
        <NuxtLink v-if="item.to" :to="item.to" class="block w-full h-full">{{
          item.label
        }}</NuxtLink>
        <span v-else>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { NuxtLink } from "#components";

const props = defineProps<{
  isActive: boolean;
  items: Array<{ label: string; to?: string }>;
}>();

const activeIndex = ref<number | null>(null);
</script>
