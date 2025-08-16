<template>
  <div :class="[isColor ? 'bg-white lg:py-100' : '']">
    <div class="container max-lg:px-0">
      <div
        class="flex justify-start  lg:gap-[118px] gap-7 lg:p-[57px] rounded-2xl py-10 px-5 max-lg:flex-wrap"
        :class="[{ 'bg-brown': isColor }, {'max-lg:gap-5': !isColor}]"
      >
        <div class="lg:min-w-[464px]">
          <h2 class="lg:text-headline-2 text-headline-6 font-semibold max-lg:text-center" :class="{ 'text-white': isColor }">
            {{ title }}
          </h2>
        </div>
        <div :class="['space-y-6', {'max-lg:text-center': isColor}]">
          <p class="text-lightGreyBlue" :class="{ 'text-white': isColor }">
            {{ description }}
          </p>
          <div>
            <Btn
              :name="buttonText"
              :theme="isColor ? 'light' : 'brown'"
              class="inline-flex  max-lg:justify-center"
              :class="{ 'max-lg:w-full': isColor }"
            />
          </div>
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
