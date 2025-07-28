<template>
  <div class="menu-column">
    <h3 class="menu-title">{{ col.label }}</h3>
    <ul class="menu-list">
      <li v-for="item in col.items" :key="item.label" class="menu-item">
        <div class="menu-item-content">
          <NuxtLink :to="item.to" class="menu-link">{{ item.label }}</NuxtLink>
          <div v-if="item.tags && item.tags.length > 0" class="menu-tags">
            <span
              v-for="tag in item.tags"
              :key="tag"
              :class="['menu-tag', getTagClass(tag)]"
            >
              {{ getTagText(tag) }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  col: any;
}>();

const isColorTags = computed(() => {
  return props.col.items.some((item: any) => item.tags);
});

const getTagClass = (tag: string) => {
  switch (tag) {
    case "sale":
      return "tag-sale";
    case "new":
      return "tag-new";
    default:
      return "tag-default";
  }
};

const getTagText = (tag: string) => {
  switch (tag) {
    case "sale":
      return "sale";
    case "new":
      return "new";
    default:
      return tag;
  }
};
</script>
