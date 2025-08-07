<template>
  <div class="calc-file-upload">
    <label v-if="label" class="block text-sm font-bold text-gray-900 mb-2">
      {{ label }}
    </label>
    
    <!-- Состояние загрузки файла -->
    <div v-if="!uploadedFile" class="upload-area">
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        :accept="accept"
        @change="handleFileSelect"
      />
      
      <button
        type="button"
        class="upload-button"
        :class="{ 'loading': isUploading }"
        @click="triggerFileSelect"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        :disabled="isUploading"
      >
        <div class="upload-icon">
          <!-- Иконка загрузки -->
          <svg v-if="!isUploading" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1V11M8 11L4 7M8 11L12 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 11V13C15 13.5304 14.7893 14.0391 14.4142 14.4142C14.0391 14.7893 13.5304 15 13 15H3C2.46957 15 1.96086 14.7893 1.58579 14.4142C1.21071 14.0391 1 13.5304 1 13V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          
          <!-- Иконка загрузки (спиннер) -->
          <svg v-else class="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="20 20" stroke-dashoffset="0"/>
          </svg>
        </div>
        
        <span class="upload-text">
          {{ isUploading ? 'Загрузка' : 'Добавить файл' }}
        </span>
      </button>
    </div>
    
    <!-- Состояние загруженного файла -->
    <div v-else class="uploaded-file">
      <div class="file-info">
        <div class="file-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="2" fill="#E5E7EB" stroke="#9CA3AF"/>
            <path d="M6 8L7.5 9.5L10 7" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="file-details">
          <div class="file-name">{{ uploadedFile.name }}</div>
          <div class="file-size">{{ formatFileSize(uploadedFile.size) }}</div>
        </div>
      </div>
      
      <button
        type="button"
        class="delete-button"
        @click="removeFile"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  accept?: string;
}

const props = withDefaults(defineProps<Props>(), {
  accept: '*/*'
});

const emit = defineEmits<{
  'file-selected': [file: File];
  'file-removed': [];
}>();

const fileInput = ref<HTMLInputElement>();
const isUploading = ref(false);
const isHovered = ref(false);
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    uploadedFile.value = file;
    isUploading.value = false;
    emit('file-selected', file);
  }
};

const removeFile = () => {
  uploadedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  emit('file-removed');
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Б';
  
  const k = 1024;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};
</script>

<style scoped>
.calc-file-upload {
  @apply w-full;
}

.upload-area {
  @apply w-full;
}

.upload-button {
  @apply w-full bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer;
  min-height: 48px;
}

.upload-button.loading {
  @apply bg-gray-500 cursor-not-allowed;
}

.upload-button:disabled {
  @apply cursor-not-allowed;
}

.upload-icon {
  @apply flex items-center justify-center;
}

.upload-text {
  @apply text-sm font-medium;
}

.uploaded-file {
  @apply w-full bg-white border border-gray-300 rounded-lg p-4 flex items-center justify-between;
}

.file-info {
  @apply flex items-center gap-3 flex-1;
}

.file-icon {
  @apply flex items-center justify-center w-8 h-8 bg-gray-100 border border-gray-300 rounded;
}

.file-details {
  @apply flex flex-col;
}

.file-name {
  @apply text-sm font-medium text-gray-900;
}

.file-size {
  @apply text-xs text-gray-500;
}

.delete-button {
  @apply px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors duration-150;
}
</style> 