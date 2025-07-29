<template>
  <div class="container">
    <div
      class="flex justify-start gap-[118px] p-[57px] rounded-2xl"
      :class="{ 'bg-brown': isColor }"
    >
      <div class="min-w-[464px]">
        <h2 class="text-headline-2 font-semibold" :class="{ 'text-white': isColor }">
          {{ title }}
        </h2>
      </div>
      <div class="space-y-6">
        <p class="text-lightGreyBlue" :class="{ 'text-white': isColor }">
          {{ description }}
        </p>
        <div>
          <Btn
            :name="buttonText"
            :theme="isColor ? 'light' : 'brown'"
            class="inline-flex"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Btn from "~/components/buttons/Btn.vue";

const props = defineProps<{
  title: string;
  description: string;
  buttonText: string;
  isColor: boolean;
}>();
</script>
