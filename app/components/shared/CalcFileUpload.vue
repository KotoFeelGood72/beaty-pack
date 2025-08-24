<template>
  <div class="flex items-center gap-4 max-lg:flex-col max-lg:pt-3">
    <div class="flex items-center gap-10">
      <p class="font-manrope lg:font-semibold lg:max-w-[235px]">
        Здесь вы можете прикрепить макет или логотип для размещения
      </p>
    </div>

    <!-- Кнопка загрузки -->
    <div class="flex-shrink-0 max-lg:w-full">
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        :accept="accept"
        @change="handleFileSelect"
      />

      <!-- Состояние загрузки файла -->
      <div v-if="!uploadedFile" class="upload-area">
        <button
          type="button"
          class="flex items-center gap-2 lg:px-4 lg:py-3 p-4 bg-lightGreyBlue text-white rounded-lg transition-all duration-200 hover:bg-darkGreyBlue focus:outline-none focus:ring-2 focus:bg-darkGreyBlue disabled:opacity-50 disabled:cursor-not-allowed max-lg:w-full max-lg:flex max-lg:items-center max-lg:justify-center"
          :class="{ 'opacity-50 cursor-not-allowed': isUploading }"
          @click="triggerFileSelect"
          :disabled="isUploading"
        >
          <img
            src="@/assets/icons/download.svg"
            alt="download"
            class="w-4 h-4 flex items-center justify-center"
            v-if="!isUploading"
          />
          <img
            src="@/assets/icons/wait.svg"
            alt="download"
            class="w-4 h-4 flex items-center justify-center transform rotate-90 duration-200 animate-spin"
            v-if="isUploading"
          />

          <span class="whitespace-nowrap font-manrope text-body-1 font-light">
            {{ isUploading ? "Загрузка" : "Добавить файл" }}
          </span>
        </button>
      </div>

      <!-- Состояние загруженного файла -->
      <div v-else class="uploaded-file">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10">
              <img
                src="@/assets/icons/file_upload.png"
                alt="pdf"
                class="flex items-center justify-center"
              />
            </div>

            <div class="flex-1 min-w-0">
              <div
                class="text-body-4 font-manrope max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {{ uploadedFile.name }}
              </div>
              <div class="text-body-4 font-manrope text-lightGreyBlue">
                {{ formatFileSize(uploadedFile.size) }}
              </div>
            </div>
          </div>

          <button
            type="button"
            class="text-body-5 font-manrope bg-lightGrey px-2 py-1 rounded-xl"
            @click="removeFile"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  accept?: string;
}

const props = withDefaults(defineProps<Props>(), {
  accept: "*/*",
});

const emit = defineEmits<{
  "file-selected": [file: File];
  "file-removed": [];
}>();

const fileInput = ref<HTMLInputElement>();
const isUploading = ref(false);
const uploadedFile = ref<File | null>(null);

const triggerFileSelect = () => {
  fileInput.value?.click();
};

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    isUploading.value = true;

    // Имитация загрузки файла
    await new Promise((resolve) => setTimeout(resolve, 2000));

    uploadedFile.value = file;
    isUploading.value = false;
    emit("file-selected", file);
  }
};

const removeFile = () => {
  uploadedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
  emit("file-removed");
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Б";

  const k = 1024;
  const sizes = ["Б", "КБ", "МБ", "ГБ"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};
</script>
