<template>
  <div
    class="head-block relative overflow-hidden flex flex-col justify-center rounded-b-[40px] -mt-[108px] min-h-[700px]"
  >
    <div class="absolute inset-0 z-0">
      <NuxtImg
        :src="backgroundImage"
        :alt="backgroundAlt || 'Background image'"
        class="w-full h-full"
      />
    </div>
    <div class="container relative z-10 pt-[265px] pb-[211px]">
      <div
        class="flex flex-col gap-4 max-w-[409px]"
        :class="{ 'text-white': isDark, 'text-black': !isDark }"
      >
        <p class="text-lightGreyBlue uppercase text-body-4">
          {{ content.subtitle }}
        </p>
        <h1 class="text-headline-1 font-semibold">
          {{ content.title }}
        </h1>
        <span class="text-lightGreyBlue">
          {{ content.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  backgroundImage: string;
  backgroundAlt?: string;
  isDark?: boolean;
  content: {
    subtitle: string;
    title: string;
    description: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  backgroundAlt: "",
  isDark: false,
});
</script>
