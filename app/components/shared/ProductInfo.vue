<template>
  <div class="product-info bg-lightGrey rounded-2xl p-8 flex flex-col gap-10 max-w-[480px]">
    <div class="flex flex-col gap-6">
      <h3 class="text-headline-4 font-onest font-semibold text-black">Характеристики</h3>
      <ul class="flex flex-col gap-3">
        <li v-for="(item, i) in info.short" class="flex justify-start items-center gap-5">
          <p class="text-lightGreyBlue font-light min-w-40">{{ item.label }}</p>
          <p>{{ item.value }}</p>
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-6">
      <h3 class="text-headline-4 font-onest font-semibold text-black">Стоимость</h3>
      <ul class="grid grid-cols-3 gap-10">
        <li>
          <p class="mb-4 text-lightGreyBlue">тираж</p>
          <ul class="flex flex-col gap-4">
            <li v-for="(item, i) in tirages">{{ item }}
            </li>
          </ul>
        </li>
        <li>
          <p class="mb-4 text-lightGreyBlue">шт</p>
          <ul class="flex flex-col gap-4">
            <li v-for="(item, i) in sizes">
{{ item }}
            </li>
          </ul>
        </li>
        <li>
          <p class="mb-4 text-lightGreyBlue">стоимость</p>
          <ul class="flex flex-col gap-4">
            <li v-for="(item, i) in prices">
{{ item }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-6">
    
    <p class="text-lightGreyBlue">
      Указана ориентировочная стоимость изделия с базовыми характеристиками. Чтобы узнать
      цену с учетом индивидуальных требований, перейдите в онлайн-калькулятор
    </p>
    <Btn name="Рассчитать стоимость" class="max-w-[249px]"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Btn from "../buttons/Btn.vue";
defineProps<{
  info: any;
  tirages: any;
  prices: any;
  sizes: any;
}>();
</script>

<style scoped></style>
