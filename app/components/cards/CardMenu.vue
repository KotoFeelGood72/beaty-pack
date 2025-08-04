<template>
  <div class="menu-column flex flex-col gap-6">
    <h3 class="menu-title text-body-1 font-medium">{{ title }}</h3>
    <ul class="menu-list space-y-2">
      <li v-for="item in list" :key="item.label" class="menu-item">
        <div class="menu-item-content flex items-center gap-2">
          <NuxtLink :to="item.to" class="menu-link text-body-4">{{
            item.label
          }}</NuxtLink>

          <div v-if="item.tag" class="menu-tags">
            <span
              :class="['menu-tag', getTagClass(item.tag)]"
              class="h-[18px] px-1 block rounded-xl text-[12px] text-white font-normal"
            >
              {{ item.tag }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  list: any;
}>();

const getTagClass = (tag: string) => {
  switch (tag) {
    case "sale":
      return "bg-[#9F6ED7]";
    case "new":
      return "bg-[#FD9E2D]";
    default:
      return "tag-default";
  }
};
</script>
