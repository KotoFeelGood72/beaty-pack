<template>
  <div
    class="stories fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
    @click="handleOutsideClick"
  >
    <div
      class="bg-white max-w-[400px] w-full rounded-xl overflow-hidden slider-main relative"
      @click.stop
    >
      <!-- Пагинация -->
      <div class="absolute top-4 left-4 right-4 z-20 flex gap-2">
        <div
          v-for="(item, index) in stories"
          :key="'progress-' + index"
          class="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <div
            class="h-full bg-white rounded-full transition-all duration-100 ease-linear progress-bar"
            :style="{ width: getProgressWidth(item.id) + '%' }"
          ></div>
        </div>
      </div>

      <Swiper
        ref="swiperRef"
        :observer="true"
        :observeParents="true"
        :modules="[Pagination]"
        :loop="false"
        :css-mode="true"
        :allowTouchMove="false"
        class="hero-swiper"
        :initialSlide="currentSlideIndex"
        @slideChange="handleSlideChange"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="item in stories" :key="'item' + item">
          <div class="stories-item relative h-[700px]">
            <NuxtImg
              :src="item.img"
              alt="story"
              class="w-full h-full object-cover story-image"
            />

            <!-- Невидимые кнопки навигации -->
            <div
              class="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-50"
              @click="goToPreviousSlide"
            ></div>
            <div
              class="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-50"
              @click="goToNextSlide"
            ></div>

            <div
              class="stories-item-content absolute bottom-0 left-0 w-full flex flex-col gap-4 text-white p-4 z-20"
            >
              <h3
                class="stories-item-title text-headline-3 font-semibold animate-slide-up"
              >
                {{ item.title }}
              </h3>
              <p class="stories-item-description animate-slide-up-delay">
                {{ item.description }}
              </p>
              <div class="animate-slide-up-delay-2">
                <Btn name="Перейти в каталог" theme="light" />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import Btn from "../buttons/Btn.vue";
import "swiper/css";
import "swiper/css/pagination";
import { useStoriesStoreRefs, useStoriesStore } from "~/store/useStoriesStore";

import { stories } from "@/data/Stories";

const { currentStory } = useStoriesStoreRefs();
const storiesStore = useStoriesStore();

const swiperRef = ref();
const swiperInstanceRef = ref<any>(null);
const currentSlideIndex = ref(0);
const progress = ref(0);
const interval = ref<NodeJS.Timeout | null>(null);

// Отладочная информация
console.log("Initial currentStory:", currentStory.value);

// Инициализируем правильный индекс по ID
if (currentStory.value?.id) {
  const storyIndex = stories.findIndex((story) => story.id === currentStory.value.id);
  if (storyIndex !== -1) {
    currentSlideIndex.value = storyIndex;
    console.log("Found story index by ID:", storyIndex);
  }
} else if (currentStory.value?.num !== undefined) {
  // Если есть номер слайда, используем его
  currentSlideIndex.value = currentStory.value.num;
  console.log("Using story num:", currentStory.value.num);
}

console.log("Initial currentSlideIndex:", currentSlideIndex.value);

// Инициализируем начальный прогресс если есть
if (currentStory.value?.progress) {
  progress.value = currentStory.value.progress;
}

const handleOutsideClick = () => {
  storiesStore.closeCurrentStory();
};

const onSwiper = (swiper: any) => {
  // Swiper инициализирован
  console.log("Swiper initialized");
  console.log("Swiper instance:", swiper);
  console.log("Initial currentSlideIndex:", currentSlideIndex.value);

  // Сохраняем Swiper инстанс
  swiperInstanceRef.value = swiper;

  // Принудительно переходим на нужный слайд после инициализации
  if (currentSlideIndex.value > 0) {
    setTimeout(() => {
      swiper.slideTo(currentSlideIndex.value, 0, false);
      console.log("Forced slide to index:", currentSlideIndex.value);
      // Обновляем currentStory после принудительного перехода
      const newStory = stories[currentSlideIndex.value];
      if (newStory) {
        storiesStore.setCurrentStory(newStory, currentSlideIndex.value, 0);
      }
    }, 50);
  }

  // Запускаем прогресс после инициализации Swiper
  setTimeout(() => {
    startProgress();
  }, 100);
};

const handleSlideChange = (swiper: any) => {
  console.log("Slide changed to:", swiper.realIndex);

  // Проверяем, что индекс действительно изменился
  if (currentSlideIndex.value !== swiper.realIndex) {
    currentSlideIndex.value = swiper.realIndex;
    progress.value = 0;

    // Получаем новый слайд из массива stories
    const newStory = stories[swiper.realIndex];

    // Обновляем currentStory с информацией о новом слайде
    if (newStory) {
      storiesStore.setCurrentStory(newStory, swiper.realIndex, 0);
    }

    startProgress();
  }
};

const startProgress = () => {
  if (interval.value) {
    clearInterval(interval.value);
  }

  progress.value = 0;
  console.log("Starting progress for slide:", currentSlideIndex.value);

  interval.value = setInterval(() => {
    if (progress.value >= 100) {
      progress.value = 100;
      console.log("Progress complete, moving to next slide");
      nextSlide();
      return;
    }

    progress.value += 1; // 2% каждые 100ms = 100% за 5 секунд
    // progress.value += 2; // 2% каждые 100ms = 100% за 5 секунд
    console.log("Progress:", progress.value);
  }, 100);
};

const nextSlide = () => {
  console.log("nextSlide called");
  console.log("swiperInstanceRef.value:", swiperInstanceRef.value);

  if (swiperInstanceRef.value) {
    const swiper = swiperInstanceRef.value;
    console.log("Current slide index:", swiper.activeIndex);
    console.log("Total slides:", swiper.slides.length);
    console.log("Is end:", swiper.isEnd);

    if (swiper.isEnd) {
      // Если это последний слайд, закрываем модальное окно
      console.log("Last slide, closing modal");
      storiesStore.closeCurrentStory();
    } else {
      // Останавливаем текущий интервал перед переключением
      if (interval.value) {
        clearInterval(interval.value);
        interval.value = null;
      }
      console.log("Moving to next slide");
      swiper.slideNext();
      // Обновление currentStory происходит в handleSlideChange
    }
  } else {
    console.log("Swiper instance not available");
  }
};

const goToPreviousSlide = () => {
  console.log("goToPreviousSlide called");
  if (swiperInstanceRef.value) {
    const swiper = swiperInstanceRef.value;
    if (swiper.activeIndex > 0) {
      // Останавливаем текущий прогресс
      if (interval.value) {
        clearInterval(interval.value);
        interval.value = null;
      }

      // Переходим к предыдущему слайду
      swiper.slidePrev();

      // Обновление currentStory теперь происходит в handleSlideChange
    }
  }
};

const goToNextSlide = () => {
  console.log("goToNextSlide called");
  if (swiperInstanceRef.value) {
    const swiper = swiperInstanceRef.value;
    if (swiper.activeIndex < swiper.slides.length - 1) {
      // Останавливаем текущий прогресс
      if (interval.value) {
        clearInterval(interval.value);
        interval.value = null;
      }

      // Переходим к следующему слайду
      swiper.slideNext();

      // Обновление currentStory теперь происходит в handleSlideChange
    }
  }
};

const getProgressWidth = (id: number) => {
  const currentStory = stories[currentSlideIndex.value];

  if (!currentStory) return 0;

  const currentStoryId = currentStory.id;
  const storyIndex = stories.findIndex((story) => story.id === id);
  const currentIndex = stories.findIndex((story) => story.id === currentStoryId);

  if (storyIndex < currentIndex) {
    return 100; // Завершенные слайды
  } else if (storyIndex === currentIndex) {
    return progress.value; // Текущий слайд
  } else {
    return 0; // Будущие слайды
  }
};

// Запускаем прогресс при монтировании
onMounted(() => {
  console.log("Component mounted");
  // Прогресс теперь запускается в onSwiper
});

// Очищаем интервал при размонтировании
onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
});

// Обновляем currentStory в store
watch(progress, (newProgress) => {
  if (currentStory.value) {
    storiesStore.setCurrentStory(
      currentStory.value,
      currentSlideIndex.value,
      newProgress
    );
  }
});
</script>

<style scoped>
.stories-item {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
}

.stories-item * {
  pointer-events: none;
}

.stories-item {
  pointer-events: auto;
}

/* Невидимые кнопки навигации не должны блокировать события паузы */
.stories-item > div[class*="absolute"] {
  pointer-events: auto;
}

/* Отключаем перетаскивание Swiper */
.hero-swiper {
  touch-action: none;
}

/* Пульсирующая анимация для активного прогресс-бара */
.progress-bar {
  position: relative;
  overflow: hidden;
}

.progress-bar::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
