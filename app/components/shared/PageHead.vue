<template>
  <div class="container lg:mb-10 mb-5 mt-8" :class="classNames">
    <nav class="text-body-4 text-lightGreyBlue lg:mb-5 mb-3" aria-label="Breadcrumb">
      <ul class="flex items-center lg:gap-3 gap-2 font-manrope flex-wrap">
        <li
          v-for="(crumb, idx) in breadcrumbs"
          :key="idx"
          class="flex items-center lg:gap-3 gap-2"
        >
          <template v-if="crumb.children && crumb.children.length">
            <div class="relative group">
              <button
                class="flex items-center gap-2"
                @click="toggleDropdown(idx)"
                type="button"
              >
                <span class="whitespace-nowrap">{{ crumb.label }}</span>
                <div class="flex items-center justify-center w-4 h-4 -mt-[0.6px]">
                  <IconChevron />
                </div>
              </button>
              <Dropdown
                :isActive="dropdownOpen === idx"
                :items="crumb.children"
                class="absolute left-0 mt-2 z-10"
              />
            </div>
          </template>
          <template v-else>
            <NuxtLink v-if="crumb.to" :to="crumb.to" class="">{{ crumb.label }}</NuxtLink>
            <span v-else class="text-dark whitespace-nowrap">{{ crumb.label }}</span>
          </template>
          <span v-if="idx < breadcrumbs.length - 1" class="">/</span>
        </li>
      </ul>
    </nav>
    <h1 class="lg:text-headline-1 text-headline-6 font-semibold" v-if="title">
      {{ title }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import IconChevron from "@/components/icons/icon-chevron.vue";
import Dropdown from "@/components/shared/Dropdown.vue";

defineProps<{
  classNames?: string;
  breadcrumbs: Array<{
    label: string;
    to?: string;
    children?: Array<{ label: string; to: string }>;
  }>;
  title?: string;
}>();

const dropdownOpen = ref<number | null>(null);

function toggleDropdown(idx: number) {
  dropdownOpen.value = dropdownOpen.value === idx ? null : idx;
}
</script>
