<template>
  <NuxtLink :to="happy.link">
    <div>
      <div>
        <h3>{{ happy.title }}</h3>
        <p>{{ happy.description }}</p>
        <IconArrowLink />
      </div>
      <div>
        <NuxtImg :src="happy.image" alt="happy" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import IconArrowLink from "@/components/icons/icon-arrow-link.vue";

const props = defineProps<{
  happy: any;
}>();
</script>

<style scoped></style>
