<template>
  <div>
    <div>
      <h2>С кем мы работаем</h2>
      <div>
        <div>
          <IconArrowSlider />
        </div>
        <div>
          <IconArrowSlider />
        </div>
      </div>
    </div>
    <Swiper>
      <SwiperSlide>
        <WhatsCard
          title="Банк Точка"
          description="Изготовление подарочных наборов, бумажных пакетов, папок для банковских карт и коробок под сувенирную продукцию"
          image="/images/tochka-bag.png"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import WhatsCard from "@/components/cards/WhatsCard.vue";
import IconArrowSlider from "@/components/icons/icon-arrow-slider.vue";
</script>

<style scoped></style>
