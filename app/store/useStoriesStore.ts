import { defineStore, storeToRefs } from "pinia";
import { stories } from "@/data/Stories";

export const useStoriesStore = defineStore("stories", {
  state: () => ({
    stories: null as any,
    currentStory: null as any,
  }),
  actions: {
    async getStories(currentStoryIndex: number) {
      this.stories = stories;
    },

    setCurrentStory(story: any, idx: number, progress?: number) {
      this.currentStory = {
        ...story,
        active: true,
        num: idx,
        progress: progress || 0,
      };
    },

    closeCurrentStory() {
      this.currentStory = null;
    },
  },
});

export const useStoriesStoreRefs = () => storeToRefs(useStoriesStore());
