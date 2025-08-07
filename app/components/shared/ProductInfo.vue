<template>
  <div class="product-info">
    <div>
      <h3>Характеристики</h3>
      <ul>
        <li v-for="(item, i) in info.short">
          <p>{{ item.label }}</p>
          <p>{{ item.value }}</p>
        </li>
      </ul>
    </div>
    <div>
      <h3>Стоимость</h3>
      <ul>
        <li>
          <p>тираж</p>
          <ul>
            <li v-for="(item, i) in tirages">
              <p>{{ item.tirage }}</p>
              <p>{{ item.count }}</p>
            </li>
          </ul>
        </li>
        <li>
          <p>шт</p>
          <ul>
            <li v-for="(item, i) in sizes">
              <p>{{ item.size }}</p>
              <p>{{ item.count }}</p>
            </li>
          </ul>
        </li>
        <li>
          <p>стоимость</p>
          <ul>
            <li v-for="(item, i) in prices">
              <p>{{ item.price }}</p>
              <p>{{ item.count }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <p>
      Указана ориентировочная стоимость изделия с базовыми характеристиками. Чтобы узнать
      цену с учетом индивидуальных требований, перейдите в онлайн-калькулятор
    </p>
    <Btn name="Рассчитать стоимость" />
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
