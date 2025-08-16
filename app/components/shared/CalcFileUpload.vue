<template>
  <div class="calc-file-upload">
    <label v-if="label" class="calc-file-label">
      {{ label }}
    </label>
    
    <!-- Состояние загрузки файла -->
    <div v-if="!uploadedFile" class="upload-area">
      <input
        ref="fileInput"
        type="file"
        class="file-input"
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
  width: 100%;
}

.calc-file-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.file-input {
  display: none;
}

.upload-area {
  width: 100%;
}

.upload-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-button:hover:not(:disabled) {
  border-color: #9ca3af;
  background-color: #f3f4f6;
}

.upload-button.loading {
  cursor: not-allowed;
  opacity: 0.7;
}

.upload-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.uploaded-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
}

.file-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.file-size {
  font-size: 0.75rem;
  color: #6b7280;
}

.delete-button {
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.delete-button:hover {
  background-color: #dc2626;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>