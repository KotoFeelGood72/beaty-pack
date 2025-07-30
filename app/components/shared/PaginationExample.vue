<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-6">Пример пагинации</h2>
    
    <!-- Контролы для тестирования -->
    <div class="mb-6 space-y-4">
      <div class="flex items-center gap-4">
        <label class="flex items-center gap-2">
          <span>Количество записей:</span>
          <input 
            v-model.number="totalRecords" 
            type="number" 
            min="1" 
            max="100"
            class="border border-gray-300 rounded px-2 py-1 w-20"
          />
        </label>
        
        <label class="flex items-center gap-2">
          <span>Записей на странице:</span>
          <input 
            v-model.number="recordsPerPage" 
            type="number" 
            min="1" 
            max="20"
            class="border border-gray-300 rounded px-2 py-1 w-20"
          />
        </label>
      </div>
      
      <div class="text-sm text-gray-600">
        Всего страниц: {{ Math.ceil(totalRecords / recordsPerPage) }} | 
        Текущая страница: {{ currentPage }}
      </div>
    </div>

    <!-- Демонстрация записей -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-3">Записи на странице {{ currentPage }}:</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          v-for="i in paginatedItems" 
          :key="i"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50"
        >
          Запись {{ i }}
        </div>
      </div>
    </div>

    <!-- Компонент пагинации -->
    <div class="flex justify-center">
      <Pagination 
        :total-records="totalRecords"
        :records-per-page="recordsPerPage"
        :current-page="currentPage"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from './Pagination.vue'

// Состояние для демонстрации
const totalRecords = ref(45)
const recordsPerPage = ref(9)
const currentPage = ref(1)

// Вычисляем записи для текущей страницы
const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * recordsPerPage.value
  const endIndex = Math.min(startIndex + recordsPerPage.value, totalRecords.value)
  return Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i + 1)
})

// Обработчик изменения страницы
const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script> 